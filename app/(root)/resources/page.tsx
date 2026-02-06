"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ResourceItem = {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
};

export default function Page() {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/resources");
        const data = await res.json();
        const published = (data.resources ?? []).filter((item: ResourceItem) => item.isPublished);
        setItems(published);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <main className="flex flex-col items-center justify-center p-10 lg:py-15 text-serene-400 gap-2 max-w-350 mx-auto">
      <h2 className="text-5xl font-bold mb-6">Resources</h2>

      {items.length === 0 ? (
        <p className="text-serene-300">No resources yet.</p>
      ) : (
        items.map((resource) => (
          <Link
            key={resource.id}
            href={`/resources/${resource.slug}`}
            className="flex flex-row p-8 mb-5 justify-between items-center bg-serene-50 rounded-lg text-serene-400 w-full max-w-4xl mx-auto shadow-sm hover:shadow-md transform hover:scale-103 transition duration-300"
          >
            <h3 className="text-2xl font-bold self-center">{resource.title}</h3>
            <span className="text-2xl">→</span>
          </Link>
        ))
      )}
    </main>
  );
}