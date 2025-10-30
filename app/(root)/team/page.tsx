import TeamMember from "@/components/cards/TeamMember";
import { teamMembers } from "@/utils/team";

export default function page() {
  return (
    <section className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-(--oxford-blue) gap-6 max-w-400 mx-auto">
      <div className="flex flex-col mb-6 justify-start w-full">
        <h1 className="text-5xl mb-4 font-extrabold text-(--oxford-blue) text-shadow-sm">Our Team</h1>
        <h3 className="text-lg mb-4">Meet the passionate individuals behind Pixel Pulse. Our diverse team of students and young professionals brings together expertise in STEM research, journalism, design, and technology to create engaging and informative content.</h3>
      </div>

      {teamMembers.map((member, index) => (
        <TeamMember key={index} image={member.image} name={member.name} role={member.role} bio={member.bio} />
      ))}

    </section>
  )
}
