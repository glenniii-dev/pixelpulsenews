import Logout from "@/components/admin/Logout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pixel Pulse News",
  description: "Empowering the next generation through STEM education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen min-h-screen flex flex-col bg-serene-50">
      <div className="border-b border-serene-200 bg-white">
        <header className="bg-white max-w-350 mx-auto flex flex-row items-center justify-between px-4 py-3">
          <Link href="/admin/dashboard" className="text-2xl md:text-3xl font-extrabold text-serene-400">Pixel Pulse News</Link>
          <Logout />
        </header>
      </div>
      <div className="max-w-350 mx-auto py-4 w-full">
        {children}
      </div>
    </main>   
  );
}