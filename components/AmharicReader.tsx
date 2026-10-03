"use client";

import React, { useState, useEffect } from "react";

const AMHARIC_BOOKS = [
    { id: "ኦሪት ዘፍጥረት", name: "ኦሪት ዘፍጥረት (Genesis)" },
    { id: "ኦሪት ዘጸአት", name: "ኦሪት ዘጸአት (Exodus)" },
    { id: "ኦሪት ዘሌዋውያን", name: "ኦሪት ዘሌዋውያን (Leviticus)" },
    { id: "ኦሪት ዘኍልቍ", name: "ኦሪት ዘኍልቍ (Numbers)" },
    { id: "ኦሪት ዘዳግም", name: "ኦሪት ዘዳግም (Deuteronomy)" },
    { id: "መጽሐፈ ኢያሱ ወልደ ነዌ", name: "መጽሐፈ ኢያሱ (Joshua)" },
    { id: "መጽሐፈ መሣፍንት", name: "መጽሐፈ መሣፍንት (Judges)" },
    { id: "መጽሐፈ ሩት", name: "መጽሐፈ ሩት (Ruth)" },
    { id: "መጽሐፈ ሳሙኤል ቀዳማዊ", name: "1ኛ ሳሙኤል (1 Samuel)" },
    { id: "መጽሐፈ ሳሙኤል ካል", name: "2ኛ ሳሙኤል (2 Samuel)" },
    { id: "መጽሐፈ ነገሥት ቀዳማዊ", name: "1ኛ ነገሥት (1 Kings)" },
    { id: "መጽሐፈ ነገሥት ካልዕ", name: "2ኛ ነገሥት (2 Kings)" },
    { id: "መጽሐፈ ዜና መዋዕል ቀዳማዊ", name: "1ኛ ዜና መዋዕል (1 Chronicles)" },
    { id: "መጽሐፈ ዜና መዋዕል ካልዕ", name: "2ኛ ዜና መዋዕል (2 Chronicles)" },
    { id: "መጽሐፈ ዕዝራ", name: "መጽሐፈ ዕዝራ (Ezra)" },
    { id: "መጽሐፈ ነህምያ", name: "መጽሐፈ ነህምያ (Nehemiah)" },
    { id: "መጽሐፈ አስቴር", name: "መጽሐፈ አስቴር (Esther)" },
    { id: "መጽሐፈ ኢዮብ", name: "መጽሐፈ ኢዮብ (Job)" },
    { id: "መዝሙረ ዳዊት", name: "መዝሙረ ዳዊት (Psalms)" },
    { id: "መጽሐፈ ምሳሌ", name: "መጽሐፈ ምሳሌ (Proverbs)" },
    { id: "መጽሐፈ መክብብ", name: "መጽሐፈ መክብብ (Ecclesiastes)" },
    { id: "መኃልየ መኃልይ ዘሰሎሞን", name: "መኃልየ መኃልይ (Song of Solomon)" },
    { id: "ትንቢተ ኢሳይያስ", name: "ትንቢተ ኢሳይያስ (Isaiah)" },
    { id: "ትንቢተ ኤርምያስ", name: "ትንቢተ ኤርምያስ (Jeremiah)" },
    { id: "ሰቆቃው ኤርምያስ", name: "ሰቆቃው ኤርምያስ (Lamentations)" },
    { id: "ትንቢተ ሕዝቅኤል", name: "ትንቢተ ሕዝቅኤል (Ezekiel)" },
    { id: "ትንቢተ ዳንኤል", name: "ትንቢተ ዳንኤል (Daniel)" },
    { id: "ትንቢተ ሆሴዕ", name: "ትንቢተ ሆሴዕ (Hosea)" },
    { id: "ትንቢተ ኢዮኤል", name: "ትንቢተ ኢዮኤል (Joel)" },
    { id: "ትንቢተ አሞጽ", name: "ትንቢተ አሞጽ (Amos)" },
    { id: "ትንቢተ አብድዩ", name: "ትንቢተ አብድዩ (Obadiah)" },
    { id: "ትንቢተ ዮናስ", name: "ትንቢተ ዮናስ (Jonah)" },
    { id: "ትንቢተ ሚክያስ", name: "ትንቢተ ሚክያስ (Micah)" },
    { id: "ትንቢተ ናሆም", name: "ትንቢተ ናሆም (Nahum)" },
    { id: "ትንቢተ ዕንባቆም", name: "ትንቢተ ዕንባቆም (Habakkuk)" },
    { id: "ትንቢተ ሶፎንያስ", name: "ትንቢተ ሶፎንያስ (Zephaniah)" },
    { id: "ትንቢተ ሐጌ", name: "ትንቢተ ሐጌ (Haggai)" },
    { id: "ትንቢተ ዘካርያስ", name: "ትንቢተ ዘካርያስ (Zechariah)" },
    { id: "ትንቢተ ሚልክያ", name: "ትንቢተ ሚልክያስ (Malachi)" },
    { id: "የማቴዎስ ወንጌል", name: "የማቴዎስ ወንጌል (Matthew)" },
    { id: "የማርቆስ ወንጌል", name: "የማርቆስ ወንጌል (Mark)" },
    { id: "የሉቃስ ወንጌል", name: "የሉቃስ ወንጌል (Luke)" },
    { id: "የዮሐንስ ወንጌል", name: "የዮሐንስ ወንጌል (John)" },
    { id: "የሐዋርያት ሥራ", name: "የሐዋርያት ሥራ (Acts)" },
    { id: "ወደ ሮሜ ሰዎች", name: "ወደ ሮሜ ሰዎች (Romans)" },
    { id: "1ኛ ወደ ቆሮንቶስ ሰዎች", name: "1ኛ ወደ ቆሮንቶስ ሰዎች (1 Corinthians)" },
    { id: "2ኛ ወደ ቆሮንቶስ ሰዎች", name: "2ኛ ወደ ቆሮንቶስ ሰዎች (2 Corinthians)" },
    { id: "ወደ ገላትያ ሰዎች", name: "ወደ ገላትያ ሰዎች (Galatians)" },
    { id: "ወደ ኤፌሶን ሰዎች", name: "ወደ ኤፌሶን ሰዎች (Ephesians)" },
    { id: "ወደ ፊልጵስዩስ ሰዎች", name: "ወደ ፊልጵስዩስ ሰዎች (Philippians)" },
    { id: "ወደ ቆላስይስ ሰዎች", name: "ወደ ቆላስይስ ሰዎች (Colossians)" },
    { id: "1ኛ ወደ ተሰሎንቄ ሰዎች", name: "1ኛ ወደ ተሰሎንቄ ሰዎች (1 Thessalonians)" },
    { id: "2ኛ ወደ ተሰሎንቄ ሰዎች", name: "2ኛ ወደ ተሰሎንቄ ሰዎች (2 Thessalonians)" },
    { id: "1ኛ ወደ ጢሞቴዎስ", name: "1ኛ ወደ ጢሞቴዎስ (1 Timothy)" },
    { id: "2ኛ ወደ ጢሞቴዎስ", name: "2ኛ ወደ ጢሞቴዎስ (2 Timothy)" },
    { id: "ወደ ቲቶ", name: "ወደ ቲቶ (Titus)" },
    { id: "ወደ ፊልሞና", name: "ወደ ፊልሞና (Philemon)" },
    { id: "ወደ ዕብራውያን", name: "ወደ ዕብራውያን (Hebrews)" },
    { id: "የያዕቆብ መልእክት", name: "የያዕቆብ መልእክት (James)" },
    { id: "1ኛ የጴጥሮስ መልእክት", name: "1ኛ የጴጥሮስ መልእክት (1 Peter)" },
    { id: "2ኛ የጴጥሮስ መልእክት", name: "2ኛ የጴጥሮስ መልእክት (2 Peter)" },
    { id: "1ኛ የዮሐንስ መልእክት", name: "1ኛ የዮሐንስ መልእክት (1 John)" },
    { id: "2ኛ የዮሐንስ መልእክት", name: "2ኛ የዮሐንስ መልእክት (2 John)" },
    { id: "3ኛ የዮሐንስ መልእክት", name: "3ኛ የዮሐንስ መልእክት (3 John)" },
    { id: "የይሁዳ መልእክት", name: "የይሁዳ መልእክት (Jude)" },
    { id: "የዮሐንስ ራእይ", name: "የዮሐንስ ራእይ (Revelation)" },
];

export default function AmharicReader() {
    const [selectedBook, setSelectedBook] = useState("የዮሐንስ ወንጌል");
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    const [bookData, setBookData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch book content from the local FastAPI server
    useEffect(() => {
        async function fetchAmharicBook() {
            try {
                setLoading(true);
                setError("");
                const response = await fetch(`http://127.0.0.1:8000/book/${encodeURIComponent(selectedBook)}`);

                if (!response.ok) {
                    throw new Error("Could not reach Python API or find book data.");
                }

                const data = await response.json();
                setBookData(data);
                setSelectedChapterIndex(0); // Reset to chapter 1 when book changes
            } catch (err: any) {
                setError("FastAPI server unavailable (Ensure `python -m uvicorn main:app --reload` is running on port 8000).");
            } finally {
                setLoading(false);
            }
        }

        fetchAmharicBook();
    }, [selectedBook]);

    const currentChapter = bookData?.chapters?.[selectedChapterIndex];

    return (
        <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Header */}
            <div className="border-b border-amber-100 pb-4 mb-6 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        የአማርኛ መጽሐፍ ቅዱስ
                    </span>
                    <h2 className="text-xl font-black text-slate-900 mt-1 font-serif">
                        {selectedBook} {currentChapter ? `ምዕራፍ ${selectedChapterIndex + 1}` : ""}
                    </h2>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-md">
                    Ethiopic API Engine
                </span>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">መጽሐፍ ምረጥ (Select Book)</label>
                    <select
                        value={selectedBook}
                        onChange={(e) => setSelectedBook(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        {AMHARIC_BOOKS.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">ምዕራፍ ምረጥ (Select Chapter)</label>
                    <select
                        value={selectedChapterIndex}
                        onChange={(e) => setSelectedChapterIndex(Number(e.target.value))}
                        disabled={!bookData?.chapters?.length}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                    >
                        {bookData?.chapters?.map((_: any, idx: number) => (
                            <option key={idx} value={idx}>
                                ምዕራፍ {idx + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Content Area */}
            {error && (
                <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="py-16 text-center text-slate-400 text-sm font-semibold animate-pulse">
                    የአማርኛ ጽሑፉ በመጫን ላይ ነው...
                </div>
            ) : (
                <div className="space-y-3 font-serif text-slate-800 text-lg leading-relaxed pt-2">
                    {currentChapter?.verses?.map((verse: string, vIdx: number) => (
                        <p key={vIdx} className="hover:bg-amber-50/50 p-1.5 rounded-lg transition-colors">
                            <span className="font-bold text-amber-700 text-xs mr-2 select-none font-mono">
                                {vIdx + 1}
                            </span>
                            {verse}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}