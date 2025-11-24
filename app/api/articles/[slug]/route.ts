import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request, // keep the underscore if you don’t use it
  {
    params,
  }: {
    /** `params` is a Promise in Next.js 16 */
    params: Promise<{ slug: string }>;
  }
) {
  
  const { slug } = await params;

  const rows = await db
    .select({
      date: articles.date,
      title: articles.title,
      slug: articles.slug,
      submittedTo: articles.submittedTo,
      content: articles.content,
      author: articles.author,
      bibliography: articles.bibliography,
      isPublished: articles.isPublished,
    })
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);

  const article = rows[0] ?? null;

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}