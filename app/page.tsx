import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Target,
  Mic,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  ChevronDown,
  Play,
  Users,
  Briefcase,
  Award,
  Shield,
  Layers,
  Cpu,
  MessageSquare,
  FileText,
  BarChart3,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
  User,
  Building,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white antialiased selection:bg-blue-500/30 selection:text-white">
      {/* Premium gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-[20%] -top-[40%] h-[100vh] w-[100vh] animate-pulse rounded-full bg-gradient-to-br from-blue-600/20 via-teal-500/15 to-purple-600/20 blur-[150px]" />

        <div className="absolute -bottom-[40%] -left-[20%] h-[100vh] w-[100vh] animate-pulse rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-500/15 to-blue-600/20 blur-[150px] delay-1000" />

        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 via-teal-500/5 to-purple-500/5 blur-[120px]" />

        <div className="absolute left-0 top-0 h-full w-full bg-[url('/grid.svg')] opacity-[0.015]" />
      </div>

      {/* ========================================================= */}
      {/* NAVIGATION */}
      {/* ========================================================= */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#050505]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center"
              aria-label="ProHire Home"
            >
              <Image
                src="/images/prohire.png"
                alt="ProHire"
                width={160}
                height={48}
                priority
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              {["Features", "Solutions", "Integrations", "Pricing"].map(
                (item) => (
                  <div key={item} className="group relative">
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="flex items-center gap-1 text-sm font-medium text-slate-400 transition-all hover:text-white"
                    >
                      {item}

                      {item !== "Pricing" && (
                        <ChevronDown size={14} className="opacity-50" />
                      )}
                    </Link>

                    <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden rounded-full px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/5 hover:text-white lg:block"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 active:scale-95"
            >
              <span className="relative z-10">Get Started</span>

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 transition-transform duration-500 group-hover:translate-x-0" />

              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 text-center md:px-8 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <div className="mb-8 inline-flex animate-in items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs text-slate-300 backdrop-blur-sm duration-1000 slide-in-from-top-5 fade-in">
            <Sparkles size={14} className="text-blue-400" />

            <span className="font-medium">
              Enterprise-grade AI for the Pakistani job market
            </span>

            <span className="ml-1 h-1 w-1 rounded-full bg-blue-400/50" />

            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold text-transparent">
              v3.0
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
            Transform Your

            <span className="mt-3 block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Career Trajectory
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-xl">
            ProHire leverages advanced AI to match you with opportunities,
            conduct adaptive interviews in multiple languages, and create
            personalized skill roadmaps — all designed for the Pakistani
            market.
          </p>

          {/* Hero Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 active:scale-95"
            >
              Start Free Trial

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#demo"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-10 py-4 text-base font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Play size={18} className="fill-current" />

              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/5 pt-12 md:grid-cols-4">
            {[
              {
                value: "94%",
                label: "Match Accuracy",
                icon: Target,
              },
              {
                value: "12K+",
                label: "Jobs Matched",
                icon: Briefcase,
              },
              {
                value: "4.8",
                label: "Avg. Rating",
                icon: Star,
              },
              {
                value: "99.9%",
                label: "Uptime",
                icon: Shield,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2"
              >
                <stat.icon
                  size={20}
                  className="text-blue-400"
                />

                <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {stat.value}
                </div>

                <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="mx-auto mt-24 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-[1px] shadow-2xl shadow-blue-500/10">
          <div className="rounded-2xl bg-[#0a0a0a] p-4">
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-purple-500/10 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Dashboard Preview
                  </div>

                  <div className="mt-2 text-2xl font-bold text-white">
                    Welcome back, User
                  </div>

                  <div className="mt-1 text-sm text-slate-400">
                    Your career insights are ready
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Bell
                      size={16}
                      className="text-slate-400"
                    />
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <User
                      size={16}
                      className="text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {/* Match Score */}
                <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                  <div className="text-xs text-slate-500">
                    Match Score
                  </div>

                  <div className="mt-1 text-2xl font-bold text-white">
                    94%
                  </div>

                  <div className="mt-1 h-1 w-full rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  </div>
                </div>

                {/* Interviews */}
                <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                  <div className="text-xs text-slate-500">
                    Interviews Completed
                  </div>

                  <div className="mt-1 text-2xl font-bold text-white">
                    12
                  </div>

                  <div className="mt-1 text-xs text-teal-400">
                    ↑ 23% this month
                  </div>
                </div>

                {/* Skills */}
                <div className="rounded-lg border border-white/5 bg-white/5 p-4">
                  <div className="text-xs text-slate-500">
                    Skill Progress
                  </div>

                  <div className="mt-1 text-2xl font-bold text-white">
                    78%
                  </div>

                  <div className="mt-1 text-xs text-blue-400">
                    5 skills to master
                  </div>
                </div>
              </div>

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURES */}
      {/* ========================================================= */}

      <section
        id="features"
        className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8"
      >
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400">
            <Cpu
              size={14}
              className="text-blue-400"
            />

            <span>AI-Powered Platform</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Enterprise-Grade

            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Career Intelligence
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Leverage cutting-edge AI to transform your job search into a
            strategic career move
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Target,
              title: "Precision Matching",
              desc: "Our AI analyzes your skills, experience, and preferences to find the perfect opportunities with explainable compatibility scores.",
              gradient: "from-blue-400 to-teal-400",
              delay: "0s",
              stats: "94% accuracy",
            },
            {
              icon: Mic,
              title: "Adaptive Interviews",
              desc: "Practice with AI that asks contextual follow-up questions in English, Urdu, or Roman Urdu — just like a real interviewer.",
              gradient: "from-purple-400 to-pink-400",
              delay: "0.1s",
              stats: "3 languages",
            },
            {
              icon: Sparkles,
              title: "Resume Intelligence",
              desc: "Get structured, honest feedback on your resume. We highlight strengths and identify gaps without fabricating qualifications.",
              gradient: "from-amber-400 to-orange-400",
              delay: "0.2s",
              stats: "AI-powered",
            },
            {
              icon: TrendingUp,
              title: "Career Roadmap",
              desc: "Receive a personalized, sequenced learning plan with specific courses, projects, and timelines to close your skill gaps.",
              gradient: "from-rose-400 to-pink-400",
              delay: "0.3s",
              stats: "Personalized",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/5"
              style={{
                animationDelay: feature.delay,
              }}
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />

              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-teal-500/10 to-blue-500/10 opacity-0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

              <div className="relative z-10">
                <div
                  className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${feature.gradient} p-3.5 text-[#050505] shadow-lg shadow-blue-500/20`}
                >
                  <feature.icon size={22} />
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {feature.desc}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />

                  <span className="text-xs font-medium text-blue-400">
                    {feature.stats}
                  </span>

                  <div className="h-px flex-1 bg-gradient-to-l from-blue-500/20 to-transparent" />
                </div>

                <div className="mt-6 flex translate-x-0 items-center text-sm text-blue-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                  <span>Learn more</span>

                  <ArrowRight
                    size={14}
                    className="ml-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SOLUTIONS */}
      {/* ========================================================= */}

      <section
        id="solutions"
        className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8"
      >
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400">
            <Users
              size={14}
              className="text-teal-400"
            />

            <span>Solutions for Everyone</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Built for

            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Every Career Stage
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Students & Graduates",
              desc: "Kickstart your career with AI-guided interviews, resume building, and personalized skill development plans.",
              features: [
                "Mock interviews",
                "Resume optimization",
                "Skill assessment",
              ],
              color: "from-blue-400 to-teal-400",
            },
            {
              icon: Briefcase,
              title: "Professionals",
              desc: "Level up your career with precision job matching, adaptive interviews, and strategic career roadmaps.",
              features: [
                "Precision matching",
                "Advanced interviews",
                "Career roadmap",
              ],
              color: "from-purple-400 to-pink-400",
            },
            {
              icon: Building,
              title: "Enterprises",
              desc: "Streamline your hiring with AI-powered candidate assessment, skill verification, and talent matching.",
              features: [
                "Talent matching",
                "Skill verification",
                "Assessment tools",
              ],
              color: "from-amber-400 to-orange-400",
            },
          ].map((solution, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10"
            >
              <div
                className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${solution.color} p-3 text-[#050505]`}
              >
                <solution.icon size={22} />
              </div>

              <h3 className="text-xl font-semibold text-white">
                {solution.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {solution.desc}
              </p>

              <ul className="mt-4 space-y-2">
                {solution.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle
                      size={14}
                      className="flex-shrink-0 text-teal-400"
                    />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center text-sm text-blue-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                <span>Explore solution</span>

                <ArrowRight
                  size={14}
                  className="ml-1"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* HOW IT WORKS */}
      {/* ========================================================= */}

      <section
        id="integrations"
        className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8"
      >
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400">
            <Layers
              size={14}
              className="text-purple-400"
            />

            <span>Seamless Process</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Your Journey to

            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Career Success
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Profile Creation",
              desc: "Upload your resume or connect your LinkedIn. Our AI extracts and structures your skills, experience, and education instantly.",
              icon: FileText,
              gradient: "from-blue-400 to-teal-400",
            },
            {
              step: "02",
              title: "AI Assessment",
              desc: "Receive a compatibility score for each job, practice with adaptive AI interviews in your preferred language.",
              icon: MessageSquare,
              gradient: "from-purple-400 to-pink-400",
            },
            {
              step: "03",
              title: "Roadmap Generation",
              desc: "Get a personalized skill development plan with courses, projects, and timelines to close your gaps.",
              icon: BarChart3,
              gradient: "from-amber-400 to-orange-400",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-4xl font-bold text-transparent`}
                >
                  {item.step}
                </div>

                <div className="rounded-xl bg-white/5 p-2.5">
                  <item.icon
                    size={20}
                    className="text-white"
                  />
                </div>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {item.desc}
              </p>

              {idx < 2 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-slate-700 md:block">
                  <ChevronRightIcon size={28} />
                </div>
              )}

              <div className="mt-6 h-1 w-full rounded-full bg-white/5">
                <div
                  className={`h-full w-0 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-1000 group-hover:w-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* TESTIMONIALS */}
      {/* ========================================================= */}

      <section
        id="pricing"
        className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8"
      >
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400">
            <Heart
              size={14}
              className="text-rose-400"
            />

            <span>Trusted by Professionals</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            What Our Users Say

            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              About Their Success
            </span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Ayesha Khan",
              role: "Senior Software Engineer",
              company: "TechCorp Pakistan",
              content:
                "ProHire's AI interview in Urdu was transformative. I felt completely prepared and confident. Within weeks, I landed my dream role at a top tech company.",
              initial: "AK",
              gradient: "from-blue-400 to-teal-400",
            },
            {
              name: "Bilal Ahmed",
              role: "Marketing Director",
              company: "Global Brands Ltd",
              content:
                "The career roadmap was eye-opening. It identified skill gaps I didn't know existed. Three months later, I had a job offer from a multinational corporation.",
              initial: "BA",
              gradient: "from-purple-400 to-pink-400",
            },
            {
              name: "Dr. Fatima Noor",
              role: "AI Research Scientist",
              company: "Innovation Labs",
              content:
                "As someone who understands AI, I'm impressed by the sophistication of ProHire's matching algorithm and interview system. It's genuinely state-of-the-art.",
              initial: "FN",
              gradient: "from-amber-400 to-orange-400",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/10 hover:bg-white/10"
            >
              <div className="mb-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                "{testimonial.content}"
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-bold text-[#050505]`}
                >
                  {testimonial.initial}
                </div>

                <div>
                  <div className="text-sm font-medium text-white">
                    {testimonial.name}
                  </div>

                  <div className="text-xs text-slate-500">
                    {testimonial.role}
                  </div>

                  <div className="text-[10px] text-slate-600">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* PRICING */}
      {/* ========================================================= */}

      <section className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400">
            <Award
              size={14}
              className="text-amber-400"
            />

            <span>Flexible Plans</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Choose Your

            <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Success Plan
            </span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {[
            {
              name: "Starter",
              price: "$0",
              description:
                "Perfect for getting started with your career journey",
              features: [
                "Basic profile building",
                "5 job matches per month",
                "1 AI interview per month",
                "Basic career roadmap",
                "Email support",
                "Resume upload",
              ],
              cta: "Start Free",
              popular: false,
              gradient: "from-blue-400 to-teal-400",
            },
            {
              name: "Professional",
              price: "$19",
              description:
                "For serious job seekers ready to accelerate their career",
              features: [
                "Advanced profile building",
                "Unlimited job matches",
                "Unlimited AI interviews",
                "Detailed career roadmap",
                "Priority support",
                "3 language preferences",
                "Resume optimization",
                "Interview analytics",
                "Skill progress tracking",
              ],
              cta: "Start Trial",
              popular: true,
              gradient: "from-purple-400 to-pink-400",
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl border p-8 backdrop-blur-sm transition-all hover:-translate-y-1 ${
                plan.popular
                  ? "border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-pink-500/10 shadow-2xl shadow-purple-500/10"
                  : "border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-1.5 text-xs font-semibold text-white shadow-lg shadow-purple-500/30">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>

                  <span className="text-sm text-slate-400">
                    /month
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle
                      size={16}
                      className="mt-0.5 flex-shrink-0 text-teal-400"
                    />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full rounded-xl px-6 py-3.5 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:scale-[1.02] hover:shadow-purple-500/50"
                    : "border border-white/10 text-white hover:scale-[1.02] hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <section className="relative mx-auto max-w-7xl px-6 pb-32 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-purple-500/10 p-12 text-center shadow-2xl shadow-blue-500/5 backdrop-blur-sm md:p-20">
          <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-purple-500/20 blur-3xl delay-1000" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400">
              <Rocket
                size={14}
                className="text-blue-400"
              />

              <span>Launch Your Career Today</span>
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Ready to Transform

              <span className="block bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                Your Career?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              Join thousands of professionals in Pakistan who are using
              ProHire to achieve their career goals.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 active:scale-95"
              >
                Get Started Free

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-10 py-4 text-base font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Contact Sales

                <ArrowUpRight size={18} />
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              ✓ No credit card required ✓ Free forever for early adopters ✓
              Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer className="border-t border-white/5 bg-[#050505] py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-5">
            {/* Footer Brand */}
            <div className="col-span-2">
              <Link
                href="/"
                className="group mb-4 inline-flex items-center"
                aria-label="ProHire Home"
              >
                <Image
                  src="/images/prohire.png"
                  alt="ProHire"
                  width={170}
                  height={50}
                  className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                ProHire is the leading AI career platform for the Pakistani
                job market, helping professionals land their dream jobs
                through intelligent matching and skill development.
              </p>

              {/* Social Links */}
              <div className="mt-6 flex gap-4">
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="text-slate-500 transition-all hover:scale-110 hover:text-white"
                >
                  <Twitter size={18} />
                </Link>

                <Link
                  href="#"
                  aria-label="LinkedIn"
                  className="text-slate-500 transition-all hover:scale-110 hover:text-white"
                >
                  <Linkedin size={18} />
                </Link>

                <Link
                  href="#"
                  aria-label="GitHub"
                  className="text-slate-500 transition-all hover:scale-110 hover:text-white"
                >
                  <Github size={18} />
                </Link>

                <Link
                  href="#"
                  aria-label="YouTube"
                  className="text-slate-500 transition-all hover:scale-110 hover:text-white"
                >
                  <Youtube size={18} />
                </Link>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Product
              </h4>

              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link
                    href="#features"
                    className="transition-colors hover:text-white"
                  >
                    Features
                  </Link>
                </li>

                <li>
                  <Link
                    href="#pricing"
                    className="transition-colors hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>

                <li>
                  <Link
                    href="#integrations"
                    className="transition-colors hover:text-white"
                  >
                    Integrations
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Changelog
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Company
              </h4>

              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Careers
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-white"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Support
              </h4>

              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Documentation
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    API Status
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Community
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="transition-colors hover:text-white"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
            <div className="text-xs text-slate-500">
              © 2025 ProHire. All rights reserved. Built with ❤️ in Pakistan
            </div>

            <div className="flex gap-6 text-xs text-slate-500">
              <Link
                href="#"
                className="transition-colors hover:text-slate-300"
              >
                Privacy Policy
              </Link>

              <Link
                href="#"
                className="transition-colors hover:text-slate-300"
              >
                Terms of Service
              </Link>

              <Link
                href="#"
                className="transition-colors hover:text-slate-300"
              >
                Cookie Policy
              </Link>

              <Link
                href="#"
                className="transition-colors hover:text-slate-300"
              >
                GDPR
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ========================================================= */
/* CUSTOM ICONS */
/* ========================================================= */

const Bell = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const GraduationCap = (
  props: React.SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6" />
    <path d="m2 10 10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
