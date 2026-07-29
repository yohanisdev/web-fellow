// components/BibleSelectors.tsx
import React from 'react';
import { BibleVersion, BibleBook } from '../types/bible';

interface BibleSelectorsProps {
  versions: BibleVersion[];
  books: BibleBook[];
  selectedVersion: string;
  selectedBook: string;
  selectedChapter: string;
  onVersionChange: (versionId: string) => void;
  onBookChange: (bookId: string) => void;
  onChapterChange: (chapterId: string) => void;
}

export default function BibleSelectors({
  versions,
  books,
  selectedVersion,
  selectedBook,
  selectedChapter,
  onVersionChange,
  onBookChange,
  onChapterChange,
}: BibleSelectorsProps) {
  
  // Find the currently selected book to extract its chapters list
  const currentBook = books.find((b) => b.id === selectedBook);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 shadow rounded-lg mb-6">
      
      {/* 1. Version Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Translation / Version</label>
        <select
          value={selectedVersion}
          onChange={(e) => onVersionChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-black"
        >
          {versions.map((v) => (
            <option key={v.id} value={v.id}>
              [{v.language.name}] {v.name} ({v.abbreviation})
            </option>
          ))}
        </select>
      </div>

      {/* 2. Book Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
        <select
          value={selectedBook}
          onChange={(e) => onBookChange(e.target.value)}
          disabled={books.length === 0}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-black disabled:opacity-50"
        >
          {books.length === 0 ? (
            <option>Loading books...</option>
          ) : (
            books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))
          )}
        </select>
      </div>

      {/* 3. Chapter Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
        <select
          value={selectedChapter}
          onChange={(e) => onChapterChange(e.target.value)}
          disabled={!currentBook || !currentBook.chapters}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-black disabled:opacity-50"
        >
          {!currentBook ? (
            <option>Select a book first</option>
          ) : (
            currentBook.chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                Chapter {ch.number}
              </option>
            ))
          )}
        </select>
      </div>

    </div>
  );
}