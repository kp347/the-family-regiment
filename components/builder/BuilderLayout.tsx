
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  children: ReactNode;
};

type Status =
  | "loading"
  | "saved"
  | "saving"
  | "unsaved"
  | "error";

type ChapterStatus = {
  pathname: string;
  value: Status;
} | null;

const chapters = [
  { number: "01", title: "Origins", href: "/begin/origins" },
  { number: "02", title: "Values", href: "/begin/values" },
  { number: "03", title: "Service", href: "/begin/service" },
  { number: "04", title: "Traditions", href: "/begin/traditions" },
  { number: "05", title: "Symbols", href: "/begin/symbols" },
  {
    number: "06",
    title: "Achievements",
    href: "/begin/achievements",
  },
  {
    number: "07",
    title: "Future Legacy",
    href: "/begin/future",
  },
  { number: "08", title: "Review", href: "/begin/review" },
];

const statusLabels: Record<Status, string> = {
  loading: "Loading Family Record...",
  saved: "All changes saved",
  saving: "Saving...",
  unsaved: "Unsaved changes",
  error: "Save failed — check the chapter below",
};

export default function BuilderLayout({
  children,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(
    null
  );
  const [authLoading, setAuthLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  // Associate each status with the chapter that
  // generated it, rather than resetting state in an effect.
  const [chapterStatus, setChapterStatus] =
    useState<ChapterStatus>(null);

  const status =
    chapterStatus?.pathname === pathname
      ? chapterStatus.value
      : null;

  const activeIndex = chapters.findIndex(
    (chapter) => chapter.href === pathname
  );

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    void supabase.auth
      .getUser()
      .then(({ data: { user }, error }) => {
        if (!active) return;

        if (error || !user) {
          setEmail(null);
          setAuthLoading(false);
          router.replace("/auth/sign-in");
          return;
        }

        setEmail(user.email ?? null);
        setAuthLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;

        setEmail(session?.user?.email ?? null);

        if (!session?.user) {
          router.replace("/auth/sign-in");
        }
      }
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const onStatus = (event: Event) => {
      const detail = (
        event as CustomEvent<Status>
      ).detail;

      if (
        detail === "loading" ||
        detail === "saved" ||
        detail === "saving" ||
        detail === "unsaved" ||
        detail === "error"
      ) {
        setChapterStatus({
          pathname,
          value: detail,
        });
      }
    };

    window.addEventListener(
      "family-record-save-status",
      onStatus
    );

    return () => {
      window.removeEventListener(
        "family-record-save-status",
        onStatus
      );
    };
  }, [pathname]);

  async function signOut() {
    if (
      status === "saving" ||
      status === "unsaved" ||
      status === "error"
    ) {
      const confirmed = window.confirm(
        "Your latest changes may not be saved. Sign out anyway?"
      );

      if (!confirmed) return;
    }

    setSigningOut(true);

    const { error } = await createClient().auth.signOut();

    if (error) {
      window.alert(
        `Could not sign out: ${error.message}`
      );

      setSigningOut(false);
      return;
    }

    router.replace("/auth/sign-in");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f4efe7] text-[#2d2822]">
      <header className="border-b border-[#3a342c] bg-[#141510] text-[#f2e9da]">
        <div className="mx-auto flex min-h-20 max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="font-display text-lg font-semibold uppercase tracking-[0.18em]"
          >
            The Family Regiment
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-right">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#b99a62]">
                The Family Record
              </p>

              <p
                aria-live="polite"
                className={`mt-1 text-xs ${
                  status === "error"
                    ? "text-red-300"
                    : "text-[#aaa094]"
                }`}
              >
                {status
                  ? statusLabels[status]
                  : "Save status appears within each chapter"}
              </p>
            </div>

            <div className="border-l border-[#514638] pl-5 text-left">
              <p
                className="max-w-[210px] truncate text-xs text-[#e6d7bd]"
                title={email ?? undefined}
              >
                {authLoading
                  ? "Checking account..."
                  : email ?? "Not signed in"}
              </p>

              <button
                type="button"
                onClick={signOut}
                disabled={
                  authLoading ||
                  signingOut ||
                  !email
                }
                className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#b99a62] underline-offset-4 hover:underline disabled:opacity-50"
              >
                {signingOut
                  ? "Signing out..."
                  : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1600px] lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="border-b border-[#cdbda5] bg-[#ebe1d2] lg:border-b-0 lg:border-r">
          <div className="sticky top-0 p-6 lg:p-8">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#8b542f]">
              Eight Chapters
            </p>

            <h2 className="font-display mt-3 text-3xl">
              Your Family Record
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#6b6055]">
              Complete each chapter at your own pace.
              You may return and revise your answers
              before final review.
            </p>

            <nav
              aria-label="Family Record chapters"
              className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
            >
              {chapters.map((chapter) => (
                <Link
                  key={chapter.href}
                  href={chapter.href}
                  aria-current={
                    pathname === chapter.href
                      ? "page"
                      : undefined
                  }
                  className={`group flex items-center gap-4 border px-3 py-3 transition hover:border-[#c4ad88] hover:bg-[#f5eee3] ${
                    pathname === chapter.href
                      ? "border-[#c4ad88] bg-[#f5eee3]"
                      : "border-transparent"
                  }`}
                >
                  <span className="w-8 text-[0.65rem] font-semibold tracking-[0.22em] text-[#9a7448]">
                    {chapter.number}
                  </span>

                  <span className="font-display text-lg text-[#40372f] transition group-hover:text-[#6f4328]">
                    {chapter.title}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 border-t border-[#cdbda5] pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#786b5e]">
                {activeIndex >= 0
                  ? `Chapter ${
                      activeIndex + 1
                    } of ${chapters.length}`
                  : "Your Family Record"}
              </p>

              <p className="mt-2 text-xs leading-5 text-[#786b5e]">
                Required-answer completion is
                verified in the Review chapter
                before heraldic analysis begins.
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mx-auto max-w-5xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
