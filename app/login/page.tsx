"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ArrowLeft,
  Github,
  Twitter,
  Linkedin,
  AlertCircle,
  Loader2,
  Star,
  Shield,
  ChevronRight,
  Target,
  Heart,
  Briefcase,
  Users,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Email validation
  useEffect(() => {
    if (email.length > 0) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailValid(isValid);
    } else {
      setEmailValid(null);
    }
  }, [email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", { email, password, redirect: false });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  }

  // Particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-white overflow-hidden flex items-center justify-center px-4 py-8"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[30%] -right-[20%] h-[80vh] w-[80vh] rounded-full bg-gradient-to-br from-blue-600/20 via-teal-500/15 to-purple-600/20 blur-[120px]"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute -bottom-[30%] -left-[20%] h-[80vh] w-[80vh] rounded-full bg-gradient-to-tr from-purple-600/20 via-pink-500/15 to-blue-600/20 blur-[120px]"
          style={{
            transform: `translate(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 via-teal-500/5 to-purple-500/5 blur-[100px]" />
        <div className="absolute top-0 left-0 h-full w-full bg-[url('/grid.svg')] opacity-[0.015]" />

        {/* Floating Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-blue-400/15"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center animate-in slide-in-from-bottom-10 fade-in duration-1000">
        {/* Left Side - Brand & Welcome Back */}
        <div className="w-full lg:w-1/2 space-y-8 animate-in slide-in-from-left-10 fade-in duration-1000 delay-300">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          {/* Brand */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-teal-500 to-purple-500 p-[2px] shadow-lg shadow-blue-500/30 transition-all duration-500 group-hover:shadow-blue-500/50 group-hover:scale-105 group-hover:rotate-3">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#050505]">
                <Zap size={24} className="fill-blue-400 text-blue-400" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight">
                Pro<span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">Hire</span>
              </span>
              <div className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Enterprise AI</div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
              Welcome Back
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                to Your Career
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-md">
              Sign in to continue your journey. Your AI career agent is ready to help you land your dream job.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "94%", label: "Match Accuracy", icon: Target },
              { value: "12K+", label: "Jobs Matched", icon: Briefcase },
              { value: "4.8", label: "Avg. Rating", icon: Star },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group text-center rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/10 hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/5">
            <div className="flex -space-x-2">
              {["A", "B", "C", "D"].map((letter, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-[#050505] bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-bold text-[#050505]"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500">4.8 average rating from 2,300+ reviews</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2 pt-2">
            {[
              { icon: Sparkles, text: "AI-powered job matching" },
              { icon: Users, text: "Adaptive interviews in 3 languages" },
              { icon: Shield, text: "Personalized career roadmap" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <item.icon size={12} className="text-blue-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 max-w-md animate-in slide-in-from-right-10 fade-in duration-1000 delay-500">
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-blue-500/5">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400 mb-4">
                  <Sparkles size={12} className="text-blue-400" />
                  <span>Welcome back</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Continue your career journey with ProHire
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Mail size={14} />
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl border ${
                        emailValid === false
                          ? "border-rose-500/50 focus:border-rose-500/50"
                          : emailValid === true
                          ? "border-teal-500/50 focus:border-teal-500/50"
                          : "border-white/10 focus:border-blue-500/50"
                      } bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/10`}
                      placeholder="you@example.com"
                    />
                    {emailValid !== null && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {emailValid ? (
                          <Check size={18} className="text-teal-400 animate-in fade-in duration-300" />
                        ) : (
                          <AlertCircle size={18} className="text-rose-400 animate-in fade-in duration-300" />
                        )}
                      </div>
                    )}
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 transition-all duration-500 ${
                        focusedField === "email" && emailValid === true ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                  {emailValid === false && (
                    <p className="text-xs text-rose-400 animate-in slide-in-from-top-2 fade-in duration-300">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <Lock size={14} />
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/10"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 transition-all duration-500 ${
                        focusedField === "password" && password.length > 0 ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="h-4 w-4 rounded border border-white/10 bg-white/5 transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500 group-hover:border-white/20" />
                      <Check size={12} className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span>Remember me</span>
                  </label>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-400 animate-in slide-in-from-top-2 fade-in duration-300">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !emailValid}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 transition-transform duration-500 group-hover:translate-x-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#0a0a0a] px-4 text-slate-500">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Github, label: "GitHub" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map((social) => (
                  <button
                    key={social.label}
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:scale-105"
                  >
                    <social.icon size={16} />
                    <span className="hidden sm:inline">{social.label}</span>
                  </button>
                ))}
              </div>

              {/* Footer Link */}
              <p className="mt-6 text-center text-xs text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium inline-flex items-center gap-1 group"
                >
                  Sign up
                  <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.5; }
        }
      `}</style>
    </main>
  );
}

// Import Check icon since it's used above
const Check = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
