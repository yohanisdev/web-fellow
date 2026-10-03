"use client";

import Icon, { type IconName } from "@/components/Icon";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Program {
  id: string;
  title: string;
  day: string;
  time: string;
  icon: IconName;
  isActive: boolean;
}

const iconOptions: { value: IconName; label: string }[] = [
  { value: "users", label: "Fellowship" },
  { value: "book", label: "Bible study" },
  { value: "prayer", label: "Prayer" },
  { value: "calendar", label: "Calendar" },
  { value: "target", label: "Target" },
  { value: "megaphone", label: "Announcement" },
];

const emptyForm = { title: "", day: "", time: "", icon: "users" as IconName, isActive: true };

export default function ManageProgramsPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPrograms = async () => {
    try {
      const response = await fetch("/api/programs?all=true");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load the program schedule.");
      setPrograms(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load the program schedule.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPrograms();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(editingId ? `/api/programs/${editingId}` : "/api/programs", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save the program.");
      setMessage(editingId ? "Program updated." : "Program added.");
      resetForm();
      await fetchPrograms();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save the program.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (program: Program) => {
    setEditingId(program.id);
    setForm({ title: program.title, day: program.day, time: program.time, icon: program.icon, isActive: program.isActive });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActive = async (program: Program) => {
    try {
      const response = await fetch(`/api/programs/${program.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...program, isActive: !program.isActive }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update program visibility.");
      setPrograms((current) => current.map((item) => item.id === program.id ? data : item));
      setMessage(data.isActive ? "Program is now visible on the home page." : "Program hidden from the home page.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update program visibility.");
    }
  };

  const deleteProgram = async (program: Program) => {
    if (!window.confirm(`Delete “${program.title}” from the schedule?`)) return;
    try {
      const response = await fetch(`/api/programs/${program.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not delete the program.");
      setPrograms((current) => current.filter((item) => item.id !== program.id));
      if (editingId === program.id) resetForm();
      setMessage("Program deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete the program.");
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
      <header className="mb-7 border-b border-slate-200 pb-5">
        <button onClick={() => router.push("/admin/dashboard")} className="mb-2 block text-xs font-bold text-slate-500 hover:text-slate-900">
          ← Back to Dashboard
        </button>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Manage Weekly Programs</h1>
        <p className="mt-1 text-sm text-slate-500">Changes here update the program schedule on the home page.</p>
      </header>

      {message && <p role="status" className="mb-5 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">{editingId ? "Edit program" : "Add a program"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-bold text-slate-700">
            Program name
            <input required maxLength={100} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. General Fellowship" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-fellowship-blue focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="text-xs font-bold text-slate-700">
            Day
            <input required maxLength={40} value={form.day} onChange={(event) => setForm({ ...form, day: event.target.value })} placeholder="e.g. Friday" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-fellowship-blue focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="text-xs font-bold text-slate-700">
            Time
            <input required maxLength={40} value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} placeholder="e.g. 12:00 LT" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-fellowship-blue focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="text-xs font-bold text-slate-700">
            Icon
            <select value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value as IconName })} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-fellowship-blue focus:ring-2 focus:ring-blue-100">
              {iconOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
        <label className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} className="h-4 w-4 rounded border-slate-300 text-fellowship-blue focus:ring-fellowship-blue" />
          Show this program on the home page
        </label>
        <div className="mt-5 flex gap-3">
          <button disabled={saving} type="submit" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50">
            {saving ? "Saving…" : editingId ? "Save changes" : "Add program"}
          </button>
          {editingId && <button type="button" onClick={resetForm} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>}
        </div>
      </form>

      <section aria-labelledby="program-list-heading">
        <h2 id="program-list-heading" className="mb-3 text-lg font-bold text-slate-900">Current schedule</h2>
        {loading ? <p className="py-10 text-center text-sm text-slate-500">Loading programs…</p> : programs.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">No programs yet. Add one above to show it on the home page.</p>
        ) : (
          <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {programs.map((program) => (
              <article key={program.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-fellowship-blue"><Icon name={program.icon} /></span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900">{program.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${program.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                        {program.isActive ? "Visible" : "Hidden"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{program.day} · {program.time}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => toggleActive(program)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                    {program.isActive ? "Hide" : "Show"}
                  </button>
                  <button type="button" onClick={() => startEditing(program)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">Edit</button>
                  <button type="button" onClick={() => deleteProgram(program)} aria-label={`Delete ${program.title}`} className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100"><Icon name="trash" size={16} /></button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
