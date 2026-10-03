"use client";

import Icon from "@/components/Icon";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadResourcePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  
  //  CHANGED: Updated default value to match our new strict categories
  const [category, setCategory] = useState("Spiritual"); 
  
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(""); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Extra frontend safety check to enforce PDFs only
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.endsWith(".pdf")) {
      setStatusMessage("Error: Only PDF files are allowed.");
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("thumbnailUrl", thumbnailUrl); 
      formData.append("documentFile", selectedFile);

      const res = await fetch("/api/resources", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to commit resource asset.");

      setStatusMessage("Success! Document added to the digital repository.");
      
      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 1500);

    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Upload Fellowship Resource</h1>
        <p className="text-slate-500 text-xs mt-1 mb-6">Distribute PDF books, pamphlets, or study guidelines safely to students.</p>

        {statusMessage && (
          <div className="mb-6 text-center text-sm font-semibold p-3 bg-slate-50 rounded-xl border border-slate-200">
            {<>{(statusMessage.includes("Success") || statusMessage.includes("successfully")) && <Icon name="check" className="inline mr-2" size={16} />}{(statusMessage.startsWith("Error") || statusMessage.startsWith("Validation")) && <Icon name="alert" className="inline mr-2" size={16} />}{statusMessage}</>}
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Resource Title Name</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Romans Study Guide Vol 1"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fellowship-blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Classification Category</label>
              {/*  CHANGED: Category options are now strictly Academic or Spiritual */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fellowship-blue"
              >
                <option value="Spiritual">Spiritual</option>
                <option value="Academic">Academic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Card Thumbnail Image Link (Optional)</label>
              <input
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fellowship-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brief Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief text introduction to this layout resource."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fellowship-blue"
            />
          </div>

          <div>
            {/*  CHANGED: Text updated to specify PDF only */}
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Document File (PDF Only)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-fellowship-blue transition-colors">
              <div className="space-y-1 text-center">
                <span className="text-2xl block"><Icon name="file" /></span>
                <div className="flex text-sm text-slate-600">
                  <label htmlFor="doc-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-fellowship-blue hover:text-fellowship-blue-dark focus-within:outline-none">
                    <span>Click to look up document archive</span>
                    <input 
                      id="doc-upload" 
                      type="file" 
                      //  CHANGED: Restricts system file picker to only display PDF files
                      accept="application/pdf"
                      className="sr-only" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                {selectedFile && (
                  <p className="text-xs bg-amber-50 text-amber-800 font-bold py-1 px-2 rounded-md inline-block mt-2">
                    <Icon name="paperclip" className="inline mr-1" size={14} />File Ready: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
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
              disabled={loading || !selectedFile}
              className="w-1/2 py-2.5 text-xs font-bold bg-fellowship-blue hover:bg-fellowship-blue-dark text-white rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? "Streaming Document Asset..." : "Commit Document File"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}