import Link from "next/link";
import { Sparkles, Target, Mic, TrendingUp, ArrowRight, CheckCircle, Star, Zap, Menu, X, ChevronRight, Play, Globe, Users, Briefcase, Award, Clock, Shield, Layers, Cpu, MessageSquare, FileText, BarChart3, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 selection:text-white overflow-x-hidden">
      {/* Apple-style gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] h-[80vh] w-[80vh] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -bottom-[30%] -left-[10%] h-[80vh] w-[80vh] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/5 blur-[100px]" />
        <div className="absolute top-0 left-0 h-full w-full bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      {/* Apple-style nav with blur */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative h-8 w-8 overflow-hidden rounded-xl bg-gradient-to-br from-blue-400 via-teal-400 to-purple-400 p-[2px] shadow-lg shadow-blue-500/20 transition-all duration-500 group-hover:shadow-blue-500/40 group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0a0a0a]">
                  <Zap size={16} className="fill-blue-400 text-blue-400" />
                </div>
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Pro<span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">Hire</span>
              </span>
            </div>
            <div className="hidden items-center gap-6 text-sm md:flex">
              {["Features", "How it works", "Testimonials", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-slate-400 transition-all hover:text-white hover:scale-105 duration-300 font-medium"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full px-5 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/5 hover:text-white md:block"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Apple style */}
      <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 text-center md:pt-40 md:pb-28 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 inline-flex animate-in slide-in-from-top-5 fade-in duration-1000 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs text-slate-300 backdrop-blur-sm">
            <Sparkles size={14} className="text-blue-400" />
            <span className="font-medium">Built for the Pakistani job market</span>
            <span className="ml-1 h-1 w-1 rounded-full bg-blue-400/50" />
            <span className="text-blue-400 font-medium">v3.0</span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
            Your AI Career
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Agent.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 md:text-xl leading-relaxed">
            From profile to placement. ProHire matches you with real opportunities, runs adaptive interviews in English, Urdu, or Roman Urdu, and creates your personal skill roadmap.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
            >
              Start your journey
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Play size={18} className="fill-current" />
              Watch demo
            </Link>
          </div>

          {/* Apple-style stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
            {[
              { value: "94%", label: "Match Accuracy", icon: Target },
              { value: "12K+", label: "Jobs Matched", icon: Briefcase },
              { value: "4.8", label: "Avg. Rating", icon: Star },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <stat.icon size={20} className="text-blue-400" />
                <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apple-style hero image placeholder */}
        <div className="mx-auto mt-20 max-w-5xl overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent p-[1px]">
          <div className="rounded-3xl bg-[#0f0f0f] p-2">
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-slate-500">Interactive dashboard preview</div>
                <div className="mt-2 text-xs text-slate-600">Coming soon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Apple style grid */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Intelligent features for
            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              your career growth
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">Everything you need to land your dream job in Pakistan</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Target,
              title: "AI Job Matching",
              desc: "Explainable compatibility scores, not keyword guesswork. Get matches that actually make sense.",
              gradient: "from-blue-400 to-teal-400",
              delay: "0s",
            },
            {
              icon: Mic,
              title: "AI Interview",
              desc: "Adaptive follow-ups grounded in your actual answers. Practice in English, Urdu, or Roman Urdu.",
              gradient: "from-purple-400 to-pink-400",
              delay: "0.1s",
            },
            {
              icon: Sparkles,
              title: "Resume Intelligence",
              desc: "Structured analysis that understands your real skills. Never a fabricated qualification.",
              gradient: "from-amber-400 to-orange-400",
              delay: "0.2s",
            },
            {
              icon: TrendingUp,
              title: "Career Roadmap",
              desc: "A concrete, sequenced plan built from your real gaps. Know exactly what to learn next.",
              gradient: "from-rose-400 to-pink-400",
              delay: "0.3s",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/5"
              style={{ animationDelay: feature.delay }}
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative z-10">
                <div className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 text-[#0a0a0a] shadow-lg`}>
                  <feature.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                <div className="mt-6 flex items-center text-sm text-blue-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                  <span>Learn more</span>
                  <ArrowRight size={14} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works - Apple style */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Your journey to
            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              a new career
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">In three simple steps</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Build your profile",
              desc: "Upload your resume or link your LinkedIn. ProHire extracts and structures your skills, experience, and education instantly.",
              icon: FileText,
            },
            {
              step: "02",
              title: "Get matched & practice",
              desc: "Receive a compatibility score for each job, practice with adaptive AI interviews in your preferred language.",
              icon: MessageSquare,
            },
            {
              step: "03",
              title: "Receive your roadmap",
              desc: "Get a personalized skill development plan with courses, projects, and timelines to close your gaps.",
              icon: BarChart3,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 group"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {item.step}
                </div>
                <div className="rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 p-2">
                  <item.icon size={20} className="text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              {idx < 2 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-slate-700 md:block">
                  <ChevronRight size={28} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials - Apple style */}
      <section id="testimonials" className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Loved by
            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              job seekers
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">Real stories from real people</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Ayesha Khan",
              role: "Software Engineer",
              content: "ProHire's AI interview in Urdu was a game-changer. I felt confident and prepared. Landed my dream job at a top tech company!",
              rating: 5,
              initial: "AK",
            },
            {
              name: "Bilal Ahmed",
              role: "Marketing Specialist",
              content: "The career roadmap helped me identify exactly what skills I needed. Within 3 months, I had a job offer from a multinational.",
              rating: 5,
              initial: "BA",
            },
            {
              name: "Fatima Noor",
              role: "Recent Graduate",
              content: "I was struggling to get interviews until I used ProHire. The match scores and interview prep are incredibly accurate.",
              rating: 5,
              initial: "FN",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">"{testimonial.content}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-sm font-bold text-[#0a0a0a]">
                  {testimonial.initial}
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

      {/* Pricing - Apple style */}
      <section id="pricing" className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Simple, transparent
            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">Start free, scale as you grow</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {[
            {
              name: "Free",
              price: "$0",
              description: "Perfect for getting started",
              features: [
                "Basic profile building",
                "5 job matches per month",
                "1 AI interview per month",
                "Basic career roadmap",
                "Email support",
              ],
              cta: "Get started",
              popular: false,
            },
            {
              name: "Pro",
              price: "$19",
              description: "For serious job seekers",
              features: [
                "Advanced profile building",
                "Unlimited job matches",
                "Unlimited AI interviews",
                "Detailed career roadmap",
                "Priority support",
                "Language preferences",
                "Resume optimization",
              ],
              cta: "Start trial",
              popular: true,
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl border p-8 backdrop-blur-sm transition-all ${
                plan.popular
                  ? "border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-purple-500/10 shadow-2xl shadow-blue-500/10"
                  : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-slate-400">/month</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`block w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                    : "border border-white/10 text-white hover:bg-white/5 hover:scale-105"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA - Apple style */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-purple-500/10 p-12 text-center backdrop-blur-sm border border-white/5 md:p-20">
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Ready to accelerate
              <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                your career?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              Join thousands of job seekers in Pakistan who are using ProHire to land their dream jobs.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
              >
                Get started free
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Learn more
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">No credit card required. Free forever for early adopters.</p>
          </div>
        </div>
      </section>

      {/* Footer - Apple style */}
      <footer className="border-t border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center gap-2 group cursor-pointer mb-4">
                <div className="relative h-8 w-8 overflow-hidden rounded-xl bg-gradient-to-br from-blue-400 via-teal-400 to-purple-400 p-[2px] shadow-lg shadow-blue-500/20 transition-all duration-500 group-hover:shadow-blue-500/40">
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-[#0a0a0a]">
                    <Zap size={16} className="fill-blue-400 text-blue-400" />
                  </div>
                </div>
                <span className="text-xl font-semibold tracking-tight">
                  Pro<span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">Hire</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 max-w-sm">
                Your AI career agent for the Pakistani job market. From profile to placement.
              </p>
              <div className="mt-4 flex gap-4">
                {["Twitter", "LinkedIn", "YouTube"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-sm text-slate-500 transition-colors hover:text-white"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
            <div className="text-xs text-slate-500">
              © 2025 ProHire. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-slate-500">
              <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
