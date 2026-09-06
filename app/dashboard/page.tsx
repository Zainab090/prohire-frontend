
"use client";

import { useEffect, useMemo, useState, type ElementType } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Compass,
  LayoutDashboard,
  Menu,
  Mic,
  MoreHorizontal,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

interface ProfileSummary {
  fullName: string;
  skills: string[];
  preferredRole?: string;
}

type AgentStatus = "done" | "ready" | "idle";

interface Agent {
  name: string;
  shortName: string;
  description: string;
  icon: ElementType;
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
    status: "ready",
    gradient: "from-blue-400/20 to-indigo-400/5",
  },
  {
    name: "Application Agent",
    shortName: "Applications",
    description: "Optimize every application",
    icon: BriefcaseBusiness,
    status: "ready",
    gradient: "from-violet-400/20 to-purple-400/5",
  },
  {
    name: "Interview Agent",
    shortName: "Interview",
    description: "Prepare with adaptive AI",
    icon: Mic,
    status: "ready",
    gradient: "from-orange-400/20 to-amber-400/5",
  },
  {
    name: "Career Intelligence",
    shortName: "Career AI",
    description: "Turn gaps into a roadmap",
    icon: TrendingUp,
    status: "ready",
    gradient: "from-cyan-400/20 to-sky-400/5",
  },
];

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  const initials = useMemo(() => {
    if (!profile?.fullName) return "P";

    return profile.fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, [profile?.fullName]);

  if (status === "loading" || (loading && !profile)) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#0b1220]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute left-[30%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-300/5 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-[248px] shrink-0 border-r border-black/[0.055] bg-white/75 backdrop-blur-2xl lg:flex lg:flex-col">
          <Sidebar initials={initials} />
        </aside>

        {/* Mobile Navigation */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Close navigation"
              className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
            />

            <aside className="relative flex h-full w-[285px] flex-col border-r border-black/[0.06] bg-white shadow-2xl">
              <div className="flex items-center justify-between px-6 py-5">
                <Logo />

                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={19} />
                </button>
              </div>

              <SidebarContent initials={initials} />
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top bar */}
          <header className="sticky top-0 z-30 h-[72px] border-b border-black/[0.045] bg-white/75 backdrop-blur-2xl">
            <div className="flex h-full items-center gap-3 px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu size={21} />
              </button>

              {/* Mobile logo */}
              <div className="lg:hidden">
                <Logo />
              </div>

              {/* Search */}
              <div className="relative hidden max-w-[520px] flex-1 md:block">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  placeholder="Search jobs, skills, or ask your AI assistant..."
                  className="h-11 w-full rounded-2xl border border-black/[0.055] bg-slate-50/80 pl-11 pr-20 text-[13px] outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-900/[0.025]"
                />

                <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-lg border border-black/[0.05] bg-white px-2 py-1 text-[10px] font-medium text-slate-400 shadow-sm sm:block">
                  ⌘ K
                </kbd>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  aria-label="Notifications"
                  className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <Bell size={18} />
                  <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                <div className="mx-1 hidden h-7 w-px bg-black/[0.06] sm:block" />

                <button className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-slate-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-950 text-[11px] font-semibold text-white shadow-sm">
                    {initials}
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="max-w-[130px] truncate text-xs font-semibold text-slate-900">
                      {profile?.fullName || "ProHire User"}
                    </p>
                    <p className="max-w-[130px] truncate text-[10px] text-slate-400">
                      {profile?.preferredRole || "Career Explorer"}
                    </p>
                  </div>

                  <ChevronDown
                    size={14}
                    className="hidden text-slate-400 sm:block"
                  />
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 sm:py-9 lg:px-10 xl:px-12">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-[28px] border border-black/[0.045] bg-white shadow-[0_16px_60px_rgba(15,23,42,0.045)]">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[620px] rounded-full bg-gradient-to-br from-cyan-200/35 via-blue-100/25 to-transparent blur-3xl" />

              <div className="pointer-events-none absolute bottom-[-150px] right-[15%] h-[260px] w-[500px] rounded-full bg-emerald-200/15 blur-3xl" />

              {/* Abstract path */}
              <div className="pointer-events-none absolute right-[-30px] top-0 hidden h-full w-[48%] overflow-hidden lg:block">
                <div className="absolute right-[8%] top-[18%] h-[260px] w-[260px] rounded-full bg-blue-100/40 blur-3xl" />
                <div className="absolute right-[18%] top-[34%] h-[180px] w-[380px] -rotate-12 rounded-[100%] border-[22px] border-cyan-100/30 blur-[1px]" />
                <div className="absolute right-[2%] top-[53%] h-[150px] w-[420px] rotate-[-8deg] rounded-[100%] border-[18px] border-emerald-100/25" />
              </div>

              <div className="relative grid min-h-[310px] items-center lg:grid-cols-[1fr_0.7fr]">
                <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-11 lg:py-12">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-slate-50/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]" />
                    Your AI career workspace
                  </div>

                  <h1 className="max-w-[650px] text-[34px] font-semibold leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-[46px] lg:text-[54px]">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-slate-950 via-slate-700 to-slate-950 bg-clip-text text-transparent">
                      {firstName}.
                    </span>{" "}
                    <span className="inline-block">👋</span>
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
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    ) : (
                      <Link
                        href="/profile"
                        className="group inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-[13px] font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                      >
                        Build your profile
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
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
                <div className="relative hidden h-full min-h-[310px] lg:block">
                  <div className="absolute right-[14%] top-[18%] flex h-[170px] w-[170px] items-center justify-center rounded-full border border-white bg-white/70 shadow-[0_20px_60px_rgba(59,130,246,0.12)] backdrop-blur-xl">
                    <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-50 to-blue-100/80">
                      <Sparkles
                        size={40}
                        strokeWidth={1.5}
                        className="text-cyan-600"
                      />
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

            {/* Profile alert */}
            {!loading && !hasProfile && !profileError && (
              <section className="mt-5">
                <div className="group flex flex-col gap-4 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <Sparkles size={18} />
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
                We couldn't load your profile right now. Please refresh and
                try again.
              </div>
            )}

            {/* Agent Network */}
            <section className="mt-9">
              <SectionHeader
                eyebrow="INTELLIGENCE LAYER"
                title="AI Agent Network"
                description="One orchestrator. Specialized agents. One coordinated career journey."
                right={
                  <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700 sm:flex">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    All systems operational
                  </div>
                }
              />

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
                            ? "ready"
                            : "idle",
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Career Journey */}
            <section className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeader
                  eyebrow="YOUR PROGRESS"
                  title="Career Journey"
                  description="Complete each stage to unlock the full power of ProHire."
                />

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
                <JourneyCard
                  number="01"
                  icon={User}
                  title="Profile"
                  description="Your verified source of truth — skills, experience, projects and resume."
                  href="/profile"
                  cta={hasProfile ? "Edit profile" : "Set up profile"}
                  done={hasProfile}
                  accent="emerald"
                />

                <JourneyCard
                  number="02"
                  icon={Target}
                  title="AI Job Matching"
                  description="Explainable compatibility scores against relevant opportunities."
                  href="/jobs"
                  cta="View matches"
                  disabled={!hasProfile}
                  accent="blue"
                />

                <JourneyCard
                  number="03"
                  icon={Mic}
                  title="AI Interview"
                  description="Adaptive, role-specific mock interviews with intelligent follow-ups."
                  href="/jobs"
                  cta="Start from a match"
                  disabled={!hasProfile}
                  accent="violet"
                />

                <JourneyCard
                  number="04"
                  icon={TrendingUp}
                  title="Career Roadmap"
                  description="A sequenced skill plan built around your real career gaps."
                  href="/roadmap"
                  cta="View roadmap"
                  disabled={!hasProfile}
                  accent="cyan"
                />
              </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative mt-8 overflow-hidden rounded-[24px] bg-slate-950 shadow-2xl shadow-slate-900/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(99,102,241,0.18),transparent_40%)]" />

              <div className="relative flex flex-col gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                    <Sparkles size={19} className="text-cyan-300" />
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
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </section>

            <footer className="flex flex-col gap-2 py-7 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>ProHire · AI-powered career intelligence</p>
              <p>Built for ambitious careers.</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function Sidebar({ initials }: { initials: string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Logo />
      </div>

      <SidebarContent initials={initials} />
    </div>
  );
}

function SidebarContent({ initials }: { initials: string }) {
  const navigation = [
    {
      label: "Workspace",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          active: true,
        },
        {
          label: "Profile",
          href: "/profile",
          icon: User,
        },
        {
          label: "Jobs",
          href: "/jobs",
          icon: BriefcaseBusiness,
        },
        {
          label: "Interview",
          href: "/jobs",
          icon: Mic,
        },
        {
          label: "Roadmap",
          href: "/roadmap",
          icon: TrendingUp,
        },
      ],
    },
    {
      label: "Intelligence",
      items: [
        {
          label: "AI Agents",
          href: "/agents",
          icon: Sparkles,
        },
      ],
    },
  ];

  return (
    <>
      <nav className="flex-1 px-3">
        {navigation.map((group) => (
          <div key={group.label} className="mb-7">
            <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {group.label}
            </p>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group flex h-10 items-center gap-3 rounded-xl px-3 text-[12px] font-medium transition ${
                      item.active
                        ? "bg-slate-950/[0.055] text-slate-950"
                        : "text-slate-500 hover:bg-slate-950/[0.035] hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={item.active ? 2 : 1.7}
                      className={
                        item.active
                          ? "text-slate-900"
                          : "text-slate-400 transition group-hover:text-slate-700"
                      }
                    />
                    {item.label}

                    {item.active && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-slate-950" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-4 pb-4">
        <div className="relative overflow-hidden rounded-2xl border border-cyan-100/80 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-200/20 blur-2xl" />

          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04]">
              <Sparkles size={15} className="text-cyan-600" />
            </div>

            <p className="mt-3 text-[11px] font-bold text-slate-900">
              Powered by AI.
            </p>

            <p className="mt-1 text-[10px] leading-4 text-slate-500">
              Built around your goals, skills and next opportunity.
            </p>
          </div>
        </div>

        <Link
          href="/settings"
          className="mt-2 flex h-10 items-center gap-3 rounded-xl px-3 text-[12px] font-medium text-slate-500 transition hover:bg-slate-950/[0.035] hover:text-slate-900"
        >
          <Settings size={17} className="text-slate-400" />
          Settings
        </Link>

        <div className="mt-2 flex items-center gap-3 border-t border-black/[0.045] px-2 pt-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold text-slate-800">
              ProHire Member
            </p>
            <p className="text-[9px] text-slate-400">Personal workspace</p>
          </div>

          <MoreHorizontal size={15} className="ml-auto text-slate-400" />
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <Link href="/dashboard" className="group flex items-center gap-2.5">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="absolute h-7 w-4 -translate-x-1.5 rotate-[30deg] rounded-[6px] bg-cyan-500/90 transition-transform duration-300 group-hover:-rotate-[15deg]" />
        <div className="absolute h-7 w-4 translate-x-1.5 rotate-[30deg] rounded-[6px] bg-blue-500/90 transition-transform duration-300 group-hover:rotate-[45deg]" />
      </div>

      <span className="text-[18px] font-bold tracking-[-0.045em] text-slate-950">
        ProHire
      </span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Agent Card                                                                 */
/* -------------------------------------------------------------------------- */

function AgentCard({ agent }: { agent: Agent }) {
  const Icon = agent.icon;

  const statusMap = {
    done: {
      label: "Complete",
      dot: "bg-emerald-500",
      text: "text-emerald-600",
    },
    ready: {
      label: "Ready",
      dot: "bg-blue-500",
      text: "text-blue-600",
    },
    idle: {
      label: "Waiting",
      dot: "bg-slate-300",
      text: "text-slate-400",
    },
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
  number,
  icon: Icon,
  title,
  description,
  href,
  cta,
  done,
  disabled,
  accent,
}: {
  number: string;
  icon: ElementType;
  title: string;
  description: string;
  href: string;
  cta: string;
  done?: boolean;
  disabled?: boolean;
  accent: "emerald" | "blue" | "violet" | "cyan";
}) {
  const accentMap = {
    emerald: {
      icon: "bg-emerald-50 text-emerald-600",
      glow: "from-emerald-100/50",
      line: "bg-emerald-400",
    },
    blue: {
      icon: "bg-blue-50 text-blue-600",
      glow: "from-blue-100/50",
      line: "bg-blue-400",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600",
      glow: "from-violet-100/50",
      line: "bg-violet-400",
    },
    cyan: {
      icon: "bg-cyan-50 text-cyan-600",
      glow: "from-cyan-100/50",
      line: "bg-cyan-400",
    },
  };

  const colors = accentMap[accent];

  return (
    <div
      className={`group relative min-h-[290px] overflow-hidden rounded-[22px] border border-black/[0.055] bg-white p-5 transition duration-300 ${
        disabled
          ? "opacity-[0.72]"
          : "hover:-translate-y-1 hover:border-black/[0.09] hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
      }`}
    >
      {/* Bottom decorative gradient */}
      <div
        className={`pointer-events-none absolute -bottom-24 -right-20 h-48 w-64 rounded-full bg-gradient-to-t ${colors.glow} to-transparent blur-2xl transition duration-500 group-hover:scale-125`}
      />

      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-[0.08em] text-slate-300">
          {number}
        </span>

        {done ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
            <CircleCheck size={11} />
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
        className={`relative mt-6 flex h-12 w-12 items-center justify-center rounded-2xl ${colors.icon} shadow-sm`}
      >
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <div className="relative mt-5">
        <h3 className="text-[18px] font-semibold tracking-[-0.025em] text-slate-950">
          {title}
        </h3>

        <p className="mt-2 max-w-[260px] text-[11px] leading-5 text-slate-500">
          {description}
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
/* Shared Components                                                          */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow: string;
  title: string;
  description: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-end justify-between gap-4">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-slate-950">
          {title}
        </h2>

        <p className="mt-1 text-[11px] leading-5 text-slate-500">
          {description}
        </p>
      </div>

      {right}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                    */
/* -------------------------------------------------------------------------- */

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[248px] border-r border-black/[0.05] bg-white lg:block" />

        <div className="flex-1">
          <div className="h-[72px] border-b border-black/[0.05] bg-white" />

          <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
            <div className="h-[310px] animate-pulse rounded-[28px] bg-white" />

            <div className="mt-9">
              <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200/60" />
              <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200/50" />

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="h-[150px] animate-pulse rounded-2xl bg-white"
                  />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-[290px] animate-pulse rounded-[22px] bg-white"
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
