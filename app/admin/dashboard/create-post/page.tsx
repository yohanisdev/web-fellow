"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      // Pack text elements and raw binary files into a standard submission container
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      
      if (selectedFile) {
        formData.append("imageFile", selectedFile);
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData, // Do NOT specify headers here; browser applies multi-part boundaries automatically
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to compile post metadata.");

      setStatusMessage("✅ Success! Announcement published with image attachment.");
      
      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 1500);

    } catch (err: any) {
      setStatusMessage(`❌ Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">New Announcement</h1>
        <p className="text-slate-500 text-xs mt-1 mb-6">Broadcast updates with native image attachment support.</p>

        {statusMessage && (
          <div className="mb-6 text-center text-sm font-semibold p-3 bg-slate-50 rounded-xl border border-slate-200">
            {statusMessage}
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Weekly Prayer Summit Locations"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fellowship-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Upload Layout Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-fellowship-blue transition-colors">
              <div className="space-y-1 text-center">
                <span className="text-2xl block">🖼️</span>
                <div className="flex text-sm text-slate-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-fellowship-blue hover:text-fellowship-blue-dark focus-within:outline-none">
                    <span>Select a file from your computer</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      accept="image/*"
                      className="sr-only" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-400">PNG, JPG, or GIF up to 10MB</p>
                {selectedFile && (
                  <p className="text-xs bg-emerald-50 text-emerald-700 font-bold py-1 px-2 rounded-md inline-block mt-2">
                    📂 Target Attachment: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message Body Content</label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write out the comprehensive fellowship notice..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fellowship-blue whitespace-pre-wrap"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="w-1/2 py-2.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2.5 text-xs font-bold bg-fellowship-blue hover:bg-fellowship-blue-dark text-white rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? "Streaming Upload..." : "Publish Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}