"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { JobMatchCard } from "@/components/JobMatchCard";
import { AgentStatusPill, AgentStatus } from "@/components/AgentStatusPill";
import { Sparkles } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface MatchResult {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    remoteType: string;
    salaryRangePKR?: { min: number; max: number };
  };
  match: {
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    explanation: string;
  };
}

export default function JobsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [results, setResults] = useState<MatchResult[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  async function runMatching() {
    setAgentStatus("running");
    setError("");
    const res = await apiFetch("/api/match/run", { method: "POST" });
    const data = await res.json();
    setAgentStatus("done");

    if (!res.ok) {
      setError(data.error || "Matching failed.");
      return;
    }
    setResults(data.results);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Job Matches</h1>
            <p className="mt-1 text-sm text-textMuted">
              The Job Discovery Agent scores every posting against your profile.
            </p>
          </div>
          <AgentStatusPill label="Job Discovery Agent" status={agentStatus} />
        </div>

        {results.length === 0 && (
          <button
            onClick={runMatching}
            disabled={agentStatus === "running"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-teal py-3 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
          >
            <Sparkles size={16} />
            {agentStatus === "running" ? "Analyzing your profile against all jobs..." : "Run Job Discovery Agent"}
          </button>
        )}

        {error && <p className="mt-4 text-sm text-accent-rose">{error}</p>}

        {results.length > 0 && (
          <>
            <button onClick={runMatching} className="mt-4 text-xs text-accent-teal">
              Re-run matching
            </button>
            <div className="mt-4 space-y-4">
              {results.map((r) => (
                <JobMatchCard key={r.job._id} job={r.job} match={r.match} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
