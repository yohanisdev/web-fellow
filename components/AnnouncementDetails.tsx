"use client";

import { FormEvent, useEffect, useState } from "react";

type Comment = { id: string; name: string; content: string; createdAt: string | Date };
type Props = { postId: string; initialViews: number; initialLikes: number; initialComments: Comment[] };

function getVisitorId() {
  const key = "fellowship-visitor-id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = window.crypto.randomUUID();
    window.localStorage.setItem(key, id);
  }
  return id;
}

export default function AnnouncementDetails({ postId, initialViews, initialLikes, initialComments }: Props) {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const visitorId = getVisitorId();
    fetch(`/api/posts/${postId}/engagement?visitorId=${encodeURIComponent(visitorId)}`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data) return;
        setViews(data.views);
        setLikes(data.likes);
        setLiked(data.liked);
      }).catch(() => undefined);

    const seenKey = `fellowship-post-viewed-${postId}`;
    if (!window.sessionStorage.getItem(seenKey)) {
      window.sessionStorage.setItem(seenKey, "1");
      fetch(`/api/posts/${postId}/engagement`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "view" }),
      }).then((response) => response.ok ? response.json() : null).then((data) => {
        if (data) setViews(data.views);
      }).catch(() => undefined);
    }
  }, [postId]);

  async function toggleLike() {
    const response = await fetch(`/api/posts/${postId}/engagement`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "like", visitorId: getVisitorId() }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not update like.");
    setLiked(data.liked);
    setLikes(data.likes);
  }

  async function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/posts/${postId}/engagement`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "comment", name, content }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not post your comment.");
      setComments((current) => [data.comment, ...current]);
      setContent("");
      setMessage("Your comment has been posted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not post your comment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-5 border-y border-slate-200 py-4 text-sm text-slate-600">
        <button type="button" onClick={() => toggleLike().catch((error) => setMessage(error.message))} aria-pressed={liked} className="font-semibold hover:text-fellowship-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          {liked ? "♥ Liked" : "♡ Like"} <span className="font-normal">{likes}</span>
        </button>
        <a href="#comments" className="hover:text-fellowship-blue">Comments ({comments.length})</a>
        <span aria-label={`${views} views`}>◉ {views} views</span>
      </div>

      <section id="comments" aria-labelledby="comments-heading" className="mt-10">
        <h2 id="comments-heading" className="text-xl font-bold text-slate-900">Comments <span className="text-slate-500">({comments.length})</span></h2>
        <form onSubmit={addComment} className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <label htmlFor="comment-name" className="block text-sm font-semibold text-slate-700">Your name</label>
          <input id="comment-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} required className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          <label htmlFor="comment-content" className="mt-4 block text-sm font-semibold text-slate-700">Join the conversation</label>
          <textarea id="comment-content" value={content} onChange={(event) => setContent(event.target.value)} maxLength={2000} rows={4} required className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100" />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="text-sm text-slate-600">{message}</p>
            <button type="submit" disabled={busy} className="rounded-xl bg-fellowship-blue px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Posting…" : "Post comment"}</button>
          </div>
        </form>
        <div className="mt-6 space-y-4">
          {comments.length === 0 ? <p className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">No comments yet. Start the conversation.</p> : comments.map((comment) => (
            <article key={comment.id} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-semibold text-slate-900">{comment.name}</h3>
                <time dateTime={new Date(comment.createdAt).toISOString()} className="text-xs text-slate-500">{new Date(comment.createdAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}</time>
              </div>
              <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-700">{comment.content}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
