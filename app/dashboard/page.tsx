"use client";

import { useEffect, useState, useMemo } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AgentStatusPill } from "@/components/AgentStatusPill";
import {
  User,
  Target,
  Mic,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Briefcase,
  BarChart3,
  Compass,
  Rocket,
  ChevronRight,
  CheckCircle,
  Zap,
  Search,
  Bell,
  Settings,
  MoreHorizontal,
  LayoutDashboard,
  Users,
  AlertCircle,
  Filter,
  Plus,
  Star,
  Shield,
  Clock,
  Calendar,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

interface ProfileSummary {
  fullName: string;
  skills: string[];
  preferredRole?: string;
}

type AgentStatus = "done" | "idle" | "running";

interface Agent {
  name: string;
  shortName: string;
  description: string;
  icon: React.ElementType;
  status: AgentStatus;
  gradient: string;
}

const AGENTS: Agent[] = [
  {
    name: "Profile Agent",
    shortName: "Profile",
    description: "Your source of truth",
    icon: User,
    status: "done",
    gradient: "from-emerald-400/20 to-teal-400/5",
  },
  {
    name: "Job Discovery Agent",
    shortName: "Job Discovery",
    description: "Find your best opportunities",
    icon: Target,
    status: "idle",
    gradient: "from-blue-400/20 to-indigo-400/5",
  },
  {
    name: "Application Agent",
    shortName: "Applications",
    description: "Optimize every application",
    icon: Briefcase,
    status: "idle",
    gradient: "from-violet-400/20 to-purple-400/5",
  },
  {
    name: "Interview Agent",
    shortName: "Interview",
    description: "Prepare with adaptive AI",
    icon: Mic,
    status: "idle",
    gradient: "from-orange-400/20 to-amber-400/5",
  },
  {
    name: "Career Intelligence",
    shortName: "Career AI",
    description: "Turn gaps into a roadmap",
    icon: TrendingUp,
    status: "idle",
    gradient: "from-cyan-400/20 to-sky-400/5",
  },
];

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        const response = await apiFetch("/api/profile");

        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await response.json();

        if (mounted) {
          setProfile(data.profile ?? null);
        }
      } catch {
        if (mounted) {
          setProfileError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const hasProfile = Boolean(profile?.fullName);

  const firstName = useMemo(() => {
    if (!profile?.fullName) return "there";
    return profile.fullName.trim().split(/\s+/)[0];
  }, [profile?.fullName]);

  // Stats Data
  const stats = [
    { label: "Match Score", value: "94%", icon: Target, change: "+12%", color: "from-blue-400 to-teal-400" },
    { label: "Interviews", value: "12", icon: Mic, change: "+3 this week", color: "from-purple-400 to-pink-400" },
    { label: "Skill Progress", value: "78%", icon: BarChart3, change: "+5%", color: "from-amber-400 to-orange-400" },
    { label: "Applications", value: "8", icon: Briefcase, change: "2 pending", color: "from-rose-400 to-pink-400" },
  ];

  // Journey Steps
  const journeySteps = [
    {
      icon: User,
      title: "Profile",
      desc: "Your verified source of truth — skills, experience, projects, resume.",
      href: "/profile",
      cta: hasProfile ? "Edit Profile" : "Set Up Profile",
      done: hasProfile,
      disabled: false,
      color: "from-blue-400 to-teal-400",
      number: "01",
    },
    {
      icon: Target,
      title: "AI Job Matching",
      desc: "Explainable compatibility scores against Pakistan-relevant roles.",
      href: "/jobs",
      cta: "View Matches",
      done: false,
      disabled: !hasProfile,
      color: "from-purple-400 to-pink-400",
      number: "02",
    },
    {
      icon: Mic,
      title: "AI Interview",
      desc: "Adaptive, role-specific mock interview with live follow-ups.",
      href: "/interviews",
      cta: "Start Practice",
      done: false,
      disabled: !hasProfile,
      color: "from-amber-400 to-orange-400",
      number: "03",
    },
    {
      icon: TrendingUp,
      title: "Career Roadmap",
      desc: "A sequenced skill plan built from your real gaps.",
      href: "/roadmap",
      cta: "View Roadmap",
      done: false,
      disabled: !hasProfile,
      color: "from-rose-400 to-pink-400",
      number: "04",
    },
  ];

  if (status === "loading" || (loading && !profile && !profileError)) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute left-[30%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-300/5 blur-3xl" />
      </div>

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[28px] border border-black/[0.045] bg-white shadow-[0_16px_60px_rgba(15,23,42,0.045)]">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[620px] rounded-full bg-gradient-to-br from-cyan-200/35 via-blue-100/25 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-150px] right-[15%] h-[260px] w-[500px] rounded-full bg-emerald-200/15 blur-3xl" />

          <div className="relative grid min-h-[280px] items-center lg:grid-cols-[1fr_0.7fr]">
            <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-11 lg:py-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-slate-50/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]" />
                Your AI career workspace
              </div>

              <h1 className="max-w-[650px] text-[34px] font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-[46px] lg:text-[54px]">
                {hasProfile ? (
                  <>
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-slate-950 via-slate-700 to-slate-950 bg-clip-text text-transparent">
                      {firstName}.
                    </span>{" "}
                    <span className="inline-block">👋</span>
                  </>
                ) : (
                  <>
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      ProHire
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-5 max-w-[620px] text-[14px] leading-6 text-slate-500 sm:text-[15px]">
                Six specialized AI agents, coordinated by one intelligent
                orchestrator, working together to move your career forward.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {hasProfile ? (
                  <Link
                    href="/jobs"
                    className="group inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-[13px] font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Explore opportunities
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <Link
                    href="/profile"
                    className="group inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-[13px] font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Build your profile
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
                <Link
                  href="/roadmap"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-black/[0.07] bg-white/80 px-5 text-[13px] font-semibold text-slate-700 transition hover:border-black/10 hover:bg-white"
                >
                  View roadmap
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden h-full min-h-[280px] lg:block">
              <div className="absolute right-[14%] top-[18%] flex h-[170px] w-[170px] items-center justify-center rounded-full border border-white bg-white/70 shadow-[0_20px_60px_rgba(59,130,246,0.12)] backdrop-blur-xl">
                <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-50 to-blue-100/80">
                  <Sparkles size={40} strokeWidth={1.5} className="text-cyan-600" />
                </div>
              </div>
              <div className="absolute bottom-[22%] right-[42%] flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white/90 shadow-xl">
                <Zap size={18} className="text-amber-500" />
              </div>
              <div className="absolute right-[8%] top-[42%] rounded-2xl border border-white bg-white/85 px-4 py-3 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-semibold text-slate-700">
                    AI network operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Warning */}
        {!loading && !hasProfile && !profileError && (
          <section className="mt-5">
            <div className="group flex flex-col gap-4 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">
                    Unlock your complete ProHire workspace
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-slate-500">
                    Complete your profile so our agents can personalize
                    jobs, interviews and your career roadmap.
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Complete profile
                <ArrowRight size={13} />
              </Link>
            </div>
          </section>
        )}

        {/* Error */}
        {profileError && (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
            We couldn't load your profile right now. Please refresh and try again.
          </div>
        )}

        {/* Agent Status Row */}
        <div className="mt-6 flex flex-wrap gap-2">
          <AgentStatusPill label="Orchestrator" status="running" />
          <AgentStatusPill label="Profile Agent" status={hasProfile ? "done" : "idle"} />
          <AgentStatusPill label="Job Discovery" status={hasProfile ? "idle" : "idle"} />
          <AgentStatusPill label="Application Agent" status="idle" />
          <AgentStatusPill label="Interview Agent" status="idle" />
          <AgentStatusPill label="Career Intelligence" status="idle" />
        </div>

        {/* Quick Stats */}
        {hasProfile && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-black/[0.055] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]"
              >
                <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
                <div className="relative z-10">
                  <div className={`inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-2 text-white shadow-lg shadow-blue-500/20`}>
                    <stat.icon size={16} />
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold text-slate-950">{stat.value}</div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                    <div className="text-xs text-emerald-600 font-medium">{stat.change}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Agent Network */}
        <section className="mt-9">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                INTELLIGENCE LAYER
              </p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-slate-950">
                AI Agent Network
              </h2>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                One orchestrator. Specialized agents. One coordinated career journey.
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {AGENTS.map((agent, index) => (
              <AgentCard
                key={agent.name}
                agent={{
                  ...agent,
                  status:
                    index === 0
                      ? hasProfile
                        ? "done"
                        : "idle"
                      : hasProfile
                        ? "idle"
                        : "idle",
                }}
              />
            ))}
          </div>
        </section>

        {/* Career Journey */}
        <section className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                YOUR PROGRESS
              </p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-slate-950">
                Career Journey
              </h2>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Complete each stage to unlock the full power of ProHire.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-slate-400">
                {hasProfile ? "1" : "0"} / 4 completed
              </span>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={`h-1.5 w-7 rounded-full ${
                      step === 0 && hasProfile
                        ? "bg-emerald-500"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {journeySteps.map((step, idx) => (
              <JourneyCard key={idx} {...step} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative mt-8 overflow-hidden rounded-[24px] bg-slate-950 shadow-2xl shadow-slate-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(99,102,241,0.18),transparent_40%)]" />
          <div className="relative flex flex-col gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                <Rocket size={19} className="text-cyan-300" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300/80">
                  Your next chapter starts here
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
                  Turn your skills into opportunities.
                </h2>
                <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-400">
                  Let AI find the right roles, prepare you for interviews,
                  and build a smarter path toward your future.
                </p>
              </div>
            </div>
            <Link
              href={hasProfile ? "/jobs" : "/profile"}
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-bold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              {hasProfile ? "Explore jobs" : "Get started"}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        <footer className="flex flex-col gap-2 py-7 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>ProHire · AI-powered career intelligence</p>
          <p>Built for ambitious careers.</p>
        </footer>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Agent Card                                                                 */
/* -------------------------------------------------------------------------- */

function AgentCard({ agent }: { agent: Agent }) {
  const Icon = agent.icon;

  const statusMap = {
    done: { label: "Complete", dot: "bg-emerald-500", text: "text-emerald-600" },
    idle: { label: "Waiting", dot: "bg-slate-300", text: "text-slate-400" },
    running: { label: "Running", dot: "bg-blue-500 animate-pulse", text: "text-blue-600" },
  };

  const status = statusMap[agent.status];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-black/[0.055] bg-gradient-to-br ${agent.gradient} bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-black/[0.09] hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]`}
    >
      <div className="relative flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/[0.035]">
          <Icon size={17} className="text-slate-700" strokeWidth={1.8} />
        </div>
        <ChevronRight
          size={15}
          className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500"
        />
      </div>
      <p className="mt-3 text-[11px] font-semibold text-slate-900">
        {agent.name}
      </p>
      <p className="mt-0.5 line-clamp-1 text-[10px] text-slate-400">
        {agent.description}
      </p>
      <div className={`mt-3 flex items-center gap-1.5 text-[9px] font-semibold ${status.text}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
        {status.label}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Journey Card                                                               */
/* -------------------------------------------------------------------------- */

function JourneyCard({
  icon: Icon,
  title,
  desc,
  href,
  cta,
  done,
  disabled,
  color,
  number,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  cta: string;
  done?: boolean;
  disabled?: boolean;
  color: string;
  number: string;
}) {
  return (
    <div
      className={`group relative min-h-[280px] overflow-hidden rounded-[22px] border border-black/[0.055] bg-white p-5 transition duration-300 ${
        disabled
          ? "opacity-[0.72]"
          : "hover:-translate-y-1 hover:border-black/[0.09] hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
      }`}
    >
      {/* Bottom decorative gradient */}
      <div
        className={`pointer-events-none absolute -bottom-24 -right-20 h-48 w-64 rounded-full bg-gradient-to-t ${color.replace("from-", "from-").replace("to-", "to-")}/20 to-transparent blur-2xl transition duration-500 group-hover:scale-125`}
      />

      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.08em] text-slate-300">
          {number}
        </span>
        {done ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
            <CheckCircle size={11} />
            Complete
          </span>
        ) : disabled ? (
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-semibold text-slate-400">
            Locked
          </span>
        ) : (
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-semibold text-blue-600">
            Ready
          </span>
        )}
      </div>

      <div
        className={`relative mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} p-2.5 text-white shadow-sm`}
      >
        <Icon size={20} />
      </div>

      <div className="relative mt-5">
        <h3 className="text-[18px] font-semibold tracking-[-0.025em] text-slate-950">
          {title}
        </h3>
        <p className="mt-2 max-w-[260px] text-[11px] leading-5 text-slate-500">
          {desc}
        </p>
      </div>

      <div className="relative mt-5">
        {disabled ? (
          <span className="text-[10px] font-medium text-slate-400">
            Complete your profile first
          </span>
        ) : (
          <Link
            href={href}
            className="group/link inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-800"
          >
            <span className="border-b border-slate-300 pb-0.5 transition group-hover/link:border-slate-800">
              {cta}
            </span>
            <ArrowRight
              size={13}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading Skeleton                                                           */
/* -------------------------------------------------------------------------- */

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="flex min-h-screen">
        <div className="flex-1">
          <div className="h-[72px] border-b border-black/[0.05] bg-white/75 backdrop-blur-2xl" />
          <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
            <div className="h-[280px] animate-pulse rounded-[28px] bg-white" />
            <div className="mt-6 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
              ))}
            </div>
            <div className="mt-9">
              <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200/60" />
              <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200/50" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="h-[150px] animate-pulse rounded-2xl bg-white" />
                ))}
              </div>
            </div>
            <div className="mt-10">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-[280px] animate-pulse rounded-[22px] bg-white" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
