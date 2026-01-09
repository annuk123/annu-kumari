import Link from "next/link";

export default function Projects() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-8">
      <p className="font-medium">Projects</p>

      <p className="leading-relaxed">
        A small selection of projects I’ve worked on. I typically
        focus on one primary project at a time and keep others
        intentionally limited.
      </p>

      {/* Nexra */}
      <div className="space-y-2">
        <p className="font-medium">Nexra</p>
        <p className="leading-relaxed">
          An early-stage AI project focused on improving startup
          idea validation and early distribution clarity.
        </p>
        <p className="text-sm">
          Status: Active · <Link id="color" href="https://nexra.pixelui.studio/">Website</Link>
        </p>
      </div>

      {/* RemindMe */}
      <div className="space-y-2">
        <p className="font-medium">RemindMe</p>
        <p className="leading-relaxed">
          A lightweight reminder product built to explore simple
          workflows and user retention at small scale.
        </p>
        <p className="text-sm">
          Status: MVP / Paused ·{" "}
          <Link id="color" href="https://remindme.pixelui.studio/">Website</Link>
        </p>
      </div>

      {/* AlgoFlow */}
      <div className="space-y-2">
        <p className="font-medium">AlgoFlow</p>
        <p className="leading-relaxed">
          A learning tool for data structures and algorithms,
          focused on step-by-step visualizations of code and
          execution flow.
        </p>
        <p className="text-sm">
          Status: MVP / Paused ·{" "}
          <Link id="color" href="https://www.algoflux.tech/">Website</Link>
        </p>
      </div>

      {/* UICrate */}
      <div className="space-y-2">
        <p className="font-medium">UICrate</p>
        <p className="leading-relaxed">
          A curated collection of UI components and design
          references built to reduce time spent searching for
          common interface patterns.
        </p>
        <p className="text-sm">
          Status: MVP / Paused ·{" "}
          <Link id="color" href="https://www.pixelui.studio/">Website</Link>
        </p>
      </div>
    </main>
  );
}
