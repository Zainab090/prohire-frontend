import Link from "next/link";
import { Sparkles, Target, Mic, TrendingUp, ArrowRight, CheckCircle, Star, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 selection:bg-teal-500/30 selection:text-white">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative border-b border-white/5 bg-slate-900/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8 overflow-hidden rounded-xl bg-gradient-to-br from-teal-400 via-cyan-400 to-violet-400 p-[2px] shadow-lg shadow-teal-500/20 transition-all duration-300 group-hover:shadow-teal-500/40">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-900 text-teal-400">
                <Zap size={16} className="fill-teal-400 text-teal-400" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Pro<span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">Hire</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-slate-400 transition-colors hover:text-white">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-slate-400 transition-colors hover:text-white">
              How it works
            </Link>
            <Link href="#testimonials" className="text-sm text-slate-400 transition-colors hover:text-white">
              Testimonials
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/5 hover:text-white md:block"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-teal-400 to-violet-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-95"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-teal-300 to-violet-300 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 text-center md:py-32 md:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex animate-in slide-in-from-top-5 fade-in duration-700 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300 backdrop-blur-sm">
          <Sparkles size={14} className="text-teal-400" />
          Built for the Pakistani job market
          <span className="ml-1 h-1 w-1 rounded-full bg-teal-400/50" />
          <span className="text-teal-400">v2.0</span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          Your AI Career Agent —
          <span className="block mt-2 bg-gradient-to-r from-teal-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
            From Profile to Placement.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 md:text-lg">
          ProHire builds your profile once, matches you against real opportunities with an
          explainable score, preps your application, runs a genuinely adaptive mock interview
          in English, Urdu, or Roman Urdu — and turns the result into a personal skill roadmap.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-400 to-violet-400 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-teal-500/30 transition-all duration-300 hover:shadow-teal-500/50 hover:scale-105 active:scale-95"
          >
            Start your free trial
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="#demo"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Watch demo
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/5 pt-12 md:gap-12">
          {[
            { value: "94%", label: "Match accuracy" },
            { value: "12k+", label: "Jobs matched" },
            { value: "4.8", label: "Avg. rating" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl font-bold text-white md:text-3xl">{stat.value}</div>
              <div className="text-xs text-slate-500 md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Intelligent features for your career
          </h2>
          <p className="mt-3 text-slate-400">Everything you need to land your dream job in Pakistan</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Target,
              title: "AI Job Matching",
              desc: "Explainable compatibility scores, not keyword guesswork.",
              gradient: "from-teal-400 to-cyan-400",
              delay: "0s",
            },
            {
              icon: Mic,
              title: "AI Interview",
              desc: "Adaptive follow-ups grounded in your actual answers.",
              gradient: "from-violet-400 to-purple-400",
              delay: "0.1s",
            },
            {
              icon: Sparkles,
              title: "Resume Intelligence",
              desc: "Structured analysis, never a fabricated qualification.",
              gradient: "from-amber-400 to-orange-400",
              delay: "0.2s",
            },
            {
              icon: TrendingUp,
              title: "Career Roadmap",
              desc: "A concrete, sequenced plan built from your real gaps.",
              gradient: "from-rose-400 to-pink-400",
              delay: "0.3s",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-teal-500/5"
              style={{ animationDelay: feature.delay }}
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-teal-500/10 to-violet-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative z-10">
                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 text-slate-950 shadow-lg`}>
                  <feature.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                <div className="mt-4 flex items-center text-xs text-teal-400 opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Learn more</span>
                  <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Your journey to a new career
          </h2>
          <p className="mt-3 text-slate-400">In three simple steps</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Build your profile",
              desc: "Upload your resume or link your LinkedIn. ProHire extracts and structures your skills, experience, and education.",
            },
            {
              step: "02",
              title: "Get matched & practice",
              desc: "Receive a compatibility score for each job, practice with adaptive AI interviews in your preferred language.",
            },
            {
              step: "03",
              title: "Receive your roadmap",
              desc: "Get a personalized skill development plan with courses, projects, and timelines to close your gaps.",
            },
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-slate-800/50">
              <div className="mb-4 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              {idx < 2 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-slate-700 md:block">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Loved by job seekers
          </h2>
          <p className="mt-3 text-slate-400">Real stories from real people</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Ayesha Khan",
              role: "Software Engineer",
              content: "ProHire's AI interview in Urdu was a game-changer. I felt confident and prepared. Landed my dream job at a top tech company!",
              rating: 5,
            },
            {
              name: "Bilal Ahmed",
              role: "Marketing Specialist",
              content: "The career roadmap helped me identify exactly what skills I needed. Within 3 months, I had a job offer from a multinational.",
              rating: 5,
            },
            {
              name: "Fatima Noor",
              role: "Recent Graduate",
              content: "I was struggling to get interviews until I used ProHire. The match scores and interview prep are incredibly accurate and helpful.",
              rating: 5,
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-slate-800/50"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">"{testimonial.content}"</p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-violet-400 text-sm font-bold text-slate-950">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{testimonial.name}</div>
                  <div className="text-xs text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 via-violet-500/10 to-indigo-500/10 p-8 text-center backdrop-blur-sm border border-white/5 md:p-16">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to accelerate your career?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Join thousands of job seekers in Pakistan who are using ProHire to land their dream jobs.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-400 to-violet-400 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-teal-500/30 transition-all duration-300 hover:shadow-teal-500/50 hover:scale-105 active:scale-95"
              >
                Get started free
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-white/10 px-8 py-3.5 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:text-white"
              >
                Learn more
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-500">No credit card required. Free forever for early adopters.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-900/30 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-teal-400 to-violet-400 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-md bg-slate-950">
                  <Zap size={14} className="text-teal-400" />
                </div>
              </div>
              <span className="text-sm font-bold text-white">
                Pro<span className="bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">Hire</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
              <span>© 2025 ProHire. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
