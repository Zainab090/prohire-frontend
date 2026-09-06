"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import {
  Zap,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Sparkles,
  Shield,
  ArrowLeft,
  Github,
  Twitter,
  Linkedin,
  AlertCircle,
  Check,
  Loader2,
  Heart,
  Star,
  Target,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax for background
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

  // Password strength calculator
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  // Email validation
  useEffect(() => {
    if (email.length > 0) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setEmailValid(isValid);
    } else {
      setEmailValid(null);
    }
  }, [email]);

  // Password validation
  useEffect(() => {
    if (password.length > 0) {
      setPasswordValid(password.length >= 8);
    } else {
      setPasswordValid(null);
    }
  }, [password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await apiFetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Account created, but sign-in failed. Try signing in manually.");
    } else {
      router.push("/profile");
    }
  }

  // Floating particles for background
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

      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-12 lg:gap-20 items-center animate-in slide-in-from-bottom-10 fade-in duration-1000">
        {/* Left Side - Brand & Benefits */}
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
              Start Your
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-md">
              Build your profile once. Let our AI agents handle the rest — from matching to interviews to career roadmaps.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4 pt-4">
            {[
              { icon: Target, text: "AI-powered job matching with 94% accuracy" },
              { icon: Sparkles, text: "Adaptive interviews in English, Urdu & Roman Urdu" },
              { icon: Shield, text: "Personalized career roadmap & skill development" },
              { icon: Star, text: "Trusted by 12,000+ professionals in Pakistan" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-slate-300 animate-in slide-in-from-left-5 fade-in duration-700"
                style={{ animationDelay: `${idx * 100 + 500}ms` }}
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5">
                  <item.icon size={14} className="text-blue-400" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/5">
            <div className="flex -space-x-2">
              {[
                "https://i.pravatar.cc/40?img=1",
                "https://i.pravatar.cc/40?img=2",
                "https://i.pravatar.cc/40?img=3",
                "https://i.pravatar.cc/40?img=4",
              ].map((url, i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-[#050505] bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-bold text-[#050505]"
                >
                  {String.fromCharCode(65 + i)}
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
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 max-w-md animate-in slide-in-from-right-10 fade-in duration-1000 delay-500">
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-blue-500/5">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-400 mb-4">
                  <Sparkles size={12} className="text-blue-400" />
                  <span>Get started free</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Create your account</h2>
                <p className="mt-1 text-sm text-slate-400">
                  No credit card required. Free forever for early adopters.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <User size={14} />
                    Full Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/10"
                      placeholder="Enter your full name"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 transition-all duration-500 ${
                        focusedField === "name" && name.length > 0 ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </div>

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
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Lock size={14} />
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl border ${
                        passwordValid === false
                          ? "border-rose-500/50 focus:border-rose-500/50"
                          : passwordValid === true
                          ? "border-teal-500/50 focus:border-teal-500/50"
                          : "border-white/10 focus:border-blue-500/50"
                      } bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-lg focus:shadow-blue-500/10`}
                      placeholder="Min. 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <div className="space-y-1.5 animate-in slide-in-from-top-2 fade-in duration-300">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                              passwordStrength >= level
                                ? level <= 2
                                  ? "bg-rose-500"
                                  : level === 3
                                  ? "bg-amber-500"
                                  : "bg-teal-500"
                                : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs">
                        <span
                          className={
                            passwordStrength === 0
                              ? "text-rose-400"
                              : passwordStrength <= 2
                              ? "text-rose-400"
                              : passwordStrength === 3
                              ? "text-amber-400"
                              : "text-teal-400"
                          }
                        >
                          {passwordStrength === 0
                            ? "Weak"
                            : passwordStrength <= 2
                            ? "Fair"
                            : passwordStrength === 3
                            ? "Good"
                            : "Strong"}
                        </span>
                        <span className="text-slate-500">
                          {password.length}/8+ characters
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-400 animate-in slide-in-from-top-2 fade-in duration-300">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !emailValid || !passwordValid}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account
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

              {/* Social Signup */}
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
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium inline-flex items-center gap-1 group"
                >
                  Sign in
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
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
