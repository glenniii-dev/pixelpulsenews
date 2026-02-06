import PageLink from "@/components/admin/PageLink";
import StatsCard from "@/components/admin/StatsCard";
import { db } from "@/db/db";
import { newsletters, articles, research, resources, team, opportunities } from "@/db/schema";

export default async function Page() {

  const totalNewsletters = await db.$count(newsletters);
  const totalArticles = await db.$count(articles);
  const totalResearch = await db.$count(research);
  const totalResources = await db.$count(resources);
  const totalTeam = await db.$count(team);
  const totalOpportunities = await db.$count(opportunities);

  return (
    <div className="min-h-screen bg-gradient-to-br from-serene-50 via-white to-serene-100/30">
      {/* Header */}
      <div className="bg-white border-b border-serene-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-serene-400 mb-2">Dashboard</h1>
          <p className="text-serene-300">Welcome back. Manage your content from here.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Stats Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 sm:mb-14">
          <StatsCard title="Newsletters" value={totalNewsletters} />
          <StatsCard title="Articles" value={totalArticles} />
          <StatsCard title="Research" value={totalResearch} />
          <StatsCard title="Resources" value={totalResources} />
          <StatsCard title="Team" value={totalTeam} />
          <StatsCard title="Opportunities" value={totalOpportunities} />
        </section>

        {/* Navigation Cards Grid */}
        <section>
          <h2 className="text-2xl font-semibold text-serene-400 mb-4 sm:mb-6">Manage Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <PageLink title="Newsletters" />
            <PageLink title="Articles" />
            <PageLink title="Research" />
            <PageLink title="Resources" />
            <PageLink title="Team" />
            <PageLink title="Opportunities" />
          </div>
        </section>

      </div>
    </div>
  );
}