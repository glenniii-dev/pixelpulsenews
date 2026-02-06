"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import type Opportunity from "@/types/Opportunity";

export default function Page() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    isPublished: false,
  });

  /* ------------------------------------------------------------------ */
  /* Load opportunities                                                */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/opportunities", { credentials: "include" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load");
        }

        const list: Opportunity[] = Array.isArray(data)
          ? data
          : data.opportunities ?? data.opportunity ?? [];

        setOpportunities(list);
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
  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setFormData({
      name: opportunity.name,
      description: opportunity.description,
      date: opportunity.date,
      location: opportunity.location,
      isPublished: opportunity.isPublished,
    });
  };

  /* ------------------------------------------------------------------ */
  /* Submit (create / update)                                            */
  /* ------------------------------------------------------------------ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const method = editingOpportunity ? "PUT" : "POST";
    const url = editingOpportunity
      ? `/api/admin/opportunities?id=${editingOpportunity.id}`
      : "/api/admin/opportunities";

    try {
      const payload = editingOpportunity ? formData : { ...formData, order: String(opportunities.length) };

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
      const savedOpportunity: Opportunity =
        response.opportunity ?? response.opportunities ?? response;

      if (editingOpportunity) {
        setOpportunities((prev) =>
          prev.map((x) => (x.id === editingOpportunity.id ? savedOpportunity : x))
        );
      } else {
        setOpportunities((prev) => [savedOpportunity, ...prev]);
      }

      // Reset form
      setEditingOpportunity(null);
      setFormData({
        name: "",
        description: "",
        date: "",
        location: "",
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
    setEditingOpportunity(null);
    setFormData({
      name: "",
      description: "",
      date: "",
      location: "",
      isPublished: false,
    });
  };

  /* ------------------------------------------------------------------ */
  /* Delete                                                              */
  /* ------------------------------------------------------------------ */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this opportunity?")) return;

    try {
      const res = await fetch(`/api/admin/opportunities?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");

      setOpportunities((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete error");
    }
  };

  const handleMove = async (id: string, direction: "up" | "down") => {
    try {
      const sorted = [...opportunities].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
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
        const res = await fetch(`/api/admin/opportunities?id=${update.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ order: update.order }),
        });
        if (!res.ok) throw new Error("Update failed");
      }

      setOpportunities(sorted.map((m, i) => ({ ...m, order: i.toString() })));
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
        <h1 className="text-3xl font-bold text-serene-400">Manage STEM Opportunities</h1>
        <p className="mt-2 text-sm text-serene-300">Create and manage upcoming STEM opportunities</p>
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
          {editingOpportunity ? "Edit Opportunity" : "Create Opportunity"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          {/* Name (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-serene-400">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-serene-400">
              Date
            </label>
            <input
              id="date"
              type="text"
              required
              placeholder="e.g. January-February 2026"
              value={formData.date}
              onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-serene-400">
              Location
            </label>
            <input
              id="location"
              type="text"
              required
              placeholder="e.g. Washington, DC"
              value={formData.location}
              onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
              className="mt-1 block w-full rounded-md bg-serene-50 border border-serene-200 text-serene-400 shadow-sm p-2 focus:outline-none focus:border-serene-300"
            />
          </div>

          {/* Description (full width) */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-serene-400">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
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

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
            {editingOpportunity && (
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
              {editingOpportunity ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* ---------- LIST ---------- */}
      <div className="bg-white rounded-lg shadow-lg border border-serene-100">
        <div className="p-6">
          <h2 className="text-lg font-medium text-serene-400 mb-4">Opportunities</h2>

          {opportunities.length === 0 ? (
            <p className="text-sm text-serene-300">No opportunities yet.</p>
          ) : (
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-serene-50 rounded-lg transition-colors"
                >
                  <div className="flex-1 mb-3 sm:mb-0 sm:mr-4">
                    <h3 className="text-sm font-medium text-serene-400">{opportunity.name}</h3>
                    <p className="mt-1 text-sm text-serene-300">
                      {opportunity.date} • {opportunity.location} •{" "}
                      {new Date(opportunity.createdAt).toLocaleDateString()}
                      {opportunity.isPublished ? " • Published" : " • Draft"}
                    </p>
                  </div>

                  <div className="flex space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleMove(opportunity.id, "up")}
                      className="p-2 text-serene-300 hover:text-serene-400 transition-colors"
                      title="Move up"
                    >
                      <MdArrowUpward className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleMove(opportunity.id, "down")}
                      className="p-2 text-serene-300 hover:text-serene-400 transition-colors"
                      title="Move down"
                    >
                      <MdArrowDownward className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(opportunity)}
                      className="p-2 text-serene-300 hover:text-serene-400 transition-colors"
                      title="Edit"
                    >
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(opportunity.id)}
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
