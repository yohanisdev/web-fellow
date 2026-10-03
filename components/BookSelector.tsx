import React, { useState } from 'react';
import Icon from '@/components/Icon';
import { BibleVersion, BibleBook } from '../types/bible';

interface BookSelectorProps {
  versions: BibleVersion[];
  books: BibleBook[];
  selectedVersion: string;
  selectedBook: string;
  selectedChapter: string;
  onVersionChange: (versionId: string) => void;
  onBookChange: (bookId: string) => void;
  onChapterChange: (chapterId: string) => void;
}

export default function BookSelector({
  versions,
  books,
  selectedVersion,
  selectedBook,
  selectedChapter,
  onVersionChange,
  onBookChange,
  onChapterChange,
}: BookSelectorProps) {
  
  // State to hold the version search text typed by the user
  const [versionSearch, setVersionSearch] = useState('');

  const currentBook = books.find((b) => b.id === selectedBook);

  // Filter versions based on what the user types (checks language name, version name, and abbreviation)
  const filteredVersions = versions.filter((v) => {
    const searchLower = versionSearch.toLowerCase();
    return (
      v.name.toLowerCase().includes(searchLower) ||
      v.abbreviation.toLowerCase().includes(searchLower) ||
      v.language.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 shadow rounded-lg mb-6">
      
      {/* 1. Version Selection with Search Bar built-in */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Translation / Version
        </label>
        
        {/* Simple Type-to-Filter Text Box */}
        <div className="relative mb-2">
          <Icon name="search" className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={versionSearch}
            onChange={(e) => setVersionSearch(e.target.value)}
            placeholder="Search (e.g., 'Amharic', 'KJV')..."
            className="w-full p-1.5 pl-7 text-xs border border-gray-200 rounded bg-slate-50 text-black outline-none focus:border-slate-400 font-medium"
          />
        </div>

        <select
          value={selectedVersion}
          onChange={(e) => onVersionChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-black font-medium"
        >
          {filteredVersions.length === 0 ? (
            <option disabled>No translations found</option>
          ) : (
            filteredVersions.map((v) => (
              <option key={v.id} value={v.id}>
                [{v.language.name}] {v.name}
              </option>
            ))
          )}
        </select>
        
        {/* Small count indicator so the user knows the search list changed */}
        {versionSearch && (
          <span className="text-[10px] text-slate-400 mt-1 block">
            Found {filteredVersions.length} matching versions
          </span>
        )}
      </div>

      {/* 2. Book Selection */}
      <div className="flex flex-col justify-end">
        <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
        <select
          value={selectedBook}
          onChange={(e) => onBookChange(e.target.value)}
          disabled={books.length === 0}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-black font-medium disabled:opacity-50"
        >
          {books.length === 0 ? (
            <option>Loading books...</option>
          ) : (
            books.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))
          )}
        </select>
      </div>

      {/* 3. Chapter Selection */}
      <div className="flex flex-col justify-end">
        <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
        <select
          value={selectedChapter}
          onChange={(e) => onChapterChange(e.target.value)}
          disabled={!currentBook || !currentBook.chapters}
          className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-black font-medium disabled:opacity-50"
        >
          {!currentBook ? (
            <option>Select a book first</option>
          ) : (
            currentBook.chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>Chapter {ch.number}</option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}