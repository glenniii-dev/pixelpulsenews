"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-screen bg-serene-50">
      <header className="flex justify-between md:items-center px-4 py-8 md:flex-row text-lg h-auto px-5 relative z-30 max-w-350 mx-auto">
        <Link href="/" className="font-extrabold text-3xl text-serene-400 self-center cursor-pointer">
          Pixel Pulse News
        </Link>

        {/* Desktop Nav */}
        <nav className="space-x-4 max-lg:hidden text-serene-400">
          <ul className="flex space-x-8 lg:space-x-12 flex-wrap text-center font-bold">
            <Link href="/newsletters" className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Newsletters</Link>
            <Link href="/research" className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Research</Link>
            <Link href="/articles" className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Articles</Link>
            <Link href="/resources" className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Resources</Link>
            <Link href="/team" className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Team</Link>
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
          className={`fixed inset-0 bg-serene-50 transition-opacity duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Mobile Fullscreen Menu */}
        <div
          className={`fixed inset-y-0 right-0 w-full bg-serene-50 text-serene-400 text-lg p-6 transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6 border-b border-serene-500 pb-4 -mx-6 -mt-1">
            <h2 className="text-2xl font-bold ml-6">Menu</h2>
            {/* Hamburger / Close Button (Mobile Only) */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 z-40 mr-6"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>
          <ul className="flex flex-col gap-6 text-lg font-bold">
            <Link href="/newsletters" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Newsletters</Link>
            <Link href="/research" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Research</Link>
            <Link href="/articles" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Articles</Link>
            <Link href="/resources" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Resources</Link>
            <Link href="/team" onClick={() => setOpen(false)} className="hover:underline hover:underline-offset-4 hover:decoration-serene-400 hover:decoration-2">Team</Link>
          </ul>
        </div>
      </header>
    </header>
  );
}
