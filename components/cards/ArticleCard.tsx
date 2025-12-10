import Image from "next/image";
import Link from "next/link"
import { MdArrowOutward } from 'react-icons/md';

export default function ArticleCard({ title, slug, submittedTo, author }: { title: string; slug: string; submittedTo: string; author: string }) {

  return (
    <Link key={slug} href={`${slug}`} className="flex flex-row justify-between p-8 mb-5 bg-serene-50 rounded-lg text-serene-400 w-full max-w-4xl mx-auto shadow-sm hover:shadow-md transform hover:scale-103 transition duration-300">
      <div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-serene-300">{author}</p>
          <h3 className="text-2xl font-bold text-serene-400 self-center">{title}</h3>
          {submittedTo === " " ? "" : <p className="text-sm font-bold text-white bg-serene-200 rounded-lg py-1 px-3 w-fit mt-2">{submittedTo}</p>}
        </div>
      </div>
      <div className="flex items-center">
        <MdArrowOutward size={32} />
      </div>
    </Link>
  )
}