"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", { email, password, redirect: false });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="card w-full max-w-sm p-8">
        <h1 className="text-xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-textMuted">Sign in to continue your career journey.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-textMuted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-surfaceLight px-3 py-2 text-sm outline-none focus:border-accent-teal"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-textMuted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-surfaceLight px-3 py-2 text-sm outline-none focus:border-accent-teal"
            />
          </div>

          {error && <p className="text-xs text-accent-rose">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-accent-teal py-2.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-textMuted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent-teal">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
