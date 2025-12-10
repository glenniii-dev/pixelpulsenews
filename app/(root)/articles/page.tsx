import { getPublishedArticles } from "@/lib/articles";
import ArticleCard from "@/components/cards/ArticleCard";

export const dynamic = "force-dynamic"; // always run on server

export default async function Page() {
  const articles = await getPublishedArticles();

  return (
    <main className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-serene-400 gap-6 max-w-350 mx-auto">
      <div className="flex flex-col w-full text-center">
        <h2 className="text-5xl font-bold mb-4">Articles</h2>
        <h3 className="text-lg mb-4 max-w-250 mx-auto">
          Access educational resources to help fund your path and knowledge into growing within the STEM field.
        </h3>
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-serene-200 w-full text-lg">
          No articles published yet.
        </p>
      ) : (
        articles.map((item) => (
          <ArticleCard
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