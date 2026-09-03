import { NextRequest, NextResponse } from "next/server";

/**
 * Route protection without next-auth: we just check for the presence of the
 * `prohire_token` cookie that lib/auth-client.tsx sets after a successful
 * login. This mirrors the previous `withAuth` behavior (redirect to /login
 * if signed out); the token's *validity* is still enforced server-side by
 * the backend on every API call.
 */
export function middleware(req: NextRequest) {
  const token = req.cookies.get("prohire_token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/jobs/:path*",
    "/application/:path*",
    "/interview/:path*",
    "/report/:path*",
    "/roadmap/:path*"
  ]
};
