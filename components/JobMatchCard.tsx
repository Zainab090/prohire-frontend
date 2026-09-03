"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Wallet } from "lucide-react";
import clsx from "clsx";

interface JobMatchCardProps {
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

function scoreColor(score: number) {
  if (score >= 75) return "text-accent-teal border-accent-teal/40 bg-accent-teal/10";
  if (score >= 50) return "text-accent-amber border-accent-amber/40 bg-accent-amber/10";
  return "text-accent-rose border-accent-rose/40 bg-accent-rose/10";
}

export function JobMatchCard({ job, match }: JobMatchCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-textPrimary">{job.title}</h3>
          <p className="text-sm text-textMuted">{job.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-textMuted">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {job.location}
            </span>
            <span className="capitalize">{job.remoteType}</span>
            {job.salaryRangePKR && (
              <span className="flex items-center gap-1">
                <Wallet size={12} /> PKR {job.salaryRangePKR.min.toLocaleString()}–
                {job.salaryRangePKR.max.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <div
          className={clsx(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
            scoreColor(match.matchScore)
          )}
        >
          {match.matchScore}%
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs font-medium text-accent-teal"
      >
        Why this match? <ChevronDown size={14} className={clsx("transition-transform", expanded && "rotate-180")} />
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 border-t border-border pt-3">
          <p className="text-sm text-textMuted">{match.explanation}</p>
          <div className="flex flex-wrap gap-1.5">
            {match.matchedSkills.map((s) => (
              <span key={s} className="rounded-full bg-accent-teal/10 px-2.5 py-1 text-xs text-accent-teal">
                ✓ {s}
              </span>
            ))}
            {match.missingSkills.map((s) => (
              <span key={s} className="rounded-full bg-accent-rose/10 px-2.5 py-1 text-xs text-accent-rose">
                Missing: {s}
              </span>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <Link
              href={`/application/${job._id}`}
              className="rounded-lg bg-accent-teal px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90"
            >
              Prepare Application
            </Link>
            <Link
              href={`/interview/new?jobId=${job._id}`}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-textPrimary hover:border-accent-violet"
            >
              Practice Interview
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
