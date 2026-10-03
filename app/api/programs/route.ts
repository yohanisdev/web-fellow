import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasAdminSession } from "@/lib/auth";

const allowedIcons = ["users", "book", "prayer", "calendar", "target", "megaphone"] as const;

export async function GET(request: NextRequest) {
  try {
    const includeInactive = new URL(request.url).searchParams.get("all") === "true";
    if (includeInactive && !(await hasAdminSession(request))) {
      return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
    }
    const programs = await prisma.program.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json(programs);
  } catch (error) {
    console.error("Program retrieval failed:", error);
    const errorCode = (error as { code?: string })?.code;
    const message = errorCode === "P2021"
      ? "The Program table is missing. Apply the pending Prisma migrations, then reload this page."
      : "Could not load programs.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await hasAdminSession(request))) {
      return NextResponse.json({ error: "Administrator sign-in required." }, { status: 401 });
    }
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

    const lastProgram = await prisma.program.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    const program = await prisma.program.create({
      data: { title, day, time, icon, sortOrder: (lastProgram?.sortOrder ?? -1) + 1 },
    });
    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error("Program creation failed:", error);
    return NextResponse.json({ error: "Could not save the program." }, { status: 500 });
  }
}
