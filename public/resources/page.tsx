import React from "react";
import Icon from "@/components/Icon";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

// Force Next.js to dynamically fetch database assets on every refresh
export const dynamic = "force-dynamic";

export default async function PublicResourcesPage() {
  // Fetch all resources safely out of PostgreSQL
  const resources = await prisma.resource.findMany({
    orderBy: {
      id: "desc", // Assuming incrementing IDs or default ordering
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Digital Resource Repository
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          Access and download shared study materials, sermon archives, and digital media records instantly.
        </p>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
          <span className="text-4xl"><Icon name="book" size={36} /></span>
          <h3 className="mt-4 text-sm font-bold text-slate-900">No resources available</h3>
          <p className="mt-1 text-xs text-slate-500">Check back later for newly published digital assets.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div 
              key={resource.id} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Resource Graphic Header */}
                <div className="relative h-44 w-full bg-slate-100">
                  <img
                    src={resource.thumbnailUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                    {resource.type.split("/")[1] || "DOC"}
                  </span>
                </div>

                {/* Info Metadata Block */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                    {resource.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </div>

              {/* Action Trigger Block */}
              <div className="px-5 pb-5 pt-2">
                <a
                  href={resource.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 text-xs rounded-xl transition-colors shadow-xs"
                >
                  <Icon name="download" className="inline mr-2" size={16} />Download Material
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}