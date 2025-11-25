// app/newsletters/[slug]/page.tsx
import { notFound } from "next/navigation";

import type Article from "@/types/Article"

export default async function Page({
  params,
}: {
  /** `params` is a Promise in Next.js 16 */
  params: Promise<{ slug: string }>;
}) {
  // Await the promise before using `.slug`
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const article: Article = await res.json();
  const { title, content, author, bibliography } = article;

  return (
    <article className="flex flex-col items-center justify-center px-5 py-10 sm:p-10 lg:py-15 gap-6 max-w-5xl mx-auto font-medium">
        <h1 className="text-rich-black text-3xl sm:text-5xl font-bold mb-2 text-center">{title}</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-md sm:text-lg font-semibold text-chambray text-center">
          <p>Written By: {author}</p>
        </div>
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="rich-text mt-20 max-w-200" dangerouslySetInnerHTML={{ __html: bibliography }} />
    </article>
  );
}