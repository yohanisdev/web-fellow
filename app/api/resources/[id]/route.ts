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
        { error: "Missing required resource tracking ID." },
        { status: 400 }
      );
    }

    // Erase the corresponding record out of PostgreSQL
    await prisma.resource.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Resource successfully deleted." });
  } catch (error: any) {
    console.error("Prisma record destruction failed:", error);
    return NextResponse.json(
      { error: `Database Drop Panic: ${error.message || error}` },
      { status: 500 }
    );
  }
}