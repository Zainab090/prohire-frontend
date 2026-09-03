"use client";

import clsx from "clsx";
import { Loader2, CheckCircle2, Circle } from "lucide-react";

export type AgentStatus = "idle" | "running" | "done";

interface AgentStatusPillProps {
  label: string;
  status: AgentStatus;
}

export function AgentStatusPill({ label, status }: AgentStatusPillProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        status === "idle" && "border-border text-textMuted",
        status === "running" && "border-accent-teal/40 bg-accent-teal/10 text-accent-teal",
        status === "done" && "border-accent-teal/40 text-accent-teal"
      )}
    >
      {status === "running" && <Loader2 size={13} className="animate-spin" />}
      {status === "done" && <CheckCircle2 size={13} />}
      {status === "idle" && <Circle size={13} />}
      <span>{label}</span>
    </div>
  );
}
