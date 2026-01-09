export default function Notes() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-8">
      <p className="font-medium">Notes</p>

      <p className="leading-relaxed">
        Short notes, observations, and working thoughts.
        These are not polished articles.
      </p>

      <ul className="space-y-6">
        <li>
          <p className="leading-relaxed">
            Most early-stage product problems are not technical.
            They are about unclear positioning and weak distribution.
          </p>
          <p className="text-sm">— Jan 2026</p>
        </li>

        <li>
          <p className="leading-relaxed">
            Speed matters early, but correctness matters longer.
            The real skill is knowing when to switch between them.
          </p>
          <p className="text-sm">— Jan 2026</p>
        </li>

        <li>
          <p className="leading-relaxed">
            Shipping reduces anxiety more effectively than planning.
          </p>
          <p className="text-sm">— Jan 2026</p>
        </li>

        <li>
          <p className="leading-relaxed">
            A product that requires constant explanation
            is usually not finished.
          </p>
          <p className="text-sm">— Jan 2026</p>
        </li>
      </ul>

      <p className="leading-relaxed">
        I add notes here only when something feels generally useful
        or clarifying.
      </p>
    </main>
  );
}
