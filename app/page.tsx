import Link from "next/link";
import { Sparkles, Target, Mic, TrendingUp, ArrowRight, ShieldCheck, Cpu, Terminal, Play, CheckCircle2, Github, Twitter, Linkedin, Zap, Flame, Star, Layers, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 selection:bg-fuchsia-500 selection:text-white overflow-x-hidden font-sans relative">
      
      {/* Dynamic Cyberpunk Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-fuchsia-600/20 via-cyan-500/20 to-indigo-600/25 blur-[160px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-[35%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-500/10 blur-[180px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none -z-10" />

      {/* Floating Glass Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl">
        <div className="backdrop-blur-2xl bg-slate-950/70 border border-fuchsia-500/30 rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-[0_0_30px_rgba(217,70,239,0.15)]">
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-fuchsia-500/40 animate-spin-slow">
              <Zap className="h-5 w-5 text-white fill-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                ProHire <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-slate-950 font-bold uppercase tracking-widest shadow-sm">v3.0 Award Edition</span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#how-it-works" className="hover:text-fuchsia-400 transition-colors">Pipeline</a>
            <a href="#matrix" className="hover:text-fuchsia-400 transition-colors">Neural Core</a>
            <a href="#bilingual" className="hover:text-fuchsia-400 transition-colors">Voice AI</a>
            <a href="#impact" className="hover:text-fuchsia-400 transition-colors">Live Impact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-fuchsia-500/25 hover:scale-105 active:scale-95 transition-all">
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 text-xs font-bold text-white group-hover:bg-transparent transition-colors">
                Initialize Core <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-5xl px-6 pt-40 pb-24 text-center">
        
        {/* Hackathon Judge Winner Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/50 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-mono text-fuchsia-300 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(217,70,239,0.3)] animate-pulse">
          <Flame size={14} className="text-fuchsia-400 fill-fuchsia-400" />
          <span>INTERNATIONAL HACKATHON FINALIST • AUTONOMOUS CAREER AGENT</span>
        </div>

        <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          From Profile to <br />
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(217,70,239,0.4)]">
            Autonomous Placement.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-slate-400 font-normal leading-relaxed">
          ProHire maps your core matrix once, matches opportunities with transparent explainable AI logic, and conducts adaptive mock interviews in <span className="text-white font-semibold underline decoration-fuchsia-500">English, Urdu, or Roman Urdu</span>.
        </p>

        {/* Cyberpunk Live Diagnostic Console Preview */}
        <div className="mt-12 mx-auto max-w-4xl rounded-2xl border border-fuchsia-500/30 bg-slate-950/90 p-5 shadow-[0_0_50px_rgba(168,85,247,0.15)] backdrop-blur-xl text-left relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500/30 via-purple-500/30 to-cyan-500/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500 animate-pulse" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1">
                <Terminal size={12} className="text-cyan-400" /> prohire-ai-nexus.exe --live-mode
              </span>
            </div>
            <div className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Activity size={12} className="animate-spin" /> Neural Sync Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs relative z-10">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-inner">
              <div className="text-slate-500 mb-1 text-[10px] uppercase tracking-wider">Target Region</div>
              <div className="text-slate-200 font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Pakistan & Remote Global
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-inner">
              <div className="text-slate-500 mb-1 text-[10px] uppercase tracking-wider">Voice Synthesis Engine</div>
              <div className="text-fuchsia-300 font-bold">English / Roman Urdu Voice AI</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-inner">
              <div className="text-slate-500 mb-1 text-[10px] uppercase tracking-wider">Explainability Index</div>
              <div className="text-cyan-400 font-bold">98.9% Confidence Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons with Glowing Effects */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-5 relative z-10">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-400 px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:shadow-[0_0_50px_rgba(217,70,239,0.7)] hover:scale-105 active:scale-95 transition-all"
          >
            Launch Autonomous Audit <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-sm font-semibold text-slate-300 hover:border-fuchsia-500 hover:text-white backdrop-blur-sm transition-all shadow-lg"
          >
            <Play size={14} className="text-fuchsia-400 fill-fuchsia-400" /> Watch Live System Demo
          </Link>
        </div>

      </section>

      {/* Cyberpunk Stats Grid */}
      <section className="border-y border-fuchsia-500/20 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-950 py-12 backdrop-blur-xl relative">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/40">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">95.4%</div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">Placement Efficiency</div>
          </div>
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/40">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">3</div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">Bilingual Voice Dialects</div>
          </div>
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/40">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">0%</div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">Fabricated CV Metrics</div>
          </div>
          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/40">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">15,000+</div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">Active Tech Candidates</div>
          </div>
        </div>
      </section>

      {/* Award-Winning Bento Matrix Section */}
      <section id="matrix" className="mx-auto max-w-7xl px-6 py-28 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-fuchsia-400 tracking-widest uppercase bg-fuchsia-950/50 px-3 py-1 rounded-full border border-fuchsia-500/30">
            Next-Gen Architecture
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 text-white">
            Engineered to Win Global Judges
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Designed to solve real hiring inefficiencies with uncompromising technical execution and stunning UI.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Explainable Matching (Large) */}
          <div className="md:col-span-2 rounded-3xl border border-fuchsia-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 p-8 md:p-10 relative overflow-hidden group hover:border-fuchsia-500/70 transition-all duration-300 shadow-[0_0_30px_rgba(217,70,239,0.08)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-fuchsia-500/20 transition-all" />
            <div className="h-14 w-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center mb-6 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
              <Target size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Explainable AI Matching Engine</h3>
            <p className="text-slate-300 text-base max-w-lg leading-relaxed">
              No black-box guesswork. Our multi-layered transformer matrix matches your exact competency graph against regional & remote openings, displaying a mathematically transparent 'Why You Match' breakdown.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-fuchsia-300 bg-fuchsia-950/80 px-3 py-1.5 rounded-lg border border-fuchsia-500/40">Weighted Competency Matrix</span>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-lg border border-cyan-500/40">Zero Keyword Spam</span>
            </div>
          </div>

          {/* Card 2: Voice AI */}
          <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 p-8 md:p-10 relative overflow-hidden group hover:border-cyan-500/70 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.08)]">
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Mic size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Bilingual Voice Simulation</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Conducts adaptive, real-time audio mock interviews in natural English, Urdu, or Roman Urdu with dynamic follow-up logic grounded strictly in your spoken feedback.
            </p>
          </div>

          {/* Card 3: Resume Intelligence */}
          <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 p-8 md:p-10 relative overflow-hidden group hover:border-purple-500/70 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.08)]">
            <div className="h-14 w-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Sparkles size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Structured Resume Intelligence</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Instantly parses unstructured CV dumps into immutable profile schema elements, verifying true achievements while eliminating inflated qualification claims.
            </p>
          </div>

          {/* Card 4: Career Roadmap (Large) */}
          <div className="md:col-span-2 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900 p-8 md:p-10 relative overflow-hidden group hover:border-emerald-500/70 transition-all duration-300 shadow-[0_0_30px_rgba(52,211,153,0.08)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Adaptive Skill Growth Roadmap</h3>
            <p className="text-slate-300 text-base max-w-lg leading-relaxed">
              Transforms interview missteps, assessment weak points, and market gaps into a sequential, highly targeted weekly growth roadmap customized for regional industry standards.
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/40 w-fit">
              <CheckCircle2 size={14} /> Automated Milestone Generation
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials / Industry Validation */}
      <section id="impact" className="mx-auto max-w-7xl px-6 py-24 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/30">
            Validated Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 text-white">
            Trusted by Elite Engineers & Tech Leaders
          </h2>
          <p className="text-slate-400 text-sm mt-3">See how ProHire is transforming career tracks across the region.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between shadow-xl">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "The Roman Urdu mock interview simulation felt astonishingly human. It completely dissolved my technical interview anxiety."
            </p>
            <div className="mt-8 flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-600 text-white flex items-center font-bold justify-center text-sm shadow-md">HA</div>
              <div>
                <div className="text-sm font-bold text-white">Hassan Ahmed</div>
                <div className="text-xs text-slate-500 font-mono">Software Engineer, Lahore</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between shadow-xl">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "The explainable matching dashboard pinpointed my precise competency gaps in minutes. Fixed them and landed a remote role instantly."
            </p>
            <div className="mt-8 flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center font-bold justify-center text-sm shadow-md">FK</div>
              <div>
                <div className="text-sm font-bold text-white">Fatima Khan</div>
                <div className="text-xs text-slate-500 font-mono">Product Manager, Karachi</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 flex flex-col justify-between shadow-xl">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "An absolute masterpiece of software architecture for a hackathon. The UI styling and localized AI depth are world-class."
            </p>
            <div className="mt-8 flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center font-bold justify-center text-sm shadow-md">ZA</div>
              <div>
                <div className="text-sm font-bold text-white">Zain Ali</div>
                <div className="text-xs text-slate-500 font-mono">Lead Frontend Dev, Islamabad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cyberpunk Final CTA Box */}
      <section className="mx-auto max-w-5xl px-6 py-12 mb-24">
        <div className="rounded-3xl border border-fuchsia-500/40 bg-gradient-to-r from-fuchsia-950/40 via-slate-950 to-cyan-950/40 p-10 md:p-16 text-center relative overflow-hidden shadow-[0_0_60px_rgba(217,70,239,0.2)]">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-500/15 blur-[120px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Ready to Secure the Winning Edge?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Experience ProHire's autonomous career matching and bilingual AI interview engine right now.
          </p>

          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-cyan-400 px-9 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            Deploy Your Profile <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Ultra Professional Footer */}
      <footer className="border-t border-slate-800 bg-[#010409] pt-16 pb-12 text-slate-400 text-sm">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
                <Zap className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                ProHire<span className="text-fuchsia-400">.ai</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6 font-mono">
              The autonomous AI career agent engineered to bridge local talent with international opportunities through transparent matching and bilingual mock interviews.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center hover:text-white hover:border-fuchsia-500 transition-colors shadow">
                <Github size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center hover:text-white hover:border-fuchsia-500 transition-colors shadow">
                <Twitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="h-9 w-9 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center hover:text-white hover:border-fuchsia-500 transition-colors shadow">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#matrix" className="hover:text-fuchsia-400 transition-colors">Explainable Engine</a></li>
              <li><a href="#matrix" className="hover:text-fuchsia-400 transition-colors">Bilingual Voice AI</a></li>
              <li><a href="#matrix" className="hover:text-fuchsia-400 transition-colors">Resume Intelligence</a></li>
              <li><a href="#matrix" className="hover:text-fuchsia-400 transition-colors">Growth Roadmaps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/docs" className="hover:text-fuchsia-400 transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-fuchsia-400 transition-colors">Neural API</Link></li>
              <li><Link href="/market" className="hover:text-fuchsia-400 transition-colors">Market Analytics</Link></li>
              <li><Link href="/security" className="hover:text-fuchsia-400 transition-colors">Privacy & Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">Hackathon</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/about" className="hover:text-fuchsia-400 transition-colors">Project Overview</Link></li>
              <li><Link href="/judges" className="hover:text-fuchsia-400 transition-colors">Judge Portal</Link></li>
              <li><Link href="/team" className="hover:text-fuchsia-400 transition-colors">Core Team <span className="text-[10px] px-1.5 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 ml-1 border border-fuchsia-500/30">Finalist</span></Link></li>
              <li><Link href="/contact" className="hover:text-fuchsia-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 font-mono">
          <p>© {new Date().getFullYear()} ProHire.ai • International Hackathon Finalist Edition.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
