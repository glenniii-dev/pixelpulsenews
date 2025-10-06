import Link from "next/link";

export default function NewsletterCard({ date, title, edition, link }: { date: string; title: string; edition: string; link: string; }) {
  return (
    <Link href={link} className={`flex flex-col space-y-3 p-8 bg-(--stardust-white) rounded-lg text-(--silver-lake-blue) w-95 h-60 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300`}>
      <p className="text-lg font-bold text-(--oxford-blue)">{date}</p>
      <h3 className="text-lg font-bold text-(--chambray)">{title}</h3>
      <p className="text-(--silver-lake-blue)">{edition}</p>
      <p className="flex mt-auto text-(--chambray) font-semibold w-full justify-between border-t-1 pt-3 border-(--oxford-blue) hover:font-extrabold">Read More <span className="text-(--oxford-blue)">&rarr;</span></p>
    </Link>
  )
}