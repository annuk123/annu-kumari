import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-end p-4 border-b">
        <nav className="flex gap-4 text-sm">
  <a href="/admin/dashboard">Dashboard</a>
  <a href="/admin/build-notes">Build notes</a>
  <a href="/admin/analytics">Analytics</a>
</nav>

        <UserButton />
      </header>
      {children}
    </>
  );
}
