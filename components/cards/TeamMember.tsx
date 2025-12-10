import Image from "next/image"
import { FaUserCircle } from "react-icons/fa";

export default function TeamMember({ image, name, role, bio, serene }: { image: string | undefined, name: string, role: string, bio: string, serene: boolean }) {

  return (
    <div className={`flex flex-col space-y-3 p-8 items-start rounded-lg text-serene-400 max-w-90 min-w-60 w-auto h-125 transform hover:scale-103 transition duration-300 ${serene ? "bg-serene-50" : "bg-white shadow-sm hover:shadow-lg" }`}>
      {image && <Image src={image} alt={name} width={96} height={96} className="w-24 h-24 mb-5 rounded-full border-3 border-serene-300 self-center object-cover" />}
      {!image && <FaUserCircle size={96} className="w-24 h-24 mb-5 text-serene-300 self-center" />}
      <h3 className="text-2xl font-bold text-serene-400 self-center">{name}</h3>
      <h3 className="text-lg font-bold text-serene-300 self-center text-center">{role}</h3>
      <p className="text-serene-400 self-center">{bio}</p>
    </div>
  )
}

