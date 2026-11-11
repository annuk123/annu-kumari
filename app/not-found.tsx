import type { Metadata } from "next";
import Link from "next/link";

const ACCENT = "#D9A85F";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-[#0B0D10] pt-14 text-[#E6E6E6]">
      <div className="mx-auto w-full max-w-3xl px-6 py-24">
        <div
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: ACCENT }}
        >
          {"// Error 404"}
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Nothing is flashed at this address.
        </h1>

        <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
          The page you're looking for doesn't exist, or it was moved or removed.
        </p>

        <div className="mt-8 overflow-hidden rounded-lg border border-white/15 font-mono text-[12px]">
          <div className="border-b border-white/15 px-4 py-2.5 uppercase tracking-[0.18em] text-white/40">
            Serial monitor
          </div>
          <div className="space-y-1 px-4 py-3 text-white/55">
            <p>
              <span className="text-white/30">&gt; </span>GET /requested-page
            </p>
            <p>
              <span className="text-white/30">&gt; </span>
              <span style={{ color: ACCENT }}>ERR 404</span> no such route
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.14em]">
          <Link
            href="/"
            className="rounded-md px-5 py-3 font-semibold text-[#0B0D10] transition-colors hover:bg-white"
            style={{ background: ACCENT }}
          >
            Go home
          </Link>
          <Link
            href="/#projects"
            className="rounded-md border border-white/25 px-5 py-3 text-white/75 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
          >
            View projects
          </Link>
          <Link
            href="/#build-log"
            className="rounded-md border border-white/25 px-5 py-3 text-white/75 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
          >
            Build log
          </Link>
        </div>
      </div>
    </div>
  );
}