"use client";

import resources from "@/utils/resources"
import ResourceCard from "@/components/cards/ResourceCard"

export default function Page() {

  return (
    <main className="flex flex-col items-center justify-center p-10 lg:py-15 text-serene-400 gap-2 max-w-350 mx-auto">
      <h2 className="text-5xl font-bold mb-6">Resources</h2>

      {resources.map((resources, index) => (
        <ResourceCard key={index} {...resources} />
      ))}
    </main>
  );
}