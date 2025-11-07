// app/newsletters/[slug]/page.tsx
import { notFound } from "next/navigation";
import moment from "moment";

interface Newsletter {
  date: string;
  edition: string;
  title: string;
  content: string;
  bibliography: string;
}

export default async function Page({
  params,
}: {
  /** `params` is a Promise in Next.js 16 */
  params: Promise<{ slug: string }>;
}) {
  // Await the promise before using `.slug`
  const { slug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) notFound();

  const newsletter: Newsletter = await res.json();
  const { date, edition, title, content, bibliography } = newsletter;

  return (
    <article className="flex flex-col items-center justify-center px-5 py-10 sm:p-10 lg:py-15 gap-6 max-w-5xl mx-auto font-medium">
        <h1 className="text-rich-black text-3xl sm:text-5xl font-bold mb-2 text-center">{title}</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-md sm:text-lg font-semibold text-chambray text-center">
          <p>{edition}</p> |
          <p>{moment(date).format("MMMM DD, YYYY")}</p>
        </div>
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="rich-text" dangerouslySetInnerHTML={{ __html: bibliography }} />
    </article>
  );
}