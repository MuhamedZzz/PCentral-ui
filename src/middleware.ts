// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// publicly available pages
const PUBLIC_PATHS = ["/", "/builder", "/products"];

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  return pathname.startsWith("/products/");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) Skip Next.js internals & static files by extension
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|gif|ico)$/i)
  ) {
    return NextResponse.next();
  }

  // 2) Check for your auth cookie
  const token = req.cookies.get("authToken")?.value;

  // 3) If not authenticated and not on a public page → redirect home
  if (!token && !isPublicPath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 4) Otherwise allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico).*)"],
};
