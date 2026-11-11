import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/build-notes", label: "Build notes" },
  { href: "/admin/notes", label: "Short notes" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.publicMetadata?.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-[#0B0D10] pt-14 text-[#E6E6E6]">
      <header className="border-b border-white/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/55 transition-colors hover:text-[#D9A85F]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>
      {children}
    </div>
  );
}