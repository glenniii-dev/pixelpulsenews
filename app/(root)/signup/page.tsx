"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!username || !password || !secretCode) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, secretCode }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err: Error | any) {
      setError("An error occurred during signup");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center py-20 px-4 min-h-screen">
      <section className="w-full max-w-md bg-white rounded-lg shadow-lg border border-serene-100 p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-serene-400 mb-2">Create Account</h1>
          <p className="text-serene-300">Sign up to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-serene-400 font-semibold mb-2">
              Username
            </label>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              type="text"
              placeholder="Choose a username"
              className="px-3 py-2 border-2 border-serene-100 rounded-lg focus:outline-none focus:border-serene-300 text-serene-400 placeholder:text-serene-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-serene-400 font-semibold mb-2">
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Enter a strong password"
              className="px-3 py-2 border-2 border-serene-100 rounded-lg focus:outline-none focus:border-serene-300 text-serene-400 placeholder:text-serene-200"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="secretCode" className="text-serene-400 font-semibold mb-2">
              Secret Code
            </label>
            <input
              required
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              id="secretCode"
              type="password"
              placeholder="Enter the secret code"
              className="px-3 py-2 border-2 border-serene-100 rounded-lg focus:outline-none focus:border-serene-300 text-serene-400 placeholder:text-serene-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-serene-400 text-white font-bold rounded-lg hover:bg-serene-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-serene-300">
            Already have an account?{" "}
            <a href="/admin" className="text-serene-400 font-semibold hover:underline">
              Login here
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
