// src/chapters/02-stacks-queues/LinearDiagram.tsx
import type { LinearScene, LinearCellState } from '../../types';

const CELL_STYLE: Record<LinearCellState, { bg: string; border: string; text: string }> = {
  idle:   { bg: 'var(--tree-node-idle-fill)',  border: 'var(--tree-node-idle-stroke)',  text: 'var(--tree-node-idle-text)' },
  here:   { bg: 'var(--tree-node-here-fill)',  border: 'var(--tree-node-here-stroke)',  text: 'var(--tree-node-here-text)' },
  pushed: { bg: 'var(--tree-node-fresh-fill)', border: 'var(--tree-node-fresh-stroke)', text: 'var(--tree-node-fresh-text)' },
  popped: { bg: 'var(--color-warning-soft)',   border: 'var(--color-warning)',          text: 'var(--color-warning)' },
};

export const LINEAR_STATE_LEGEND: { color: string; label: string }[] = [
  { color: CELL_STYLE.pushed.border, label: 'เพิ่งเพิ่มเข้า' },
  { color: CELL_STYLE.here.border, label: 'ตำแหน่งปัจจุบัน' },
  { color: CELL_STYLE.popped.border, label: 'กำลังจะถูกลบ' },
  { color: CELL_STYLE.idle.border, label: 'ยังไม่แตะ' },
];

export default function LinearDiagram({ scene }: { scene: LinearScene }) {
  const vertical = scene.orientation === 'stack';
  return (
    <div className="flex flex-col items-center gap-3 py-5">
      <div className={`flex ${vertical ? 'flex-col-reverse' : 'flex-row'} gap-2 min-h-[56px] items-center`}>
        {scene.cells.length === 0 && (
          <div className="mono text-[11px] px-4 py-3 rounded-lg" style={{ color: 'var(--color-faint-foreground)', border: '1px dashed var(--color-border-strong)' }}>
            ว่าง
          </div>
        )}
        {scene.cells.map((c, i) => {
          const st = CELL_STYLE[c.state];
          return (
            <div
              key={i}
              className="mono text-[14px] font-semibold w-14 h-14 rounded-lg flex items-center justify-center"
              style={{ background: st.bg, border: `2px solid ${st.border}`, color: st.text }}
            >
              {c.value}
            </div>
          );
        })}
      </div>
      <p className="mono text-[10.5px]" style={{ color: 'var(--color-faint-foreground)' }}>{scene.pointerLabel}</p>
    </div>
  );
}
