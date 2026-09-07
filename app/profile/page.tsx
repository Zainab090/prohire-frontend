"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { apiFetch } from "@/lib/api";

import {
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
  Wallet,
  Clock3,
  Github,
  Linkedin,
  Globe,
  Upload,
  Sparkles,
  Plus,
  X,
  ArrowRight,
  Check,
  CheckCircle2,
  BrainCircuit,
  Target,
  FileText,
  ScanSearch,
  Lightbulb,
  Trash2,
  Link2,
  Layers3,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

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

  const [form, setForm] =
    useState<ProfileFormState>(EMPTY_FORM);

  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const [resumeUploading, setResumeUploading] =
    useState(false);

  const [resumeAnalysis, setResumeAnalysis] =
    useState<{
      suggestions: string[];
      missingKeywords: string[];
    } | null>(null);

  const [error, setError] = useState("");

  /* =========================================================
     AUTH
  ========================================================= */

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    apiFetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          setForm({
            fullName: data.profile.fullName || "",
            university: data.profile.university || "",
            skills: data.profile.skills || [],
            preferredRole:
              data.profile.preferredRole || "",
            preferredLocation:
              data.profile.preferredLocation || "",
            remotePref:
              data.profile.remotePref ||
              "no_preference",
            expectedSalaryPKR:
              data.profile.expectedSalaryPKR?.toString() ||
              "",
            availability:
              data.profile.availability || "",
            githubUrl:
              data.profile.githubUrl || "",
            linkedinUrl:
              data.profile.linkedinUrl || "",
            portfolioUrl:
              data.profile.portfolioUrl || "",
            experience:
              data.profile.experience || [],
            projects:
              data.profile.projects || [],
          });
        }

        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load your profile.");
        setLoading(false);
      });
  }, []);

  /* =========================================================
     PROFILE COMPLETION
  ========================================================= */

  const completion = useMemo(() => {
    const checks = [
      !!form.fullName.trim(),
      !!form.university.trim(),
      form.skills.length > 0,
      !!form.preferredRole.trim(),
      !!form.preferredLocation.trim(),
      !!form.availability.trim(),
      form.experience.length > 0,
      form.projects.length > 0,
      !!(
        form.githubUrl ||
        form.linkedinUrl ||
        form.portfolioUrl
      ),
    ];

    const completed = checks.filter(Boolean).length;

    return {
      completed,
      total: checks.length,
      percentage: Math.round(
        (completed / checks.length) * 100
      ),
    };
  }, [form]);

  /* =========================================================
     SKILLS
  ========================================================= */

  function addSkill() {
    const skill = skillInput.trim();

    if (
      skill &&
      !form.skills.some(
        (existing) =>
          existing.toLowerCase() === skill.toLowerCase()
      )
    ) {
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
      skills: form.skills.filter(
        (item) => item !== skill
      ),
    });
  }

  /* =========================================================
     EXPERIENCE
  ========================================================= */

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

  function updateExperience(
    index: number,
    field: "title" | "company" | "description",
    value: string
  ) {
    const next = [...form.experience];

    next[index] = {
      ...next[index],
      [field]: value,
    };

    setForm({
      ...form,
      experience: next,
    });
  }

  function removeExperience(index: number) {
    setForm({
      ...form,
      experience: form.experience.filter(
        (_, i) => i !== index
      ),
    });
  }

  /* =========================================================
     PROJECTS
  ========================================================= */

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

  function updateProject(
    index: number,
    field: "name" | "description",
    value: string
  ) {
    const next = [...form.projects];

    next[index] = {
      ...next[index],
      [field]: value,
    };

    setForm({
      ...form,
      projects: next,
    });
  }

  function updateProjectTechnologies(
    index: number,
    value: string
  ) {
    const technologies = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const next = [...form.projects];

    next[index] = {
      ...next[index],
      technologies,
    };

    setForm({
      ...form,
      projects: next,
    });
  }

  function removeProject(index: number) {
    setForm({
      ...form,
      projects: form.projects.filter(
        (_, i) => i !== index
      ),
    });
  }

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  async function handleSave(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const res = await apiFetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          expectedSalaryPKR:
            form.expectedSalaryPKR
              ? Number(form.expectedSalaryPKR)
              : undefined,
        }),
      });

      const data = await res.json();

      setSaving(false);

      if (!res.ok) {
        setError(
          data.error ||
            "Failed to save your profile."
        );
        return;
      }

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch {
      setSaving(false);
      setError(
        "Something went wrong while saving your profile."
      );
    }
  }

  /* =========================================================
     RESUME UPLOAD
  ========================================================= */

  async function handleResumeUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setResumeUploading(true);
    setResumeAnalysis(null);
    setError("");

    try {
      const formData = new FormData();

      formData.append("resume", file);

      const res = await apiFetch(
        "/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setResumeUploading(false);

      if (!res.ok) {
        setError(
          data.error ||
            "Failed to process your resume."
        );
        return;
      }

      setResumeAnalysis({
        suggestions:
          data.analysis?.suggestions || [],
        missingKeywords:
          data.analysis?.missingKeywords || [],
      });

      setForm((current) => ({
        ...current,
        skills:
          data.profile?.skills ||
          current.skills,
      }));
    } catch {
      setResumeUploading(false);

      setError(
        "Unable to analyze your resume right now."
      );
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070a] text-white">
        <Navbar />

        <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <BrainCircuit
              size={18}
              className="animate-pulse text-cyan-400"
            />
            Loading your career workspace...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <Navbar />

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">

        <div className="absolute left-[-120px] top-[15%] h-[400px] w-[400px] rounded-full bg-cyan-500/[0.035] blur-[130px]" />

        <div className="absolute right-[-120px] top-[40%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.035] blur-[150px]" />

        <div className="absolute bottom-[-150px] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.025] blur-[130px]" />

      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-7 sm:px-6 lg:px-8">

        {/* =====================================================
            TOP HEADER
        ====================================================== */}

        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

          <div>

            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">

              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.8)]" />

              Career Workspace

            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">

              Build your{" "}

              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                professional identity
              </span>

            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">

              Give ProHire the context it needs to discover
              better opportunities, understand your strengths,
              and build a smarter career path.

            </p>

          </div>

          <Link
            href="/dashboard"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-cyan-400/20 hover:text-white"
          >
            Dashboard

            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />

          </Link>

        </div>

        {/* =====================================================
            WORKSPACE GRID
        ====================================================== */}

        <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* ===================================================
              LEFT SIDEBAR
          ==================================================== */}

          <aside className="space-y-4">

            {/* Completion */}

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Profile strength
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {completion.percentage}%
                  </p>

                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/[0.06]">
                  <Target
                    size={15}
                    className="text-cyan-400"
                  />
                </div>

              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500"
                  style={{
                    width: `${completion.percentage}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-[10px] leading-5 text-slate-600">

                {completion.percentage >= 80
                  ? "Strong profile. Your AI agents have rich career context."
                  : "Complete more sections to improve your AI matching accuracy."}

              </p>

            </div>

            {/* AI Pipeline */}

            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5">

              <div className="mb-5 flex items-center gap-2">

                <BrainCircuit
                  size={15}
                  className="text-cyan-400"
                />

                <span className="text-xs font-semibold">
                  AI Context
                </span>

              </div>

              <div className="space-y-1">

                <SidebarStep
                  number="01"
                  label="Identity"
                  done={!!form.fullName}
                />

                <SidebarStep
                  number="02"
                  label="Capabilities"
                  done={form.skills.length > 0}
                />

                <SidebarStep
                  number="03"
                  label="Experience"
                  done={form.experience.length > 0}
                />

                <SidebarStep
                  number="04"
                  label="Projects"
                  done={form.projects.length > 0}
                />

                <SidebarStep
                  number="05"
                  label="Career Goals"
                  done={
                    !!form.preferredRole &&
                    !!form.preferredLocation
                  }
                />

                <SidebarStep
                  number="06"
                  label="Professional Links"
                  done={
                    !!(
                      form.githubUrl ||
                      form.linkedinUrl ||
                      form.portfolioUrl
                    )
                  }

                />

              </div>

            </div>

            {/* Agent card */}

            <div className="relative overflow-hidden rounded-2xl border border-cyan-400/[0.1] bg-gradient-to-br from-cyan-400/[0.05] to-purple-500/[0.035] p-5">

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/[0.06] blur-2xl" />

              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              <h3 className="mt-3 text-xs font-semibold">
                Profile Intelligence
              </h3>

              <p className="mt-2 text-[10px] leading-5 text-slate-600">

                Your profile becomes the shared context
                layer for ProHire's specialized AI agents.

              </p>

              <div className="mt-4 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                Intelligence layer active

              </div>

            </div>

          </aside>

          {/* ===================================================
              MAIN WORKSPACE
          ==================================================== */}

          <form
            onSubmit={handleSave}
            className="min-w-0 space-y-5"
          >

            {/* =================================================
                RESUME
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

              <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">

                <SectionHeading
                  number="01"
                  icon={FileText}
                  title="Resume Intelligence"
                  description="Let ProHire extract career signals automatically."
                />

              </div>

              <div className="p-5 sm:p-6">

                <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-black/20 px-5 py-9 text-center transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.015]">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05]">

                    {resumeUploading ? (
                      <BrainCircuit
                        size={20}
                        className="animate-pulse text-cyan-400"
                      />
                    ) : (
                      <Upload
                        size={20}
                        className="text-cyan-400"
                      />
                    )}

                  </div>

                  <p className="mt-4 text-sm font-semibold">

                    {resumeUploading
                      ? "AI is analyzing your resume..."
                      : "Drop your resume into the intelligence layer"}

                  </p>

                  <p className="mt-1 text-[11px] text-slate-600">

                    PDF or DOCX • Skills will be extracted automatically

                  </p>

                  <span className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-[11px] font-medium text-slate-400 transition group-hover:border-cyan-400/20 group-hover:text-cyan-300">

                    {resumeUploading
                      ? "Processing..."
                      : "Choose Resume"}

                  </span>

                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />

                </label>

                {/* Resume result */}

                {resumeAnalysis && (
                  <div className="mt-4 grid gap-3 md:grid-cols-2">

                    <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4">

                      <div className="flex items-center gap-2">

                        <CheckCircle2
                          size={15}
                          className="text-emerald-400"
                        />

                        <span className="text-xs font-semibold text-emerald-300">
                          AI Suggestions
                        </span>

                      </div>

                      <div className="mt-3 space-y-2">

                        {resumeAnalysis.suggestions
                          .length > 0 ? (
                          resumeAnalysis.suggestions.map(
                            (suggestion, index) => (
                              <div
                                key={index}
                                className="flex gap-2 text-[11px] leading-5 text-slate-500"
                              >
                                <Check
                                  size={13}
                                  className="mt-1 shrink-0 text-emerald-400"
                                />

                                {suggestion}
                              </div>
                            )
                          )
                        ) : (
                          <p className="text-[11px] text-slate-600">
                            No additional suggestions.
                          </p>
                        )}

                      </div>

                    </div>

                    <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.025] p-4">

                      <div className="flex items-center gap-2">

                        <Lightbulb
                          size={15}
                          className="text-amber-300"
                        />

                        <span className="text-xs font-semibold text-amber-300">
                          Potential Keywords
                        </span>

                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">

                        {resumeAnalysis.missingKeywords
                          .length > 0 ? (
                          resumeAnalysis.missingKeywords.map(
                            (keyword, index) => (
                              <span
                                key={index}
                                className="rounded-full border border-amber-400/10 bg-amber-400/[0.04] px-2.5 py-1 text-[10px] text-slate-400"
                              >
                                {keyword}
                              </span>
                            )
                          )
                        ) : (
                          <p className="text-[11px] text-slate-600">
                            No missing keywords detected.
                          </p>
                        )}

                      </div>

                    </div>

                  </div>
                )}

              </div>

            </section>

            {/* =================================================
                PERSONAL INFO
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

              <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">

                <SectionHeading
                  number="02"
                  icon={UserRound}
                  title="Professional Identity"
                  description="The basic information your career agents use to understand you."
                />

              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">

                <Field
                  icon={UserRound}
                  label="Full Name"
                  value={form.fullName}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      fullName: value,
                    })
                  }
                  placeholder="e.g. Muhammad Ahmed"
                  required
                />

                <Field
                  icon={GraduationCap}
                  label="University"
                  value={form.university}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      university: value,
                    })
                  }
                  placeholder="e.g. FAST-NUCES"
                />

              </div>

            </section>

            {/* =================================================
                CAREER PREFERENCES
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

              <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">

                <SectionHeading
                  number="03"
                  icon={Target}
                  title="Career Direction"
                  description="Tell ProHire what kind of opportunity you're targeting."
                />

              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">

                <Field
                  icon={BriefcaseBusiness}
                  label="Preferred Role"
                  value={form.preferredRole}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      preferredRole: value,
                    })
                  }
                  placeholder="e.g. AI Engineer"
                />

                <Field
                  icon={MapPin}
                  label="Preferred Location"
                  value={form.preferredLocation}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      preferredLocation: value,
                    })
                  }
                  placeholder="e.g. Lahore, Islamabad"
                />

                <div>

                  <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400">

                    <Globe
                      size={13}
                      className="text-slate-600"
                    />

                    Work Preference

                  </label>

                  <select
                    value={form.remotePref}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        remotePref:
                          e.target
                            .value as ProfileFormState["remotePref"],
                      })
                    }
                    className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
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
                  icon={Wallet}
                  label="Expected Salary (PKR/month)"
                  value={form.expectedSalaryPKR}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      expectedSalaryPKR: value,
                    })
                  }
                  type="number"
                  placeholder="e.g. 150000"
                />

                <Field
                  icon={Clock3}
                  label="Availability"
                  value={form.availability}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      availability: value,
                    })
                  }
                  placeholder="e.g. Immediately"
                />

              </div>

            </section>

            {/* =================================================
                SKILLS
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

              <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">

                <SectionHeading
                  number="04"
                  icon={Layers3}
                  title="Skills & Capabilities"
                  description="Add the technologies, tools, and professional capabilities you can confidently use."
                />

              </div>

              <div className="p-5 sm:p-6">

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
                    placeholder="Type a skill and press Enter..."
                    className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={addSkill}
                    className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-slate-400 transition hover:border-cyan-400/25 hover:bg-cyan-400/[0.04] hover:text-cyan-300"
                  >
                    <Plus size={17} />
                  </button>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  {form.skills.length > 0 ? (
                    form.skills.map((skill) => (
                      <span
                        key={skill}
                        className="group flex items-center gap-2 rounded-lg border border-cyan-400/[0.12] bg-cyan-400/[0.045] px-3 py-2 text-[11px] font-medium text-cyan-300"
                      >

                        {skill}

                        <button
                          type="button"
                          onClick={() =>
                            removeSkill(skill)
                          }
                          className="text-cyan-400/40 transition hover:text-rose-400"
                        >
                          <X size={12} />
                        </button>

                      </span>
                    ))
                  ) : (
                    <div className="flex w-full items-center gap-2 rounded-xl border border-dashed border-white/[0.07] px-4 py-4 text-[11px] text-slate-600">

                      <Sparkles size={13} />

                      Add your strongest skills to improve
                      AI matching.

                    </div>
                  )}

                </div>

              </div>

            </section>

            {/* =================================================
                EXPERIENCE
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">

                <SectionHeading
                  number="05"
                  icon={BriefcaseBusiness}
                  title="Professional Experience"
                  description="Internships, jobs, freelance work, and meaningful professional experience."
                />

                <button
                  type="button"
                  onClick={addExperience}
                  className="hidden items-center gap-1.5 rounded-lg border border-cyan-400/15 bg-cyan-400/[0.04] px-3 py-2 text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-400/[0.08] sm:flex"
                >
                  <Plus size={13} />
                  Add
                </button>

              </div>

              <div className="p-5 sm:p-6">

                {form.experience.length === 0 ? (
                  <EmptyBlock
                    icon={BriefcaseBusiness}
                    title="No experience added yet"
                    description="Add your professional experience so ProHire can understand your career history."
                    button="Add Experience"
                    onClick={addExperience}
                  />
                ) : (
                  <div className="space-y-3">

                    {form.experience.map(
                      (experience, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-white/[0.07] bg-black/20 p-4"
                        >

                          <div className="mb-4 flex items-center justify-between">

                            <div className="flex items-center gap-2">

                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/[0.06]">

                                <BriefcaseBusiness
                                  size={13}
                                  className="text-cyan-400"
                                />

                              </div>

                              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                                Experience {index + 1}
                              </span>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeExperience(index)
                              }
                              className="text-slate-600 transition hover:text-rose-400"
                              aria-label="Remove experience"
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">

                            <input
                              value={experience.title}
                              onChange={(e) =>
                                updateExperience(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Job title"
                              className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                            />

                            <input
                              value={experience.company}
                              onChange={(e) =>
                                updateExperience(
                                  index,
                                  "company",
                                  e.target.value
                                )
                              }
                              placeholder="Company / Organization"
                              className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                            />

                            <textarea
                              value={
                                experience.description
                              }
                              onChange={(e) =>
                                updateExperience(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Describe your responsibilities, achievements, and impact..."
                              rows={4}
                              className="profile-textarea w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 py-3 text-[12px] font-medium leading-5 text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 resize-y hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
                            />

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.07] py-3 text-[10px] font-semibold text-slate-600 transition hover:border-cyan-400/20 hover:text-cyan-300 sm:hidden"
                >
                  <Plus size={13} />
                  Add Another Experience
                </button>

              </div>

            </section>

            {/* =================================================
                PROJECTS
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">

                <SectionHeading
                  number="06"
                  icon={Layers3}
                  title="Projects & Proof of Work"
                  description="Show the AI what you've actually built."
                />

                <button
                  type="button"
                  onClick={addProject}
                  className="hidden items-center gap-1.5 rounded-lg border border-cyan-400/15 bg-cyan-400/[0.04] px-3 py-2 text-[10px] font-semibold text-cyan-300 transition hover:bg-cyan-400/[0.08] sm:flex"
                >
                  <Plus size={13} />
                  Add
                </button>

              </div>

              <div className="p-5 sm:p-6">

                {form.projects.length === 0 ? (
                  <EmptyBlock
                    icon={Layers3}
                    title="No projects added yet"
                    description="Add applications, research, freelance work, or products you've built."
                    button="Add Project"
                    onClick={addProject}
                  />
                ) : (
                  <div className="space-y-3">

                    {form.projects.map(
                      (project, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-white/[0.07] bg-black/20 p-4"
                        >

                          <div className="mb-4 flex items-center justify-between">

                            <div className="flex items-center gap-2">

                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-400/[0.06]">

                                <Layers3
                                  size={13}
                                  className="text-purple-300"
                                />

                              </div>

                              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                                Project {index + 1}
                              </span>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeProject(index)
                              }
                              className="text-slate-600 transition hover:text-rose-400"
                              aria-label="Remove project"
                            >
                              <Trash2 size={14} />
                            </button>

                          </div>

                          <div className="space-y-3">

                            <input
                              value={project.name}
                              onChange={(e) =>
                                updateProject(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Project name"
                              className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                            />

                            <textarea
                              value={project.description}
                              onChange={(e) =>
                                updateProject(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="What did you build? What problem did it solve? What was your contribution?"
                              rows={4}
                              className="profile-textarea w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 py-3 text-[12px] font-medium leading-5 text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 resize-y hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                            />

                            <div>

                              <label className="mb-2 flex items-center gap-2 text-[10px] font-medium text-slate-500">

                                <Layers3 size={12} />

                                Technologies

                              </label>

                              <input
                                value={project.technologies.join(
                                  ", "
                                )}
                                onChange={(e) =>
                                  updateProjectTechnologies(
                                    index,
                                    e.target.value
                                  )
                                }
                                placeholder="React, Next.js, Python, PostgreSQL..."
                                className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                              />

                              <p className="mt-1.5 text-[9px] text-slate-700">
                                Separate technologies with commas.
                              </p>

                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                )}

                <button
                  type="button"
                  onClick={addProject}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.07] py-3 text-[10px] font-semibold text-slate-600 transition hover:border-cyan-400/20 hover:text-cyan-300 sm:hidden"
                >
                  <Plus size={13} />
                  Add Another Project
                </button>

              </div>

            </section>

            {/* =================================================
                LINKS
            ================================================== */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]">

              <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">

                <SectionHeading
                  number="07"
                  icon={Link2}
                  title="Professional Presence"
                  description="Connect your public work and professional profiles."
                />

              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">

                <LinkField
                  icon={Github}
                  label="GitHub"
                  value={form.githubUrl}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      githubUrl: value,
                    })
                  }
                  placeholder="https://github.com/username"
                />

                <LinkField
                  icon={Linkedin}
                  label="LinkedIn"
                  value={form.linkedinUrl}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      linkedinUrl: value,
                    })
                  }
                  placeholder="https://linkedin.com/in/username"
                />

                <LinkField
                  icon={Globe}
                  label="Portfolio"
                  value={form.portfolioUrl}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      portfolioUrl: value,
                    })
                  }
                  placeholder="https://yourportfolio.com"
                />

              </div>

            </section>

            {/* =================================================
                ERROR
            ================================================== */}

            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-rose-400/15 bg-rose-400/[0.035] p-4 text-xs text-rose-300">

                <X
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>

              </div>
            )}

            {/* =================================================
                SAVE
            ================================================== */}

            <div className="sticky bottom-4 z-20">

              <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.09] bg-[#090d12]/90 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/10 bg-cyan-400/[0.04]">

                    {saved ? (
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400"
                      />
                    ) : (
                      <ShieldCheck
                        size={16}
                        className="text-cyan-400"
                      />
                    )}

                  </div>

                  <div>

                    <p className="text-xs font-semibold">

                      {saved
                        ? "Profile saved successfully"
                        : "Your profile powers ProHire AI"}

                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-600">

                      {saved
                        ? "Your latest career context is now available to your agents."
                        : `${completion.completed} of ${completion.total} profile signals completed.`}

                    </p>

                  </div>

                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/[0.08] transition hover:-translate-y-0.5 hover:shadow-cyan-500/[0.15] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {saving
                    ? "Saving profile..."
                    : saved
                    ? "Profile Saved"
                    : "Save Career Profile"}

                  {!saving && !saved && (
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}

                </button>

              </div>

            </div>

          </form>

        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <div className="flex flex-wrap items-center justify-center gap-5 py-7 text-[9px] uppercase tracking-wider text-slate-700">

          <span className="flex items-center gap-1.5">
            <ShieldCheck size={11} />
            Secure Career Data
          </span>

          <span className="flex items-center gap-1.5">
            <BrainCircuit size={11} />
            AI Context Layer
          </span>

          <span className="flex items-center gap-1.5">
            <Target size={11} />
            Pakistan-Focused Intelligence
          </span>

        </div>

        
        <style jsx global>{`
          .profile-input,
          .profile-textarea {
            -webkit-appearance: none;
            appearance: none;
            -webkit-tap-highlight-color: transparent;
          }
        
          .profile-input::placeholder,
          .profile-textarea::placeholder {
            opacity: 1;
          }
        
          .profile-input:-webkit-autofill,
          .profile-input:-webkit-autofill:hover,
          .profile-input:-webkit-autofill:focus,
          .profile-textarea:-webkit-autofill,
          .profile-textarea:-webkit-autofill:hover,
          .profile-textarea:-webkit-autofill:focus {
            -webkit-text-fill-color: rgb(226 232 240);
            -webkit-box-shadow: 0 0 0 1000px #0a0f15 inset;
            transition: background-color 9999s ease-in-out 0s;
          }
        
          select.profile-input {
            cursor: pointer;
          }
        
          input[type="number"].profile-input::-webkit-inner-spin-button,
          input[type="number"].profile-input::-webkit-outer-spin-button {
            opacity: 0.35;
          }
        
          .profile-textarea {
            min-height: 112px;
          }
        
          .profile-input:focus-visible,
          .profile-textarea:focus-visible {
            outline: none;
          }
        `}</style>
        
      </main>
    </div>
  );
}

/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025]">

        <Icon
          size={15}
          className="text-cyan-400"
        />

        <span className="absolute -right-1 -top-1 text-[7px] font-bold text-slate-700">
          {number}
        </span>

      </div>

      <div>

        <h2 className="text-sm font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-[10px] leading-4 text-slate-600">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   SIDEBAR STEP
============================================================= */

function SidebarStep({
  number,
  label,
  done,
}: {
  number: string;
  label: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2">

      <div
        className={`flex h-6 w-6 items-center justify-center rounded-md border text-[8px] font-bold ${
          done
            ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400"
            : "border-white/[0.07] bg-white/[0.02] text-slate-700"
        }`}
      >
        {done ? (
          <Check size={11} />
        ) : (
          number
        )}
      </div>

      <span
        className={`text-[10px] ${
          done
            ? "text-slate-400"
            : "text-slate-600"
        }`}
      >
        {label}
      </span>

    </div>
  );
}

/* =============================================================
   FIELD
============================================================= */

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  icon?: React.ElementType;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400">

        {Icon && (
          <Icon
            size={13}
            className="text-slate-600"
          />
        )}

        {label}

        {required && (
          <span className="text-cyan-400">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
      />

    </div>
  );
}

/* =============================================================
   LINK FIELD
============================================================= */

function LinkField({
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

      <label className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400">

        <Icon
          size={13}
          className="text-slate-600"
        />

        {label}

      </label>

      <div className="relative">

        <Link2
          size={13}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-700"
        />

        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="profile-input h-[46px] w-full rounded-xl border border-white/[0.09] bg-[#0a0f15]/80 px-4 text-[12px] font-medium text-slate-200 outline-none placeholder:text-slate-600 transition-all duration-200 hover:border-white/[0.14] hover:bg-[#0c1219] focus:border-cyan-400/40 focus:bg-[#0b1118] focus:ring-2 focus:ring-cyan-400/[0.08] focus:shadow-[0_0_20px_rgba(34,211,238,0.06)] disabled:cursor-not-allowed disabled:opacity-50 pl-9"
        />

      </div>

    </div>
  );
}

/* =============================================================
   EMPTY BLOCK
============================================================= */

function EmptyBlock({
  icon: Icon,
  title,
  description,
  button,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  button: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/[0.07] bg-black/10 px-5 py-8 text-center">

      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.025]">

        <Icon
          size={17}
          className="text-slate-600"
        />

      </div>

      <h3 className="mt-3 text-xs font-semibold text-slate-400">
        {title}
      </h3>

      <p className="mx-auto mt-1 max-w-md text-[10px] leading-5 text-slate-600">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-cyan-400 transition hover:text-cyan-300"
      >

        <Plus size={13} />

        {button}

        <ChevronRight size={12} />

      </button>

    </div>
  );
}
