import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-90 from-(--rich-black) to-(--chambray) text-(--stardust-white) text-lg flex flex-col max-lg:space-y-12 lg:flex-row flew-wrap justify-between p-4 px-8 py-12">
      <div>
        <p className="font-extrabold text-2xl text-(--silver-lake-blue) max-md:text-(--silver-lake-blue) mb-3 lg:mb-6 cursor-pointer">Pixel Pulse News</p>
        <p className="text-(--stardust-white) font-semibold max-w-80 flex flex-wrap">Empowering the next generation through STEM education.</p>
      </div>
      <div>
        <p className="font-extrabold text-2xl text-(--silver-lake-blue) max-md:text-(--silver-lake-blue) mb-3 lg:mb-6">Quick Links</p>
        <nav className="text-(--stardust-white) flex flex-wrap flex-col space-y-2">
          <Link href="/" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Home</Link>
          <Link href="/team" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Team</Link>
          <Link href="/podcasts" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Podcasts</Link>
          <Link href="/newsletters" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Newsletters</Link>
        </nav>
      </div>
      <div>
        <p className="font-extrabold text-2xl text-(--silver-lake-blue) max-md:text-(--silver-lake-blue) mb-3 lg:mb-6">Resources</p>
        <nav className="text-(--stardust-white) flex flex-wrap flex-col space-y-2">
          <Link href="/resources" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Resources</Link>
          <Link href="/articles" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Articles</Link>
          <Link href="/research" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Research</Link>
          <Link href="/admin" className="text-(--chambray) hover:text-(--stardust-white)">Admin</Link>
        </nav>
      </div>
      <div>
        <p className="font-extrabold text-2xl text-(--silver-lake-blue) max-md:text-(--silver-lake-blue) mb-3 lg:mb-6">Contact Us</p>
        <nav className="text-(--stardust-white) flex flex-wrap flex-col space-y-2">
          <Link href="mailto:pixelpulsenewsletterr@gmail.com" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">pixelpulsenewsletterr@gmail.com</Link>
          <Link href="https://www.instagram.com/pixelpulsenews/" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">@pixelpulsenews</Link>
        </nav>
      </div>

    </footer>
  )
}
