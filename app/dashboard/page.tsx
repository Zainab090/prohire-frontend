"use client";

import { useEffect, useState } from "react";
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
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  BriefcaseBusiness,
  FileText,
  Lightbulb,
  Zap,
  Network,
  Search,
  MessageSquare,
} from "lucide-react";

import { apiFetch } from "@/lib/api";

interface ProfileSummary {
  fullName: string;
  skills: string[];
  preferredRole?: string;
}

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    apiFetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const hasProfile = !!profile?.fullName;

  const firstName = profile?.fullName?.split(" ")[0] || "there";

  const skillCount = profile?.skills?.length || 0;

  /*
   * This readiness score is intentionally based ONLY on data
   * already available from your existing profile API.
   */
  const profileReadiness = hasProfile
    ? Math.min(
        100,
        40 +
          (skillCount > 0 ? 25 : 0) +
          (skillCount >= 3 ? 15 : 0) +
          (profile?.preferredRole ? 20 : 0)
      )
    : 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070a] text-white">
      <Navbar />

      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[5%] top-[12%] h-[300px] w-[300px] rounded-full bg-cyan-500/[0.055] blur-[120px]" />

        <div className="absolute right-[5%] top-[25%] h-[400px] w-[400px] rounded-full bg-purple-500/[0.045] blur-[140px]" />

        <div className="absolute bottom-[10%] left-[40%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.035] blur-[130px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            WELCOME HEADER
        ====================================================== */}

        <section className="mb-7">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 text-[11px] font-medium text-slate-400 backdrop-blur">
                <Sparkles
                  size={13}
                  className="text-cyan-400"
                />

                <span>AI Career Command Center</span>

                <span className="h-1 w-1 rounded-full bg-slate-600" />

                <span className="text-cyan-400">
                  PROHIRE AI
                </span>
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
                Your career is more than a job search. ProHire connects your
                profile, opportunities, interview preparation, and growth into
                one intelligent career journey.
              </p>
            </div>

            <Link
              href="/profile"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              <User size={16} />

              {hasProfile ? "Manage Profile" : "Build Profile"}

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </section>

        {/* =====================================================
            AI COMMAND CENTER
        ====================================================== */}

        <section className="group relative mb-6 overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#0b121a] via-[#080d13] to-[#0c0914] shadow-2xl">

          {/* decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-28 right-[30%] h-72 w-72 rounded-full bg-purple-500/[0.06] blur-[110px]" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_260px]">

            <div>

              {/* Orchestrator badge */}

              <div className="mb-5 flex items-center gap-3">

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07] shadow-lg shadow-cyan-500/[0.05]">

                  <BrainCircuit
                    size={21}
                    className="text-cyan-400"
                  />

                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 ring-4 ring-[#0a1016]" />

                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    ProHire Orchestrator
                  </p>

                  <p className="mt-1 text-xs text-emerald-400">
                    ● All career systems ready
                  </p>
                </div>

              </div>

              <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">

                {hasProfile ? (
                  <>
                    Your career journey is{" "}
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                      ready for AI.
                    </span>
                  </>
                ) : (
                  <>
                    Transform your career
                    <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                      with coordinated AI.
                    </span>
                  </>
                )}

              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                {hasProfile
                  ? "Your profile now acts as the foundation for explainable job matching, adaptive interviews, and personalized career intelligence."
                  : "Create your career profile once. ProHire's specialized AI agents use it to understand your strengths, discover opportunities, and guide your next move."}
              </p>

              {/* Agent flow */}

              <div className="mt-6 flex flex-wrap items-center gap-2">

                <MiniAgent icon={User} label="Profile" />

                <FlowArrow />

                <MiniAgent icon={Search} label="Discover" />

                <FlowArrow />

                <MiniAgent icon={MessageSquare} label="Prepare" />

                <FlowArrow />

                <MiniAgent icon={TrendingUp} label="Grow" />

              </div>

              {/* CTA */}

              <div className="mt-7 flex flex-wrap gap-3">

                <Link
                  href={hasProfile ? "/jobs" : "/profile"}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-cyan-500/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/[0.2]"
                >
                  <Sparkles size={16} />

                  {hasProfile
                    ? "Discover My Opportunities"
                    : "Activate My AI Career Copilot"}

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                {hasProfile && (
                  <Link
                    href="/profile"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]"
                  >
                    <User size={15} />
                    Review Profile
                  </Link>
                )}

              </div>

            </div>

            {/* =================================================
                PROFILE READINESS
            ================================================== */}

            <div className="flex flex-col justify-center rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur">

              <div className="flex items-center justify-between">

                <span className="text-xs font-medium text-slate-400">
                  Career profile
                </span>

                <ShieldCheck
                  size={16}
                  className="text-cyan-400"
                />

              </div>

              <div className="relative mx-auto mt-5 flex h-36 w-36 items-center justify-center">

                {/* ring */}

                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#22d3ee ${profileReadiness}%, rgba(255,255,255,0.06) ${profileReadiness}% 100%)`,
                  }}
                />

                <div className="absolute inset-[6px] rounded-full bg-[#080d13]" />

                <div className="relative text-center">

                  <div className="text-3xl font-bold tracking-tight">
                    {loading ? "—" : `${profileReadiness}%`}
                  </div>

                  <div className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-slate-600">
                    READINESS
                  </div>

                </div>

              </div>

              <div className="mt-5 text-center">

                <p className="text-sm font-medium text-slate-300">
                  {hasProfile
                    ? "Your AI foundation is active"
                    : "Your profile is waiting"}
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-600">
                  {hasProfile
                    ? "The more complete your profile, the smarter your recommendations become."
                    : "Complete your profile to unlock the full ProHire intelligence layer."}
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            AGENT STATUS
        ====================================================== */}

        <section className="mb-7 rounded-xl border border-white/[0.07] bg-white/[0.018] p-4">

          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Network
                size={15}
                className="text-cyan-400"
              />

              <span className="text-xs font-semibold text-slate-300">
                AI Agent Network
              </span>

            </div>

            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Orchestrator online
            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            <AgentStatusPill
              label="Profile Agent"
              status={hasProfile ? "done" : "idle"}
            />

            <AgentStatusPill
              label="Job Discovery Agent"
              status={hasProfile ? "idle" : "idle"}
            />

            <AgentStatusPill
              label="Application Agent"
              status="idle"
            />

            <AgentStatusPill
              label="Interview Agent"
              status="idle"
            />

            <AgentStatusPill
              label="Career Intelligence Agent"
              status="idle"
            />

            {/* Added visually to represent the orchestrator mentioned
                in the original dashboard copy. No functionality changed. */}

            <AgentStatusPill
              label="AI Orchestrator"
              status="idle"
            />

          </div>

        </section>

        {/* =====================================================
            PROFILE WARNING
        ====================================================== */}

        {!loading && !hasProfile && (
          <div className="relative mb-7 overflow-hidden rounded-xl border border-amber-400/20 bg-gradient-to-r from-amber-400/[0.07] via-transparent to-transparent p-5">

            <div className="absolute right-0 top-0 h-full w-40 bg-amber-400/[0.025] blur-2xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/[0.08]">

                  <Lightbulb
                    size={17}
                    className="text-amber-300"
                  />

                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-200">
                    Your AI career system is waiting for its first signal.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your profile becomes the source of truth for every
                    recommendation ProHire generates.
                  </p>

                </div>

              </div>

              <Link
                href="/profile"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-cyan-400"
              >
                Build your profile
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>
        )}

        {/* =====================================================
            JOURNEY INTRO
        ====================================================== */}

        <section className="mb-4">

          <div className="flex items-end justify-between">

            <div>

              <div className="flex items-center gap-2">
                <Zap
                  size={16}
                  className="text-cyan-400"
                />

                <h2 className="font-semibold tracking-tight">
                  Your Career Journey
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                One profile. Four intelligent stages. One career trajectory.
              </p>

            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.15em] text-slate-700 sm:block">
              Powered by ProHire AI
            </span>

          </div>

        </section>

        {/* =====================================================
            JOURNEY CARDS
        ====================================================== */}

        <div className="grid gap-4 md:grid-cols-2">

          <JourneyCard
            icon={User}
            step="01"
            title="Profile"
            desc="Your verified source of truth — skills, experience, projects, resume."
            href="/profile"
            cta={hasProfile ? "Edit Profile" : "Set Up Profile"}
            done={hasProfile}
            accent="cyan"
          />

          <JourneyCard
            icon={Target}
            step="02"
            title="AI Job Matching"
            desc="Explainable compatibility scores against Pakistan-relevant roles."
            href="/jobs"
            cta="View Matches"
            disabled={!hasProfile}
            accent="blue"
          />

          <JourneyCard
            icon={Mic}
            step="03"
            title="AI Interview"
            desc="Adaptive, role-specific mock interviews with intelligent follow-ups."
            href="/jobs"
            cta="Start from a Match"
            disabled={!hasProfile}
            accent="purple"
          />

          <JourneyCard
            icon={TrendingUp}
            step="04"
            title="Career Roadmap"
            desc="A sequenced skill plan built from your real gaps and career goals."
            href="/roadmap"
            cta="View Roadmap"
            disabled={!hasProfile}
            accent="teal"
          />

        </div>

        {/* =====================================================
            VALUE STRIP
        ====================================================== */}

        <section className="mt-7 grid gap-3 sm:grid-cols-3">

          <ValueCard
            icon={BrainCircuit}
            title="Explainable AI"
            text="Understand why an opportunity matches your profile."
          />

          <ValueCard
            icon={ShieldCheck}
            title="Profile-First"
            text="Your verified career context powers every AI decision."
          />

          <ValueCard
            icon={Zap}
            title="Built for Pakistan"
            text="Career intelligence designed around the local job market."
          />

        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="relative mt-7 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-cyan-500/[0.055] via-white/[0.015] to-purple-500/[0.055] p-6">

          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/[0.06] blur-[70px]" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">

                <Sparkles size={13} />

                Your next move

              </div>

              <h3 className="mt-2 text-lg font-semibold">
                {hasProfile
                  ? "Let ProHire turn your profile into opportunity."
                  : "Your next career move starts with your profile."}
              </h3>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                {hasProfile
                  ? "Explore explainable job matches and discover where your skills can take you next."
                  : "Give your AI agents the context they need to understand your skills, experience, and ambitions."}
              </p>

            </div>

            <Link
              href={hasProfile ? "/jobs" : "/profile"}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-200 ring-1 ring-white/[0.08] transition-all hover:bg-white/[0.09] hover:ring-cyan-400/20"
            >
              {hasProfile
                ? "Explore Opportunities"
                : "Create My Profile"}

              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>

        </section>

        {/* =====================================================
            FOOTER SYSTEM STATUS
        ====================================================== */}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-4 text-[10px] text-slate-700">

          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI Orchestrator Online
          </span>

          <span className="flex items-center gap-1.5">
            <ShieldCheck size={11} />
            Career Data Protected
          </span>

          <span className="flex items-center gap-1.5">
            <Zap size={11} />
            Intelligent Career Infrastructure
          </span>

        </div>

      </main>
    </div>
  );
}

/* ============================================================
   MINI AGENT
============================================================ */

function MiniAgent({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5">

      <Icon
        size={12}
        className="text-cyan-400"
      />

      <span className="text-[10px] font-medium text-slate-400">
        {label}
      </span>

    </div>
  );
}

/* ============================================================
   FLOW ARROW
============================================================ */

function FlowArrow() {
  return (
    <ArrowRight
      size={12}
      className="hidden text-slate-700 sm:block"
    />
  );
}

/* ============================================================
   JOURNEY CARD
============================================================ */

function JourneyCard({
  icon: Icon,
  step,
  title,
  desc,
  href,
  cta,
  done,
  disabled,
  accent,
}: {
  icon: React.ElementType;
  step: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  done?: boolean;
  disabled?: boolean;
  accent: "cyan" | "blue" | "purple" | "teal";
}) {
  const accentClasses = {
    cyan: {
      icon: "text-cyan-400",
      border: "hover:border-cyan-400/25",
      glow: "bg-cyan-400/[0.05]",
      number: "text-cyan-400/[0.08]",
    },
    blue: {
      icon: "text-blue-400",
      border: "hover:border-blue-400/25",
      glow: "bg-blue-400/[0.05]",
      number: "text-blue-400/[0.08]",
    },
    purple: {
      icon: "text-purple-400",
      border: "hover:border-purple-400/25",
      glow: "bg-purple-400/[0.05]",
      number: "text-purple-400/[0.08]",
    },
    teal: {
      icon: "text-teal-400",
      border: "hover:border-teal-400/25",
      glow: "bg-teal-400/[0.05]",
      number: "text-teal-400/[0.08]",
    },
  };

  const theme = accentClasses[accent];

  return (
    <div
      className={`group relative min-h-[205px] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 ${
        disabled
          ? "opacity-55"
          : `hover:-translate-y-1 ${theme.border} hover:bg-white/[0.035]`
      }`}
    >

      {/* ambient glow */}

      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${theme.glow}`}
      />

      {/* large number */}

      <span
        className={`pointer-events-none absolute right-4 top-1 text-6xl font-black tracking-tighter ${theme.number}`}
      >
        {step}
      </span>

      <div className="relative flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
          <Icon
            size={19}
            className={theme.icon}
          />
        </div>

        {done && (
          <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
            <CheckCircle2 size={14} />
            Complete
          </div>
        )}

      </div>

      <div className="relative mt-5">

        <h3 className="text-base font-semibold">
          {title}
        </h3>

        <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500">
          {desc}
        </p>

      </div>

      {disabled ? (
        <div className="relative mt-5 flex items-center gap-1.5 text-[10px] text-slate-600">
          <ShieldCheck size={12} />
          Complete your profile first
        </div>
      ) : (
        <Link
          href={href}
          className={`relative mt-5 inline-flex items-center gap-1.5 text-xs font-semibold ${theme.icon}`}
        >
          {cta}

          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      )}

    </div>
  );
}

/* ============================================================
   VALUE CARD
============================================================ */

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-4 transition hover:border-white/[0.1] hover:bg-white/[0.03]">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/[0.05]">
          <Icon
            size={15}
            className="text-cyan-400"
          />
        </div>

        <h3 className="text-xs font-semibold text-slate-300">
          {title}
        </h3>

      </div>

      <p className="mt-2 text-[11px] leading-5 text-slate-600">
        {text}
      </p>

    </div>
  );
}
