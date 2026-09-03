"use client";

/**
 * Lightweight stand-in for `next-auth/react`, backed by our own Express
 * backend (JWT auth instead of NextAuth sessions).
 *
 * Kept API-compatible with the pieces of next-auth/react this project used
 * (`SessionProvider` -> `AuthProvider`, `useSession`, `signIn`, `signOut`)
 * so page components didn't need to change beyond their import path.
 */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch, API_BASE_URL } from "./api";

export interface SessionUser {
  id: string;
  email: string;
  role: string;
}

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface SessionContextValue {
  data: { user: SessionUser } | null;
  status: SessionStatus;
  refresh: () => Promise<void>;
}

const TOKEN_KEY = "prohire_token";
// Non-httpOnly cookie so Next's middleware (which only sees request headers,
// not localStorage) can tell whether a user is signed in.
const COOKIE_NAME = "prohire_token";

function setTokenCookie(token: string | null) {
  if (typeof document === "undefined") return;
  if (token) {
    document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  } else {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

function storeToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  setTokenCookie(token);
}

function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
  setTokenCookie(null);
}

const SessionContext = createContext<SessionContextValue>({
  data: null,
  status: "loading",
  refresh: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<{ user: SessionUser } | null>(null);
  const [status, setStatus] = useState<SessionStatus>("loading");

  const refresh = useCallback(async () => {
    const token = getStoredToken();
    if (!token) {
      setData(null);
      setStatus("unauthenticated");
      return;
    }
    try {
      const res = await apiFetch("/api/auth/me");
      if (!res.ok) throw new Error("not authenticated");
      const body = await res.json();
      setData({ user: body.user });
      setStatus("authenticated");
    } catch {
      clearToken();
      setData(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("prohire-auth-changed", refresh);
    return () => window.removeEventListener("prohire-auth-changed", refresh);
  }, [refresh]);

  return (
    <SessionContext.Provider value={{ data, status, refresh }}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

export async function signIn(
  _provider: "credentials",
  opts: { email: string; password: string; redirect?: boolean }
): Promise<{ error?: string; ok?: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: opts.email, password: opts.password })
    });
    const body = await res.json();
    if (!res.ok) {
      return { error: body.error || "Invalid email or password." };
    }
    storeToken(body.token);
    // Let any mounted AuthProvider pick up the new session on next render/navigation.
    window.dispatchEvent(new Event("prohire-auth-changed"));
    return { ok: true };
  } catch {
    return { error: "Could not reach the server." };
  }
}

export async function signOut(opts?: { callbackUrl?: string }) {
  clearToken();
  window.dispatchEvent(new Event("prohire-auth-changed"));
  if (opts?.callbackUrl) {
    window.location.href = opts.callbackUrl;
  }
}
