// Schematic only (not to scale) — mirrors the 3 curves actually named in the "Growth Rates"
// chart, Analysis PDF p.13: Linear, Quadratic, Cubic. No log n or 2^n curve appears in that
// source chart, so none is drawn here.
export default function GrowthChart() {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="180" role="img" aria-label="Growth rate comparison: linear, quadratic, cubic">
      <line x1={30} y1={10} x2={30} y2={160} stroke="var(--color-border-strong)" strokeWidth={1} />
      <line x1={30} y1={160} x2={310} y2={160} stroke="var(--color-border-strong)" strokeWidth={1} />
      <path d="M30,150 L310,20" stroke="var(--tree-node-ok-stroke)" strokeWidth={2} fill="none" />
      <text x={300} y={16} textAnchor="end" fontSize={10} fill="var(--tree-node-ok-stroke)" className="mono">Linear</text>
      <path d="M30,158 Q170,150 310,40" stroke="var(--tree-node-walk-stroke)" strokeWidth={2} fill="none" />
      <text x={300} y={52} textAnchor="end" fontSize={10} fill="var(--tree-node-walk-stroke)" className="mono">Quadratic</text>
      <path d="M30,159 Q220,158 310,15" stroke="var(--color-warning)" strokeWidth={2} fill="none" />
      <text x={300} y={12} textAnchor="end" fontSize={10} fill="var(--color-warning)" className="mono">Cubic</text>
      <text x={30} y={175} fontSize={9} fill="var(--color-faint-foreground)" className="mono">n →</text>
      <text x={5} y={15} fontSize={9} fill="var(--color-faint-foreground)" className="mono">T(n)</text>
    </svg>
  );
}
