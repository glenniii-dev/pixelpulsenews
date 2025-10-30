"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between md:items-center p-4 border-b md:flex-row bg-linear-90 from-(--rich-black) to-(--chambray) text-(--stardust-white) text-lg h-20 px-7 relative z-30 shadow-2xl">
      <Link href="/" className="font-extrabold text-3xl text-(--stardust-white) self-center cursor-pointer">
        Pixel Pulse News
      </Link>

      {/* Desktop Nav */}
      <nav className="space-x-4 max-lg:hidden">
        <ul className="flex space-x-8 lg:space-x-12 flex-wrap text-center font-semibold">
          <Link href="/newsletters" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Newsletters</Link>
          <Link href="/research" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Research</Link>
          <Link href="/articles" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Articles</Link>
          <Link href="/podcasts" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Podcasts</Link>
          <Link href="/team" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Team</Link>
          <a href="mailto:pixelpulsenewsletterr@gmail.com" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Contact</a>
        </ul>
      </nav>

      {/* Hamburger Button (Mobile) */}
      { !open &&
        <button
          onClick={() => setOpen(true)}
          className={`lg:hidden p-2 z-40`}
        >
          <Menu size={28} />
        </button>
      }

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-(--rich-black) transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-full bg-linear-90 from-(--rich-black) to-(--chambray) text-(--stardust-white) text-lg p-6 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6 border-b border-(--platinum) pb-4 -mx-6 -mt-1">
          <h2 className="text-2xl font-bold ml-6">Menu</h2>
          {/* Hamburger / Close Button (Mobile Only) */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 z-40 mr-6"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
        <ul className="flex flex-col gap-6 text-lg font-semibold">
          <Link href="/newsletters" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Newsletters</Link>
          <Link href="/research" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Research</Link>
          <Link href="/articles" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Articles</Link>
          <Link href="/podcasts" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Podcasts</Link>
          <Link href="/team" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Team</Link>
          <a href="mailto:pixelpulsenewsletterr@gmail.com" className="hover:underline hover:underline-offset-4 hover:decoration-(--silver-lake-blue) hover:decoration-2">Contact</a>
        </ul>
      </div>
    </header>
  );
}
