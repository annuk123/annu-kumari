import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-6">
      
     <Image src="/image.png" alt="Profile Picture" width={130} height={130}></Image>
     <p className="font-medium">I'm Annu Kumari</p>
      <p className="leading-relaxed">
        I build small, focused software products.
        <br />
        Currently exploring AI, distribution, and long-term leverage.
      </p>

      <p className="space-x-2">
        <Link href="/about" id="color">About</Link>
        <span>·</span>
        <Link href="/now" id="color">Now</Link>
        <span>·</span>
        <Link href="/projects" id="color">Projects</Link>
        <span>·</span>
        <Link href="/notes" id="color">Notes & Build Thoughts</Link>
      </p>
      <p className="text-sm">
        <Link id="color" href="https://github.com/annuk123">GitHub</Link> ·{" "}
        <Link id="color" href="https://x.com/Annu66126617">X</Link> ·{" "}
        <Link id="color" href="mailto:anuk35168@gmail.com">Email</Link> ·{" "}
        <Link id="color" href="https://www.linkedin.com/in/annu-kumari-540337237/">LinkedIn</Link>
      </p>
    </main>
  );
}
