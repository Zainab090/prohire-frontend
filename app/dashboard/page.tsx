"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { apiFetch } from "@/lib/api";

import {
  User,
  Target,
  Mic,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Circle,
  BrainCircuit,
  FileText,
  BriefcaseBusiness,
  BarChart3,
  Zap,
  ChevronRight,
  Bot,
  ShieldCheck,
  Clock3,
} from "lucide-react";

interface ProfileSummary {
  fullName: string;
  skills: string[];
  preferredRole?: string;
}

interface Agent {
  name: string;
  shortName: string;
  description: string;
  status: "ready" | "active" | "idle";
  icon: React.ElementType;
}

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    apiFetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [status]);

  const hasProfile = !!profile?.fullName;

  const profileScore = useMemo(() => {
    if (!profile) return 0;

    let score = 30;

    if (profile.fullName) score += 20;
    if (profile.skills?.length) score += 30;
    if (profile.preferredRole) score += 20;

    return Math.min(score, 100);
  }, [profile]);

  const firstName = profile?.fullName?.split(" ")[0] || "there";

  const agents: Agent[] = [
    {
      name: "Profile Agent",
      shortName: "Profile",
      description: "Understands your skills and experience.",
      status: hasProfile ? "ready" : "idle",
      icon: User,
    },
    {
      name: "Job Discovery Agent",
      shortName: "Jobs",
      description: "Finds relevant opportunities for you.",
      status: hasProfile ? "active" : "idle",
      icon: Target,
    },
    {
      name: "Application Agent",
      shortName: "Applications",
      description: "Helps optimize your applications.",
      status: "idle",
      icon: BriefcaseBusiness,
    },
    {
      name: "Interview Agent",
      shortName: "Interview",
      description: "Runs adaptive AI interviews.",
      status: "idle",
      icon: Mic,
    },
    {
      name: "Career Intelligence Agent",
      shortName: "Career AI",
      description: "Builds your personalized career strategy.",
      status: "idle",
      icon: TrendingUp,
    },
    {
      name: "Orchestrator",
      shortName: "Orchestrator",
      description: "Coordinates your entire career journey.",
      status: "active",
      icon: BrainCircuit,
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <Navbar />

      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[15%] top-[10%] h-[350px] w-[350px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
        <div className="absolute right-[10%] top-[35%] h-[400px] w-[400px] rounded-full bg-purple-500/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 left-[40%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            TOP HEADER
        ====================================================== */}
        <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
              <Sparkles size={13} className="text-cyan-400" />
              <span>AI Career Command Center</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="text-cyan-400">v3.0</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {hasProfile ? (
                <>
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                    {firstName}
                  </span>
                </>
              ) : (
                <>
                  Welcome to{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                    ProHire
                  </span>
                </>
              )}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Your AI career copilot is coordinating specialized agents to
              discover opportunities, strengthen your profile, and accelerate
              your career journey.
            </p>
          </div>

          <Link
            href="/profile"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
          >
            <User size={16} />
            {hasProfile ? "Manage Profile" : "Build Profile"}
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </section>

        {/* =====================================================
            HERO COMMAND CENTER
        ====================================================== */}
        <section className="relative mb-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0b1119] via-[#080c12] to-[#0b0913] p-6 shadow-2xl sm:p-8">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/[0.08] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-purple-500/[0.07] blur-[100px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
                  <BrainCircuit
                    size={22}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    ProHire Orchestrator
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">
                      AI system online
                    </span>
                  </div>
                </div>
              </div>

              <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
                Your career journey,
                <span className="ml-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                  coordinated by AI.
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                ProHire connects specialized AI agents into one intelligent
                career system — turning your profile into opportunities,
                preparation, and measurable career growth.
              </p>

              {!hasProfile && !loading ? (
                <Link
                  href="/profile"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-cyan-500/10 transition hover:scale-[1.02]"
                >
                  <Sparkles size={16} />
                  Activate Your AI Career Copilot
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  href="/jobs"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-cyan-500/10 transition hover:scale-[1.02]"
                >
                  <Target size={16} />
                  Discover My Opportunities
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>

            {/* Profile readiness */}
            <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  Profile readiness
                </span>

                <ShieldCheck
                  size={17}
                  className="text-cyan-400"
                />
              </div>

              <div className="mt-5 flex items-center justify-center">
                <div
                  className="relative flex h-36 w-36 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#22d3ee ${profileScore}%, rgba(255,255,255,0.06) ${profileScore}% 100%)`,
                  }}
                >
                  <div className="flex h-[122px] w-[122px] flex-col items-center justify-center rounded-full bg-[#090d13]">
                    <span className="text-3xl font-bold">
                      {loading ? "—" : `${profileScore}%`}
                    </span>
                    <span className="mt-1 text-[11px] text-slate-500">
                      READY
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                {hasProfile
                  ? "Your profile is powering the AI matching system."
                  : "Complete your profile to unlock the AI agents."}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK METRICS
        ====================================================== */}
        <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            icon={Target}
            label="Job Matches"
            value={hasProfile ? "Ready" : "—"}
            detail={hasProfile ? "AI matching available" : "Build profile first"}
          />

          <MetricCard
            icon={BriefcaseBusiness}
            label="Applications"
            value="0"
            detail="Applications tracked"
          />

          <MetricCard
            icon={Mic}
            label="Interview Readiness"
            value="—"
            detail="Start an AI interview"
          />

          <MetricCard
            icon={BarChart3}
            label="Skills Detected"
            value={profile?.skills?.length?.toString() || "0"}
            detail="From your profile"
          />

        </section>

        {/* =====================================================
            CAREER JOURNEY
        ====================================================== */}
        <section className="mb-8">

          <SectionHeading
            icon={Zap}
            title="Your Career Journey"
            description="Move through the stages of your AI-powered career workflow."
          />

          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">

            <JourneyCard
              number="01"
              icon={User}
              title="Build Profile"
              description="Create your verified source of truth."
              href="/profile"
              action={hasProfile ? "Edit Profile" : "Get Started"}
              completed={hasProfile}
            />

            <JourneyCard
              number="02"
              icon={Target}
              title="Find Opportunities"
              description="Discover jobs matched to your profile."
              href="/jobs"
              action="View Matches"
              disabled={!hasProfile}
            />

            <JourneyCard
              number="03"
              icon={Mic}
              title="Prepare for Interviews"
              description="Practice with adaptive AI interviews."
              href="/jobs"
              action="Start Practice"
              disabled={!hasProfile}
            />

            <JourneyCard
              number="04"
              icon={TrendingUp}
              title="Grow Your Career"
              description="Follow an AI-generated skill roadmap."
              href="/roadmap"
              action="View Roadmap"
              disabled={!hasProfile}
            />

          </div>
        </section>

        {/* =====================================================
            AI AGENT NETWORK
        ====================================================== */}
        <section className="mb-8">

          <SectionHeading
            icon={Bot}
            title="AI Agent Network"
            description="Specialized agents working together through the ProHire orchestrator."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {agents.map((agent) => (
              <AgentCard key={agent.name} agent={agent} />
            ))}

          </div>
        </section>

        {/* =====================================================
            NEXT BEST ACTION
        ====================================================== */}
        <section className="overflow-hidden rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-500/[0.06] via-transparent to-purple-500/[0.06] p-5 sm:p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08]">
                <Sparkles
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
                  Recommended next action
                </p>

                <h3 className="mt-1 text-lg font-semibold">
                  {hasProfile
                    ? "Let your AI agents find your best opportunities."
                    : "Build your profile and activate your AI agents."}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {hasProfile
                    ? "Your profile is ready for explainable job matching."
                    : "Your profile is the foundation for every ProHire agent."}
                </p>
              </div>

            </div>

            <Link
              href={hasProfile ? "/jobs" : "/profile"}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-sm font-medium transition hover:border-cyan-400/30 hover:bg-white/[0.08]"
            >
              {hasProfile ? "Explore Matches" : "Complete Profile"}
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>
        </section>

        {/* =====================================================
            FOOTER STATUS
        ====================================================== */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI Orchestrator Online
          </span>

          <span className="flex items-center gap-1.5">
            <ShieldCheck size={12} />
            Profile Data Protected
          </span>

          <span className="flex items-center gap-1.5">
            <Clock3 size={12} />
            Real-time career intelligence
          </span>
        </div>

      </main>
    </div>
  );
}

/* ============================================================
   SECTION HEADING
============================================================ */

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
        <Icon size={17} className="text-cyan-400" />
      </div>

      <div>
        <h2 className="font-semibold tracking-tight">{title}</h2>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]">

      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">
          <Icon size={15} className="text-cyan-400" />
        </div>

        <ArrowRight
          size={14}
          className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-slate-400"
        />
      </div>

      <p className="mt-4 text-xs text-slate-500">{label}</p>

      <div className="mt-1 flex items-end gap-2">
        <span className="text-xl font-bold">{value}</span>
      </div>

      <p className="mt-1 text-[11px] text-slate-600">{detail}</p>
    </div>
  );
}

/* ============================================================
   JOURNEY CARD
============================================================ */

function JourneyCard({
  number,
  icon: Icon,
  title,
  description,
  href,
  action,
  completed,
  disabled,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  action: string;
  completed?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-5 transition duration-300 ${
        disabled
          ? "border-white/[0.05] bg-white/[0.015] opacity-60"
          : "border-white/[0.07] bg-white/[0.025] hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/[0.04]"
      }`}
    >

      <div className="absolute right-4 top-3 text-3xl font-black text-white/[0.025]">
        {number}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/[0.05]">
          <Icon size={17} className="text-cyan-400" />
        </div>

        {completed ? (
          <CheckCircle2 size={17} className="text-emerald-400" />
        ) : disabled ? (
          <Circle size={16} className="text-slate-700" />
        ) : null}
      </div>

      <h3 className="mt-5 text-sm font-semibold">{title}</h3>

      <p className="mt-1 min-h-[40px] text-xs leading-5 text-slate-500">
        {description}
      </p>

      {disabled ? (
        <span className="mt-4 block text-[11px] text-slate-600">
          Complete your profile first
        </span>
      ) : (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          {action}
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}

/* ============================================================
   AGENT CARD
============================================================ */

function AgentCard({ agent }: { agent: Agent }) {
  const Icon = agent.icon;

  const statusConfig = {
    active: {
      label: "Active",
      dot: "bg-emerald-400",
      text: "text-emerald-400",
    },
    ready: {
      label: "Ready",
      dot: "bg-cyan-400",
      text: "text-cyan-400",
    },
    idle: {
      label: "Standby",
      dot: "bg-slate-600",
      text: "text-slate-500",
    },
  };

  const config = statusConfig[agent.status];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">

      {agent.status === "active" && (
        <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-emerald-400/[0.04] blur-2xl" />
      )}

      <div className="relative flex items-start justify-between">

        <div className="flex gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.035]">
            <Icon size={16} className="text-cyan-400" />
          </div>

          <div>
            <h3 className="text-sm font-medium">{agent.name}</h3>

            <p className="mt-1 text-[11px] leading-5 text-slate-600">
              {agent.description}
            </p>
          </div>

        </div>

        <div className={`ml-2 flex shrink-0 items-center gap-1.5 text-[10px] ${config.text}`}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${config.dot} ${
              agent.status === "active" ? "animate-pulse" : ""
            }`}
          />
          {config.label}
        </div>

      </div>
    </div>
  );
}
