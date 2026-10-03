import React from "react";
import Icon from "@/components/Icon";
import { prisma } from "@/lib/prisma";

// Forces Next.js to pull fresh database records from PostgreSQL on every page request
export const dynamic = "force-dynamic";

export default async function PublicLeadersPage() {
  // Query your registered leaders directly from the database, ordered by start year
  const leaders = await prisma.leader.findMany({
    orderBy: {
      yearStarted: "desc",
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Fellowship Leaders
        </h1>
        <p className="text-slate-600 text-sm mt-2">
          Meet the dedicated team executing operational oversight and fellowship structures.
        </p>
      </div>

      {/* Conditional Rendering based on Database Records */}
      {leaders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto">
          <span className="text-4xl"><Icon name="users" size={36} /></span>
          <h3 className="mt-4 text-sm font-bold text-slate-900">Registry is empty</h3>
          <p className="mt-1 text-xs text-slate-500">
            No active leadership profiles have been committed to the database yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader) => (
            <div 
              key={leader.id} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-6 text-center hover:shadow-md transition-all duration-200 relative"
            >
              {/* Optional: Check if leader is currently active (if schema property exists) */}
              {leader.isCurrent !== false && (
                <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              )}

              {/* Profile Photo Display */}
              <div className="w-28 h-29 relative rounded-full overflow-hidden border-2 border-slate-100 shadow-inner mb-4 bg-slate-100">
                <img
                  src={leader.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60"}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Core Metadata Fields */}
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 tracking-tight">
                  {leader.name}
                </h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {leader.department}
                </p>
              
                <div className="text-[11px] font-medium text-slate-400 pt-1">
                  Serving Since: <span className="text-slate-700 font-bold">{leader.yearStarted}</span>
                </div>
              </div>

              {/* Biography Section */}
              {leader.biography && (
                <p className="text-slate-500 text-xs mt-4 line-clamp-3 border-t border-slate-100 pt-3 italic leading-relaxed w-full">
                  "{leader.biography}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}