import type Article from "@/types/Article"

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/articles`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to load articles: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data.articles.filter((a: Article) => a.isPublished);
  } catch (err) {
    console.error("Article fetch error:", err);
    return [];
  }
}