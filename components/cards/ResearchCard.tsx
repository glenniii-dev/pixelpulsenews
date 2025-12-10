import Link from "next/link";

export default function ResearchCard({ date, title, summary, link, category }: { date: string; title: string; summary: string; link: string; category: string }) {
  return (
    <Link href={link} className={`${category} flex flex-col space-y-3 p-8 bg-serene-100/20 rounded-lg text-serene-400 w-95 h-90 shadow-sm hover:shadow-md transform hover:scale-103 transition duration-300`}>
      <p className="text-lg font-bold text-serene-400">{date}</p>
      <h3 className="text-lg font-bold text-serene-300">{title}</h3>
      <p className="text-serene-400">{summary}</p>
      <p className="flex mt-auto text-serene-400 font-semibold w-full justify-between border-t-1 pt-3 border-serene-400 hover:font-extrabold">Read More <span className="text-serene-400">&rarr;</span></p>
    </Link>
  )
}
