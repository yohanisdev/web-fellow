"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageLeadersPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString()); // Default to current year string
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (email && !email.toLowerCase().endsWith("@gmail.com")) {
      setStatus("❌ Validation Error: Account section only accepts native Google accounts ending with @gmail.com");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("department", department);
      formData.append("year", year);
      formData.append("role", role);
      formData.append("email", email);
      if (selectedImage) {
        formData.append("avatarFile", selectedImage);
      }

      const res = await fetch("/api/leaders", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to finalize leadership initialization record.");

      setStatus("✅ Success! Leader deployment profile committed to the system.");
      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Register Fellowship Leader</h1>
        <p className="text-slate-500 text-xs mt-1 mb-6">Deploy coordination status profiles with direct file upload asset pipelines and precise field attributes.</p>

        {status && (
          <div className="mb-6 text-center text-sm font-semibold p-3 bg-slate-50 rounded-xl border border-slate-200">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Minister John"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g., Logistics and Finance"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Operational Role</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Executive Coordinator"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Year Started Leading</label>
              <input
                type="number"
                required
                min="1900"
                max="2100"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2026"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Google Account Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="identity@gmail.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Profile Photo Upload</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-slate-900 transition-colors">
              <div className="space-y-1 text-center">
                <span className="text-2xl block">📸</span>
                <div className="flex text-sm text-slate-600">
                  <label htmlFor="avatar-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-slate-900 hover:text-slate-700 focus-within:outline-none">
                    <span>Look up image asset file</span>
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*"
                      className="sr-only" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedImage(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
                {selectedImage && (
                  <p className="text-xs bg-emerald-50 text-emerald-800 font-bold py-1 px-2 rounded-md inline-block mt-2">
                    ✓ Image Selected: {selectedImage.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="w-1/2 py-2.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2.5 text-xs font-bold bg-slate-900 text-white rounded-xl transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Streaming Media Profiles..." : "Register Leader"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}