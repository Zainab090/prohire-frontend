"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";

import {
  Upload,
  Plus,
  X,
  Sparkles,
  User,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
  Wallet,
  Clock3,
  Github,
  Linkedin,
  Globe,
  FileText,
  BrainCircuit,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Target,
  Layers3,
  ChevronRight,
  Lightbulb,
  ScanSearch,
  WandSparkles,
} from "lucide-react";

import { apiFetch } from "@/lib/api";

interface ProfileFormState {
  fullName: string;
  university: string;
  skills: string[];
  preferredRole: string;
  preferredLocation: string;
  remotePref: "remote" | "onsite" | "hybrid" | "no_preference";
  expectedSalaryPKR: string;
  availability: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  experience: {
    title: string;
    company: string;
    description: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
}

const EMPTY_FORM: ProfileFormState = {
  fullName: "",
  university: "",
  skills: [],
  preferredRole: "",
  preferredLocation: "",
  remotePref: "no_preference",
  expectedSalaryPKR: "",
  availability: "",
  githubUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",
  experience: [],
  projects: [],
};

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState<ProfileFormState>(EMPTY_FORM);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resumeUploading, setResumeUploading] = useState(false);

  const [resumeAnalysis, setResumeAnalysis] = useState<{
    suggestions: string[];
    missingKeywords: string[];
  } | null>(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    apiFetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          setForm({
            fullName: data.profile.fullName || "",
            university: data.profile.university || "",
            skills: data.profile.skills || [],
            preferredRole: data.profile.preferredRole || "",
            preferredLocation: data.profile.preferredLocation || "",
            remotePref: data.profile.remotePref || "no_preference",
            expectedSalaryPKR:
              data.profile.expectedSalaryPKR?.toString() || "",
            availability: data.profile.availability || "",
            githubUrl: data.profile.githubUrl || "",
            linkedinUrl: data.profile.linkedinUrl || "",
            portfolioUrl: data.profile.portfolioUrl || "",
            experience: data.profile.experience || [],
            projects: data.profile.projects || [],
          });
        }
      })
      .catch(() => {
        setError("Unable to load your profile.");
      });
  }, []);

  /* ============================================================
     PROFILE READINESS
  ============================================================ */

  const readiness = useMemo(() => {
    let completed = 0;
    const total = 8;

    if (form.fullName.trim()) completed++;
    if (form.university.trim()) completed++;
    if (form.skills.length > 0) completed++;
    if (form.preferredRole.trim()) completed++;
    if (form.preferredLocation.trim()) completed++;
    if (form.experience.length > 0) completed++;
    if (form.projects.length > 0) completed++;

    if (
      form.githubUrl ||
      form.linkedinUrl ||
      form.portfolioUrl
    ) {
      completed++;
    }

    return Math.round((completed / total) * 100);
  }, [form]);

  const hasProfile = !!form.fullName.trim();

  /* ============================================================
     SKILLS
  ============================================================ */

  function addSkill() {
    const skill = skillInput.trim();

    if (skill && !form.skills.includes(skill)) {
      setForm({
        ...form,
        skills: [...form.skills, skill],
      });

      setSkillInput("");
    }
  }

  function removeSkill(skill: string) {
    setForm({
      ...form,
      skills: form.skills.filter((s) => s !== skill),
    });
  }

  /* ============================================================
     EXPERIENCE
  ============================================================ */

  function addExperience() {
    setForm({
      ...form,
      experience: [
        ...form.experience,
        {
          title: "",
          company: "",
          description: "",
        },
      ],
    });
  }

  function removeExperience(index: number) {
    setForm({
      ...form,
      experience: form.experience.filter((_, i) => i !== index),
    });
  }

  /* ============================================================
     PROJECTS
  ============================================================ */

  function addProject() {
    setForm({
      ...form,
      projects: [
        ...form.projects,
        {
          name: "",
          description: "",
          technologies: [],
        },
      ],
    });
  }

  function removeProject(index: number) {
    setForm({
      ...form,
      projects: form.projects.filter((_, i) => i !== index),
    });
  }

  /* ============================================================
     SAVE PROFILE
  ============================================================ */

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await apiFetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          expectedSalaryPKR: form.expectedSalaryPKR
            ? Number(form.expectedSalaryPKR)
            : undefined,
        }),
      });

      setSaving(false);

      if (!res.ok) {
        const data = await res.json();

        setError(
          data.error || "Failed to save profile."
        );

        return;
      }

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch {
      setSaving(false);
      setError("Something went wrong while saving your profile.");
    }
  }

  /* ============================================================
     RESUME UPLOAD
  ============================================================ */

  async function handleResumeUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setResumeUploading(true);
    setError("");
    setResumeAnalysis(null);

    try {
      const formData = new FormData();

      formData.append("resume", file);

      const res = await apiFetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResumeUploading(false);

      if (!res.ok) {
        setError(
          data.error || "Failed to process resume."
        );

        return;
      }

      setResumeAnalysis({
        suggestions: data.analysis.suggestions,
        missingKeywords: data.analysis.missingKeywords,
      });

      setForm({
        ...form,
        skills: data.profile.skills,
      });
    } catch {
      setResumeUploading(false);
      setError("Unable to analyze your resume.");
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070a] text-white">
      <Navbar />

      {/* ======================================================
          AMBIENT BACKGROUND
      ======================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[5%] top-[10%] h-[320px] w-[320px] rounded-full bg-cyan-500/[0.05] blur-[120px]" />

        <div className="absolute right-[5%] top-[20%] h-[420px] w-[420px] rounded-full bg-purple-500/[0.045] blur-[140px]" />

        <div className="absolute bottom-[5%] left-[35%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.035] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">

        {/* ======================================================
            HEADER
        ======================================================= */}

        <section className="mb-7">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 text-[11px] text-slate-400">

                <Sparkles
                  size={13}
                  className="text-cyan-400"
                />

                <span>AI Career Identity</span>

                <span className="h-1 w-1 rounded-full bg-slate-600" />

                <span className="text-cyan-400">
                  PROFILE INTELLIGENCE
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">

                Your{" "}

                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                  Career Identity
                </span>

              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Build the source of truth that powers every ProHire AI
                agent — from opportunity discovery to interview preparation
                and long-term career growth.
              </p>

            </div>

            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-2.5 text-sm text-slate-300 transition hover:border-cyan-400/20 hover:bg-white/[0.06]"
            >
              Back to Dashboard

              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>

        </section>

        {/* ======================================================
            PROFILE COMMAND CENTER
        ======================================================= */}

        <section className="relative mb-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0b121a] via-[#080d13] to-[#0c0914] shadow-2xl">

          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-400/[0.07] blur-[110px]" />

          <div className="pointer-events-none absolute -bottom-32 right-[25%] h-72 w-72 rounded-full bg-purple-500/[0.06] blur-[110px]" />

          <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_240px]">

            <div>

              <div className="flex items-center gap-3">

                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07]">

                  <BrainCircuit
                    size={21}
                    className="text-cyan-400"
                  />

                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-[#0b1219]" />

                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    ProHire Profile Intelligence
                  </p>

                  <p className="mt-1 text-xs text-emerald-400">
                    AI context layer {hasProfile ? "active" : "waiting"}
                  </p>

                </div>

              </div>

              <h2 className="mt-6 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">

                {hasProfile ? (
                  <>
                    Your professional identity,
                    <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                      understood by AI.
                    </span>
                  </>
                ) : (
                  <>
                    Give your career
                    <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                      an intelligent foundation.
                    </span>
                  </>
                )}

              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Everything you add here becomes context for ProHire's
                career intelligence layer. The richer your profile,
                the more relevant your AI-powered recommendations become.
              </p>

              {/* Intelligence pipeline */}

              <div className="mt-6 flex flex-wrap items-center gap-2">

                <ProfileSignal
                  icon={User}
                  label="Identity"
                />

                <SignalArrow />

                <ProfileSignal
                  icon={Layers3}
                  label="Skills"
                />

                <SignalArrow />

                <ProfileSignal
                  icon={Target}
                  label="Goals"
                />

                <SignalArrow />

                <ProfileSignal
                  icon={BrainCircuit}
                  label="AI Context"
                />

              </div>

            </div>

            {/* ==================================================
                READINESS RING
            =================================================== */}

            <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur">

              <div className="flex items-center justify-between">

                <span className="text-xs font-medium text-slate-400">
                  Profile readiness
                </span>

                <ShieldCheck
                  size={16}
                  className="text-cyan-400"
                />

              </div>

              <div className="relative mx-auto mt-5 flex h-36 w-36 items-center justify-center">

                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#22d3ee ${readiness}%, rgba(255,255,255,0.06) ${readiness}% 100%)`,
                  }}
                />

                <div className="absolute inset-[6px] rounded-full bg-[#080d13]" />

                <div className="relative text-center">

                  <div className="text-3xl font-bold">
                    {readiness}%
                  </div>

                  <div className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-slate-600">
                    COMPLETE
                  </div>

                </div>

              </div>

              <p className="mt-4 text-center text-[11px] leading-5 text-slate-600">
                {readiness >= 80
                  ? "Excellent. Your profile is highly informative for AI matching."
                  : readiness >= 50
                  ? "Good progress. Add more career context to improve recommendations."
                  : "Complete more sections to unlock stronger AI career intelligence."}
              </p>

            </div>

          </div>
        </section>

        {/* ======================================================
            RESUME INTELLIGENCE
        ======================================================= */}

        <section className="relative mb-6 overflow-hidden rounded-2xl border border-cyan-400/[0.12] bg-gradient-to-br from-cyan-500/[0.045] via-white/[0.015] to-purple-500/[0.035]">

          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-400/[0.04] blur-[80px]" />

          <div className="relative p-6 sm:p-7">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-xl">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07]">

                    <ScanSearch
                      size={19}
                      className="text-cyan-400"
                    />

                  </div>

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
                      Resume Intelligence Agent
                    </p>

                    <h2 className="mt-1 text-base font-semibold">
                      Let AI understand your resume
                    </h2>

                  </div>

                </div>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Upload a PDF or DOCX and ProHire will extract useful
                  career signals from your resume, identify skills, and
                  surface improvement opportunities.
                </p>

              </div>

              <label className="group relative flex min-h-[105px] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/[0.12] bg-black/20 px-5 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.025] lg:max-w-[340px]">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04]">
                  {resumeUploading ? (
                    <BrainCircuit
                      size={17}
                      className="animate-pulse text-cyan-400"
                    />
                  ) : (
                    <Upload
                      size={17}
                      className="text-cyan-400"
                    />
                  )}
                </div>

                <span className="mt-2 text-xs font-medium text-slate-300">
                  {resumeUploading
                    ? "Analyzing your resume..."
                    : "Upload Resume / CV"}
                </span>

                <span className="mt-1 text-[10px] text-slate-600">
                  PDF or DOCX
                </span>

                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />

              </label>

            </div>

            {/* Resume analysis */}

            {resumeAnalysis && (
              <div className="mt-6 grid gap-4 border-t border-white/[0.06] pt-5 md:grid-cols-2">

                <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4">

                  <div className="flex items-center gap-2">

                    <WandSparkles
                      size={15}
                      className="text-emerald-400"
                    />

                    <p className="text-xs font-semibold text-emerald-400">
                      AI Suggestions
                    </p>

                  </div>

                  <ul className="mt-3 space-y-2">

                    {resumeAnalysis.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[11px] leading-5 text-slate-500"
                      >
                        <CheckCircle2
                          size={13}
                          className="mt-0.5 shrink-0 text-emerald-400"
                        />

                        {suggestion}
                      </li>
                    ))}

                  </ul>

                </div>

                {resumeAnalysis.missingKeywords.length > 0 && (
                  <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.025] p-4">

                    <div className="flex items-center gap-2">

                      <Lightbulb
                        size={15}
                        className="text-amber-300"
                      />

                      <p className="text-xs font-semibold text-amber-300">
                        Potential Keywords
                      </p>

                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">

                      {resumeAnalysis.missingKeywords.map(
                        (keyword, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-amber-400/10 bg-amber-400/[0.04] px-2.5 py-1 text-[10px] text-slate-400"
                          >
                            {keyword}
                          </span>
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        </section>

        {/* ======================================================
            MAIN PROFILE FORM
        ======================================================= */}

        <form
          onSubmit={handleSave}
          className="space-y-5"
        >

          {/* ==================================================
              PERSONAL IDENTITY
          =================================================== */}

          <ProfileSection
            icon={User}
            eyebrow="01 / Identity"
            title="Professional Identity"
            description="Tell ProHire who you are and how you want to be represented."
          >

            <div className="grid gap-4 md:grid-cols-2">

              <Field
                label="Full Name"
                value={form.fullName}
                onChange={(v) =>
                  setForm({
                    ...form,
                    fullName: v,
                  })
                }
                required
                placeholder="Your full name"
              />

              <Field
                label="University"
                value={form.university}
                onChange={(v) =>
                  setForm({
                    ...form,
                    university: v,
                  })
                }
                placeholder="Your university"
              />

              <Field
                label="Preferred Role"
                value={form.preferredRole}
                onChange={(v) =>
                  setForm({
                    ...form,
                    preferredRole: v,
                  })
                }
                placeholder="e.g. AI Engineer"
              />

              <Field
                label="Preferred Location"
                value={form.preferredLocation}
                onChange={(v) =>
                  setForm({
                    ...form,
                    preferredLocation: v,
                  })
                }
                placeholder="e.g. Islamabad, Lahore, Karachi"
              />

            </div>

          </ProfileSection>

          {/* ==================================================
              CAREER PREFERENCES
          =================================================== */}

          <ProfileSection
            icon={Target}
            eyebrow="02 / Direction"
            title="Career Preferences"
            description="Define the conditions and opportunities you're looking for."
          >

            <div className="grid gap-4 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Remote Preference
                </label>

                <select
                  value={form.remotePref}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      remotePref:
                        e.target.value as ProfileFormState["remotePref"],
                    })
                  }
                  className="profile-input"
                >
                  <option value="no_preference">
                    No preference
                  </option>

                  <option value="remote">
                    Remote
                  </option>

                  <option value="onsite">
                    On-site
                  </option>

                  <option value="hybrid">
                    Hybrid
                  </option>
                </select>
              </div>

              <Field
                label="Expected Salary (PKR/month)"
                value={form.expectedSalaryPKR}
                onChange={(v) =>
                  setForm({
                    ...form,
                    expectedSalaryPKR: v,
                  })
                }
                type="number"
                placeholder="e.g. 100000"
              />

              <Field
                label="Availability"
                value={form.availability}
                onChange={(v) =>
                  setForm({
                    ...form,
                    availability: v,
                  })
                }
                placeholder="e.g. Immediately, 2 weeks notice"
              />

            </div>

          </ProfileSection>

          {/* ==================================================
              SKILLS
          =================================================== */}

          <ProfileSection
            icon={Layers3}
            eyebrow="03 / Capability"
            title="Skills & Expertise"
            description="These signals help the Job Discovery and Career Intelligence agents understand your capabilities."
          >

            <div className="flex gap-2">

              <input
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill — e.g. React, Python, Machine Learning"
                className="profile-input flex-1"
              />

              <button
                type="button"
                onClick={addSkill}
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] text-slate-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.05] hover:text-cyan-400"
              >
                <Plus size={17} />
              </button>

            </div>

            <div className="mt-4 flex min-h-[35px] flex-wrap gap-2">

              {form.skills.length > 0 ? (
                form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="group flex items-center gap-1.5 rounded-full border border-cyan-400/10 bg-cyan-400/[0.045] px-3 py-1.5 text-[11px] font-medium text-cyan-300"
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-cyan-400/50 transition hover:text-rose-400"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-[11px] text-slate-600">
                  No skills added yet. Add your strongest skills above.
                </p>
              )}

            </div>

          </ProfileSection>

          {/* ==================================================
              EXPERIENCE
          =================================================== */}

          <ProfileSection
            icon={BriefcaseBusiness}
            eyebrow="04 / Experience"
            title="Professional Experience"
            description="Show the AI what you've actually done, not just what you've studied."
            action={
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                <Plus size={14} />
                Add Experience
              </button>
            }
          >

            {form.experience.length === 0 ? (
              <EmptyState
                icon={BriefcaseBusiness}
                title="No experience added"
                description="Add internships, jobs, freelance work, or other professional experience."
                action="Add Experience"
                onClick={addExperience}
              />
            ) : (
              <div className="space-y-3">

                {form.experience.map((exp, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl border border-white/[0.06] bg-black/20 p-4 transition hover:border-white/[0.1]"
                  >

                    <div className="absolute right-4 top-4">

                      <button
                        type="button"
                        onClick={() =>
                          removeExperience(i)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 transition hover:bg-rose-400/[0.06] hover:text-rose-400"
                        aria-label="Remove experience"
                      >
                        <X size={14} />
                      </button>

                    </div>

                    <div className="grid gap-3 md:grid-cols-2">

                      <SmallField
                        placeholder="Job title"
                        value={exp.title}
                        onChange={(value) => {
                          const next = [
                            ...form.experience,
                          ];

                          next[i] = {
                            ...next[i],
                            title: value,
                          };

                          setForm({
                            ...form,
                            experience: next,
                          });
                        }}
                      />

                      <SmallField
                        placeholder="Company / Organization"
                        value={exp.company}
                        onChange={(value) => {
                          const next = [
                            ...form.experience,
                          ];

                          next[i] = {
                            ...next[i],
                            company: value,
                          };

                          setForm({
                            ...form,
                            experience: next,
                          });
                        }}
                      />

                      <textarea
                        placeholder="Describe your responsibilities, achievements, and impact..."
                        value={exp.description}
                        onChange={(e) => {
                          const next = [
                            ...form.experience,
                          ];

                          next[i] = {
                            ...next[i],
                            description: e.target.value,
                          };

                          setForm({
                            ...form,
                            experience: next,
                          });
                        }}
                        rows={4}
                        className="profile-textarea md:col-span-2"
                      />

                    </div>

                  </div>
                ))}

              </div>
            )}

          </ProfileSection>

          {/* ==================================================
              PROJECTS
          =================================================== */}

          <ProfileSection
            icon={Layers3}
            eyebrow="05 / Proof of Work"
            title="Projects"
            description="Projects give ProHire concrete evidence of what you can build."
            action={
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                <Plus size={14} />
                Add Project
              </button>
            }
          >

            {form.projects.length === 0 ? (
              <EmptyState
                icon={Layers3}
                title="No projects added"
                description="Add projects, products, research, or meaningful work you've built."
                action="Add Project"
                onClick={addProject}
              />
            ) : (
              <div className="space-y-3">

                {form.projects.map((project, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl border border-white/[0.06] bg-black/20 p-4"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        removeProject(i)
                      }
                      className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-slate-600 transition hover:bg-rose-400/[0.06] hover:text-rose-400"
                      aria-label="Remove project"
                    >
                      <X size={14} />
                    </button>

                    <div className="space-y-3">

                      <SmallField
                        placeholder="Project name"
                        value={project.name}
                        onChange={(value) => {
                          const next = [
                            ...form.projects,
                          ];

                          next[i] = {
                            ...next[i],
                            name: value,
                          };

                          setForm({
                            ...form,
                            projects: next,
                          });
                        }}
                      />

                      <textarea
                        placeholder="Describe what you built, the problem it solved, and the impact..."
                        value={project.description}
                        onChange={(e) => {
                          const next = [
                            ...form.projects,
                          ];

                          next[i] = {
                            ...next[i],
                            description:
                              e.target.value,
                          };

                          setForm({
                            ...form,
                            projects: next,
                          });
                        }}
                        rows={4}
                        className="profile-textarea"
                      />

                    </div>

                  </div>
                ))}

              </div>
            )}

          </ProfileSection>

          {/* ==================================================
              DIGITAL PRESENCE
          =================================================== */}

          <ProfileSection
            icon={Globe}
            eyebrow="06 / Presence"
            title="Professional Presence"
            description="Connect your public work so ProHire can better understand your professional footprint."
          >

            <div className="grid gap-4 md:grid-cols-2">

              <IconField
                icon={Github}
                label="GitHub URL"
                value={form.githubUrl}
                onChange={(v) =>
                  setForm({
                    ...form,
                    githubUrl: v,
                  })
                }
                placeholder="https://github.com/..."
              />

              <IconField
                icon={Linkedin}
                label="LinkedIn URL"
                value={form.linkedinUrl}
                onChange={(v) =>
                  setForm({
                    ...form,
                    linkedinUrl: v,
                  })
                }
                placeholder="https://linkedin.com/in/..."
              />

              <IconField
                icon={Globe}
                label="Portfolio URL"
                value={form.portfolioUrl}
                onChange={(v) =>
                  setForm({
                    ...form,
                    portfolioUrl: v,
                  })
                }
                placeholder="https://yourportfolio.com"
              />

            </div>

          </ProfileSection>

          {/* ==================================================
              ERROR / SAVE
          =================================================== */}

          {error && (
            <div className="rounded-xl border border-rose-400/15 bg-rose-400/[0.04] p-4 text-xs text-rose-300">
              {error}
            </div>
          )}

          <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-cyan-500/[0.055] via-white/[0.015] to-purple-500/[0.055] p-5 sm:p-6">

            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/[0.06] blur-[70px]" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div className="flex gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05]">

                  {saved ? (
                    <CheckCircle2
                      size={18}
                      className="text-emerald-400"
                    />
                  ) : (
                    <Sparkles
                      size={18}
                      className="text-cyan-400"
                    />
                  )}

                </div>

                <div>

                  <p className="text-sm font-semibold">
                    {saved
                      ? "Your career identity is saved."
                      : "Ready to power your AI career journey?"}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-600">
                    {saved
                      ? "Your profile is now available to ProHire's intelligence layer."
                      : "Save your profile so ProHire can use your career context across its AI agents."}
                  </p>

                </div>

              </div>

              <button
                type="submit"
                disabled={saving}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-6 py-3 text-sm font-semibold shadow-lg shadow-cyan-500/[0.1] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/[0.18] disabled:cursor-not-allowed disabled:opacity-50"
              >

                {saving
                  ? "Saving..."
                  : saved
                  ? "Saved ✓"
                  : "Save Career Profile"}

                {!saving && !saved && (
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}

              </button>

            </div>

          </section>

        </form>

        {/* ======================================================
            BOTTOM TRUST STRIP
        ======================================================= */}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pb-5 text-[10px] text-slate-700">

          <span className="flex items-center gap-1.5">
            <ShieldCheck size={11} />
            Career Data Protected
          </span>

          <span className="flex items-center gap-1.5">
            <BrainCircuit size={11} />
            AI-Powered Profile Intelligence
          </span>

          <span className="flex items-center gap-1.5">
            <Target size={11} />
            Built for the Pakistani Job Market
          </span>

        </div>

      </main>
    </div>
  );
}

/* ==============================================================
   PROFILE SECTION
============================================================== */

function ProfileSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
  action,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

      <div className="p-5 sm:p-6">

        <div className="mb-5 flex items-start justify-between gap-4">

          <div className="flex gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">

              <Icon
                size={16}
                className="text-cyan-400"
              />

            </div>

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-400/70">
                {eyebrow}
              </p>

              <h2 className="mt-1 text-base font-semibold tracking-tight">
                {title}
              </h2>

              <p className="mt-1 max-w-xl text-[11px] leading-5 text-slate-600">
                {description}
              </p>

            </div>

          </div>

          {action}

        </div>

        {children}

      </div>

    </section>
  );
}

/* ==============================================================
   FIELD
============================================================== */

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-medium text-slate-400">
        {label}

        {required && (
          <span className="ml-1 text-cyan-400">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="profile-input"
      />

    </div>
  );
}

/* ==============================================================
   SMALL FIELD
============================================================== */

function SmallField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="profile-input"
    />
  );
}

/* ==============================================================
   ICON FIELD
============================================================== */

function IconField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">

        <Icon
          size={13}
          className="text-slate-500"
        />

        {label}

      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="profile-input"
      />

    </div>
  );
}

/* ==============================================================
   EMPTY STATE
============================================================== */

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.08] bg-black/10 p-7 text-center">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.035]">
        <Icon
          size={18}
          className="text-slate-600"
        />
      </div>

      <p className="mt-3 text-xs font-medium text-slate-400">
        {title}
      </p>

      <p className="mx-auto mt-1 max-w-md text-[11px] leading-5 text-slate-600">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300"
      >
        <Plus size={13} />
        {action}
      </button>

    </div>
  );
}

/* ==============================================================
   PROFILE SIGNAL
============================================================== */

function ProfileSignal({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5">

      <Icon
        size={12}
        className="text-cyan-400"
      />

      <span className="text-[10px] font-medium text-slate-400">
        {label}
      </span>

    </div>
  );
}

/* ==============================================================
   SIGNAL ARROW
============================================================== */

function SignalArrow() {
  return (
    <ChevronRight
      size={12}
      className="hidden text-slate-700 sm:block"
    />
  );
}
