"use client";

import Icon from "@/components/Icon";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Leader {
  id: string;
  name: string;
  department: string; //  FIXED: Changed from role
  biography?: string;  //  FIXED: Changed from description
}

export default function ManageLeadersListPage() {
  const router = useRouter();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchLeaders = async () => {
    try {
      const res = await fetch("/api/leaders");
      if (!res.ok) throw new Error("Failed to load records.");
      const data = await res.json();
      setLeaders(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setMessage(`Error loading leaders: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you absolutely sure you want to remove this leader from the registry?")) return;
    setMessage("Processing deletion...");

    try {
      const res = await fetch(`/api/leaders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not execute delete command.");
      
      setMessage("Leader dropped successfully from registry.");
      setLeaders((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
        <div>
          <button 
            onClick={() => router.push("/admin/dashboard")}
            className="text-xs text-slate-500 hover:text-slate-900 font-bold mb-2 block"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Leadership Registry</h1>
        </div>
        <button 
          onClick={() => router.push("/admin/dashboard/manage-leaders")}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
        >
          + Register New Leader
        </button>
      </div>

      {message && (
        <div className="mb-4 text-center text-xs font-bold p-3 bg-slate-100 rounded-xl border border-slate-200">
          {<>{(message.includes("Success") || message.includes("successfully")) && <Icon name="check" className="inline mr-2" size={16} />}{(message.startsWith("Error") || message.startsWith("Validation")) && <Icon name="alert" className="inline mr-2" size={16} />}{message}</>}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-sm font-semibold text-slate-400 animate-pulse">
          Fetching leadership array entries...
        </div>
      ) : leaders.length === 0 ? (
        <div className="text-center py-12 text-xs text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">
          No registered leaders found in the database.
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
          {leaders.map((leader) => (
            <div key={leader.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-950">{leader.name}</h3>
                  {/*  FIXED: Reading leader.department */}
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    {leader.department}
                  </span>
                </div>
                {/*  FIXED: Reading leader.biography */}
                {leader.biography && (
                  <p className="text-slate-400 text-xs truncate max-w-xl mt-1">{leader.biography}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(leader.id)}
                className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-100 rounded-xl transition-all"
              >
                <Icon name="trash" className="inline mr-1" size={14} />Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}