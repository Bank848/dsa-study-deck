import type { VisualizerStep } from '../../types';

export default function StepChips({
  steps, index, onSelect,
}: { steps: VisualizerStep[]; index: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto flex-1 min-w-0 px-1">
      {steps.map((s, k) => {
        const state = k < index ? 'done' : k === index ? 'current' : 'idle';
        return (
          <button
            key={k}
            onClick={() => onSelect(k)}
            className="mono text-[11px] px-2 py-1 rounded-md whitespace-nowrap shrink-0"
            style={{
              border: `1px solid ${state === 'current' ? 'var(--step-chip-current-border)' : state === 'done' ? 'var(--step-chip-done-border)' : 'var(--step-chip-border)'}`,
              color: state === 'current' ? 'var(--step-chip-current-fg)' : state === 'done' ? 'var(--step-chip-done-fg)' : 'var(--color-faint-foreground)',
              background: state === 'current' ? 'var(--step-chip-current-bg)' : state === 'done' ? 'var(--step-chip-done-bg)' : 'var(--step-chip-bg)',
            }}
          >
            {k + 1} {s.chip}
          </button>
        );
      })}
    </div>
  );
}
