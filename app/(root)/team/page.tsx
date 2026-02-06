"use client";

import { useEffect, useState } from "react";
import TeamMember from "@/components/cards/TeamMember";
import type Member from "@/types/Member";

type TeamMemberWithId = Member & { id: string; order?: string };

export default function page() {
  const [members, setMembers] = useState<TeamMemberWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/team");
        const data = await res.json();
        setMembers(data.team ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <main className="flex flex-row flex-wrap justify-center items-center p-10 lg:py-15 text-serene-400 gap-6 max-w-350 mx-auto">
      <div className="flex flex-col mb-6 w-full text-center">
        <h2 className="text-5xl font-bold mb-4">Our Team</h2>
        <h3 className="text-lg mb-4 max-w-250 mx-auto">
          Meet the passionate individuals behind Pixel Pulse. Our diverse team of students and young professionals brings together expertise in STEM research, journalism, design, and technology to create engaging and informative content.
        </h3>
      </div>

      {members.length === 0 ? (
        <p className="text-serene-300">No team members yet.</p>
      ) : (
        [...members].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0)).map(({ image, name, role, bio, id }) => (
          <TeamMember
            key={id}
            image={image}
            name={name}
            role={role}
            bio={bio}
            serene={true}
          />
        ))
      )}

    </main>
  )
}
