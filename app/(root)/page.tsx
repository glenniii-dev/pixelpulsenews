import TeamMember from "@/components/cards/TeamMember";
import { Button } from "@/components/ui/button"
import teamMembers from "@/utils/team";
import type Member from "@/types/Member"
import Link from "next/link";
import { FaGraduationCap, FaMicroscope, FaNewspaper } from "react-icons/fa";
import Article from "@/types/Article";
import articles from "@/utils/articles";
import ArticleCard from "@/components/cards/ArticleCard";

export default function page() {
  return (
    <main>

      {/* Hero Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 p-8 py-35 text-center bg-radial-[at_50%_75%] from-(--silver-lake-blue) via-(--chambray) to-(--chambray) to-90% text-(--stardust-white)">
        <h1 className="text-6xl font-bold text-shadow-lg">Welcome to Pixel Pulse</h1>
        <h3 className="text-xl font-bold">Empowering the next generation through STEM education.</h3>
      </section>

      {/* About Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 p-8 py-20 text-center bg-(--oxford-blue) text-(--stardust-white)">
        <h2 className="text-4xl font-bold mb-4 text-shadow-md">About Us</h2>
        <p className="max-w-3xl text-lg mb-4">
          Pixel Pulse is a youth-led initiative dedicated to tech journalism, STEM research, and educational content. Our mission is to provide valuable insights, emerging trends, breaking news, and STEM- related opportunities to empower students and tech enthusiasts.
        </p>
        <div className="flex flex-row flex-wrap w-auto max-width-80 gap-5 justify-center items-center">
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-70 min-w-50 w-auto h-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 items-center">
            <FaGraduationCap className="text-7xl mb-5 text-(--rich-black)" />
            <h3 className="text-2xl font-extrabold">Educational Resources</h3>
            <p className="text-lg">Access comprehensive educational materials, tutorials, and guides designed to support your STEM learning journey.</p>
          </div>
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-70 min-w-50 w-auto h-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 items-center">
            <FaMicroscope className="text-7xl mb-5 text-(--rich-black)" />
            <h3 className="text-2xl font-extrabold">STEM Research</h3>
            <p className="text-lg">Explore original research papers and analyses across various STEM fields, contributed by our talented team of young researchers.</p>
          </div>
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-70 min-w-50 w-auto h-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 items-center">
            <FaNewspaper className="text-7xl mb-5 text-(--rich-black)" />
            <h3 className="text-2xl font-extrabold">Our Newsletters</h3>
            <p className="text-lg">Stay informed with our cutting-edge coverage of the latest technological advancements, breakthroughs, and industry trends.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 p-8 py-20 text-center bg-(--platinum)">
        <h2 className="text-4xl font-bold mb-4 text-shadow-md text-(--chambray)">Meet Our Team</h2>
        <p className="max-w-3xl text-lg mb-4 text-(--oxford-blue)">
          Discover every single one of the passionate minds behind Pixel Pulse!
        </p>
        <div className="flex flex-row flex-wrap w-auto max-width-80 gap-5 justify-center items-center">
          {teamMembers.slice(0, 3).map((member: Member, index: number) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        <Button variant="chambray" size="xl">
          <Link href="/team">Meet The Team</Link>
        </Button>
      </section>

      {/* Featured Articles Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center p-8 py-20 text-center bg-(--rich-black) text-(--stardust-white)">
        <h2 className="text-4xl font-bold mb-12 text-shadow-md text-(--stardust-white)">Featured Articles</h2>

        {articles.slice(0, 5).map((article: Article, index: number) => (
          <ArticleCard key={index} {...article} />
        ))}

      </section>
    
    </main>
  )
}
