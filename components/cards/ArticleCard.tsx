import Image from "next/image";
import Link from "next/link"
import { MdArrowOutward } from 'react-icons/md';

export default function ArticleCard({ key, title, slug, submittedTo, author }: { key: string, title: string; slug: string; submittedTo: string; author: string }) {

  return (
    <Link key={key} href={`${slug}`} className="flex flex-row justify-between p-8 mb-5 bg-(--stardust-white) rounded-lg text-(--silver-lake-blue) w-full max-w-4xl mx-auto shadow-xl hover:shadow-2xl transform hover:scale-102 transition duration-300">
      <div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-(--chambray)">{author}</p>
          <h3 className="text-2xl font-bold text-(--oxford-blue) self-center">{title}</h3>
          <p className="text-sm font-bold text-(--stardust-white) bg-(--chambray) rounded-lg py-1 px-3 w-fit mt-2">{submittedTo}</p>
        </div>
      </div>
      <div className="flex items-center">
        <MdArrowOutward size={32} />
      </div>
    </Link>
  )
}