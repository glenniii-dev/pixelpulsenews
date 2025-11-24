import { getPublishedArticles } from "@/lib/articles";
import ArticleCard from "@/components/cards/ArticleCard";
import { FaNewspaper } from "react-icons/fa6";

export const dynamic = "force-dynamic"; // always run on server

export default async function Page() {
  const articles = await getPublishedArticles();

  return (
    <main className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-[var(--oxford-blue)] gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-6 justify-start w-full">
        <h1 className="text-5xl mb-4 font-extrabold text-[var(--oxford-blue)] text-shadow-sm flex flex-row gap-4 items-center">
          <FaNewspaper /> Articles
        </h1>
        <h3 className="text-lg mb-4">
          Stay updated with our latest insights, research findings, and community updates
        </h3>
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500 w-full text-lg">
          No articles published yet.
        </p>
      ) : (
        articles.map((item) => (
          <ArticleCard
            key={item.slug}
            title={item.title}
            submittedTo={item.submittedTo}
            slug={`/articles/${item.slug}`}
            author={item.author}
          />
        ))
      )}
    </main>
  );
}