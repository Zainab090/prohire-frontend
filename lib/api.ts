/**
 * Central fetch wrapper for calling the separate Express backend.
 * Automatically prefixes the backend base URL and attaches the JWT
 * (stored in localStorage by lib/auth-client.tsx) as a Bearer token.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("prohire_token") : null;

  const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  return fetch(`${API_BASE_URL}${path}`, { ...init, headers });
}
