import Image from "next/image"

export default function TeamMember({ image, name, role, bio }: { image: string; name: string; role: string; bio: string; }) {
  return (
    <div className="flex flex-col space-y-3 p-8 items-start bg-(--stardust-white) rounded-lg text-(--silver-lake-blue) max-w-80 min-w-60 w-auto h-135 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300">
      <Image src={!image ? "/profile.png" : image} alt={name} width={96} height={96} className="w-24 h-24 mb-5 rounded-full border-3 border-(--chambray) self-center object-cover" />
      <h3 className="text-2xl font-bold text-(--oxford-blue) self-center">{name}</h3>
      <h3 className="text-lg font-bold text-(--chambray) self-center">{role}</h3>
      <p className="text-(--silver-lake-blue) self-center">{bio}</p>
    </div>
  )
}
