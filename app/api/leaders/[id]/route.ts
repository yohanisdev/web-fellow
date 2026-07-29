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
        { error: "Missing required leader identifier ID." },
        { status: 400 }
      );
    }

    // Drop the leader row cleanly from your PostgreSQL leader table schema
    await prisma.leader.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Leader removed successfully." });
  } catch (error: any) {
    console.error("Prisma leader destruction failed:", error);
    return NextResponse.json(
      { error: `Database Drop Panic: ${error.message || error}` },
      { status: 500 }
    );
  }
}