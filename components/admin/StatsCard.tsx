export default function StatsCard({ title, value }: { title: string, value: number }) {
  return (
    <section className="bg-stardust-white rounded-lg p-4 min-w-50 min-h-25 text-center flex-row items-center">
      <h3 className="text-xl font-extrabold text-rich-black">{title}</h3>
      <p className="text-2xl font-bold text-silver-lake-blue">{value}</p>
    </section>
  )
}
