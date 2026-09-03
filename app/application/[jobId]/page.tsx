"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Navbar } from "@/components/Navbar";
import { AgentStatusPill, AgentStatus } from "@/components/AgentStatusPill";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface Application {
  _id: string;
  coverLetter: string;
  factCheckNotes: string[];
  status: string;
}

export default function ApplicationPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams<{ jobId: string }>();

  const [application, setApplication] = useState<Application | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    generateApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generateApplication() {
    setAgentStatus("running");
    setError("");
    const res = await apiFetch("/api/application/prepare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: params.jobId })
    });
    const data = await res.json();
    setAgentStatus("done");

    if (!res.ok) {
      setError(data.error || "Failed to prepare application.");
      return;
    }
    setApplication(data.application);
  }

  async function handleApprove(decision: "approve" | "reject") {
    if (!application) return;
    setApproving(true);
    const res = await apiFetch("/api/application/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId: application._id, decision })
    });
    const data = await res.json();
    setApproving(false);
    if (res.ok) setApplication(data.application);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Application Preparation</h1>
          <AgentStatusPill label="Application Agent" status={agentStatus} />
        </div>
        <p className="mt-1 text-sm text-textMuted">
          Every claim below is verified against your profile — nothing is invented.
        </p>

        {error && <p className="mt-4 text-sm text-accent-rose">{error}</p>}

        {application && (
          <>
            <div className="card mt-6 p-5">
              <h2 className="text-sm font-semibold">Generated Cover Letter</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-textMuted">
                {application.coverLetter}
              </p>
            </div>

            <div className="card mt-4 p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <ShieldCheck size={16} className="text-accent-teal" /> Fact-Check Notes
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-textMuted">
                {application.factCheckNotes.map((note, i) => (
                  <li key={i}>• {note}</li>
                ))}
              </ul>
            </div>

            <div className="card mt-4 p-5">
              {application.status === "draft" && (
                <>
                  <p className="mb-3 text-sm">
                    Nothing is sent automatically. Review the letter above, then approve or reject.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove("approve")}
                      disabled={approving}
                      className="flex-1 rounded-lg bg-accent-teal py-2.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApprove("reject")}
                      disabled={approving}
                      className="flex-1 rounded-lg border border-border py-2.5 text-sm font-semibold hover:border-accent-rose"
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}
              {application.status === "approved" && (
                <p className="flex items-center gap-2 text-sm text-accent-teal">
                  <CheckCircle2 size={16} /> Approved by you. Ready to send.
                </p>
              )}
              {application.status === "rejected_by_candidate" && (
                <p className="text-sm text-accent-rose">Rejected. Regenerate below if you&apos;d like another draft.</p>
              )}
            </div>

            <button onClick={generateApplication} className="mt-4 text-xs text-accent-teal">
              Regenerate cover letter
            </button>
          </>
        )}
      </main>
    </div>
  );
}
