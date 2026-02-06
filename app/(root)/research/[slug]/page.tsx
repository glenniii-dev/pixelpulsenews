import { notFound } from "next/navigation";

import type Research from "@/types/Research"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/research/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const research: Research = await res.json();
  const { title, content, references } = research;

  return (
    <article className="flex flex-col items-center justify-center px-5 py-10 sm:p-10 lg:py-15 gap-6 max-w-5xl mx-auto font-medium">
        <h1 className="text-serene-400 text-3xl sm:text-5xl font-bold mb-2 text-center">{title}</h1>
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="rich-text mt-20 max-w-200" dangerouslySetInnerHTML={{ __html: references }} />
    </article>
  );
}
