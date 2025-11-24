"use client";

import resources from "@/utils/resources"
import ResourceCard from "@/components/cards/ResourceCard"

export default function Page() {

  return (
    <main className="flex flex-col max-w-400 mx-auto px-10 mb-15">
      <div className="flex flex-col items-center justify-center gap-4 text-center py-10 px-3 lg:px-20 lg:pt-15 lg:py-10">
        <h1 className="text-5xl font-extrabold text-(--oxford-blue) text-shadow-sm mb-2">Resources</h1>
      </div>

      {resources.map((resources, index) => (
        <ResourceCard key={index} {...resources} />
      ))}
    </main>
  );
}