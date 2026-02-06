"use client";

import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import type Member from "@/types/Member";

type TeamMemberData = Member & { id: string; createdAt?: string; order?: string };

export default function Page() {
  const [members, setMembers] = useState<TeamMemberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<TeamMemberData | null>(null);

  const [form, setForm] = useState({ image: "", name: "", role: "", bio: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/team", { credentials: "include" });
        const data = await res.json();
        setMembers(data.team ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFile = async (f: File | null) => {
    if (!f) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((p) => ({ ...p, image: data.url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `/api/admin/team?id=${editing.id}` : "/api/admin/team";
      const payload = editing ? form : { ...form, order: String(members.length) };
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      const saved = data.member ?? data;
      if (editing) setMembers((p) => p.map((x) => (x.id === editing.id ? saved : x)));
      else setMembers((p) => [...p, saved]);
      setEditing(null);
      setForm({ image: "", name: "", role: "", bio: "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save error");
    }
  };

  const handleEdit = (m: TeamMemberData) => { setEditing(m); setForm({ image: m.image ?? "", name: m.name ?? "", role: m.role ?? "", bio: m.bio ?? "" }); };
  const handleDelete = async (id: string) => { if (!confirm("Delete this member?")) return; try { const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE", credentials: "include" }); if (!res.ok) throw new Error("Delete failed"); setMembers((p) => p.filter((x) => x.id !== id)); } catch (e) { setError(e instanceof Error ? e.message : "Delete error"); } };

  const handleMove = async (id: string, direction: "up" | "down") => {
    try {
      // Work with the sorted order to match the UI
      const sorted = [...members].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
      const currentIndex = sorted.findIndex((m) => m.id === id);
      if (currentIndex === -1) return;
      if (direction === "up" && currentIndex === 0) return;
      if (direction === "down" && currentIndex === sorted.length - 1) return;

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      const itemToMove = sorted[currentIndex];
      const itemToSwap = sorted[newIndex];

      // swap
      [sorted[currentIndex], sorted[newIndex]] = [sorted[newIndex], sorted[currentIndex]];

      // Update order values for the two swapped items
      const updates = [
        { id: itemToSwap.id, order: currentIndex },
        { id: itemToMove.id, order: newIndex },
      ];

      for (const update of updates) {
        const res = await fetch(`/api/admin/team?id=${update.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ order: update.order }),
        });
        if (!res.ok) throw new Error("Update failed");
      }

      // Update local state to reflect new ordering and order values
      setMembers(sorted.map((m, i) => ({ ...m, order: i.toString() })));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Move error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-serene-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-serene-400">Manage Team</h1>
        <p className="mt-2 text-sm text-serene-300">Create and manage team members</p>
      </header>

      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg border border-serene-100 p-6 mb-8">
        <h2 className="text-lg font-medium text-serene-400 mb-4">
          {editing ? "Edit Member" : "Create Member"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-serene-400">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-serene-400">
              Role
            </label>
            <input
              id="role"
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-serene-400">
              Bio
            </label>
            <textarea
              id="bio"
              value={form.bio}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="photo" className="block text-sm font-medium text-serene-400 mb-2">
              Photo
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full"
            />
            {uploading && <div className="text-sm text-serene-300 mt-2">Uploading…</div>}
            {form.image && (
              <div className="mt-2 text-sm text-serene-400">
                Uploaded: <a href={form.image} target="_blank" rel="noreferrer" className="text-serene-300 hover:underline">Open</a>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
            {editing && (
              <button
                type="button"
                onClick={() => { setEditing(null); setForm({ image: "", name: "", role: "", bio: "" }); }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-serene-400 bg-white border border-serene-200 rounded-lg hover:bg-serene-50 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-serene-400 rounded-lg hover:bg-serene-300 transition"
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-serene-100">
        <div className="p-6">
          <h2 className="text-lg font-medium text-serene-400 mb-4">Team Members</h2>

          {members.length === 0 ? (
            <p className="text-sm text-serene-300">No team members yet.</p>
          ) : (
            <div className="space-y-4">
              {[...members].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)).map((member, idx) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-serene-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center flex-1 mb-3 sm:mb-0 sm:mr-4">
                    {member.image && (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-12 w-12 rounded-full border-2 border-serene-300 object-cover mr-4"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-serene-400">{member.name}</h3>
                      <p className="mt-1 text-sm text-serene-300">
                        {member.role} • {new Date(member.createdAt || "").toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleMove(member.id, "up")}
                      disabled={idx === 0}
                      className="p-2 text-serene-300 hover:text-serene-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move up"
                    >
                      <MdArrowUpward className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMove(member.id, "down")}
                      disabled={idx === members.length - 1}
                      className="p-2 text-serene-300 hover:text-serene-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move down"
                    >
                      <MdArrowDownward className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-serene-300 hover:text-serene-400 transition-colors"
                      title="Edit"
                    >
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-serene-300 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <MdDelete className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
