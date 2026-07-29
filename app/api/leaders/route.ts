import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

// 🔽 ADDED: GET handler to pull leaders for your management list page
export async function GET(request: NextRequest) {
  try {
    const leaders = await prisma.leader.findMany({
      orderBy: { id: "desc" }, // Sort by newest registered
    });
    return NextResponse.json(leaders);
  } catch (error: any) {
    console.error("Leadership fetch engine failed:", error);
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
    
    const name = formData.get("name") as string;
    const department = formData.get("department") as string;
    const yearString = formData.get("year") as string;
    const email = formData.get("email") as string; 
    const avatarFile = formData.get("avatarFile") as File | null;
    const bioText = (formData.get("biograph") as string) || "";

    if (!name || !department || !yearString) {
      return NextResponse.json(
        { error: "Name, Department, and Year Started are required properties." },
        { status: 400 }
      );
    }

    const startYear = parseInt(yearString, 10);
    if (isNaN(startYear)) {
      return NextResponse.json(
        { error: "Validation Error: Year must be a valid numeric value." },
        { status: 400 }
      );
    }

    if (email && !email.toLowerCase().endsWith("@gmail.com")) {
      return NextResponse.json(
        { error: "Access Rejected: Account email registration must be a valid Google account (e.g., identity@gmail.com)." },
        { status: 400 }
      );
    }

    let localPhotoUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60";

    if (avatarFile && avatarFile.size > 0) {
      const uniqueFilename = `${Date.now()}-${avatarFile.name.replace(/\s+/g, "-")}`;
      const storagePath = join(process.cwd(), "public", "leaders", uniqueFilename);
      
      const bytes = await avatarFile.arrayBuffer();
      await writeFile(storagePath, Buffer.from(bytes));
      
      localPhotoUrl = `/leaders/${uniqueFilename}`;
    }

    const newLeader = await prisma.leader.create({
      data: {
        name,
        department,
        photoUrl: localPhotoUrl,
        yearStarted: startYear,
        yearEnded: 0, 
        biography: bioText,
      },
    });

    return NextResponse.json({ success: true, leader: newLeader }, { status: 201 });
  } catch (error: any) {
    console.error("Leadership registry deployment engine panic:", error);
    return NextResponse.json(
      { error: `Database/FS Engine Panic: ${error.message || error}` },
      { status: 500 }
    );
  }
}