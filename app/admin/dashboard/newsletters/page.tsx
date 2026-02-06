"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import TipTapEditor from "@/components/admin/TipTapEditor";

type Article = {
  id: number;
  date: string;          // YYYY-MM-DD
  title: string;
  slug: string;
  edition: string;
  content: string;
  bibliography: string;
  isPublished: boolean;
    order?: string;
  createdAt: string;
};

export default function Page() {
  const [newsletters, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Full form state (including the extra fields)
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    slug: "",
    edition: "",
    content: "",
    bibliography: "",
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

        setArticles(data.newsletters);
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
  const handleEdit = (newsletter: Article) => {
    setEditingArticle(newsletter);
    setFormData({
      date: newsletter.date,
      title: newsletter.title,
      slug: newsletter.slug,
      edition: newsletter.edition,
      content: newsletter.content,
      bibliography: newsletter.bibliography,
      isPublished: newsletter.isPublished,
    });
  };

  /* ------------------------------------------------------------------ */
  /* Submit (create / update)                                            */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = editingArticle ? "PUT" : "POST";
    const url = editingArticle
      ? `/api/admin/newsletters?id=${editingArticle.id}`
      : "/api/admin/newsletters";

    try {
      const payload = editingArticle ? formData : { ...formData, order: String(newsletters.length) };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      const { newsletter } = await res.json();

      if (editingArticle) {
        setArticles((prev) =>
          prev.map((x) => (x.id === editingArticle.id ? newsletter : x))
        );
      } else {
        setArticles((prev) => [newsletter, ...prev]);
      }

      // Reset
      setEditingArticle(null);
      setFormData({ date: "", title: "", slug: "", edition: "", content: "", bibliography: "", isPublished: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error");
    }
  };

  /* ------------------------------------------------------------------ */
  /* Cancel edit                                                         */
  /* ------------------------------------------------------------------ */
  const handleCancel = () => {
    setEditingArticle(null);
    setFormData({ date: "", title: "", slug : "", edition: "", content: "", bibliography: "", isPublished: false });
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
      setArticles((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete error");
    }
  };

  const handleMove = async (id: any, direction: "up" | "down") => {
    try {
      const sorted = [...newsletters].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
      const currentIndex = sorted.findIndex((m) => m.id === id);
      if (currentIndex === -1) return;
      if (direction === "up" && currentIndex === 0) return;
      if (direction === "down" && currentIndex === sorted.length - 1) return;

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      const itemToMove = sorted[currentIndex];
      const itemToSwap = sorted[newIndex];

      [sorted[currentIndex], sorted[newIndex]] = [sorted[newIndex], sorted[currentIndex]];

      const updates = [
        { id: itemToSwap.id, order: currentIndex },
        { id: itemToMove.id, order: newIndex },
      ];

      for (const update of updates) {
        const res = await fetch(`/api/admin/newsletters?id=${update.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ order: update.order }),
        });
        if (!res.ok) throw new Error("Update failed");
      }

      setArticles(sorted.map((m, i) => ({ ...m, order: i.toString() })));
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
        <h1 className="text-3xl font-bold text-serene-400">Manage Newsletters</h1>
        <p className="mt-2 text-sm text-serene-300">Create and manage your newsletters</p>
      </header>

      {/* Error banner */}
      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      {/* ---------- FORM ---------- */}
      <div className="bg-white rounded-lg shadow-lg border border-serene-100 p-6 mb-8">
        <h2 className="text-lg font-medium text-serene-400 mb-4">
          {editingArticle ? "Edit Newsletter" : "Create Newsletter"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-serene-400">
              Date
            </label>
            <input
              id="date"
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          {/* Edition */}
          <div>
            <label htmlFor="edition" className="block text-sm font-medium text-serene-400">
              Edition
            </label>
            <input
              id="edition"
              type="text"
              required
              placeholder="e.g. #42"
              value={formData.edition}
              onChange={(e) => setFormData((p) => ({ ...p, edition: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          {/* Title (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-serene-400">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          {/* Publish toggle */}
          <div className="md:col-span-2 flex items-center space-x-2">
            <input
              id="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData((p) => ({ ...p, isPublished: e.target.checked }))}
              className="h-4 w-4 rounded border-serene-300 bg-serene-50 text-serene-400 focus:ring-serene-300"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-serene-400">
              Publish
            </label>
          </div>

          {/* TipTap Editor (full width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-serene-400 mb-2">
              Content
            </label>
            <TipTapEditor
              value={formData.content}
              onChange={(html) => setFormData((p) => ({ ...p, content: html }))}
            />

          </div>
          {/* TipTap Editor (full width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-serene-400 mb-2">
              Bibliography
            </label>
            <TipTapEditor
              value={formData.bibliography}
              onChange={(html) => setFormData((p) => ({ ...p, bibliography: html }))}
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
            {editingArticle && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-serene-400 bg-white border border-serene-200 rounded-lg hover:bg-serene-50 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-serene-400 rounded-lg hover:bg-serene-300 transition"
            >
              {editingArticle ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* ---------- LIST ---------- */}
      <div className="bg-white rounded-lg shadow-lg border border-serene-100">
        <div className="p-6">
          <h2 className="text-lg font-medium text-serene-400 mb-4">Newsletters</h2>

          {newsletters.length === 0 ? (
            <p className="text-sm text-serene-300">No newsletters yet.</p>
          ) : (
            <div className="space-y-4">
              {newsletters.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-serene-50 rounded-lg transition"
                >
                  <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                    <h3 className="text-sm font-medium text-serene-400">{b.title}</h3>
                    <p className="mt-1 text-sm text-serene-300">
                      {b.edition} • {new Date(b.date).toLocaleDateString()} •{" "}
                      {new Date(b.createdAt).toLocaleDateString()}
                      {b.isPublished ? " • Published" : " • Draft"}
                    </p>
                  </div>

                  <div className="flex space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleMove(b.id, "up")}
                      className="p-2 text-serene-300 hover:text-serene-400 transition"
                      title="Move up"
                    >
                      <MdArrowUpward className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMove(b.id, "down")}
                      className="p-2 text-serene-300 hover:text-serene-400 transition"
                      title="Move down"
                    >
                      <MdArrowDownward className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(b)}
                      className="p-2 text-serene-300 hover:text-serene-400 transition"
                      title="Edit"
                    >
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-2 text-serene-300 hover:text-red-400 transition"
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