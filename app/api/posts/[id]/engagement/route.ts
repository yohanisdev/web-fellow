import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const visitorId = request.nextUrl.searchParams.get("visitorId") ?? "";
  const post = await prisma.post.findFirst({
    where: { id, isPublished: true },
    select: { id: true, views: true, _count: { select: { likes: true, comments: true } } },
  });
  if (!post) return NextResponse.json({ error: "Announcement not found." }, { status: 404 });

  const liked = visitorId
    ? Boolean(await prisma.postLike.findUnique({ where: { postId_visitorId: { postId: id, visitorId } }, select: { id: true } }))
    : false;
  return NextResponse.json({ views: post.views, likes: post._count.likes, comments: post._count.comments, liked });
}

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const post = await prisma.post.findFirst({ where: { id, isPublished: true }, select: { id: true } });
    if (!post) return NextResponse.json({ error: "Announcement not found." }, { status: 404 });

    if (body.action === "view") {
      const updated = await prisma.post.update({ where: { id }, data: { views: { increment: 1 } }, select: { views: true } });
      return NextResponse.json({ views: updated.views });
    }

    if (body.action === "like") {
      const visitorId = typeof body.visitorId === "string" ? body.visitorId.slice(0, 80) : "";
      if (!visitorId) return NextResponse.json({ error: "A browser visitor ID is required." }, { status: 400 });
      const key = { postId_visitorId: { postId: id, visitorId } };
      const existing = await prisma.postLike.findUnique({ where: key, select: { id: true } });
      if (existing) await prisma.postLike.delete({ where: key });
      else await prisma.postLike.create({ data: { postId: id, visitorId } });
      return NextResponse.json({ liked: !existing, likes: await prisma.postLike.count({ where: { postId: id } }) });
    }

    if (body.action === "comment") {
      const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";
      const content = typeof body.content === "string" ? body.content.trim() : "";
      if (!name || !content || content.length > 2000) {
        return NextResponse.json({ error: "Enter a name and a comment under 2,000 characters." }, { status: 400 });
      }
      const comment = await prisma.comment.create({ data: { postId: id, name, content } });
      return NextResponse.json({ comment }, { status: 201 });
    }

    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  } catch (error) {
    console.error("Announcement engagement request failed:", error);
    return NextResponse.json({ error: "Could not update this announcement." }, { status: 500 });
  }
}
