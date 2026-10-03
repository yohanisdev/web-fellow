import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

//  ADDED: GET handler to look up resources for both public filters and management drawers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    // 1. If admin panel triggers ?all=true, pull every record unfiltered
    if (all === "true") {
      const resources = await prisma.resource.findMany({
        orderBy: { createdAt: "desc" }, // Sort by newest records
      });
      return NextResponse.json(resources);
    }

    // 2. Fallback default lookup logic for public UI filtering tracks
    const category = searchParams.get("category") || "Spiritual";
    const resources = await prisma.resource.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(resources);
  } catch (error: any) {
    console.error("Resource fetch engine failed:", error);
    return NextResponse.json(
      { error: `Database Retrieval Panic: ${error.message || error}` },
      { status: 500 }
    );
  }
}

//  KEEPING YOUR ORIGINAL POST LOGIC COMPLETELY INTACT:
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const inputThumbnailUrl = formData.get("thumbnailUrl") as string | null;
    const file = formData.get("documentFile") as File | null;

    if (!title || !description || !file || file.size === 0) {
      return NextResponse.json(
        { error: "Title, description, and a valid document file are required." },
        { status: 400 }
      );
    }

    const fileTypeString = file.type || "application/octet-stream";
    if (fileTypeString !== "application/pdf" && !file.name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Validation Error: Only PDF documents are allowed in this archive." },
        { status: 400 }
      );
    }

    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const storagePath = join(process.cwd(), "public", "resources", uniqueFilename);
    
    const bytes = await file.arrayBuffer();
    await writeFile(storagePath, Buffer.from(bytes));

    const publicDownloadUrl = `/resources/${uniqueFilename}`;
    const absoluteThumbnail = inputThumbnailUrl?.trim() || "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=60";

    const newResource = await prisma.resource.create({
      data: {
        title,
        description,
        category, 
        fileUrl: publicDownloadUrl,
        type: fileTypeString,
        thumbnailUrl: absoluteThumbnail,
      },
    });

    return NextResponse.json({ success: true, resource: newResource }, { status: 201 });
  } catch (error: any) {
    console.error("Resource repository upload process failed:", error);
    return NextResponse.json(
      { error: `Database/FS Engine Panic: ${error.message || error}` },
      { status: 500 }
    );
  }
}