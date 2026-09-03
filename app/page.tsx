import Link from "next/link";
import { Sparkles, Target, Mic, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-accent-teal to-accent-violet" />
            <span className="text-lg font-bold">ProHire</span>
          </div>
          <Link
            href="/login"
            className="rounded-lg bg-accent-teal px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
          >
            Sign in
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-textMuted">
          <Sparkles size={12} className="text-accent-teal" /> Built for the Pakistani job market
        </div>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Your AI Career Agent —{" "}
          <span className="gradient-text">From Profile to Placement.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-textMuted">
          ProHire builds your profile once, matches you against real opportunities with an
          explainable score, preps your application, runs a genuinely adaptive mock interview
          in English, Urdu, or Roman Urdu — and turns the result into a personal skill roadmap.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-accent-teal px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold hover:border-accent-violet"
          >
            Sign In
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 md:grid-cols-4">
        {[
          { icon: Target, title: "AI Job Matching", desc: "Explainable compatibility scores, not keyword guesswork." },
          { icon: Mic, title: "AI Interview", desc: "Adaptive follow-ups grounded in your actual answers." },
          { icon: Sparkles, title: "Resume Intelligence", desc: "Structured analysis, never a fabricated qualification." },
          { icon: TrendingUp, title: "Career Roadmap", desc: "A concrete, sequenced plan built from your real gaps." }
        ].map((f) => (
          <div key={f.title} className="card p-5">
            <f.icon className="mb-3 text-accent-teal" size={20} />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-textMuted">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
