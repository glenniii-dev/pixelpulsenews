import Link from "next/link"
import { MdArrowOutward } from 'react-icons/md';
import type Resource from "@/types/Resource"

export default function ResourceCard({ title, slug }: Resource) {

  return (
    <Link href={"/resources/" + slug} className="flex flex-row p-8 mb-5 justify-between items-center bg-serene-50 rounded-lg text-serene-400 w-full max-w-4xl mx-auto shadow-sm hover:shadow-md transform hover:scale-103 transition duration-300">
      <h3 className="text-2xl font-bold self-center">{title}</h3>
      <MdArrowOutward size={32} />
    </Link>
  )
}