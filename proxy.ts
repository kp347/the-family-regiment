import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/*
 * =========================================================
 * The Family Regiment
 * Next.js Proxy / Supabase Session Refresh
 * =========================================================
 *
 * Supabase session refresh should only run where the
 * application may actually depend on authentication.
 *
 * Internal production-preview tooling does not require an
 * authenticated customer session and should never be
 * delayed by an unavailable Supabase connection.
 * =========================================================
 */

const AUTH_BYPASS_PATHS = [
  "/production-preview",
  "/vendor-package-preview",
  "/api/production",
];

function shouldBypassAuth(pathname: string): boolean {
  return AUTH_BYPASS_PATHS.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`)
  );
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  /*
   * Production tooling currently contains no private
   * customer information and does not require Supabase
   * session refresh.
   *
   * Keep these routes fast and independent from external
   * authentication availability.
   */
  if (shouldBypassAuth(request.nextUrl.pathname)) {
    return response;
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  /*
   * Avoid crashing the entire application if environment
   * configuration is temporarily unavailable.
   */
  if (!supabaseUrl || !supabasePublishableKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[proxy] Supabase environment variables are unavailable. Skipping session refresh."
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
            ({ name, value }) =>
              request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }) =>
              response.cookies.set(
                name,
                value,
                options
              )
          );
        },
      },
    }
  );

  /*
   * Refresh the authenticated user's session when
   * Supabase is available.
   *
   * A temporary Supabase/network failure should not turn
   * every public application request into a server error.
   */
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