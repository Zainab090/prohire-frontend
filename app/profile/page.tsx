"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Upload, Plus, X } from "lucide-react";
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
  experience: { title: string; company: string; description: string }[];
  projects: { name: string; description: string; technologies: string[] }[];
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
  projects: []
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
    if (status === "unauthenticated") router.push("/login");
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
            expectedSalaryPKR: data.profile.expectedSalaryPKR?.toString() || "",
            availability: data.profile.availability || "",
            githubUrl: data.profile.githubUrl || "",
            linkedinUrl: data.profile.linkedinUrl || "",
            portfolioUrl: data.profile.portfolioUrl || "",
            experience: data.profile.experience || [],
            projects: data.profile.projects || []
          });
        }
      });
  }, []);

  function addSkill() {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput("");
    }
  }

  function removeSkill(skill: string) {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  }

  function addExperience() {
    setForm({ ...form, experience: [...form.experience, { title: "", company: "", description: "" }] });
  }

  function addProject() {
    setForm({ ...form, projects: [...form.projects, { name: "", description: "", technologies: [] }] });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await apiFetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        expectedSalaryPKR: form.expectedSalaryPKR ? Number(form.expectedSalaryPKR) : undefined
      })
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save profile.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    const res = await apiFetch("/api/resume/upload", { method: "POST", body: formData });
    const data = await res.json();

    setResumeUploading(false);
    if (!res.ok) {
      setError(data.error || "Failed to process resume.");
      return;
    }

    setResumeAnalysis({ suggestions: data.analysis.suggestions, missingKeywords: data.analysis.missingKeywords });
    setForm({ ...form, skills: data.profile.skills });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="mt-1 text-sm text-textMuted">
          This is the single source of truth every agent uses — build it once.
        </p>

        {/* Resume upload */}
        <div className="card mt-6 p-5">
          <h2 className="text-sm font-semibold">Resume / CV</h2>
          <p className="mt-1 text-xs text-textMuted">
            Upload a PDF or DOCX. The Resume Intelligence Agent will extract your skills automatically.
          </p>
          <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6 text-sm text-textMuted hover:border-accent-teal">
            <Upload size={16} />
            {resumeUploading ? "Analyzing resume..." : "Click to upload resume"}
            <input type="file" accept=".pdf,.docx" onChange={handleResumeUpload} className="hidden" />
          </label>

          {resumeAnalysis && (
            <div className="mt-3 space-y-2 rounded-lg bg-surfaceLight p-3 text-xs">
              <p className="font-medium text-accent-teal">Resume Intelligence Agent suggestions:</p>
              <ul className="list-inside list-disc space-y-1 text-textMuted">
                {resumeAnalysis.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              {resumeAnalysis.missingKeywords.length > 0 && (
                <p className="text-textMuted">
                  Consider adding: {resumeAnalysis.missingKeywords.join(", ")}
                </p>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="card mt-6 space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full Name" value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} required />
            <Field label="University" value={form.university} onChange={(v) => setForm({ ...form, university: v })} />
            <Field label="Preferred Role" value={form.preferredRole} onChange={(v) => setForm({ ...form, preferredRole: v })} />
            <Field label="Preferred Location" value={form.preferredLocation} onChange={(v) => setForm({ ...form, preferredLocation: v })} />
            <div>
              <label className="mb-1 block text-xs font-medium text-textMuted">Remote Preference</label>
              <select
                value={form.remotePref}
                onChange={(e) => setForm({ ...form, remotePref: e.target.value as ProfileFormState["remotePref"] })}
                className="w-full rounded-lg border border-border bg-surfaceLight px-3 py-2 text-sm outline-none focus:border-accent-teal"
              >
                <option value="no_preference">No preference</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <Field
              label="Expected Salary (PKR/month)"
              value={form.expectedSalaryPKR}
              onChange={(v) => setForm({ ...form, expectedSalaryPKR: v })}
              type="number"
            />
            <Field label="GitHub URL" value={form.githubUrl} onChange={(v) => setForm({ ...form, githubUrl: v })} />
            <Field label="LinkedIn URL" value={form.linkedinUrl} onChange={(v) => setForm({ ...form, linkedinUrl: v })} />
            <Field label="Portfolio URL" value={form.portfolioUrl} onChange={(v) => setForm({ ...form, portfolioUrl: v })} />
            <Field label="Availability" value={form.availability} onChange={(v) => setForm({ ...form, availability: v })} placeholder="e.g. Immediately, 2 weeks notice" />
          </div>

          {/* Skills */}
          <div>
            <label className="mb-1 block text-xs font-medium text-textMuted">Skills</label>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="e.g. React"
                className="flex-1 rounded-lg border border-border bg-surfaceLight px-3 py-2 text-sm outline-none focus:border-accent-teal"
              />
              <button type="button" onClick={addSkill} className="rounded-lg border border-border px-3 hover:border-accent-teal">
                <Plus size={16} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {form.skills.map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-full bg-surfaceLight px-2.5 py-1 text-xs">
                  {s}
                  <button type="button" onClick={() => removeSkill(s)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-textMuted">Experience</label>
              <button type="button" onClick={addExperience} className="text-xs text-accent-teal">
                + Add
              </button>
            </div>
            {form.experience.map((exp, i) => (
              <div key={i} className="mt-2 grid gap-2 rounded-lg bg-surfaceLight p-3 md:grid-cols-2">
                <input
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) => {
                    const next = [...form.experience];
                    next[i].title = e.target.value;
                    setForm({ ...form, experience: next });
                  }}
                  className="rounded border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-accent-teal"
                />
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const next = [...form.experience];
                    next[i].company = e.target.value;
                    setForm({ ...form, experience: next });
                  }}
                  className="rounded border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-accent-teal"
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const next = [...form.experience];
                    next[i].description = e.target.value;
                    setForm({ ...form, experience: next });
                  }}
                  className="rounded border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-accent-teal md:col-span-2"
                  rows={2}
                />
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-textMuted">Projects</label>
              <button type="button" onClick={addProject} className="text-xs text-accent-teal">
                + Add
              </button>
            </div>
            {form.projects.map((proj, i) => (
              <div key={i} className="mt-2 grid gap-2 rounded-lg bg-surfaceLight p-3">
                <input
                  placeholder="Project name"
                  value={proj.name}
                  onChange={(e) => {
                    const next = [...form.projects];
                    next[i].name = e.target.value;
                    setForm({ ...form, projects: next });
                  }}
                  className="rounded border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-accent-teal"
                />
                <textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => {
                    const next = [...form.projects];
                    next[i].description = e.target.value;
                    setForm({ ...form, projects: next });
                  }}
                  className="rounded border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-accent-teal"
                  rows={2}
                />
              </div>
            ))}
          </div>

          {error && <p className="text-xs text-accent-rose">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-accent-teal py-2.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save Profile"}
          </button>
        </form>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder
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
      <label className="mb-1 block text-xs font-medium text-textMuted">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-surfaceLight px-3 py-2 text-sm outline-none focus:border-accent-teal"
      />
    </div>
  );
}
