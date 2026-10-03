"use client";

import React, { useState, useEffect } from 'react';

// Maps English abbreviations/names to the exact Amharic names the API demands
function mapApiBibleIdToName(bookId: string) {
    const map: Record<string, string> = {
        "GEN": "ኦሪት ዘፍጥረት",
        "EXO": "ኦሪት ዘጸአት",
        "LEV": "ኦሪት ዘሌዋውያን",
        "NUM": "ኦሪት ዘኍልቍ",
        "DEU": "ኦሪት ዘዳግም",
        "MAT": "የማቴዎስ ወንጌል",
        "MRK": "የማርቆስ ወንጌል",
        "LUK": "የሉቃስ ወንጌል",
        "JHN": "የዮሐንስ ወንጌል",
        "ACT": "የሐዋርያት ሥራ",
        "ROM": "ወደ ሮሜ ሰዎች",
        // Fallbacks just in case you pass the full English word
        "JOHN": "የዮሐንስ ወንጌል",
        "GENESIS": "ኦሪት ዘፍጥረት"
    };

    // Default to John if it can't find a match so the page doesn't break
    return map[bookId.toUpperCase()] || "የዮሐንስ ወንጌል";
}

export default function AmharicVerse({ book, chapter, verse }: { book: string, chapter: string, verse: string }) {
    const [verseText, setVerseText] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVerse = async () => {
            try {
                setLoading(true);
                // 1. Get the exact Amharic name
                const amharicBookName = mapApiBibleIdToName(book);

                // 2. Fetch the entire book using the correct URL from the docs
                const response = await fetch(`http://127.0.0.1:8000/book/${amharicBookName}`);

                if (!response.ok) {
                    throw new Error("Could not find the book on the Python server.");
                }

                const bookData = await response.json();

                // 3. Extract the specific chapter and verse
                // Arrays are 0-indexed, so Chapter 3 is at index 2, Verse 16 is at index 15
                const chapterIndex = parseInt(chapter) - 1;
                const verseIndex = parseInt(verse) - 1;

                if (
                    bookData.chapters &&
                    bookData.chapters[chapterIndex] &&
                    bookData.chapters[chapterIndex].verses &&
                    bookData.chapters[chapterIndex].verses[verseIndex]
                ) {
                    setVerseText(bookData.chapters[chapterIndex].verses[verseIndex]);
                } else {
                    setVerseText("ይህ ጥቅስ አልተገኘም። (Verse not found in this translation)");
                }

            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (book && chapter && verse) {
            fetchVerse();
        }
    }, [book, chapter, verse]);

    if (loading) return <div className="p-4 text-gray-500 animate-pulse">Loading Amharic text...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">
                {mapApiBibleIdToName(book)} {chapter}:{verse}
            </h3>
            <p className="text-xl text-gray-800 leading-relaxed font-serif">
                "{verseText}"
            </p>
        </div>
    );
}