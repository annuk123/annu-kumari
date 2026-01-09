import Link from "next/link";

export default function About() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-6">
      <p className="font-medium">About</p>

      <p className="leading-relaxed">
        I build small, focused software products independently.
        My work is primarily concerned with clarity, scope, and
        usefulness at early stages.
      </p>

      <p className="leading-relaxed">
        I’m currently working on Nexra, an early-stage AI project
        aimed at improving startup idea validation and initial
        distribution thinking.
      </p>

      <p className="leading-relaxed">
        Areas I spend time on include applying AI practically,
        understanding how small products find their first users,
        and designing systems that favor correctness over speed.
      </p>

      <p className="leading-relaxed">
        I learn through shipping, observing real usage, and
        refining based on evidence rather than assumptions.
      </p>

      <p>
        You can reach me at{" "}
        <Link id="color" href="mailto:anuk35168@gmail.com">anuk35168@gmail.com</Link>.
      </p>
    </main>
  );
}
