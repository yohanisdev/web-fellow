"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Temporary logout handler until session clearing routes are added
  const handleLogout = () => {
    console.log("Logging out session...");
    router.push("/admin");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Dashboard Control Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-fellowship-blue tracking-tight">
            Control Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, Fellowship Administrator. Use the tiles below to modify portal data.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-bold border border-slate-300 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors self-start md:self-auto"
        >
          Disconnect Session
        </button>
      </div>

      {/* Main Feature Management Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Module Card 1: Feed Announcements */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
              📢
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Announcements Feed
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Publish news, event details, and spiritual alerts directly to the public home page stream.
            </p>
          </div>
          <button className="mt-6 w-full text-center text-xs font-bold bg-fellowship-blue text-white py-2.5 rounded-xl hover:bg-fellowship-blue-dark transition-colors">
            Manage Announcements
          </button>
        </div>

        {/* Module Card 2: Resource Repository */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
              📚
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Resource Repository
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Upload PDF books, digital pamphlets, and attach streaming links for video teachings.
            </p>
          </div>
          <button className="mt-6 w-full text-center text-xs font-bold bg-fellowship-blue text-white py-2.5 rounded-xl hover:bg-fellowship-blue-dark transition-colors">
            Manage Resources
          </button>
        </div>

        {/* Module Card 3: Fellowship Leaders */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4">
              👥
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Leadership Registry
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Update profiles for active or past coordinators, executive committee roles, and biographies.
            </p>
          </div>
          <button className="mt-6 w-full text-center text-xs font-bold bg-fellowship-blue text-white py-2.5 rounded-xl hover:bg-fellowship-blue-dark transition-colors">
            Manage Leaders
          </button>
        </div>

      </div>

    </div>
  );
}