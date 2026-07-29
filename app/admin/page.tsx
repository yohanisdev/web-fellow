"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  
  // State variables for input management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // 1. Dispatch data to our secure authentication route
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 2. Error Guard: Handle failed credentials or server warnings
      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // 3. On success, navigate to the dashboard core
      router.push("/admin/dashboard");
      router.refresh();

    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-fellowship-blue tracking-tight">
            JUAC Portal
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            for authorized people only
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 text-center font-medium animate-pulse">
            {errorMessage}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-fellowship-blue focus:border-fellowship-blue text-sm"
                placeholder="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-fellowship-blue focus:border-fellowship-blue text-sm"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-fellowship-blue hover:bg-fellowship-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fellowship-blue transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying Credentials..." : "Sign In"}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}