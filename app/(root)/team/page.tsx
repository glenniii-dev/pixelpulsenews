import TeamMember from "@/components/cards/TeamMember";
import teamMembers from "@/utils/team";
import type Member from "@/types/Member";

export default function page() {
  return (
    <main className="flex flex-row flex-wrap justify-center items-center p-10 lg:py-15 text-serene-400 gap-6 max-w-350 mx-auto">
      <div className="flex flex-col mb-6 w-full text-center">
        <h2 className="text-5xl font-bold mb-4">Our Team</h2>
        <h3 className="text-lg mb-4 max-w-250 mx-auto">
          Meet the passionate individuals behind Pixel Pulse. Our diverse team of students and young professionals brings together expertise in STEM research, journalism, design, and technology to create engaging and informative content.
        </h3>
      </div>

      {teamMembers.map(({ image, name, role, bio }, index) => (
        <TeamMember
          key={index}
          image={image}
          name={name}
          role={role}
          bio={bio}
          serene={true}
        />
      ))}

    </main>
  )
}
