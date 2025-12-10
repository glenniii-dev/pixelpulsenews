import { FaMicrophone } from "react-icons/fa";

export default function page() {
  return (
    <main className="flex flex-row flex-wrap items-center justify-center p-10 lg:py-15 text-serene-400 gap-6 max-w-350 mx-auto">
      <div className="flex flex-col mb-6 w-full text-center">
        <h2 className="text-5xl font-bold mb-4 flex flex-row items-center gap-3 mx-auto"><FaMicrophone size={35} />Podcasts</h2>
        <h3 className="text-lg mb-4">
          Coming Soon!
        </h3>
      </div>

    </main>
  )
}