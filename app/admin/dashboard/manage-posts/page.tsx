"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string; // ✅ Properly mapped to match your Prisma model field
}

export default function ManagePostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Failed to load records from backend api.");
      const data = await res.json();
      setPosts(data);
    } catch (err: any) {
      setMessage(`❌ Error loading posts: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this announcement?")) return;
    setMessage("Processing deletion...");

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not execute delete command.");
      
      setMessage("✅ Post deleted successfully.");
      setPosts((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
        <div>
          <button 
            onClick={() => router.push("/admin/dashboard")}
            className="text-xs text-slate-500 hover:text-slate-900 font-bold mb-2 block"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Announcements</h1>
        </div>
        <button 
          onClick={() => router.push("/admin/dashboard/create-post")}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
        >
          + Create Announcement
        </button>
      </div>

      {message && (
        <div className="mb-4 text-center text-xs font-bold p-3 bg-slate-100 rounded-xl border border-slate-200">
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-sm font-semibold text-slate-400 animate-pulse">
          Fetching content feed arrays...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-xs text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">
          No announcements found in the database.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="max-w-2xl">
                <h3 className="text-sm font-bold text-slate-950">{post.title}</h3>
                {/* 🌟 FIXED: Changed post.description to post.content */}
                <p className="text-slate-400 text-xs truncate mt-1">{post.content}</p>
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-100 rounded-xl transition-all"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}