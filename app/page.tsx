import Link from "next/link";
import { Sparkles, Target, Mic, TrendingUp, ArrowRight, ShieldCheck, Zap, Globe, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-slate-100 selection:bg-accent-teal selection:text-background overflow-hidden relative">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-tr from-accent-teal/15 via-accent-violet/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-accent-teal/5 blur-[150px] pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent-teal to-accent-violet flex items-center justify-center shadow-lg shadow-accent-teal/20">
              <Zap className="h-5 w-5 text-background fill-background" />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              ProHire<span className="text-accent-teal">.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-accent-teal transition-colors">Features</a>
            <a href="#bilingual" className="hover:text-accent-teal transition-colors">Bilingual AI</a>
            <a href="#roadmap" className="hover:text-accent-teal transition-colors">Roadmap</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 px-5 py-2.5 text-sm font-bold text-background shadow-lg shadow-accent-teal/25 hover:shadow-accent-teal/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center relative">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-teal/30 bg-accent-teal/10 px-4 py-1.5 text-xs font-semibold text-accent-teal backdrop-blur-md animate-fade-in">
          <Sparkles size={13} className="animate-spin" /> 
          <span>Built for the Pakistani Job Market & Global Remote Talent</span>
        </div>

        <h1 className="text-5xl font-black leading-[1.1] tracking-tight md:text-7xl">
          Your AI Career Agent — <br />
          <span className="bg-gradient-to-r from-accent-teal via-cyan-400 to-accent-violet bg-clip-text text-transparent">
            From Profile to Placement.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 font-normal leading-relaxed">
          ProHire builds your profile once, matches you against real opportunities with explainable scores, and runs adaptive mock interviews in <span className="text-slate-200 font-semibold">English, Urdu, or Roman Urdu</span>.
        </p>

        {/* CTA Group */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent-teal px-8 py-4 text-base font-bold text-background shadow-xl shadow-accent-teal/30 hover:opacity-95 hover:scale-[1.02] transition-all"
          >
            Start Free Career Audit <ArrowRight size={18} />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-base font-semibold text-slate-300 hover:border-accent-violet hover:text-white backdrop-blur-sm transition-all"
          >
            Explore Live Demo
          </Link>
        </div>

        {/* Trust Badge Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 font-medium uppercase tracking-wider">
          <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-accent-teal" /> Explainable AI Scores</div>
          <div className="flex items-center gap-2"><Globe size={16} className="text-accent-violet" /> Urdu & Roman Urdu Voice AI</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Zero Fabricated CVs</div>
        </div>
      </section>

      {/* Bento Grid Feature Section */}
      <section id="features" className="mx-auto max-w-6xl px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Engineered for Victory</h2>
          <p className="text-slate-400 mt-2">Everything you need to bypass traditional screening friction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: AI Job Matching (Large Span) */}
          <div className="md:col-span-2 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 p-8 relative overflow-hidden group hover:border-accent-teal/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-teal/10 rounded-full blur-3xl group-hover:bg-accent-teal/20 transition-all" />
            <div className="h-12 w-12 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center mb-6 text-accent-teal">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Explainable AI Job Matching</h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              No black-box guesswork. Our engine maps your precise competencies against localized Pakistani & remote market openings, showing you the explicit 'Why you match' breakdown.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-accent-teal bg-accent-teal/10 px-3 py-1 rounded-full border border-accent-teal/20">
              98% Matching Precision
            </div>
          </div>

          {/* Bento Card 2: AI Voice Interview */}
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 p-8 relative overflow-hidden group hover:border-accent-violet/50 transition-all duration-300">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-violet/10 rounded-full blur-3xl group-hover:bg-accent-violet/20 transition-all" />
            <div className="h-12 w-12 rounded-2xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center mb-6 text-accent-violet">
              <Mic size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bilingual Voice Interviews</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Practise with an adaptive interviewer that speaks English, Urdu, or Roman Urdu naturally, tailoring follow-up queries strictly to your verbal answers.
            </p>
          </div>

          {/* Bento Card 3: Resume Intelligence */}
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 p-8 relative overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Structured Resume Intel</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Instant deep-parsing that highlights real competencies without ever fabricating credentials or inflating achievements.
            </p>
          </div>

          {/* Bento Card 4: Career Roadmap (Large Span) */}
          <div className="md:col-span-2 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 p-8 relative overflow-hidden group hover:border-accent-teal/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-violet/10 rounded-full blur-3xl group-hover:bg-accent-violet/20 transition-all" />
            <div className="h-12 w-12 rounded-2xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center mb-6 text-accent-teal">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dynamic Skill Roadmap</h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Transforms interview missteps and assessment gaps into a concrete, sequenced, weekly growth plan tailored precisely to regional industry demands.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Actionable Skill Tracks
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/40 py-10 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ProHire.ai • Crafted for Global Hackathon Excellence.</p>
      </footer>

    </main>
  );
}
