// src/chapters/06-hash-tables/BucketDiagram.tsx
import type { BucketScene, BucketSlotState } from '../../types';

const SLOT_STYLE: Record<BucketSlotState, { bg: string; border: string; text: string }> = {
  idle:      { bg: 'var(--tree-node-idle-fill)', border: 'var(--tree-node-idle-stroke)', text: 'var(--tree-node-idle-text)' },
  probe:     { bg: 'var(--tree-node-walk-fill)', border: 'var(--tree-node-walk-stroke)', text: 'var(--tree-node-walk-text)' },
  collision: { bg: 'var(--color-warning-soft)',  border: 'var(--color-warning)',         text: 'var(--color-warning)' },
  placed:    { bg: 'var(--tree-node-ok-fill)',   border: 'var(--tree-node-ok-stroke)',   text: 'var(--tree-node-ok-text)' },
};

export const BUCKET_STATE_LEGEND: { color: string; label: string }[] = [
  { color: SLOT_STYLE.placed.border, label: 'ใส่สำเร็จ' },
  { color: SLOT_STYLE.collision.border, label: 'ชนกัน (chaining)' },
  { color: SLOT_STYLE.idle.border, label: 'ว่าง' },
];

export default function BucketDiagram({ scene }: { scene: BucketScene }) {
  return (
    <div className="grid grid-cols-7 gap-2 py-4">
      {scene.buckets.map((b) => {
        const st = SLOT_STYLE[b.state];
        return (
          <div key={b.index} className="flex flex-col items-center gap-1">
            <span className="mono text-[10px]" style={{ color: 'var(--color-faint-foreground)' }}>{b.index}</span>
            <div
              className="w-full min-h-[52px] rounded-lg flex flex-col items-center justify-start gap-1 p-1"
              style={{ background: st.bg, border: `2px solid ${st.border}` }}
            >
              {b.values.map((v, i) => (
                <span key={i} className="mono text-[12px] font-semibold" style={{ color: st.text }}>{v}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
