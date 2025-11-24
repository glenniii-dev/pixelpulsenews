import Link from "next/link"
import { MdArrowOutward } from 'react-icons/md';
import type Resource from "@/types/Resource"

export default function ResourceCard({ topic, document }: Resource) {

  return (
    <Link href={"resource/" + document} className="flex flex-row p-8 mb-5 justify-between items-center bg-(--stardust-white) rounded-lg text-(--silver-lake-blue) w-full max-w-4xl mx-auto shadow-xl hover:shadow-2xl transform hover:scale-102 transition duration-300">
      <h3 className="text-2xl font-bold text-(--oxford-blue) self-center">{topic}</h3>
      <MdArrowOutward size={32} />
    </Link>
  )
}