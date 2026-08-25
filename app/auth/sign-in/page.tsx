import Link from "next/link";
import { signIn } from "@/app/auth/actions";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#f4efe7] px-6 py-16 text-[#2d2822]">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b542f]"
        >
          The Family Regiment
        </Link>

        <div className="mt-10 border border-[#cdbda5] bg-white/70 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b542f]">
            Welcome Back
          </p>

          <h1 className="font-display mt-4 text-5xl">
            Continue your Family Record.
          </h1>

          <p className="mt-5 leading-7 text-[#665b50]">
            Sign in to continue your family&apos;s work.
          </p>

          {error && (
            <div className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <form action={signIn} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f4328]"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 outline-none focus:border-[#8b542f]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f4328]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-2 w-full border border-[#cdbda5] bg-[#fbf8f2] px-4 py-3 outline-none focus:border-[#8b542f]"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-[#6f4328] bg-[#6f4328] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#875235]"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#665b50]">
            Need an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-[#6f4328]"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}