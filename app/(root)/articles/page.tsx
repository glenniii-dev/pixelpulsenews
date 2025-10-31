"use client";

import articles from "@/utils/articles"
import ArticleCard from "@/components/cards/ArticleCard"
import { useState } from "react";

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="flex flex-col max-w-400 mx-auto px-10 mb-15">
      <div className="flex flex-col items-center justify-center gap-4 text-center p-10 lg:px-20 lg:pt-15 lg:py-10">
        <h1 className="text-5xl font-extrabold text-(--oxford-blue) text-shadow-sm mb-2">Our Articles</h1>
      </div>

      {articles.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </main>
  );
}