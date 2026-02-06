import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function PageLink({ title }: { title: string }) {
  return (
    <Link
      href={`/admin/dashboard/${title.toLowerCase()}`}
      className="group relative overflow-hidden bg-white border border-serene-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between min-h-40 text-serene-400 hover:shadow-lg hover:border-serene-300 transition duration-300"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-serene-50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-serene-400 group-hover:text-serene-500 transition">
          {title}
        </h3>
      </div>

      {/* Icon */}
      <div className="relative z-10 flex justify-end">
        <div className="p-2 bg-serene-100 rounded-full group-hover:bg-serene-200 transition">
          <MdArrowOutward
            size={24}
            className="text-serene-400 group-hover:text-serene-500 transition"
          />
        </div>
      </div>
    </Link>
  );
}