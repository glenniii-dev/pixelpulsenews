import TeamMember from "@/components/cards/TeamMember";
import { Button } from "@/components/ui/button"
import { db } from "@/db/db";
import { team, opportunities as oppTable } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { FaGraduationCap, FaMicroscope, FaNewspaper } from "react-icons/fa";
import type Opportunity from "@/types/Opportunity";

export default async function page() {
  const topTeam = await db.select().from(team).orderBy(asc(team.order)).limit(3);
  let allOpportunities = [];
  try {
    allOpportunities = await db.select().from(oppTable).where(eq(oppTable.isPublished, true)).orderBy(asc(oppTable.order));
  } catch (err) {
    console.error("Opportunities order query failed, falling back to createdAt:", err);
    allOpportunities = await db.select().from(oppTable).where(eq(oppTable.isPublished, true)).orderBy(desc(oppTable.createdAt));
  }

  return (
    <main>

      {/* Hero Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 px-4 md:px-8 py-50 text-center text-serene-400 bg-linear-to-b from-serene-50 to-serene-100/20 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-10 md:leading-15 lg:leading-20 xl:leading-25">
        <h1 className="sm:hidden">Empowering the next generation through <span className="text-serene-300">STEM</span> education.</h1>
        <h1 className="hidden sm:block">Empowering the next generation<br /> through <span className="text-serene-300">STEM</span> education.</h1>
      </section>

      {/* What We Offer Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 px-4 md:px-8 py-20 text-center bg-white text-serene-400">
        <h2 className="text-5xl font-bold mb-4">What We Offer</h2>
        <p className="max-w-250 text-lg mb-4">
          Pixel Pulse is a youth-led initiative dedicated to tech journalism, STEM research, and educational content. Our mission is to provide valuable insights, emerging trends, breaking news, and STEM-related opportunities to empower students and tech enthusiasts.
        </p>
        <div className="flex flex-row flex-wrap w-auto max-width-350 gap-5 justify-between items-center px-5">
          <div className="flex flex-col space-y-3 p-5 py-10 bg-serene-100 rounded-lg text-serene-400 max-w-110 min-w-50 w-auto h-80 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 items-center">
            <FaGraduationCap className="text-7xl mb-5 text-serene-400" />
            <h3 className="text-2xl font-extrabold">Educational Resources</h3>
            <p className="text-lg">Access comprehensive educational materials, tutorials, and guides designed to support your STEM learning journey.</p>
          </div>
          <div className="flex flex-col space-y-3 p-5 py-10 bg-serene-100 rounded-lg text-serene-400 max-w-110 min-w-50 w-auto h-80 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 items-center">
            <FaMicroscope className="text-7xl mb-5 text-serene-400" />
            <h3 className="text-2xl font-extrabold">STEM Research</h3>
            <p className="text-lg">Explore original research papers and analyses across various STEM fields, contributed by our talented team of young researchers.</p>
          </div>
          <div className="flex flex-col space-y-3 p-5 py-10 bg-serene-100 rounded-lg text-serene-400 max-w-110 min-w-50 w-auto h-80 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 items-center">
            <FaNewspaper className="text-7xl mb-5 text-serene-400" />
            <h3 className="text-2xl font-extrabold">Our Newsletters</h3>
            <p className="text-lg">Stay informed with our cutting-edge coverage of the latest technological advancements, breakthroughs, and industry trends.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 px-4 md:px-8 py-20 bg-serene-50 text-serene-400">
        <h2 className="text-5xl font-bold mb-4 text-center">Meet Our Team</h2>
        <p className="max-w-3xl text-lg mb-4 text-center">
          Discover every single one of the passionate minds behind Pixel Pulse!
        </p>
        <div className="flex flex-row flex-wrap w-auto max-width-80 gap-5 justify-center items-center mb-8">
          {topTeam.map(({ image, name, role, bio }, index) => (
            <TeamMember
              key={index}
              image={image}
              name={name}
              role={role}
              bio={bio}
              serene={false}
            />
          ))}
        </div>
        <Button variant="shadow" size="full" className="max-w-90">
          <Link href="/team">Meet The Whole Team</Link>
        </Button>
      </section>

      {/* STEM Opportunities Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 px-4 md:px-8 py-20 bg-white text-serene-400">
        <h2 className="text-5xl font-bold mb-10 text-center">Upcoming STEM Opportunities</h2>

        <div className="w-full max-w-5xl px-5">

          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-4 gap-4 p-4 mb-4 font-bold border-b border-serene-200">
            <p>Name</p>
            <p>Description</p>
            <p>Date</p>
            <p>Location</p>
          </div>

          {allOpportunities.map((opportunity: Opportunity, index: number) => (
            <div
              key={index}
              className="p-4 mb-4 border border-serene-200 rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Desktop layout */}
              <div className="hidden md:grid grid-cols-4 gap-4">
                <p className="font-semibold">{opportunity.name}</p>
                <p>{opportunity.description}</p>
                <p>{opportunity.date}</p>
                <p>{opportunity.location}</p>
              </div>

              {/* Mobile layout */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                <div>
                  <p className="text-xs font-semibold uppercase text-serene-300">Name</p>
                  <p className="font-medium">{opportunity.name}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-serene-300">Description</p>
                  <p>{opportunity.description}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-serene-300">Date</p>
                  <p>{opportunity.date}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-serene-300">Location</p>
                  <p>{opportunity.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      

    </main>
  )
}
