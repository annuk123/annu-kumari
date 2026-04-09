import Link from "next/link";

const socialLinks = [
  { label: "X", href: "https://x.com/Annu66126617" },
  { label: "GitHub", href: "https://github.com/annuk123" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/annu-kumari-540337237/" },
  { label: "YouTube", href: "https://www.youtube.com/@nexralab-ai" },
  { label: "Instagram", href: "https://www.instagram.com/solopreneur_annu" },
  { label: "Shutterstock", href: "https://www.shutterstock.com/g/QuientNature" },
  { label: "Email", href: "mailto:annu@nexralab.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Annu Kumari — Ranchi, India
        </p>
        {/* <ul className="flex items-center gap-4 flex-wrap">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    </footer>
  );
}