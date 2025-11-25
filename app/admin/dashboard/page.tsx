import PageLink from "@/components/admin/PageLink";
import StatsCard from "@/components/admin/StatsCard";
import { db } from "@/db/db";
import { newsletters } from "@/db/schema";
import { articles } from "@/db/schema";

export default async function Page() {

  const totalNewsletters = await db.$count(newsletters);
  const totalArticles = await db.$count(articles);

  return (
    <>
      {/* Stats Section */}
      <section className="w-full flex flex-col sm:flex-row flex-wrap justify-between max-md:space-y-4 md:gap-4 lg:gap-7 items-center md:mt-10 px-10">
        <StatsCard title="Newsletters" value={totalNewsletters} />
        <StatsCard title="Research Papers" value={0} />
        <StatsCard title="Articles" value={totalArticles} />
        <StatsCard title="Resources" value={0} />
        <StatsCard title="Podcasts" value={0} />
        <StatsCard title="Team Members" value={0} />
      </section>

      {/* Page Links Section */}
      <section className="w-full flex flex-col sm:flex-row flex-wrap justify-between max-md:space-y-4 md:gap-4 lg:gap-7 items-center mt-10 px-10">
        <PageLink title="Newsletters" />
        <PageLink title="Research" />
        <PageLink title="Articles" />
        <PageLink title="Resources" />
        <PageLink title="Podcasts" />
        <PageLink title="Team" />
      </section>
    </>
  );
}