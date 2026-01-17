import Link from "next/link";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-6 md:gap-12">
      
      {/* Sidebar / Header */}
      <nav className="md:w-32 md:shrink-0 space-y-3">
        <p className="font-medium">
          <Link href="/">Annu Kumari</Link>
        </p>

        <ul className="space-y-1">
          <li><Link id="color" href="/about">About</Link></li>
          <li><Link id="color" href="/now">Now</Link></li>
          <li><Link id="color" href="/projects">Projects</Link></li>
          <li><Link id="color" href="/notes">Notes & build notes</Link></li>
        </ul>
      </nav>

      {/* Content */}
      <main className="max-w-xl space-y-6">
        {children}
      </main>
    </div>
  );
}
