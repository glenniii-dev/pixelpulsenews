import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function PageLink({ title }: { title: string }) {
  return (
    <Link
      href={`/admin/dashboard/${title.toLowerCase()}`}
      className="bg-white border-2 border-serene-200 rounded-lg p-4 w-[calc(100vw_-_80px)] min-h-15 flex flex-row justify-between items-center text-serene-400 hover:bg-serene-50 hover:border-serene-300 transition shadow-sm hover:shadow-md"
    >
      <h3 className="text-2xl font-extrabold">
        {title}
      </h3>
      <MdArrowOutward
        size={32}
        className="text-serene-400"
      />
    </Link>
  );
}