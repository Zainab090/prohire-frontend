import Link from "next/link";
import { Sparkles, Target, Mic, TrendingUp, ArrowRight, ShieldCheck, Zap, Globe, CheckCircle2, Play, Terminal, Cpu, Users, Award, BookOpen, ChevronRight, Github, Twitter, Linkedin } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* Background Mesh & Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d12_1px,transparent_1px),linear-gradient(to_bottom,#1f293d12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
        <div className="backdrop-blur-2xl bg-[#0b0f17]/80 border border-slate-800/80 rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-2xl shadow-black/50">
          
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white flex items-center gap-1">
                ProHire <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">v2.4</span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
            <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Bento Matrix</a>
            <a href="#bilingual" className="hover:text-cyan-400 transition-colors">Urdu Voice AI</a>
            <a href="#testimonials" className="hover:text-cyan-400 transition-colors">Impact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
              <span className="relative z-10 flex items-center gap-1.5">
                Initialize <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-5xl px-6 pt-36 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-mono text-cyan-400 backdrop-blur-md mb-8 animate-pulse">
          <Terminal size={13} />
          <span>GLOBAL AI HACKATHON FINALIST BUILD</span>
        </div>

        <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
          Autonomous Career Agent <br />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            From Profile to Placement.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-slate-400 font-normal leading-relaxed">
          ProHire maps your core matrix once, filters real opportunities with transparent compatibility logic, and runs deep adaptive mock interviews in <span className="text-white font-medium">English, Urdu, or Roman Urdu</span>.
        </p>

        {/* Hero Terminal Card */}
        <div className="mt-12 mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-[#0b0f17]/90 p-4 shadow-2xl backdrop-blur-xl text-left relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-500">prohire-core-v2.exe</span>
            </div>
            <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Status: Live Processing
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-500 mb-1">Target Market</div>
              <div className="text-slate-200 font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Pakistan & Remote Global
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-500 mb-1">Voice AI Engine</div>
              <div className="text-slate-200 font-bold">English / Roman Urdu</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-slate-500 mb-1">Match Algorithm</div>
              <div className="text-cyan-400 font-bold">Explainable Score (98.4%)</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 text-sm font-bold text-black shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 transition-all hover:scale-[1.02]">
            Launch Career Audit <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-8 py-4 text-sm font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-white backdrop-blur-sm transition-all">
            <Play size={14} className="text-cyan-400 fill-cyan-400" /> Watch System Demo
          </Link>
        </div>
      </section>

      {/* Stats Bar Section */}
      <section className="border-y border-slate-800/80 bg-[#090d14]/60 py-12 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-white">94.2%</div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase">Placement Efficiency</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-cyan-400">3 Langs</div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase">English, Urdu, Roman</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-indigo-400">0%</div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase">Fabricated Credentials</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-emerald-400">12,500+</div>
            <div className="text-xs font-mono text-slate-400 mt-1 uppercase">Active Candidates</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Streamlined Workflow</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">From Zero to Placement in 3 Steps</h2>
          <p className="text-slate-400 text-sm mt-3">An intelligent pipeline that eliminates manual friction at every stage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-slate-800/80 bg-[#0b0f17] p-8 relative">
            <div className="text-4xl font-black text-slate-800 mb-4 font-mono">01</div>
            <h3 className="text-lg font-bold text-white mb-2">Profile & Resume Ingestion</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload your resume or link your professional history. Our semantic parser builds a verifiable competency map instantly.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-[#0b0f17] p-8 relative">
            <div className="text-4xl font-black text-slate-800 mb-4 font-mono">02</div>
            <h3 className="text-lg font-bold text-white mb-2">Bilingual Voice Simulation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Engage in interactive mock interview sessions tailored to your target job profile, utilizing Urdu or English naturally.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-[#0b0f17] p-8 relative">
            <div className="text-4xl font-black text-slate-800 mb-4 font-mono">03</div>
            <h3 className="text-lg font-bold text-white mb-2">Explainable Placement Match</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get matched to real-world opportunities accompanied by clear matching insights and weekly growth roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Matrix Section */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">Architecture Matrix</span>
            <h2 className="text-3xl font-black tracking-tight mt-1">Engineered for Maximum Impact</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-sm">
            Built from scratch to solve local hiring opacity with global technical standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="md:col-span-2 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0e1420] to-[#07090E] p-8 relative overflow-hidden group hover:border-cyan-500/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400">
              <Target size={22} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Explainable AI Matching Engine</h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Eliminates resume black-boxes. Our engine breaks down your precise alignment metrics against market openings with clear compatibility indicators.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" /> Real-time weighted skill matrix
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0e1420] to-[#07090E] p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
              <Mic size={22} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bilingual Voice Simulation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Adaptive mock interviews conducted naturally in English, Urdu, or Roman Urdu, adjusting follow-up queries live to your verbal delivery.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0e1420] to-[#07090E] p-8 relative overflow-hidden group hover:border-sky-500/50 transition-all">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 text-sky-400">
              <Sparkles size={22} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Structured Resume Intel</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Deep semantic parsing that structures your strengths without fabricating achievements or inflating capabilities.
            </p>
          </div>

          <div className="md:col-span-2 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0e1420] to-[#07090E] p-8 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
              <TrendingUp size={22} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Dynamic Skill Growth Roadmap</h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Converts evaluation weak spots and feedback loops into a structured, sequential weekly learning tracker tailored directly to regional demands.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-emerald-400">
              <CheckCircle2 size={14} /> Automated milestone mapping
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials / Social Proof Section */}
      <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">Success Stories</span>
          <h2 className="text-3xl font-black tracking-tight mt-2">Trusted by Engineers & Professionals</h2>
          <p className="text-slate-400 text-sm mt-3">See how ProHire changed career paths across the region.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-slate-800/80 bg-[#0b0f17] p-6 flex flex-col justify-between">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "The Roman Urdu mock interviews felt genuinely human. It helped me clear my anxiety before real technical rounds."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <div className="h-10 w-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center font-bold justify-center text-sm">HA</div>
              <div>
                <div className="text-sm font-bold text-white">Hassan Ahmed</div>
                <div className="text-xs text-slate-500">Software Engineer, Lahore</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-[#0b0f17] p-6 flex flex-col justify-between">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "The explainable matching engine showed me exactly what skills I lacked. Fixed those gaps in two weeks and got hired."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <div className="h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center font-bold justify-center text-sm">FK</div>
              <div>
                <div className="text-sm font-bold text-white">Fatima Khan</div>
                <div className="text-xs text-slate-500">Product Manager, Karachi</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-[#0b0f17] p-6 flex flex-col justify-between">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "Clean UI, incredible responsiveness, and a truly localized approach to global tech recruitment. Absolute game-changer."
            </p>
            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center font-bold justify-center text-sm">ZA</div>
              <div>
                <div className="text-sm font-bold text-white">Zain Ali</div>
                <div className="text-xs text-slate-500">Frontend Dev, Islamabad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="mx-auto max-w-5xl px-6 py-12 mb-20">
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-[#0b0f17] to-indigo-950/40 p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Join thousands of professionals utilizing ProHire's autonomous AI career agent today.
          </p>

          <Link href="/signup" className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 text-sm font-bold text-black shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 transition-all hover:scale-[1.02]">
            Get Started For Free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="border-t border-slate-800/80 bg-[#040609] pt-16 pb-12 text-slate-400 text-sm">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                ProHire<span className="text-cyan-400">.ai</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6 font-mono">
              The autonomous AI career agent built to bridge local talent with international opportunities through explainable matching and bilingual mock interviews.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center hover:text-white hover:border-cyan-500 transition-colors">
                <Github size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center hover:text-white hover:border-cyan-500 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center hover:text-white hover:border-cyan-500 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">AI Job Matching</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Voice Interviews</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Resume Intelligence</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Skill Roadmaps</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/docs" className="hover:text-cyan-400 transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-cyan-400 transition-colors">API Reference</Link></li>
              <li><Link href="/market" className="hover:text-cyan-400 transition-colors">Market Analytics</Link></li>
              <li><Link href="/security" className="hover:text-cyan-400 transition-colors">Privacy & Security</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/hackathon" className="hover:text-cyan-400 transition-colors">Hackathon Build</Link></li>
              <li><Link href="/careers" className="hover:text-cyan-400 transition-colors">Careers <span className="text-[10px] px-1 py-0.5 rounded bg-cyan-500/10 text-cyan-400 ml-1">We're hiring</span></Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mx-auto max-w-6xl px-6 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 font-mono">
          <p>© {new Date().getFullYear()} ProHire.ai Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-slate-400 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
