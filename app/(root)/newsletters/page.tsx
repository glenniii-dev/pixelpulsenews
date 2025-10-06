"use client";
import NewsletterCard from "@/components/cards/NewsletterCard";
import { newsletterItems } from "@/constants";

export default function Page() {

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4 text-center border-b-2 border-(--chambray) mx-15 p-10 lg:px-20 lg:pt-15 lg:py-10">
        <h1 className="text-5xl font-bold text-shadow-md text-(--chambray) mb-2">Our Newsletters</h1>
        <p className="text-xl">Stay updated with our latest insights, research findings, and community updates</p>
      </div>

      {/* Filter Grid */}
      <div id="research-cards" className="my-6 flex flex-rows flex-wrap justify-center gap-6 p-8">
        {newsletterItems
          .map((item, idx) => (
            <NewsletterCard
              key={idx}
              date={item.date}
              title={item.title}
              edition={item.edition}
              link={item.link}
            />
          ))}
      </div>
    </main>
  );
}

