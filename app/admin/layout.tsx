import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-end p-4 border-b">
        <UserButton />
      </header>
      {children}
    </>
  );
}
