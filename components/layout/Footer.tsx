import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-serene-50 via-serene-50 to-serene-100/20 text-serene-400 text-lg flex flex-col max-lg:space-y-12 lg:flex-row flew-wrap justify-between p-4 px-8 py-12">
      <div>
        <p className="font-extrabold text-2xl text-serene-400 mb-3 lg:mb-6 cursor-pointer">Pixel Pulse News</p>
        <p className="text-serene-300 font-semibold max-w-80 flex flex-wrap">Empowering the next generation through STEM education.</p>
      </div>
      <div>
        <p className="font-extrabold text-2xl text-serene-400 mb-3 lg:mb-6">Quick Links</p>
        <nav className="text-serene-300 flex flex-wrap flex-col space-y-2">
          <Link href="/" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">Home</Link>
          <Link href="/team" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">Team</Link>
          <Link href="/podcasts" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">Podcasts</Link>
          <Link href="/newsletters" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">Newsletters</Link>
        </nav>
      </div>
      <div>
        <p className="font-extrabold text-2xl text-serene-400 mb-3 lg:mb-6">Resources</p>
        <nav className="text-serene-300 flex flex-wrap flex-col space-y-2">
          <Link href="/resources" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">Resources</Link>
          <Link href="/articles" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">Articles</Link>
          <Link href="/research" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">Research</Link>
          <Link href="/admin" className="text-serene-200 hover:text-serene-100">Admin</Link>
        </nav>
      </div>
      <div>
        <p className="font-extrabold text-2xl text-seren-400 mb-3 lg:mb-6">Contact Us</p>
        <nav className="text-serene-300 flex flex-wrap flex-col space-y-2">
          <Link href="mailto:pixelpulsenewsletterr@gmail.com" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">pixelpulsenewsletterr@gmail.com</Link>
          <Link href="https://www.instagram.com/pixelpulsenews/" className="hover:underline hover:underline-offset-4 hover:decoration-serene-300 hover:decoration-2">@pixelpulsenews</Link>
        </nav>
      </div>

    </footer>
  )
}
