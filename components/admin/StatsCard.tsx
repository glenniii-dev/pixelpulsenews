export default function StatsCard({ title, value }: { title: string, value: number }) {
  return (
    <div className="bg-white border border-serene-200 rounded-lg p-4 sm:p-6 flex flex-col justify-between min-h-32 text-center hover:shadow-md hover:border-serene-300 transition duration-300">
      <h3 className="text-sm sm:text-base font-semibold text-serene-300 mb-2">{title}</h3>
      <p className="text-3xl sm:text-4xl font-bold text-serene-400">{value}</p>
    </div>
  )
}

