import { getPublishedNewsletters } from "@/lib/newsletters";
import NewsletterCard from "@/components/cards/NewsletterCard";

export const dynamic = "force-dynamic"; // always run on server

export default async function Page() {
  const newsletters = await getPublishedNewsletters();

  return (
    <main className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-serene-400 gap-6 max-w-350 mx-auto">
      <div className="flex flex-col mb-6 w-full text-center">
        <h2 className="text-5xl font-bold mb-4">Newsletters</h2>
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
