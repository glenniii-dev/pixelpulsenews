"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import TipTapEditor from "@/components/admin/TipTapEditor";
import type Research from "@/types/Research";

export default function Page() {
  const [items, setItems] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<Research | null>(null);

  const [formData, setFormData] = useState({
    date: "",
    title: "",
    slug: "",
    category: "All",
    bio: "",
    content: "",
    references: "",
    isPublished: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/research", { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load");
        }

        const list: Research[] = Array.isArray(data)
        ? data
        : data.research ?? data.researches ?? [];

        setItems(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Load error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEdit = (item: Research) => {
    setEditingItem(item);
    setFormData({
      date: item.date,
      title: item.title,
      slug: item.slug,
      category: item.category,
      bio: item.bio,
      content: item.content,
      references: item.references,
      isPublished: item.isPublished,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `/api/admin/research?id=${editingItem.id}`
      : "/api/admin/research";

    try {
      const payload = editingItem ? formData : { ...formData, order: String(items.length) };

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
      const savedItem: Research = response.research ?? response;

      if (editingItem) {
        setItems((prev) =>
          prev.map((x) => (x.id === editingItem.id ? savedItem : x))
        );
      } else {
        setItems((prev) => [savedItem, ...prev]);
      }

      setEditingItem(null);
      setFormData({
        date: "",
        title: "",
        slug: "",
        category: "All",
        bio: "",
        content: "",
        references: "",
        isPublished: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save error");
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({
      date: "",
      title: "",
      slug: "",
      category: "All",
      bio: "",
      content: "",
      references: "",
      isPublished: false,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this research paper?")) return;

    try {
      const res = await fetch(`/api/admin/research?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");

      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete error");
    }
  };

  const handleMove = async (id: any, direction: "up" | "down") => {
    try {
      const sorted = [...items].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
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
        const res = await fetch(`/api/admin/research?id=${update.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ order: update.order }),
        });
        if (!res.ok) throw new Error("Update failed");
      }

      setItems(sorted.map((m, i) => ({ ...m, order: i.toString() })));
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
        <h1 className="text-3xl font-bold text-serene-400">Manage Research Papers</h1>
        <p className="mt-2 text-sm text-serene-300">Create and manage your research papers</p>
      </header>

      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg border border-serene-100 p-6 mb-8">
        <h2 className="text-lg font-medium text-serene-400 mb-4">
          {editingItem ? "Edit Research Paper" : "Create Research Paper"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
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

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-serene-400">
              Category
            </label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            >
              <option value="All">All</option>
              <option value="Psychology">Psychology</option>
              <option value="Physics + Math">Physics + Math</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

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

          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-serene-400">
              Short Bio/Summary (for cards)
            </label>
            <textarea
              id="bio"
              required
              value={formData.bio}
              onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))}
              rows={2}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="content" className="block text-sm font-medium text-serene-400 mb-2">
              Content
            </label>
            <TipTapEditor
              value={formData.content}
              onChange={(content) => setFormData((p) => ({ ...p, content }))}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="references" className="block text-sm font-medium text-serene-400 mb-2">
              References
            </label>
            <TipTapEditor
              value={formData.references}
              onChange={(references) => setFormData((p) => ({ ...p, references }))}
            />
          </div>

          <div className="flex items-center">
            <input
              id="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData((p) => ({ ...p, isPublished: e.target.checked }))}
              className="h-4 w-4 rounded border-serene-300 text-serene-400"
            />
            <label htmlFor="isPublished" className="ml-2 text-sm text-serene-400">
              Publish
            </label>
          </div>

          <div className="md:col-span-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md bg-serene-100 text-serene-400 hover:bg-serene-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-serene-400 text-white hover:bg-serene-500"
            >
              {editingItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-serene-400">Research Papers</h3>
        {items.length === 0 ? (
          <p className="text-serene-300">No research papers yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
                <div
                key={item.id}
                className="flex items-center justify-between bg-white border border-serene-100 rounded-lg p-4"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-serene-400">{item.title}</h4>
                  <p className="text-xs text-serene-300 mt-1">{item.category}</p>
                  <p className="text-sm text-serene-300">{item.date}</p>
                  <span className={`text-xs font-semibold ${item.isPublished ? "text-green-600" : "text-yellow-600"}`}>
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMove(item.id, "up")}
                    className="p-2 rounded-md bg-serene-100 hover:bg-serene-200"
                  >
                    <MdArrowUpward className="text-serene-400" size={18} />
                  </button>
                  <button
                    onClick={() => handleMove(item.id, "down")}
                    className="p-2 rounded-md bg-serene-100 hover:bg-serene-200"
                  >
                    <MdArrowDownward className="text-serene-400" size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-md bg-serene-100 hover:bg-serene-200"
                  >
                    <MdEdit className="text-serene-400" size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
  );
}
