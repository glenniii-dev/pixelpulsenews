"use client";
import NewsletterCard from "@/components/cards/NewsletterCard";
import newsletterItems from "@/utils/newsletters";
import { FaNewspaper } from 'react-icons/fa6';

export default function Page() {

  return (
    <main className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-(--oxford-blue) gap-6 max-w-400 mx-auto">
      <div className="flex flex-col mb-6 justify-start w-full">
        <h1 className="text-5xl mb-4 font-extrabold text-(--oxford-blue) text-shadow-sm flex flex-row gap-4"><FaNewspaper />Newsletters</h1>
        <h3 className="text-lg mb-4">Stay updated with our latest insights, research findings, and community updates</h3>
      </div>

      {newsletterItems
        .map((item, index) => (
          <NewsletterCard
            key={index}
            date={item.date}
            title={item.title}
            edition={item.edition}
            link={item.link}
          />
        ))}
    </main>
  );
}

