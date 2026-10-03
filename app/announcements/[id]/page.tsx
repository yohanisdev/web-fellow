import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AnnouncementDetails from "@/components/AnnouncementDetails";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findFirst({ where: { id, isPublished: true }, select: { title: true, content: true } });
  if (!post) return { title: "Announcement not found" };
  return { title: post.title || "Fellowship Announcement", description: post.content.slice(0, 160) };
}

export default async function AnnouncementPage({ params }: Params) {
  const { id } = await params;
  const post = await prisma.post.findFirst({
    where: { id, isPublished: true },
    include: {
      _count: { select: { likes: true } },
      comments: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-5 sm:p-8 lg:p-10">
          <Link href="/#announcements-heading" className="text-sm font-semibold text-fellowship-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">← All announcements</Link>
          {post.title && <h1 className="mt-6 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">{post.title}</h1>}
          <time dateTime={post.createdAt.toISOString()} className="mt-3 block text-sm text-slate-500">Posted on {post.createdAt.toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
          {post.mediaUrl && <img src={post.mediaUrl} alt={post.title ? `Image for ${post.title}` : "Fellowship announcement"} className="mt-7 max-h-[32rem] w-full rounded-xl bg-slate-100 object-cover" />}
          <div className="mt-7 whitespace-pre-line break-words text-base leading-8 text-slate-700">{post.content}</div>
          <AnnouncementDetails postId={post.id} initialViews={post.views} initialLikes={post._count.likes} initialComments={post.comments} />
        </div>
      </article>
    </main>
  );
}
