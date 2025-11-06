"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import TipTapEditor from "@/components/admin/TipTapEditor";

type Newsletter = {
  id: number;
  date: string;          // YYYY-MM-DD
  title: string;
  slug: string;
  edition: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
};

export default function Page() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingNewsletter, setEditingNewsletter] = useState<Newsletter | null>(null);

  // Full form state (including the extra fields)
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    slug: "",
    edition: "",
    content: "",
    isPublished: false,
  });

  /* ------------------------------------------------------------------ */
  /* Load newsletters                                                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/newsletters", { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load");
        }

        // Now safe to access data.newsletters
        setNewsletters(data.newsletters);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ------------------------------------------------------------------ */
  /* Edit handler – populate the whole form                              */
  /* ------------------------------------------------------------------ */
  const handleEdit = (newsletter: Newsletter) => {
    setEditingNewsletter(newsletter);
    setFormData({
      date: newsletter.date,
      title: newsletter.title,
      slug: newsletter.slug,
      edition: newsletter.edition,
      content: newsletter.content,
      isPublished: newsletter.isPublished,
    });
  };

  /* ------------------------------------------------------------------ */
  /* Submit (create / update)                                            */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = editingNewsletter ? "PUT" : "POST";
    const url = editingNewsletter
      ? `/api/admin/newsletters?id=${editingNewsletter.id}`
      : "/api/admin/newsletters";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Save failed");
      const { newsletter } = await res.json();

      if (editingNewsletter) {
        setNewsletters((prev) =>
          prev.map((x) => (x.id === editingNewsletter.id ? newsletter : x))
        );
      } else {
        setNewsletters((prev) => [newsletter, ...prev]);
      }

      // Reset
      setEditingNewsletter(null);
      setFormData({ date: "", title: "", slug: "", edition: "", content: "", isPublished: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error");
    }
  };

  /* ------------------------------------------------------------------ */
  /* Cancel edit                                                         */
  /* ------------------------------------------------------------------ */
  const handleCancel = () => {
    setEditingNewsletter(null);
    setFormData({ date: "", title: "", slug : "", edition: "", content: "", isPublished: false });
  };

  /* ------------------------------------------------------------------ */
  /* Delete                                                              */
  /* ------------------------------------------------------------------ */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this newsletter?")) return;
    try {
      const res = await fetch(`/api/admin/newsletters?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setNewsletters((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete error");
    }
  };

  /* ------------------------------------------------------------------ */
  /* UI – loading                                                        */
  /* ------------------------------------------------------------------ */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Main render                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Manage Newsletters</h1>
        <p className="mt-2 text-sm text-slate-400">Create and manage your newsletter</p>
      </header>

      {/* Error banner */}
      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      {/* ---------- FORM ---------- */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700 p-6 mb-8">
        <h2 className="text-lg font-medium text-slate-100 mb-4">
          {editingNewsletter ? "Edit Newsletter" : "Create Newsletter"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-300">
              Date
            </label>
            <input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-slate-900/50 border-slate-700 text-slate-100 shadow-sm p-2"
            />
          </div>

          {/* Edition */}
          <div>
            <label htmlFor="edition" className="block text-sm font-medium text-slate-300">
              Edition
            </label>
            <input
              id="edition"
              type="text"
              required
              placeholder="e.g. #42"
              value={formData.edition}
              onChange={(e) => setFormData((p) => ({ ...p, edition: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-slate-900/50 border-slate-700 text-slate-100 shadow-sm p-2"
            />
          </div>

          {/* Title (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
              className="mt-1 block w-full rounded-md bg-slate-900/50 border-slate-700 text-slate-100 shadow-sm p-2"
            />
          </div>

          {/* Publish toggle */}
          <div className="md:col-span-2 flex items-center space-x-2">
            <input
              id="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData((p) => ({ ...p, isPublished: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-600 bg-slate-900/50 text-[#007AFF] focus:ring-[#007AFF]"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-slate-300">
              Published
            </label>
          </div>

          {/* TipTap Editor (full width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content
            </label>
            <TipTapEditor
              value={formData.content}
              onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
            {editingNewsletter && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600 rounded-lg hover:bg-slate-700/50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#007AFF] rounded-lg hover:bg-[#0056B3]"
            >
              {editingNewsletter ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* ---------- LIST ---------- */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg border border-slate-700">
        <div className="p-6">
          <h2 className="text-lg font-medium text-slate-100 mb-4">Newsletters</h2>

          {newsletters.length === 0 ? (
            <p className="text-sm text-slate-400">No newsletters yet.</p>
          ) : (
            <div className="space-y-4">
              {newsletters.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-700/50 rounded-lg"
                >
                  <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                    <h3 className="text-sm font-medium text-slate-100">{b.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {b.edition} • {new Date(b.date).toLocaleDateString()} •{" "}
                      {new Date(b.createdAt).toLocaleDateString()}
                      {b.isPublished ? " • Published" : " • Draft"}
                    </p>
                  </div>

                  <div className="flex space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleEdit(b)}
                      className="p-2 text-slate-400 hover:text-[#007AFF]"
                      title="Edit"
                    >
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-2 text-slate-400 hover:text-red-400"
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