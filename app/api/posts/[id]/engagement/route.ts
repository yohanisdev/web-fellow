import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientKey, isCommentRateLimited, isSameOriginRequest } from "@/lib/comment-security";

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
    const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
    if (contentType !== "application/json") {
      return NextResponse.json({ error: "Send this request as JSON." }, { status: 415 });
    }
    const declaredLength = Number(request.headers.get("content-length") || 0);
    if (declaredLength > 10_000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 10_000) {
      return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    }
    const body = JSON.parse(rawBody);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
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
      if (!isSameOriginRequest(request)) {
        return NextResponse.json({ error: "Cross-origin comment requests are not allowed." }, { status: 403 });
      }
      const name = typeof body.name === "string" ? body.name.normalize("NFKC").trim() : "";
      const content = typeof body.content === "string" ? body.content.normalize("NFKC").trim() : "";
      if (!name || !content || name.length > 60 || content.length > 2000 ||
        /[\u0000-\u001f\u007f]/.test(name) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(content)) {
        return NextResponse.json({ error: "Enter a name and a comment under 2,000 characters." }, { status: 400 });
      }
      if (isCommentRateLimited(getClientKey(request))) {
        return NextResponse.json({ error: "Too many comments. Please try again in a few minutes." }, {
          status: 429,
          headers: { "Retry-After": "600" },
        });
      }
      const comment = await prisma.comment.create({ data: { postId: id, name, content } });
      return NextResponse.json({ comment }, { status: 201 });
    }

    return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }
    console.error("Announcement engagement request failed:", error);
    return NextResponse.json({ error: "Could not update this announcement." }, { status: 500 });
  }
}
