import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required post tracking ID." },
        { status: 400 }
      );
    }

    // 🌟 Wipes the record out of your prisma.post model layout table
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Post successfully deleted." });
  } catch (error: any) {
    console.error("Prisma post destruction failed:", error);
    return NextResponse.json(
      { error: `Database Drop Panic: ${error.message || error}` },
      { status: 500 }
    );
  }
}