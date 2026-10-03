import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasAdminSession } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

const allowedIcons = ["users", "book", "prayer", "calendar", "target", "megaphone"] as const;

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    if (!(await hasAdminSession(request))) {
      return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const day = typeof body.day === "string" ? body.day.trim() : "";
    const time = typeof body.time === "string" ? body.time.trim() : "";
    const icon = typeof body.icon === "string" ? body.icon : "users";

    if (!title || !day || !time) {
      return NextResponse.json({ error: "Program name, day, and time are required." }, { status: 400 });
    }
    if (!allowedIcons.includes(icon as typeof allowedIcons[number])) {
      return NextResponse.json({ error: "Choose a supported program icon." }, { status: 400 });
    }

    const program = await prisma.program.update({
      where: { id },
      data: { title, day, time, icon, isActive: body.isActive !== false },
    });
    return NextResponse.json(program);
  } catch (error) {
    console.error("Program update failed:", error);
    return NextResponse.json({ error: "Could not update the program." }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    if (!(await hasAdminSession(_request))) {
      return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
    }
    const { id } = await params;
    await prisma.program.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Program deletion failed:", error);
    return NextResponse.json({ error: "Could not delete the program." }, { status: 500 });
  }
}
