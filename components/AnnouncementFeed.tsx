"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface Announcement {
  id: string;
  title: string | null;
  content: string;
  mediaUrl: string | null;
  createdAt: string | Date;
  views: number;
  _count: { likes: number; comments: number };
}

function visitorId() {
  const key = "fellowship-visitor-id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = window.crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export default function AnnouncementFeed({ posts }: { posts: Announcement[] }) {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const visiblePosts = showAll ? posts : posts.slice(0, 2);

  useEffect(() => {
    if (visiblePosts.length === 0) return;
    const id = visitorId();
    Promise.all(visiblePosts.map(async (post) => {
      try {
        const response = await fetch(`/api/posts/${post.id}/engagement?visitorId=${encodeURIComponent(id)}`);
        if (!response.ok) return null;
        const data = await response.json();
        return { postId: post.id, liked: data.liked, likes: data.likes };
      } catch {
        return null;
      }
    })).then((results) => {
      setLiked((current) => ({ ...current, ...Object.fromEntries(results.filter(Boolean).map((item) => [item!.postId, item!.liked])) }));
      setLikes((current) => ({ ...current, ...Object.fromEntries(results.filter(Boolean).map((item) => [item!.postId, item!.likes])) }));
    });
  }, [showAll, posts]);

  async function toggleLike(id: string) {
    try {
      const response = await fetch(`/api/posts/${id}/engagement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", visitorId: visitorId() }),
      });
      if (!response.ok) return;
      const data = await response.json();
      setLikes((current) => ({ ...current, [id]: data.likes }));
      setLiked((current) => ({ ...current, [id]: data.liked }));
    } catch { /* Keep the feed usable if the network is unavailable. */ }
  }

  return (
    <section aria-labelledby="announcements-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
      <div className="mb-7 sm:mb-9">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-fellowship-blue/70 mb-2">Stay connected</p>
        <h2 id="announcements-heading" className="text-2xl sm:text-3xl font-bold text-fellowship-blue tracking-tight flex items-center gap-3">
          <span aria-hidden="true" className="w-1.5 h-8 sm:h-9 bg-fellowship-gold rounded-full shrink-0" />
          Latest Announcements &amp; Fellowship Updates
        </h2>
      </div>

      {posts.length === 0 ? (
        <div className="text-center px-5 py-12 sm:py-16 bg-white border border-dashed border-slate-300 rounded-2xl">
          <p className="text-slate-700 font-semibold">No updates posted yet.</p>
          <p className="text-sm text-slate-500 mt-2">Check back soon for fellowship news and updates.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8">
            {visiblePosts.map((post) => {
              const isExpanded = expanded.includes(post.id);
              const needsExpansion = post.content.length > 260;
              return (
                <article key={post.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col">
                  {post.mediaUrl && <Link href={`/announcements/${post.id}`} aria-label={`Open ${post.title || "announcement"}`} className="block aspect-[16/9] overflow-hidden bg-slate-100">
                    <img src={post.mediaUrl} alt={post.title ? `Image for ${post.title}` : "Fellowship announcement"} loading="lazy" className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.02]" />
                  </Link>}
                  <div className="p-5 sm:p-6 flex-grow flex flex-col">
                    {post.title && <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug break-words"><Link href={`/announcements/${post.id}`} className="hover:text-fellowship-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{post.title}</Link></h3>}
                    <p className={`text-slate-600 text-sm sm:text-base whitespace-pre-line leading-7 break-words ${needsExpansion && !isExpanded ? "line-clamp-5" : ""}`}>{post.content}</p>
                    {needsExpansion && <button type="button" onClick={() => setExpanded((current) => isExpanded ? current.filter((id) => id !== post.id) : [...current, post.id])} className="self-start mt-2 text-sm font-semibold text-fellowship-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{isExpanded ? "Show less" : "See more"}</button>}
                    <time dateTime={new Date(post.createdAt).toISOString()} className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">Posted on {new Date(post.createdAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
                      <button type="button" onClick={() => toggleLike(post.id)} aria-pressed={liked[post.id] ?? false} className={`font-semibold hover:text-fellowship-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${liked[post.id] ? "text-fellowship-blue" : ""}`}>
                        {liked[post.id] ? "♥ Liked" : "♡ Like"} <span className="font-normal">{likes[post.id] ?? post._count.likes}</span>
                      </button>
                      <Link href={`/announcements/${post.id}#comments`} className="hover:text-fellowship-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Comment <span>({post._count.comments})</span></Link>
                      <span aria-label={`${post.views} views`}>◉ {post.views} views</span>
                    </div>
                    <Link href={`/announcements/${post.id}`} className="mt-4 self-start text-sm font-bold text-fellowship-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Read announcement →</Link>
                  </div>
                </article>
              );
            })}
          </div>
          {posts.length > 2 && <div className="mt-8 text-center">
            <button type="button" onClick={() => setShowAll((value) => !value)} aria-expanded={showAll} className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm hover:border-fellowship-blue hover:text-fellowship-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              {showAll ? "Show fewer announcements" : `See more announcements (${posts.length - 2})`}
            </button>
          </div>}
        </>
      )}
    </section>
  );
}
