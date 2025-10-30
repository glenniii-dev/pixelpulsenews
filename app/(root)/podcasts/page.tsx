import { FaMicrophone } from "react-icons/fa";

export default function page() {
  return (
    <main className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-(--oxford-blue) gap-6 max-w-400 mx-auto">
      <div className="flex flex-col mb-6 justify-start w-full">
        <h1 className="text-5xl mb-4 font-extrabold text-(--oxford-blue) text-shadow-sm flex flex-row gap-4"><FaMicrophone />Podcasts</h1>
        <h3 className="text-lg mb-4">COMING SOON!</h3>
      </div>

      {/*{teamMembers.map((member, index) => (*/}
      {/*  <TeamMember key={index} image={member.image} name={member.name} role={member.role} bio={member.bio} />*/}
      {/*))}*/}

    </main>
  )
}