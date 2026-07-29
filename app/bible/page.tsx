"use client";

import React, { useState, useEffect } from "react";
import { getBibleVersions, getBibleBooks, getChapterContent } from "@/lib/apiBible";
import { BibleVersion, BibleBook, BibleChapterContent } from "@/types/bible";
import BookSelector from "@/components/BookSelector";

export default function BibleReaderPage() {
  // Lists fetched dynamically from API.Bible
  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [books, setBooks] = useState<BibleBook[]>([]);
  
  // Selection States
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  
  // Content and Loading states
  const [chapterContent, setChapterContent] = useState<BibleChapterContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 1. Initial Load: Fetch all available Bible versions/translations
  useEffect(() => {
    async function loadVersions() {
      try {
        setLoading(true);
        const availableVersions = await getBibleVersions();
        setVersions(availableVersions);

        if (availableVersions.length > 0) {
          // Default to Amharic or English if present, otherwise pick the first option
          const defaultVersion = 
            availableVersions.find(v => v.language.id === "am" || v.language.name.includes("Amharic")) ||
            availableVersions.find(v => v.language.id === "eng" || v.abbreviation.includes("KJV")) ||
            availableVersions[0];

          setSelectedVersion(defaultVersion.id);
        }
      } catch (err) {
        setError("Failed to load Bible. Check your Internet connection.");
        setLoading(false);
      }
    }
    loadVersions();
  }, []);

  // 2. Fetch Books whenever the selected Bible version changes
  useEffect(() => {
    if (!selectedVersion) return;

    async function loadBooks() {
      try {
        setLoading(true);
        const availableBooks = await getBibleBooks(selectedVersion);
        setBooks(availableBooks);

        if (availableBooks.length > 0) {
          const defaultBook = availableBooks.find(b => b.id.includes("JHN")) || availableBooks[0];
          setSelectedBook(defaultBook.id);

          if (defaultBook.chapters && defaultBook.chapters.length > 0) {
            setSelectedChapter(defaultBook.chapters[0].id);
          }
        }
      } catch (err) {
        setError("Failed to load books for this version.");
        setLoading(false);
      }
    }
    loadBooks();
  }, [selectedVersion]);

  // 3. Fetch Chapter Text Content whenever version, book, or chapter adjustments happen
  useEffect(() => {
    if (!selectedVersion || !selectedChapter) return;

    async function loadChapterText() {
      try {
        setLoading(true);
        setError("");
        const content = await getChapterContent(selectedVersion, selectedChapter);
        setChapterContent(content);
      } catch (err) {
        setError("Could not stream scripture text. The API might be missing text for this specific chapter.");
      } finally {
        setLoading(false);
      }
    }
    loadChapterText();
  }, [selectedVersion, selectedBook, selectedChapter]);

  // Handler helpers when user changes values in the dropdown
  const handleVersionChange = (versionId: string) => {
    setSelectedVersion(versionId);
  };

  const handleBookChange = (bookId: string) => {
    setSelectedBook(bookId);
    const chosenBook = books.find(b => b.id === bookId);
    if (chosenBook && chosenBook.chapters && chosenBook.chapters.length > 0) {
      setSelectedChapter(chosenBook.chapters[0].id);
    }
  };

  const handleChapterChange = (chapterId: string) => {
    setSelectedChapter(chapterId);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 antialiased text-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Block */}
        <div className="text-center mb-8">
          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Read Bible
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
            Scripture Engine Dashboar 
          </h1>
          <p className="text-slate-500 text-xs">ማር 4፧20...  በ መልካምም መረት የተዘሩት ቃሉን ሰምተው የሚቀበሉት አንዱም ሠላሳ አንዱም ስድሳ አንዱም መቶ ፍሬ የሚያፈሩት እነዝህ ናቸው ። </p>
        </div>

        {/* Modular Selector Component */}
        <BookSelector
          versions={versions}
          books={books}
          selectedVersion={selectedVersion}
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          onVersionChange={handleVersionChange}
          onBookChange={handleBookChange}
          onChapterChange={handleChapterChange}
        />

        {/* Content Viewer Layout */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm min-h-[300px] relative">
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}

          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-3xl">
              <span className="text-xs text-slate-400 font-bold animate-pulse">Streaming Scripture Data...</span>
            </div>
          ) : (
            <div>
              <div className="border-b border-slate-100 pb-4 mb-6 flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {chapterContent?.reference || "Scripture Text"}
                </h2>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md">
                  Active Connection
                </span>
              </div>

              {/* API.Bible returns clean HTML markup text. We style the inner elements gracefully. */}
              <div 
                className="bible-html-content space-y-4 leading-relaxed text-slate-700 text-base"
                dangerouslySetInnerHTML={{ __html: chapterContent?.content || "" }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}