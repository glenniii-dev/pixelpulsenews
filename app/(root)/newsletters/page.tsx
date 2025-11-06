import { getPublishedNewsletters } from "@/lib/newsletters";
import NewsletterCard from "@/components/cards/NewsletterCard";
import { FaNewspaper } from "react-icons/fa6";

export const dynamic = "force-dynamic"; // always run on server

export default async function Page() {
  const newsletters = await getPublishedNewsletters();

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

      {newsletters.length === 0 ? (
        <p className="text-center text-gray-500 w-full text-lg">
          No newsletters published yet.
        </p>
      ) : (
        newsletters.map((item) => (
          <NewsletterCard
            key={item.id}
            date={item.date}
            title={item.title}
            edition={item.edition}
            link={`/newsletters/${item.title}`}
          />
        ))
      )}
    </main>
  );
}
