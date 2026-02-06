"use client";

import { useEffect, useState } from "react";
import ResearchCard from "@/components/cards/ResearchCard";

type ResearchItem = {
  id: string;
  date: string;
  title: string;
  slug: string;
  category: string;
  bio: string;
  content: string;
  references: string;
  isPublished: boolean;
};

const CATEGORIES = ["All", "Psychology", "Physics + Math", "Chemistry", "Computer Science"];

export default function Page() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/research");
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch research");
        }
        
        const published = (data.research ?? []).filter((item: ResearchItem) => item.isPublished);
        setItems(published);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An error occurred";
        console.error(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter((item) => item.category === selectedCategory);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  if (error) {
    return (
      <main className="flex flex-col flex-wrap items-center py-10 px-5 sm:p-10 lg:py-15 text-serene-400 gap-6 max-w-350 mx-auto">
        <div className="w-full text-center">
          <h2 className="text-5xl font-bold mb-4">Research Papers</h2>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
            <p className="font-semibold">Error loading research papers</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col flex-wrap items-center py-10 px-5 sm:p-10 lg:py-15 text-serene-400 gap-6 max-w-350 mx-auto">
      <div className="flex flex-col w-full text-center">
        <h2 className="text-5xl font-bold mb-4">Research Papers</h2>
        <h3 className="text-lg mb-4">
          Collection of Our Latest STEM Research
        </h3>
      </div>

      {/* Category Filters */}
      <div className="w-full flex flex-wrap justify-center gap-3 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-serene-400 text-white"
                : "bg-serene-100 text-serene-400 hover:bg-serene-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Research Grid */}
      <div id="research-cards" className="my-6 flex flex-rows flex-wrap justify-center gap-6 p-8">
        {filteredItems.length === 0 ? (
          <p className="text-serene-300">No research papers in this category.</p>
        ) : (
          filteredItems.map((item) => (
            <ResearchCard
              key={item.id}
              date={item.date}
              title={item.title}
              summary={item.bio}
              link={`/research/${item.slug}`}
              category="research"
            />
          ))
        )}
      </div>
    </main>
  );
}

