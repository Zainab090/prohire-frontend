"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { AgentStatusPill } from "@/components/AgentStatusPill";
import { User, Target, Mic, TrendingUp, ArrowRight } from "lucide-react";
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
      });
  }, []);

  const hasProfile = !!profile?.fullName;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-bold">
          {hasProfile ? `Welcome back, ${profile!.fullName.split(" ")[0]}` : "Welcome to ProHire"}
        </h1>
        <p className="mt-1 text-sm text-textMuted">
          Six specialized AI agents, coordinated by one orchestrator, working your career journey.
        </p>

        {/* Agent status row */}
        <div className="mt-6 flex flex-wrap gap-2">
          <AgentStatusPill label="Profile Agent" status={hasProfile ? "done" : "idle"} />
          <AgentStatusPill label="Job Discovery Agent" status={hasProfile ? "idle" : "idle"} />
          <AgentStatusPill label="Application Agent" status="idle" />
          <AgentStatusPill label="Interview Agent" status="idle" />
          <AgentStatusPill label="Career Intelligence Agent" status="idle" />
        </div>

        {!loading && !hasProfile && (
          <div className="card mt-6 border-accent-amber/30 bg-accent-amber/5 p-5">
            <p className="text-sm">
              Your profile isn&apos;t set up yet — every agent depends on it.{" "}
              <Link href="/profile" className="font-semibold text-accent-teal">
                Build your profile →
              </Link>
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <JourneyCard
            icon={User}
            title="1. Profile"
            desc="Your verified source of truth — skills, experience, projects, resume."
            href="/profile"
            cta={hasProfile ? "Edit Profile" : "Set Up Profile"}
            done={hasProfile}
          />
          <JourneyCard
            icon={Target}
            title="2. AI Job Matching"
            desc="Explainable compatibility scores against Pakistan-relevant roles."
            href="/jobs"
            cta="View Matches"
            disabled={!hasProfile}
          />
          <JourneyCard
            icon={Mic}
            title="3. AI Interview"
            desc="Adaptive, role-specific mock interview with live follow-ups."
            href="/jobs"
            cta="Start from a Match"
            disabled={!hasProfile}
          />
          <JourneyCard
            icon={TrendingUp}
            title="4. Career Roadmap"
            desc="A sequenced skill plan built from your real gaps."
            href="/roadmap"
            cta="View Roadmap"
            disabled={!hasProfile}
          />
        </div>
      </main>
    </div>
  );
}

function JourneyCard({
  icon: Icon,
  title,
  desc,
  href,
  cta,
  done,
  disabled
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  cta: string;
  done?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="card flex flex-col justify-between p-5">
      <div>
        <div className="flex items-center justify-between">
          <Icon size={20} className="text-accent-teal" />
          {done && <span className="text-xs text-accent-teal">Complete</span>}
        </div>
        <h3 className="mt-2 font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-textMuted">{desc}</p>
      </div>
      {disabled ? (
        <span className="mt-4 text-xs text-textMuted">Complete your profile first</span>
      ) : (
        <Link href={href} className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-teal">
          {cta} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
