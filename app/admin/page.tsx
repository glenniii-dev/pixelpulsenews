"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err: Error | any) {
      setError(err);
    }
  };

  return (
    <main className="flex items-center justify-center text-center w-screen h-screen bg-linear-to-r from-[#0d1321] to-[#1d2d44] text-platinum placeholder:text-[#e6e8e6]">
      <section className="flex flex-col items-center justify-center text-center mx-auto h-screen w-screen sm:h-auto sm:w-120 rounded-lg border border-platinum px-5 py-13 space-y-10">
        <h1 className="text-[40px] mb-3 font-bold">LOGIN</h1>
        <h3 className="text-xl">Welcome Back, login to continue!</h3>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col w-full text-left max-w-80 space-y-5">
          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium mb-2">Username</label>
            <input required onChange={(e) => setUsername(e.target.value)} id="username" type="username" placeholder="Enter Your Username" className="p-[5px] border-b-2 border-[#3e5c76] outline-none" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium mb-2">Password</label>
            <input required onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Enter Your Password" className="p-[5px] border-b-2 border-[#3e5c76] outline-none" />
          </div>
          <button type="submit" className="rounded-sm py-2 bg-[#3e5c76] w-full font-bold">LOGIN</button>
        </form>
      </section>
    </main>
  );
}