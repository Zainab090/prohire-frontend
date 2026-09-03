"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ScoreRadarChart } from "@/components/ScoreRadarChart";
import { AgentStatusPill, AgentStatus } from "@/components/AgentStatusPill";
import { CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface InterviewScore {
  technical: number;
  communication: number;
  problemSolving: number;
  relevance: number;
  confidence: number;
  overall: number;
  strengths: string[];
  weaknesses: string[];
  feedback: string;
}

export default function ReportPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();

  const [score, setScore] = useState<InterviewScore | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("running");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    generateReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generateReport() {
    setAgentStatus("running");
    const res = await apiFetch("/api/interview/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: params.sessionId })
    });
    const data = await res.json();
    setAgentStatus("done");

    if (!res.ok) {
      setError(data.error || "Failed to generate report.");
      return;
    }
    setScore(data.score);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Interview Report</h1>
          <AgentStatusPill label="Interview Agent (evaluation)" status={agentStatus} />
        </div>

        {error && <p className="mt-4 text-sm text-accent-rose">{error}</p>}

        {!score && !error && (
          <p className="mt-6 text-sm text-textMuted">Generating your evaluation...</p>
        )}

        {score && (
          <>
            <div className="card mt-6 grid gap-6 p-6 md:grid-cols-2">
              <div className="flex flex-col items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-accent-teal/40">
                  <span className="text-3xl font-bold text-accent-teal">{score.overall}</span>
                </div>
                <p className="mt-2 text-sm text-textMuted">Overall Interview Readiness</p>
              </div>
              <ScoreRadarChart
                technical={score.technical}
                communication={score.communication}
                problemSolving={score.problemSolving}
                relevance={score.relevance}
                confidence={score.confidence}
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="card p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-accent-teal">
                  <CheckCircle2 size={16} /> Strengths
                </h2>
                <ul className="mt-2 space-y-1.5 text-sm text-textMuted">
                  {score.strengths.map((s, i) => (
                    <li key={i}>• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-accent-amber">
                  <AlertTriangle size={16} /> Areas to Improve
                </h2>
                <ul className="mt-2 space-y-1.5 text-sm text-textMuted">
                  {score.weaknesses.map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card mt-4 p-5">
              <h2 className="text-sm font-semibold">Detailed Feedback</h2>
              <p className="mt-2 text-sm leading-relaxed text-textMuted">{score.feedback}</p>
            </div>

            <Link
              href="/roadmap"
              className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-accent-teal py-3 text-sm font-semibold text-background hover:opacity-90"
            >
              <TrendingUp size={16} /> Generate My Career Roadmap
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
