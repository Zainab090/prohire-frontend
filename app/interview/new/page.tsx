"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Mic, Type } from "lucide-react";
import clsx from "clsx";
import { apiFetch } from "@/lib/api";

export default function NewInterviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId");

  const [mode, setMode] = useState<"text" | "voice">("text");
  const [language, setLanguage] = useState<"en" | "ur" | "roman_ur">("en");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  async function handleStart() {
    if (!jobId) {
      setError("No job selected. Go back to Job Matches and pick a role.");
      return;
    }
    setStarting(true);
    setError("");

    const res = await apiFetch("/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, mode, language })
    });
    const data = await res.json();
    setStarting(false);

    if (!res.ok) {
      setError(data.error || "Failed to start interview.");
      return;
    }
    router.push(`/interview/${data.sessionId}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-lg px-6 py-10">
        <h1 className="text-2xl font-bold">Set Up Your Interview</h1>
        <p className="mt-1 text-sm text-textMuted">
          The Interview Agent will generate role-specific questions based on this job and your profile.
        </p>

        <div className="card mt-6 p-5">
          <label className="mb-2 block text-xs font-medium text-textMuted">Interview Mode</label>
          <div className="grid grid-cols-2 gap-2">
            <ModeButton icon={Type} label="Text" active={mode === "text"} onClick={() => setMode("text")} />
            <ModeButton icon={Mic} label="Voice" active={mode === "voice"} onClick={() => setMode("voice")} />
          </div>

          <label className="mb-2 mt-5 block text-xs font-medium text-textMuted">Language</label>
          <div className="grid grid-cols-3 gap-2">
            {(["en", "ur", "roman_ur"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={clsx(
                  "rounded-lg border px-3 py-2 text-sm",
                  language === l ? "border-accent-teal bg-accent-teal/10 text-accent-teal" : "border-border text-textMuted"
                )}
              >
                {l === "en" ? "English" : l === "ur" ? "اردو" : "Roman Urdu"}
              </button>
            ))}
          </div>
          {language !== "en" && (
            <p className="mt-2 text-xs text-textMuted">
              Answer in {language === "ur" ? "Urdu" : "Roman Urdu"} — you&apos;ll also get suggested professional
              English phrasing for each answer.
            </p>
          )}

          {error && <p className="mt-3 text-xs text-accent-rose">{error}</p>}

          <button
            onClick={handleStart}
            disabled={starting}
            className="mt-5 w-full rounded-lg bg-accent-teal py-2.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
          >
            {starting ? "Generating your questions..." : "Start Interview"}
          </button>
        </div>
      </main>
    </div>
  );
}

function ModeButton({
  icon: Icon,
  label,
  active,
  onClick
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center gap-1.5 rounded-lg border py-4 text-sm",
        active ? "border-accent-teal bg-accent-teal/10 text-accent-teal" : "border-border text-textMuted"
      )}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
