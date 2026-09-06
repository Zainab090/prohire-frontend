"use client";

import { useEffect, useState, useRef } from "react";
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
  Zap,
  CheckCircle,
  Sparkles,
  Briefcase,
  Star,
  Shield,
  BarChart3,
  Clock,
  Compass,
  Rocket,
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    apiFetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      });
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hasProfile = !!profile?.fullName;
  const userName = profile?.fullName?.split(" ")[0] || "";

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[30%] -right-[20%] h-[80vh] w-[80vh] rounded-full bg-gradient-to-br from-blue-600/10 via-teal-500/10 to-purple-600/10 blur-[120px]"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute -bottom-[30%] -left-[20%] h-[80vh] w-[80vh] rounded-full bg-gradient-to-tr from-purple-600/10 via-pink-500/10 to-blue-600/10 blur-[120px]"
          style={{
            transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-[url('/grid.svg')] opacity-[0.015]" />
      </div>

      <Navbar />

      <main className="mx-auto max-w-6xl px-6 pt-28 pb-12 md:px-8">
        {/* Welcome Section */}
        <div className="animate-in slide-in-from-top-10 fade-in duration-700">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {hasProfile ? (
                    <>
                      Welcome back,{" "}
                      <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                        {userName}
                      </span>
                    </>
                  ) : (
                    "Welcome to ProHire"
                  )}
                </h1>
                {hasProfile && (
                  <div className="hidden md:flex items-center gap-1 rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-400 border border-teal-500/20">
                    <CheckCircle size={12} />
                    <span>Profile Active</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Six specialized AI agents, coordinated by one orchestrator, working your career journey.
              </p>
            </div>
            {hasProfile && (
              <Link
                href="/profile"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-105"
              >
                Edit Profile
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Agent Status Row */}
        <div className="mt-6 flex flex-wrap gap-2 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
          <AgentStatusPill label="Profile Agent" status={hasProfile ? "done" : "idle"} />
          <AgentStatusPill label="Job Discovery Agent" status={hasProfile ? "idle" : "idle"} />
          <AgentStatusPill label="Application Agent" status="idle" />
          <AgentStatusPill label="Interview Agent" status="idle" />
          <AgentStatusPill label="Career Intelligence Agent" status="idle" />
        </div>

        {/* Profile Warning */}
        {!loading && !hasProfile && (
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 backdrop-blur-sm animate-in slide-in-from-top-5 fade-in duration-500">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                <AlertCircle size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-300">
                  Your profile isn&apos;t set up yet — every agent depends on it.
                  <Link
                    href="/profile"
                    className="ml-2 font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Build your profile →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid - Only show if profile exists */}
        {hasProfile && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
            {[
              { label: "Match Score", value: "94%", icon: Target, color: "from-blue-400 to-teal-400" },
              { label: "Interviews", value: "12", icon: Mic, color: "from-purple-400 to-pink-400" },
              { label: "Skill Progress", value: "78%", icon: BarChart3, color: "from-amber-400 to-orange-400" },
              { label: "Applications", value: "8", icon: Briefcase, color: "from-rose-400 to-pink-400" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
                <div className="relative z-10">
                  <div
                    className={`inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-2 text-[#050505] shadow-lg shadow-blue-500/20`}
                  >
                    <stat.icon size={16} />
                  </div>
                  <div className="mt-3 text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Journey Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-400">
          <JourneyCard
            icon={User}
            title="1. Profile"
            desc="Your verified source of truth — skills, experience, projects, resume."
            href="/profile"
            cta={hasProfile ? "Edit Profile" : "Set Up Profile"}
            done={hasProfile}
            disabled={false}
            color="from-blue-400 to-teal-400"
          />
          <JourneyCard
            icon={Target}
            title="2. AI Job Matching"
            desc="Explainable compatibility scores against Pakistan-relevant roles."
            href="/jobs"
            cta="View Matches"
            done={false}
            disabled={!hasProfile}
            color="from-purple-400 to-pink-400"
          />
          <JourneyCard
            icon={Mic}
            title="3. AI Interview"
            desc="Adaptive, role-specific mock interview with live follow-ups."
            href="/jobs"
            cta="Start from a Match"
            done={false}
            disabled={!hasProfile}
            color="from-amber-400 to-orange-400"
          />
          <JourneyCard
            icon={TrendingUp}
            title="4. Career Roadmap"
            desc="A sequenced skill plan built from your real gaps."
            href="/roadmap"
            cta="View Roadmap"
            done={false}
            disabled={!hasProfile}
            color="from-rose-400 to-pink-400"
          />
        </div>
      </main>

      <style jsx global>{`
        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-top-10 {
          animation-name: slide-in-from-top;
          animation-duration: 0.7s;
        }

        .slide-in-from-bottom-5 {
          animation-name: slide-in-from-bottom;
          animation-duration: 0.5s;
        }

        @keyframes slide-in-from-top {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-from-bottom {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .fade-in {
          animation-name: fade-in;
          animation-duration: 0.5s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
}

// JourneyCard Component
function JourneyCard({
  icon: Icon,
  title,
  desc,
  href,
  cta,
  done,
  disabled,
  color,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  cta: string;
  done?: boolean;
  disabled?: boolean;
  color: string;
}) {
  return (
    <div
      className={`group rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 hover:-translate-y-1 ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`inline-flex rounded-xl bg-gradient-to-br ${color} p-2.5 text-[#050505] shadow-lg shadow-blue-500/20 transition-all group-hover:scale-110 group-hover:rotate-3`}
        >
          <Icon size={18} />
        </div>
        {done && (
          <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-0.5 text-xs text-teal-400 border border-teal-500/20">
            <CheckCircle size={10} />
            Complete
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400 leading-relaxed">{desc}</p>
      {disabled ? (
        <span className="mt-4 inline-block text-xs text-slate-500">Complete your profile first</span>
      ) : (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition-all group-hover:gap-2"
        >
          {cta}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

// AlertCircle Icon Component
const AlertCircle = (props: any) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
