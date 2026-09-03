"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AgentStatusPill, AgentStatus } from "@/components/AgentStatusPill";
import { Sparkles, BookOpen, Code, FileText } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface RoadmapStep {
  order: number;
  title: string;
  description: string;
  estimatedWeeks: number;
  resources: { name: string; url?: string; type: "course" | "project" | "reading" }[];
}

interface Roadmap {
  skillGaps: string[];
  suggestedRoles: string[];
  roadmapSteps: RoadmapStep[];
}

const RESOURCE_ICON = { course: BookOpen, project: Code, reading: FileText };

export default function RoadmapPage() {
  const { status } = useSession();
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  async function generateRoadmap() {
    setAgentStatus("running");
    setError("");
    const res = await apiFetch("/api/roadmap/generate", { method: "POST" });
    const data = await res.json();
    setAgentStatus("done");

    if (!res.ok) {
      setError(data.error || "Failed to generate roadmap.");
      return;
    }
    setRoadmap(data.roadmap);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Career Roadmap</h1>
          <AgentStatusPill label="Career Intelligence Agent" status={agentStatus} />
        </div>
        <p className="mt-1 text-sm text-textMuted">
          Built from your accumulated job-match gaps and interview feedback — not generic advice.
        </p>

        {!roadmap && (
          <button
            onClick={generateRoadmap}
            disabled={agentStatus === "running"}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent-teal py-3 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
          >
            <Sparkles size={16} />
            {agentStatus === "running" ? "Analyzing your history..." : "Generate My Roadmap"}
          </button>
        )}

        {error && <p className="mt-4 text-sm text-accent-rose">{error}</p>}

        {roadmap && (
          <>
            <div className="card mt-6 p-5">
              <h2 className="text-sm font-semibold">Skill Gaps Identified</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {roadmap.skillGaps.map((s) => (
                  <span key={s} className="rounded-full bg-accent-rose/10 px-2.5 py-1 text-xs text-accent-rose">
                    {s}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-sm font-semibold">Roles You&apos;re Close To</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {roadmap.suggestedRoles.map((r) => (
                  <span key={r} className="rounded-full bg-accent-teal/10 px-2.5 py-1 text-xs text-accent-teal">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {roadmap.roadmapSteps.map((step) => (
                <div key={step.order} className="card flex gap-4 p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-violet/10 text-sm font-bold text-accent-violet">
                    {step.order}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{step.title}</h3>
                      <span className="text-xs text-textMuted">~{step.estimatedWeeks}w</span>
                    </div>
                    <p className="mt-1 text-sm text-textMuted">{step.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {step.resources.map((r, i) => {
                        const Icon = RESOURCE_ICON[r.type];
                        return (
                          <span key={i} className="flex items-center gap-1 text-xs text-accent-teal">
                            <Icon size={12} /> {r.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={generateRoadmap} className="mt-4 text-xs text-accent-teal">
              Regenerate roadmap
            </button>
          </>
        )}
      </main>
    </div>
  );
}
