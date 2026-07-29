import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

// 🔽 ADDED: GET handler to look up your Posts from the database
export async function GET(request: NextRequest) {
  try {
    // Fetches your posts out of the prisma.post model sorted by newest
    const posts = await prisma.post.findMany({
      orderBy: { id: "desc" },
    });
    
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Post fetch engine failed:", error);
    return NextResponse.json(
      { error: `Database Retrieval Panic: ${error.message || error}` },
      { status: 500 }
    );
  }
}

// 📄 KEEPING YOUR ORIGINAL POST LOGIC COMPLETELY INTACT:
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const file = formData.get("imageFile") as File | null;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content fields are required." },
        { status: 400 }
      );
    }

    let finalMediaUrl: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const path = join(process.cwd(), "public", "uploads", uniqueFilename);
      
      await writeFile(path, buffer);
      finalMediaUrl = `/uploads/${uniqueFilename}`;
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        mediaUrl: finalMediaUrl,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Local file attachment upload system failed:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing the file upload." },
      { status: 500 }
    );
  }
}