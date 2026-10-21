
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/*
 * =========================================================
 * The Family Regiment
 * Next.js Proxy / Supabase Session Refresh
 * =========================================================
 *
 * Public storefront and builder routes do not require
 * a Supabase session refresh on every page request.
 *
 * Authentication remains enabled for account and
 * authenticated API routes.
 *
 * IMPORTANT:
 * This proxy refreshes sessions; it does not replace
 * authorization checks inside protected pages or APIs.
 * =========================================================
 */

const AUTH_REFRESH_PATHS = [
  "/account",
  "/dashboard",
  "/auth",
  "/api/account",
  "/api/user",
];

function matchesPath(
  pathname: string,
  path: string
): boolean {
  return (
    pathname === path ||
    pathname.startsWith(`${path}/`)
  );
}

function requiresAuthRefresh(
  pathname: string
): boolean {
  return AUTH_REFRESH_PATHS.some((path) =>
    matchesPath(pathname, path)
  );
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  /*
   * Public routes, including:
   *
   * /
   * /builder
   * /blazer
   * /blazer/builder
   * /jacket
   * /production-preview
   * /vendor-package-preview
   *
   * do not need an authentication refresh.
   */
  if (!requiresAuthRefresh(pathname)) {
    return response;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[proxy] Supabase configuration unavailable. Session refresh skipped."
      );
    }

    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value }) => {
              request.cookies.set(name, value);
            }
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  try {
    await supabase.auth.getUser();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[proxy] Supabase session refresh failed.",
        error
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
