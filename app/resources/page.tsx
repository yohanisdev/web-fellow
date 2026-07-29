import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Force Next.js to dynamically fetch database assets on every refresh
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ filter?: string }>;
}

export default async function PublicResourcesPage({ searchParams }: Props) {
  // Resolve the search params query
  const { filter } = await searchParams;

  // Default strictly to "Spiritual" if no filter is selected
  const activeFilter = filter === "Academic" ? "Academic" : "Spiritual";

  // Fetch categorized resources safely out of PostgreSQL
  const resources = await prisma.resource.findMany({
    where: {
      category: activeFilter,
    },
    orderBy: {
      id: "desc", 
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 min-h-screen">
      
      {/* Header Area */}
      <div className="flex items-center justify-between pb-8 border-b border-slate-200 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter">
            Digital Archive
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Access, read, and download verified fellowship materials instantly.
          </p>
        </div>

        {/* Navigation Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-2xl shadow-inner">
          {["Spiritual", "Academic"].map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <Link
                key={tab}
                href={`?filter=${tab}`}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab} Track
              </Link>
            );
          })}
        </div>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
          <span className="text-5xl block mb-5">📂</span>
          <h3 className="text-lg font-bold text-slate-950">Archive category empty</h3>
          <p className="mt-1 text-sm text-slate-500">
            There are currently no listed {activeFilter.toLowerCase()} resources. Check back soon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div 
              key={resource.id} 
              className={`flex items-center gap-6 p-5 rounded-2xl border border-slate-100 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-slate-100/50"
              } hover:border-slate-200 hover:bg-white`}
            >
              
              {/* 1. 🔄 LEFT SIDE: The Visual Cover (Small Scale) */}
              <div className="flex-shrink-0 relative group">
                <div className="w-20 h-28 bg-slate-200 rounded-lg overflow-hidden shadow-md border-2 border-white group-hover:shadow-lg transition-shadow">
                  <img
                    src={resource.thumbnailUrl}
                    alt={`${resource.title} Cover`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Visual vertical file-type ribbon */}
                <div className="absolute -top-1 -right-1 bg-rose-600 text-white font-black text-[9px] px-1.5 py-0.5 rounded shadow-sm">
                  PDF
                </div>
              </div>

              {/* 2. 🔄 MIDDLE: The Metadata (Info) Block */}
              <div className="flex-grow pl-2 pr-6">
                <div className="flex items-center gap-3 mb-2">
                  {/* Category Badge */}
                  <span className={`text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    resource.category === "Academic" 
                      ? "bg-blue-600" 
                      : "bg-emerald-600"
                  }`}>
                    {resource.category}
                  </span>
                  
                  <h3 className="text-xl font-extrabold text-slate-950 tracking-tight line-clamp-1">
                    {resource.title}
                  </h3>
                </div>
                
                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed max-w-3xl">
                  {resource.description}
                </p>
              </div>

              {/* 3. 🔄 RIGHT SIDE: The Action Button */}
              <div className="flex-shrink-0 w-44 pl-6 border-l border-slate-200">
                <a
                  href={resource.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 text-xs rounded-xl transition-colors shadow-sm"
                >
                  <span className="text-sm">📥</span>
                  Download PDF
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Footer tagline */}
      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Official Digital Repository • All resources provided are for educational and spiritual growth.
        </p>
      </div>
    </div>
  );
}