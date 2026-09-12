import type { CounterScene } from '../../types';

export const COUNTER_STATE_LEGEND: { color: string; label: string }[] = [
  { color: 'var(--tree-node-here-stroke)', label: 'กำลังเทียบ' },
  { color: 'var(--tree-node-ok-stroke)', label: 'currentMax ตอนนี้' },
  { color: 'var(--tree-node-idle-stroke)', label: 'ยังไม่แตะ / เทียบแล้วไม่ใช่ max' },
];

export default function CounterDiagram({ scene }: { scene: CounterScene }) {
  return (
    <div className="flex flex-col items-center gap-3 py-5">
      <div className="flex gap-2">
        {scene.values.map((v, i) => {
          const active = i === scene.activeIndex;
          const marked = i === scene.markedIndex;
          const bg = active ? 'var(--tree-node-here-fill)' : marked ? 'var(--tree-node-ok-fill)' : 'var(--tree-node-idle-fill)';
          const border = active ? 'var(--tree-node-here-stroke)' : marked ? 'var(--tree-node-ok-stroke)' : 'var(--tree-node-idle-stroke)';
          const text = active ? 'var(--tree-node-here-text)' : marked ? 'var(--tree-node-ok-text)' : 'var(--tree-node-idle-text)';
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="mono text-[14px] font-semibold w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: bg, border: `2px solid ${border}`, color: text }}>
                {v}
              </div>
              <span className="mono text-[9px]" style={{ color: 'var(--color-faint-foreground)' }}>{i}</span>
            </div>
          );
        })}
      </div>
      <p className="mono text-[11px]" style={{ color: 'var(--color-muted-foreground)' }}>
        ops so far: <strong style={{ color: 'var(--color-accent)' }}>{scene.opCount}</strong>
      </p>
    </div>
  );
}
