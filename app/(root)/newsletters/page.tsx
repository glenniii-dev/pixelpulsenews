import NewsletterCard from "@/components/cards/NewsletterCard";
import { FaNewspaper } from "react-icons/fa6";

type Newsletter = {
  id: number;
  date: string;
  title: string;
  edition: string;
  isPublished: boolean;
};

export default async function Page() {
  let newsletters: Newsletter[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/newsletters`, {
      cache: "no-store", // always fresh
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to load newsletters: ${res.status} ${text}`);
    }

    const data = await res.json();
    newsletters = data.newsletters.filter((item: Newsletter) => item.isPublished) ?? [];
  } catch (err) {
    console.error("Newsletter fetch error:", err);
    error = err instanceof Error ? err.message : "An unknown error occurred";
  }

  return (
    <main className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-[var(--oxford-blue)] gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-6 justify-start w-full">
        <h1 className="text-5xl mb-4 font-extrabold text-[var(--oxford-blue)] text-shadow-sm flex flex-row gap-4 items-center">
          <FaNewspaper /> Newsletters
        </h1>
        <h3 className="text-lg mb-4">
          Stay updated with our latest insights, research findings, and community updates
        </h3>
      </div>

      {/* Error State */}
      {error && (
        <div className="w-full text-center p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-semibold">Error loading newsletters</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!error && newsletters.length === 0 && (
        <p className="text-center text-gray-500 w-full text-lg">
          No newsletters published yet.
        </p>
      )}

      {/* Newsletter Cards */}
      {newsletters.map((item) => (
        <NewsletterCard
          key={item.id}
          date={item.date}
          title={item.title}
          edition={item.edition}
          link={`/newsletters/${item.title}`}
        />
      ))}
    </main>
  );
}