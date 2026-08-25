import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] px-6 py-20 text-[#2d2822]">
      <div className="mx-auto max-w-2xl border border-[#cdbda5] bg-white/70 p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b542f]">
          Account Created
        </p>

        <h1 className="font-display mt-5 text-5xl">
          Check your email.
        </h1>

        <p className="mx-auto mt-6 max-w-xl leading-8 text-[#665b50]">
          If email confirmation is enabled for your Supabase project, follow
          the confirmation link before signing in.
        </p>

        <Link
          href="/auth/sign-in"
          className="mt-8 inline-flex border border-[#6f4328] bg-[#6f4328] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white"
        >
          Go to Sign In
        </Link>
      </div>
    </main>
  );
}