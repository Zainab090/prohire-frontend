"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  User,
  Target,
  Mic,
  TrendingUp,
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle,
  Clock,
  Briefcase,
  Star,
  Shield,
  Award,
  BarChart3,
  Activity,
  Brain,
  Compass,
  Rocket,
  Heart,
  Calendar,
  ChevronRight,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  Home,
  Search,
  Plus,
  Filter,
  Download,
  Share2,
  Eye,
  Globe,
  Users as UsersIcon,
  MessageSquare,
  FileText,
  PieChart,
  LineChart,
  Loader2,
  AlertCircle,
} from "lucide-react";

// Agent Status Pill Component
const AgentStatusPill = ({
  label,
  status,
}: {
  label: string;
  status: "idle" | "running" | "done" | "error";
}) => {
  const statusColors = {
    idle: "border-white/10 bg-white/5 text-slate-400",
    running: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    done: "border-teal-500/30 bg-teal-500/10 text-teal-400",
    error: "border-rose-500/30 bg-rose-500/10 text-rose-400",
  };

  const statusDots = {
    idle: "bg-slate-500",
    running: "bg-blue-400 animate-pulse",
    done: "bg-teal-400",
    error: "bg-rose-400 animate-pulse",
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${statusColors[status]} hover:scale-105`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDots[status]}`} />
      {label}
    </div>
  );
};

// Journey Card Component
const JourneyCard = ({
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
}) => {
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
      <p className="mt-1 text-sm text-slate-400">{desc}</p>
      {disabled ? (
        <span className="mt-4 inline-block text-xs text-slate-500">Complete your profile first</span>
      ) : (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition-all group-hover:gap-2"
        >
          {cta}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
};

// Main Dashboard Page
export default function DashboardPage() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        setProfile(data.profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

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
  const userName = profile?.fullName?.split(" ")[0] || session?.user?.name?.split(" ")[0] || "User";

  // Stats Data
  const stats = [
    { label: "Match Score", value: "94%", icon: Target, color: "from-blue-400 to-teal-400" },
    { label: "Interviews", value: "12", icon: Mic, color: "from-purple-400 to-pink-400" },
    { label: "Skill Progress", value: "78%", icon: BarChart3, color: "from-amber-400 to-orange-400" },
    { label: "Applications", value: "8", icon: Briefcase, color: "from-rose-400 to-pink-400" },
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
    },
  ];

  // Activity Feed
  const activities = [
    { time: "2 hours ago", text: "AI Interview completed - Software Engineer role", icon: Mic },
    { time: "5 hours ago", text: "New job match: Senior Developer at TechCorp", icon: Target },
    { time: "1 day ago", text: "Profile updated with new skills", icon: User },
    { time: "2 days ago", text: "Career roadmap generated", icon: TrendingUp },
  ];

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

      {/* Use existing Navbar component */}
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-28 pb-12 md:px-8">
        {/* Welcome Section */}
        <div className="animate-in slide-in-from-top-10 fade-in duration-700">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                    {userName}
                  </span>
                </h1>
                <div className="hidden md:flex">
                  {hasProfile && (
                    <div className="flex items-center gap-1 rounded-full bg-teal-500/10 px-3 py-1 text-xs text-teal-400 border border-teal-500/20">
                      <CheckCircle size={12} />
                      <span>Profile Active</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Six specialized AI agents, coordinated by one orchestrator, working your career journey.
              </p>
            </div>
            <Link
              href={hasProfile ? "/profile" : "/profile/setup"}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-105"
            >
              {hasProfile ? "Edit Profile" : "Set Up Profile"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Agent Status Row */}
        <div className="mt-6 flex flex-wrap gap-2 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
          <AgentStatusPill label="Profile Agent" status={hasProfile ? "done" : "idle"} />
          <AgentStatusPill label="Job Discovery Agent" status={hasProfile ? "running" : "idle"} />
          <AgentStatusPill label="Application Agent" status="idle" />
          <AgentStatusPill label="Interview Agent" status={hasProfile ? "idle" : "idle"} />
          <AgentStatusPill label="Career Intelligence Agent" status="idle" />
          <AgentStatusPill label="Orchestrator" status="running" />
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

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
          {stats.map((stat, idx) => (
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

        {/* Main Content Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Journey Steps - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Your Career Journey</h2>
              <Link href="/journey" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {journeySteps.map((step, idx) => (
                <JourneyCard key={idx} {...step} />
              ))}
            </div>
          </div>

          {/* Activity Feed - Right 1/3 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <button className="text-sm text-slate-500 hover:text-white transition-colors">
                <Filter size={14} />
              </button>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
              <div className="space-y-4">
                {activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 transition-all hover:translate-x-1"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <activity.icon size={14} className="text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300">{activity.text}</p>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/10 hover:bg-white/10 hover:text-white">
                View all activity
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-purple-500/5 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold text-white">Ready for your next step?</h3>
              <p className="text-sm text-slate-400">Your AI agents are waiting to help you progress</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:scale-105"
              >
                <Target size={16} className="text-blue-400" />
                Find Jobs
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/interviews"
                className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:scale-105"
              >
                <Mic size={16} className="text-purple-400" />
                Practice Interview
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/roadmap"
                className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:scale-105"
              >
                <Compass size={16} className="text-amber-400" />
                View Roadmap
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.5;
          }
        }

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

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
}
