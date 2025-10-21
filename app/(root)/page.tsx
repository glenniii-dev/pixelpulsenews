import TeamMember from "@/components/cards/TeamMember";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
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
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-70 min-w-50 w-auto h-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h1 className="text-7xl mb-5">🎓</h1>
            <h3 className="text-2xl font-bold text-shadow-md">Educational Resources</h3>
            <p className="text-lg">Access comprehensive educational materials, tutorials, and guides designed to support your STEM learning journey.</p>
          </div>
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-70 min-w-50 w-auto h-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h1 className="text-7xl mb-5">🔬</h1>
            <h3 className="text-2xl font-bold text-shadow-md">STEM Research</h3>
            <p className="text-lg">Explore original research papers and analyses across various STEM fields, contributed by our talented team of young researchers.</p>
          </div>
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-70 min-w-50 w-auto h-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h1 className="text-7xl mb-5">📰</h1>
            <h3 className="text-2xl font-bold text-shadow-md">Tech Journalism</h3>
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
          {/* SOHA */}
          <TeamMember image="https://dzoxjkfkahmyylvgiibw.supabase.co/storage/v1/object/public/team-images/1744584649464-IMG_3289.webp" name="Soha" role="Founder & President" bio="Hi there! I'm Soha, the founder and president of Pixel Pulse. I'm currently pursuing STEM and planning to major in either computer science or data science (still deciding!) at university. I truly hope Pixel Pulse grows into a valuable platform for both STEM students and beyond! I love reading and writing. :)" />
          {/* ROLLEEN */}
          <TeamMember image="/Rollean.webp" name="Rolleen" role="Vice President" bio="Hai my name is Rolleen! I am Pixel Pulse's Vice President and a long-term member. I am very passionate about environmental sciences and hope to pursue environmental engineering and public advocacy in the future. Outside of STEM, I am a big music person, so if you want any music suggestions I am the girl to go to. My favorite music artists consist of Jeff Buckley, Laufey, and Beabadoobee just to name a few! I am so grateful to be part of this team." />
          {/* DARREN */}
          <TeamMember image="https://cdn.glitch.global/e935e5cb-fc33-4f8d-a0d2-76cc83905dc9/darren.png?v=1739814810086" name="Darren" role="Graphic Designer + Admin Secretary" bio="Hi, I'm Darren, a high school student with experience in coding, web design, and graphic design. I'm passionate about technology and plan to pursue a computer science or software engineering career. Outside of tech, I enjoy both playing and watching sports, especially soccer and tennis." />
        </div>
        <Button variant="chambray" size="xl">
          <Link href="/team">Meet The Team</Link>
        </Button>
      </section>

      {/* Research and Newsletter Section */}
      <section className="h-auto w-full flex flex-col items-center justify-center gap-4 p-8 py-20 text-center bg-(--rich-black) text-(--stardust-white)">
        <div className="flex flex-row flex-wrap w-auto max-width-180 gap-5 justify-center items-center">
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-100 min-w-70 w-auto h-70 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-4xl font-bold text-shadow-md">Research</h2>
            <p className="text-xl">Explore our research projects and papers!</p>
            <Button variant="silverlakeblue" size="xl">
              <Link href="/research">Read More</Link>
            </Button>
          </div>
          <div className="flex flex-col space-y-3 p-5 py-10 bg-(--chambray) rounded-lg text-(--stardust-white) max-w-100 min-w-70 w-auto h-70 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
            <h2 className="text-4xl font-bold text-shadow-md">Newsletters</h2>
            <p className="text-xl">Explore our latest findings, stories, and insights through our newsletters.</p>
            <Button variant="silverlakeblue" size="xl">
              <Link href="/newsletters">See Newsletters</Link>
            </Button>
          </div>
        </div>
      </section>
    
    </main>
  )
}
