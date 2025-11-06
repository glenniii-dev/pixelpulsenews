import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function PageLink({ title }: { title: string }) {
  return (
    <Link
      href={`/admin/dashboard/${title.toLowerCase()}`}
      className="bg-rich-black border-2 border-[#e6e8e6] rounded-lg p-4 w-[calc(100vw_-_80px)] min-h-15 flex flex-row justify-between items-center text-stardust-white hover:bg-[#e6e8e6] hover:bg-linear-to-r hover:from-[#1d2d44] hover:via-[#3e5c76] hover:to-[#748cab]"
    >
      <h3 className="text-2xl font-extrabold">
        {title}
      </h3>
      <MdArrowOutward
        size={32}
        className="text-stardust-white"
      />
    </Link>
  );
}