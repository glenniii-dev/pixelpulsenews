export default function StatsCard({ title, value }: { title: string, value: number }) {
  return (
    <section className="bg-white rounded-lg p-4 min-w-50 min-h-25 text-center flex-row items-center border border-serene-100 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-extrabold text-serene-400">{title}</h3>
      <p className="text-2xl font-bold text-serene-300">{value}</p>
    </section>
  )
}
