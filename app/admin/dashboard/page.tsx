"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Basic route-out for session disconnect simulation
    router.push("/admin");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 min-h-screen">
      
      {/* Dashboard Control Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Control Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, Fellowship Administrator. Use the panels below to manage site content.
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
              Publish news, prayer request bullet-points, and spiritual alerts directly to the public homepage stream.
            </p>
          </div>
          <div className="space-y-2 mt-6">
            <button 
              onClick={() => router.push("/admin/dashboard/create-post")}
              className="w-full text-center text-xs font-bold bg-slate-900 text-white py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              + Create Announcement
            </button>
            {/* 🔄 CHANGED: Directly pushes admin to the independent manage page */}
            <button 
              onClick={() => router.push("/admin/dashboard/manage-posts")}
              className="w-full text-center text-xs font-bold bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              ⚙️ Manage Announcements
            </button>
          </div>
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
              Upload PDF materials, digital bible study pamphlets, and attach streaming links for video teachings.
            </p>
          </div>
          <div className="space-y-2 mt-6">
            <button 
              onClick={() => router.push("/admin/dashboard/upload-resource")}
              className="w-full text-center text-xs font-bold bg-slate-900 text-white py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              + Upload New Material
            </button>
            {/* 🔄 CHANGED: Directly pushes admin to the independent manage page */}
            <button 
              onClick={() => router.push("/admin/dashboard/manage-resources")}
              className="w-full text-center text-xs font-bold bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              ⚙️ Manage Resources
            </button>
          </div>
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
              Update profile banners for active coordinators, executive committee members, and spiritual advisors.
            </p>
          </div>
          <div className="space-y-2 mt-6">
            <button 
              onClick={() => router.push("/admin/dashboard/manage-leaders")}
              className="w-full text-center text-xs font-bold bg-slate-900 text-white py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              + Register New Leader
            </button>
            {/* 🔄 CHANGED: Directly pushes admin to the independent manage page */}
            <button 
              onClick={() => router.push("/admin/dashboard/manage-leaders/list")}
              className="w-full text-center text-xs font-bold bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              ⚙️ Manage Leaders
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}