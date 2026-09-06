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
  CheckCircle,
  Briefcase,
  BarChart3,
  Compass,
  Rocket,
  ChevronRight,
  Plus,
  Filter,
  AlertCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { apiFetch } from "@/lib/api";

interface ProfileSummary {
  fullName: string;
  skills: string[];
  preferredRole?: string;
}

export default function DashboardPage() {
  const { status, data: session } = useSession();
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
  const userName = profile?.fullName?.split(" ")[0] || session?.user?.name?.split(" ")[0] || "";

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

  // Recent Activity
  const recentActivity = [
    { time: "2 min ago", event: "AI Interview completed", status: "success", icon: Mic },
    { time: "1 hour ago", event: "New job match: Senior Developer", status: "info", icon: Target },
    { time: "3 hours ago", event: "Profile updated", status: "success", icon: User },
    { time: "1 day ago", event: "Career roadmap generated", status: "info", icon: TrendingUp },
  ];

  // Skills
  const skills = [
    { name: "React", level: 85 },
    { name: "TypeScript", level: 78 },
    { name: "Node.js", level: 72 },
    { name: "Python", level: 65 },
    { name: "AWS", level: 55 },
  ];

  // Recommended Jobs
  const recommendedJobs = [
    {
      title: "Senior Software Engineer",
      company: "TechCorp Pakistan",
      match: 94,
      location: "Lahore",
      type: "Full-time",
    },
    {
      title: "Full Stack Developer",
      company: "Innovation Labs",
      match: 87,
      location: "Islamabad",
      type: "Remote",
    },
    {
      title: "AI/ML Engineer",
      company: "DataScience Inc",
      match: 82,
      location: "Karachi",
      type: "Hybrid",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Premium Animated Background */}
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
        <div className="absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 via-teal-500/5 to-purple-500/5 blur-[100px]" />
        <div className="absolute top-0 left-0 h-full w-full bg-[url('/grid.svg')] opacity-[0.015]" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `float-particle ${Math.random() * 15 + 10}s ease-in-out ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pt-28 pb-12 md:px-8">
        {/* Welcome Header */}
        <div className="animate-in slide-in-from-top-10 fade-in duration-700">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 via-teal-500 to-purple-500 p-[2px] shadow-xl shadow-blue-500/30">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#050505]">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                        {userName?.charAt(0) || "U"}
                      </span>
                    </div>
                  </div>
                  {hasProfile && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-teal-500 border-2 border-[#050505] flex items-center justify-center">
                      <CheckCircle size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {hasProfile ? (
                      <>
                        Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"},{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                          {userName}
                        </span>
                      </>
                    ) : (
                      "Welcome to ProHire"
                    )}
                  </h1>
                  <p className="mt-1 text-sm text-slate-400">
                    Your AI career dashboard — {hasProfile ? "ready to help you advance" : "get started by setting up your profile"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                <Filter size={14} className="inline mr-2" />
                Filter
              </button>
              <button className="rounded-xl bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-105">
                <Plus size={14} className="inline mr-2" />
                New Application
              </button>
            </div>
          </div>
        </div>

        {/* Agent Status Row */}
        <div className="mt-6 flex flex-wrap gap-2 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
          <AgentStatusPill label="Orchestrator" status="running" />
          <AgentStatusPill label="Profile Agent" status={hasProfile ? "done" : "idle"} />
          <AgentStatusPill label="Job Discovery" status={hasProfile ? "running" : "idle"} />
          <AgentStatusPill label="Interview Agent" status="idle" />
          <AgentStatusPill label="Career Intelligence" status="idle" />
          <AgentStatusPill label="Application Agent" status="idle" />
        </div>

        {/* Profile Warning */}
        {!loading && !hasProfile && (
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-6 backdrop-blur-sm animate-in slide-in-from-top-5 fade-in duration-500">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
                  <AlertCircle size={22} className="text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Profile Not Set Up</h4>
                  <p className="text-sm text-slate-400">
                    Your profile is the foundation for all AI agents. Complete it to unlock personalized job matching, interviews, and career roadmap.
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-105 flex-shrink-0"
              >
                Set Up Profile
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {hasProfile && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
                <div className="relative z-10">
                  <div className={`inline-flex rounded-xl bg-gradient-to-br ${stat.color} p-2.5 text-[#050505] shadow-lg shadow-blue-500/20 transition-all group-hover:scale-110 group-hover:rotate-3`}>
                    <stat.icon size={18} />
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                    <div className="text-xs text-teal-400 font-medium">{stat.change}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-400">
          {/* Left Column - Career Journey */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Your Career Journey</h2>
              <Link href="/journey" className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {journeySteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`group rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/10 hover:bg-white/10 hover:-translate-y-1 ${step.disabled ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`inline-flex rounded-xl bg-gradient-to-br ${step.color} p-2.5 text-[#050505] shadow-lg shadow-blue-500/20 transition-all group-hover:scale-110 group-hover:rotate-3`}>
                      <step.icon size={18} />
                    </div>
                    {step.done && (
                      <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2.5 py-1 text-xs text-teal-400 border border-teal-500/20">
                        <CheckCircle size={10} />
                        Complete
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{step.desc}</p>
                  {step.disabled ? (
                    <span className="mt-4 inline-block text-xs text-slate-500">Complete your profile first</span>
                  ) : (
                    <Link
                      href={step.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition-all group-hover:gap-2"
                    >
                      {step.cta}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Recommended Jobs */}
            {hasProfile && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Top Matches For You</h3>
                  <Link href="/jobs" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    See all →
                  </Link>
                </div>
                <div className="space-y-3">
                  {recommendedJobs.map((job, idx) => (
                    <div
                      key={idx}
                      className="group flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/10 hover:bg-white/10 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3 sm:items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5">
                          <Briefcase size={16} className="text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white">{job.title}</h4>
                          <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                          <span className="text-[10px] text-slate-500">{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-blue-500" style={{ width: `${job.match}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-teal-400">{job.match}%</span>
                        </div>
                        <Link
                          href={`/jobs/${idx}`}
                          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Activity & Skills */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
                <button className="text-xs text-slate-500 hover:text-white transition-colors">
                  View all
                </button>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 transition-all hover:translate-x-1">
                      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        activity.status === "success" ? "bg-teal-500/10" : "bg-blue-500/10"
                      }`}>
                        <activity.icon size={14} className={activity.status === "success" ? "text-teal-400" : "text-blue-400"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300">{activity.event}</p>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Progress */}
            {hasProfile && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Skills Overview</h3>
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    + Add Skill
                  </button>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="space-y-3">
                    {skills.map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-300">{skill.name}</span>
                          <span className="text-xs text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="mt-1 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {hasProfile && (
              <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-purple-500/5 p-4 backdrop-blur-sm">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/interviews"
                    className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs text-slate-300 transition-all hover:border-white/10 hover:bg-white/10 hover:text-white"
                  >
                    <Mic size={12} className="text-purple-400" />
                    Practice
                  </Link>
                  <Link
                    href="/jobs"
                    className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs text-slate-300 transition-all hover:border-white/10 hover:bg-white/10 hover:text-white"
                  >
                    <Target size={12} className="text-blue-400" />
                    Find Jobs
                  </Link>
                  <Link
                    href="/roadmap"
                    className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs text-slate-300 transition-all hover:border-white/10 hover:bg-white/10 hover:text-white"
                  >
                    <Compass size={12} className="text-amber-400" />
                    Roadmap
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs text-slate-300 transition-all hover:border-white/10 hover:bg-white/10 hover:text-white"
                  >
                    <User size={12} className="text-teal-400" />
                    Profile
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        {hasProfile && (
          <div className="mt-8 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-purple-500/5 p-6 backdrop-blur-sm text-center">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:text-left">
              <div>
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Rocket size={18} className="text-blue-400" />
                  Ready to accelerate your career?
                </h3>
                <p className="text-sm text-slate-400">Your AI agents are waiting to help you land your dream job</p>
              </div>
              <Link
                href="/jobs"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:scale-105 flex-shrink-0"
              >
                Find Your Next Role
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
        }
        .animate-in { animation-fill-mode: both; }
        .slide-in-from-top-10 { animation-name: slide-in-from-top; animation-duration: 0.7s; }
        .slide-in-from-bottom-5 { animation-name: slide-in-from-bottom; animation-duration: 0.5s; }
        @keyframes slide-in-from-top {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .fade-in { animation-name: fade-in; animation-duration: 0.5s; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
    </div>
  );
}
