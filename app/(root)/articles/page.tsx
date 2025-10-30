"use client";

// import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="flex flex-col max-w-400 mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 text-center mx-15 p-10 lg:px-20 lg:pt-15 lg:py-10">
        <h1 className="text-5xl font-extrabold text-(--oxford-blue) text-shadow-sm mb-2">Our Articles</h1>
        <p className="text-xl">COMING SOON!</p>
      </div>

      {/* Filter Buttons */}
      {/*<div id="research-filter-buttons" className="flex flex-row gap-4 justify-center flex-wrap">*/}
      {/*  {researchFilters.map((filter) => (*/}
      {/*    <Button*/}
      {/*      key={filter}*/}
      {/*      variant="chambray"*/}
      {/*      size="lg"*/}
      {/*      id={filter}*/}
      {/*      className={`research-filter-btn btn ${*/}
      {/*        activeFilter === filter ? "border-2 border-(--oxford-blue) shadow-2xl" : ""*/}
      {/*      }`}*/}
      {/*      onClick={() => setActiveFilter(filter)}*/}
      {/*      data-selected={activeFilter === filter}*/}
      {/*    >*/}
      {/*      {filter === "physics-math"*/}
      {/*        ? "Physics + Math"*/}
      {/*        : filter.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}*/}
      {/*    </Button>*/}
      {/*  ))}*/}
      {/*</div>*/}

      {/* Research Grid */}
      {/*<div id="research-cards" className="my-6 flex flex-rows flex-wrap justify-center gap-6 p-8">
        {researchItems
          .filter((item) => activeFilter === "all" || item.id === activeFilter)
          .map((item, idx) => (
            <ResearchCard
              key={idx}
              date={item.date}
              title={item.title}
              summary={item.summary}
              link={item.link}
              category={item.id}
            />
          ))}
      </div>*/}
    </main>
  );
}