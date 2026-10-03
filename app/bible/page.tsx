"use client";

import React, { useState, useEffect } from "react";
import { getBibleVersions, getBibleBooks, getChapterContent } from "@/lib/apiBible";
import { BibleVersion, BibleBook, BibleChapterContent } from "@/types/bible";
import BookSelector from "@/components/BookSelector";
import AmharicReader from "@/components/AmharicReader";

export default function BiblePage() {
  // --- UI Tab State ---
  // Tracks which view is currently active: "Global" or "Amharic"
  const [activeTrack, setActiveTrack] = useState<"Global" | "Amharic">("Amharic");

  // --- API.Bible States (Global Track) ---
  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [chapterContent, setChapterContent] = useState<BibleChapterContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 1. Load API.Bible Versions
  useEffect(() => {
    async function loadVersions() {
      try {
        setLoading(true);
        const availableVersions = await getBibleVersions();
        setVersions(availableVersions);
        if (availableVersions.length > 0) {
          const defaultVersion =
            availableVersions.find((v) => v.language.id === "eng" || v.abbreviation.includes("KJV")) ||
            availableVersions[0];
          setSelectedVersion(defaultVersion.id);
        }
      } catch {
        setError("Failed to load global versions from API.Bible.");
      } finally {
        setLoading(false);
      }
    }
    loadVersions();
  }, []);

  // 2. Load API.Bible Books
  useEffect(() => {
    if (!selectedVersion) return;
    async function loadBooks() {
      try {
        setLoading(true);
        const availableBooks = await getBibleBooks(selectedVersion);
        setBooks(availableBooks);
        if (availableBooks.length > 0) {
          const defaultBook = availableBooks.find((b) => b.id.includes("JHN")) || availableBooks[0];
          setSelectedBook(defaultBook.id);
          if (defaultBook.chapters && defaultBook.chapters.length > 0) {
            setSelectedChapter(defaultBook.chapters[0].id);
          }
        }
      } catch {
        setError("Failed to load books for this version.");
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [selectedVersion]);

  // 3. Load API.Bible Chapter Content
  useEffect(() => {
    if (!selectedVersion || !selectedChapter) return;
    async function loadChapterText() {
      try {
        setLoading(true);
        setError("");
        const content = await getChapterContent(selectedVersion, selectedChapter);
        setChapterContent(content);
      } catch {
        setError("Could not stream scripture text from API.Bible.");
      } finally {
        setLoading(false);
      }
    }
    loadChapterText();
  }, [selectedVersion, selectedBook, selectedChapter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 min-h-screen">

      {/* Header Area (Adapted from your Resources Page concept) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-200 mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter">
            Scripture Engine
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            ማር 4፥20... በ መልካምም መሬት የተዘሩት ቃሉን ሰምተው የሚቀበሉት...
          </p>
        </div>

        {/* Navigation Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-2xl shadow-inner">
          {["Amharic", "Global"].map((tab) => {
            const isActive = activeTrack === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTrack(tab as "Global" | "Amharic")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {tab} Track
              </button>
            );
          })}
        </div>
      </div>

      {/* TRACK 1: AMHARIC (Ethiopic API) */}
      <div className={activeTrack === "Amharic" ? "block animate-in fade-in slide-in-from-bottom-2 duration-300" : "hidden"}>
        <AmharicReader />
      </div>

      {/* TRACK 2: GLOBAL (API.Bible) */}
      <div className={activeTrack === "Global" ? "block animate-in fade-in slide-in-from-bottom-2 duration-300" : "hidden"}>
        <div className="space-y-4">
          <BookSelector
            versions={versions}
            books={books}
            selectedVersion={selectedVersion}
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            onVersionChange={(v) => setSelectedVersion(v)}
            onBookChange={(b) => {
              setSelectedBook(b);
              const chosen = books.find((x) => x.id === b);
              if (chosen?.chapters?.length) setSelectedChapter(chosen.chapters[0].id);
            }}
            onChapterChange={(c) => setSelectedChapter(c)}
          />

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm min-h-[300px] relative">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100">
                {error}
              </div>
            )}
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-3xl backdrop-blur-sm">
                <span className="text-xs text-slate-400 font-bold animate-pulse">Streaming API.Bible Data...</span>
              </div>
            ) : (
              <div>
                <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    {chapterContent?.reference || "Scripture Text"}
                  </h3>
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md">
                    Global Engine
                  </span>
                </div>
                <div
                  className="bible-html-content space-y-3 leading-relaxed text-slate-700 text-base"
                  dangerouslySetInnerHTML={{ __html: chapterContent?.content || "" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Official Digital Repository • All scripture provided is for educational and spiritual growth.
        </p>
      </div>

    </div>
  );
}