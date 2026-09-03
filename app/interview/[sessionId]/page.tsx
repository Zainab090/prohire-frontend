"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Navbar } from "@/components/Navbar";
import { Mic, MicOff, Send, Loader2 } from "lucide-react";
import clsx from "clsx";
import { apiFetch } from "@/lib/api";

interface Question {
  _id: string;
  questionText: string;
  type: "technical" | "behavioral" | "project";
  followUpOf?: string;
}

interface TranscriptTurn {
  question: string;
  answer: string;
  isFollowUp: boolean;
}

// Minimal ambient typing for the Web Speech API (not in default TS DOM lib)
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}
interface SpeechRecognitionLike extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: any) => void) | null;
  onend: (() => void) | null;
}

export default function InterviewRoomPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams<{ sessionId: string }>();

  const [mode, setMode] = useState<"text" | "voice">("text");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [transcript, setTranscript] = useState<TranscriptTurn[]>([]);
  const [progress, setProgress] = useState({ asked: 0, budget: 8 });
  const [submitting, setSubmitting] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [followUpNotice, setFollowUpNotice] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSession() {
    const res = await apiFetch(`/api/interview/session/${params.sessionId}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to load interview.");
      return;
    }
    setMode(data.session.mode);
    setProgress({ asked: data.session.questionsAsked, budget: data.session.questionBudget });
    if (data.pendingQuestion) {
      setCurrentQuestion(data.pendingQuestion);
    } else if (data.session.status === "completed") {
      setComplete(true);
    }
  }

  const speakQuestion = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (mode === "voice" && currentQuestion) {
      speakQuestion(currentQuestion.questionText);
    }
  }, [currentQuestion, mode, speakQuestion]);

  function toggleListening() {
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      setError("Voice input isn't supported in this browser. Try Chrome, or switch to text mode.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join(" ");
      setAnswerText((prev) => (prev ? `${prev} ${text}` : text));
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  async function submitAnswer() {
    if (!currentQuestion || !answerText.trim()) return;
    setSubmitting(true);
    setThinking(true);
    setError("");

    const res = await apiFetch("/api/interview/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: params.sessionId,
        questionId: currentQuestion._id,
        answerText
      })
    });
    const data = await res.json();
    setSubmitting(false);
    setThinking(false);

    if (!res.ok) {
      setError(data.error || "Failed to submit answer.");
      return;
    }

    setTranscript((prev) => [
      ...prev,
      { question: currentQuestion.questionText, answer: answerText, isFollowUp: !!currentQuestion.followUpOf }
    ]);
    setAnswerText("");
    setProgress({ asked: data.questionsAsked, budget: data.questionBudget });

    if (data.evaluation.action === "follow_up" || data.evaluation.action === "probe_weakness") {
      setFollowUpNotice(
        data.evaluation.action === "follow_up"
          ? "That answer could go deeper — the agent is probing further, not moving to a scripted next question."
          : "The agent noticed something worth exploring and is following up on it directly."
      );
    } else {
      setFollowUpNotice(null);
    }

    if (data.interviewComplete || !data.nextQuestion) {
      setComplete(true);
      setCurrentQuestion(null);
    } else {
      setCurrentQuestion(data.nextQuestion);
    }
  }

  async function goToReport() {
    router.push(`/report/${params.sessionId}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Interview Room</h1>
          <span className="text-xs text-textMuted">
            Question {Math.min(progress.asked + (complete ? 0 : 1), progress.budget)} of {progress.budget}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surfaceLight">
          <div
            className="h-full bg-gradient-to-r from-accent-teal to-accent-violet transition-all"
            style={{ width: `${Math.min(100, (progress.asked / progress.budget) * 100)}%` }}
          />
        </div>

        {error && <p className="mt-4 text-sm text-accent-rose">{error}</p>}

        {/* Past transcript */}
        {transcript.length > 0 && (
          <div className="mt-6 max-h-72 space-y-3 overflow-y-auto">
            {transcript.map((t, i) => (
              <div key={i} className="text-sm">
                <p className={clsx("font-medium", t.isFollowUp ? "text-accent-violet" : "text-textPrimary")}>
                  {t.isFollowUp && "↳ Follow-up: "}
                  {t.question}
                </p>
                <p className="mt-1 text-textMuted">{t.answer}</p>
              </div>
            ))}
          </div>
        )}

        {followUpNotice && (
          <div className="mt-4 rounded-lg border border-accent-violet/30 bg-accent-violet/10 px-3 py-2 text-xs text-accent-violet">
            🤖 {followUpNotice}
          </div>
        )}

        {/* Current question / thinking state */}
        {!complete && (
          <div className="card mt-4 p-5">
            {thinking ? (
              <div className="flex items-center gap-2 text-sm text-textMuted">
                <Loader2 size={16} className="animate-spin" /> Interview Agent is evaluating your answer...
              </div>
            ) : currentQuestion ? (
              <>
                <span className="text-xs uppercase tracking-wide text-accent-teal">
                  {currentQuestion.followUpOf ? "Adaptive follow-up" : currentQuestion.type}
                </span>
                <p className="mt-2 text-base font-medium">{currentQuestion.questionText}</p>

                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={5}
                  className="mt-4 w-full rounded-lg border border-border bg-surfaceLight px-3 py-2 text-sm outline-none focus:border-accent-teal"
                />

                <div className="mt-3 flex items-center gap-2">
                  {mode === "voice" && (
                    <button
                      onClick={toggleListening}
                      className={clsx(
                        "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                        listening ? "border-accent-rose text-accent-rose" : "border-border text-textMuted"
                      )}
                    >
                      {listening ? <MicOff size={16} /> : <Mic size={16} />}
                      {listening ? "Stop" : "Speak"}
                    </button>
                  )}
                  <button
                    onClick={submitAnswer}
                    disabled={submitting || !answerText.trim()}
                    className="ml-auto flex items-center gap-2 rounded-lg bg-accent-teal px-4 py-2 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50"
                  >
                    <Send size={14} /> Submit Answer
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-sm text-textMuted">
                <Loader2 size={16} className="animate-spin" /> Loading question...
              </div>
            )}
          </div>
        )}

        {complete && (
          <div className="card mt-6 p-6 text-center">
            <h2 className="text-lg font-semibold">Interview Complete</h2>
            <p className="mt-1 text-sm text-textMuted">
              The Interview Agent is ready to generate your full evaluation.
            </p>
            <button
              onClick={goToReport}
              className="mt-4 rounded-lg bg-accent-teal px-6 py-2.5 text-sm font-semibold text-background hover:opacity-90"
            >
              View My Report →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
