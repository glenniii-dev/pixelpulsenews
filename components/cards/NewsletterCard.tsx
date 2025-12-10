import moment from "moment";
import Link from "next/link";

export default function NewsletterCard({ date, title, edition, link }: { date: string, title: string, edition: string, link: string }) {
  return (
    <Link href={link} className={`flex flex-col space-y-3 p-8 rounded-lg text-serene-400 w-90 h-65 transform hover:scale-103 transition duration-300 border-[2.3px] border-serene-300 }`}>
      <p className="text-lg font-bold text-serene-300">{moment(date).format("MMMM DD, YYYY")}</p>
      <h3 className="text-lg font-bold text-serene-400">{title}</h3>
      <p className="text-serene-200">{edition}</p>
      <p className="flex mt-auto text-serene-400 font-semibold w-full justify-between border-t-1 pt-3 border-serene-300 hover:font-extrabold">Read More <span className="text-serene-400">&rarr;</span></p>
    </Link>
  )
}