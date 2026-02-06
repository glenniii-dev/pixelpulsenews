"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import TipTapEditor from "@/components/admin/TipTapEditor";
import type Article from "@/types/Article";

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]); // Fixed naming
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Full form state
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    slug: "",
    submittedTo: "",
    content: "",
    author: "",
    bibliography: "",
    isPublished: false,
  });

  /* ------------------------------------------------------------------ */
  /* Load articles                                                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/articles", { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load");
        }

        const list: Article[] = Array.isArray(data)
        ? data
        : data.article ?? data.articles ?? [];

        setArticles(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ------------------------------------------------------------------ */
  /* Edit handler – populate the form                                    */
  /* ------------------------------------------------------------------ */
  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      date: article.date,
      title: article.title,
      slug: article.slug,
      submittedTo: article.submittedTo,
      content: article.content,
      author: article.author,
      bibliography: article.bibliography,
      isPublished: article.isPublished,
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
      ? `/api/admin/articles?id=${editingArticle.id}`
      : "/api/admin/articles";

    try {
      const payload = editingArticle ? formData : { ...formData, order: String(articles.length) };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }

      const response = await res.json();
      const savedArticle: Article = response.article ?? response.articles ?? response;

      if (editingArticle) {
        setArticles((prev) =>
          prev.map((x) => (x.id === editingArticle.id ? savedArticle : x))
        );
      } else {
        setArticles((prev) => [savedArticle, ...prev]);
      }

      // Reset form
      setEditingArticle(null);
      setFormData({
        date: "",
        title: "",
        slug: "",
        submittedTo: "",
        content: "",
        author: "",
        bibliography: "",
        isPublished: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error");
    }
  };

  /* ------------------------------------------------------------------ */
  /* Cancel edit                                                         */
  /* ------------------------------------------------------------------ */
  const handleCancel = () => {
    setEditingArticle(null);
    setFormData({
      date: "",
      title: "",
      slug: "",
      submittedTo: "",
      content: "",
      author: "",
      bibliography: "",
      isPublished: false,
    });
  };

  /* ------------------------------------------------------------------ */
  /* Delete                                                              */
  /* ------------------------------------------------------------------ */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this article?")) return;

    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, {
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
      const sorted = [...articles].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
      const currentIndex = sorted.findIndex((m) => m.id === id);
      if (currentIndex === -1) return;
      if (direction === "up" && currentIndex === 0) return;
      if (direction === "down" && currentIndex === sorted.length - 1) return;

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      [sorted[currentIndex], sorted[newIndex]] = [sorted[newIndex], sorted[currentIndex]];

      const updates = [
        { id: sorted[newIndex].id, order: String(newIndex) },
        { id: sorted[currentIndex].id, order: String(currentIndex) },
      ];

      for (const update of updates) {
        const res = await fetch(`/api/admin/articles?id=${update.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ order: update.order }),
        });
        if (!res.ok) throw new Error("Update failed");
      }

      setArticles(sorted.map((m, i) => ({ ...m, order: String(i) })));
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
        <h1 className="text-3xl font-bold text-serene-400">Manage Articles</h1>
        <p className="mt-2 text-sm text-serene-300">Create and manage your articles</p>
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
          {editingArticle ? "Edit Article" : "Create Article"}
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

          {/* Submitted To */}
          <div>
            <label htmlFor="submittedTo" className="block text-sm font-medium text-serene-400">
              Submitted To
            </label>
            <input
              id="submittedTo"
              type="text"
              required
              placeholder="e.g. Magazine Name, Journal Name"
              value={formData.submittedTo}
              onChange={(e) => setFormData((p) => ({ ...p, submittedTo: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          {/* Author (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="author" className="block text-sm font-medium text-serene-400">
              Author
            </label>
            <input
              id="author"
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData((p) => ({ ...p, author: e.target.value }))}
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
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  title: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
                }))
              }
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

          {/* Content Editor */}
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
          <h2 className="text-lg font-medium text-serene-400 mb-4">Articles</h2>

          {articles.length === 0 ? (
            <p className="text-sm text-serene-300">No articles yet.</p>
          ) : (
            <div className="space-y-3">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between bg-white border border-serene-100 rounded-lg p-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-serene-400">{article.title}</h4>
                    <p className="text-xs text-serene-300 mt-1">{article.submittedTo || article.author}</p>
                    <p className="text-sm text-serene-300">{article.date}</p>
                    <span className={`text-xs font-semibold ${article.isPublished ? "text-green-600" : "text-yellow-600"}`}>
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMove(article.id, "up")}
                      className="p-2 rounded-md bg-serene-100 hover:bg-serene-200"
                    >
                      <MdArrowUpward className="text-serene-400" size={18} />
                    </button>
                    <button
                      onClick={() => handleMove(article.id, "down")}
                      className="p-2 rounded-md bg-serene-100 hover:bg-serene-200"
                    >
                      <MdArrowDownward className="text-serene-400" size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(article)}
                      className="p-2 rounded-md bg-serene-100 hover:bg-serene-200"
                    >
                      <MdEdit className="text-serene-400" size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 rounded-md bg-red-100 hover:bg-red-200"
                    >
                      <MdDelete className="text-red-600" size={18} />
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