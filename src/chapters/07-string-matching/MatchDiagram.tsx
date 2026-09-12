// src/chapters/07-string-matching/MatchDiagram.tsx
import type { MatchScene, MatchCharState } from '../../types';

const CELL = 32;

const CHAR_STYLE: Record<MatchCharState, { bg: string; border: string; text: string }> = {
  idle:     { bg: 'var(--tree-node-idle-fill)', border: 'var(--tree-node-idle-stroke)', text: 'var(--tree-node-idle-text)' },
  compare:  { bg: 'var(--tree-node-here-fill)', border: 'var(--tree-node-here-stroke)', text: 'var(--tree-node-here-text)' },
  match:    { bg: 'var(--tree-node-ok-fill)',   border: 'var(--tree-node-ok-stroke)',   text: 'var(--tree-node-ok-text)' },
  mismatch: { bg: 'var(--color-warning-soft)',  border: 'var(--color-warning)',         text: 'var(--color-warning)' },
};

export const MATCH_STATE_LEGEND: { color: string; label: string }[] = [
  { color: CHAR_STYLE.compare.border, label: 'กำลังเทียบ' },
  { color: CHAR_STYLE.match.border, label: 'ตรงกัน' },
  { color: CHAR_STYLE.mismatch.border, label: 'ไม่ตรงกัน' },
];

export default function MatchDiagram({ scene }: { scene: MatchScene }) {
  return (
    <div className="flex flex-col gap-2 py-5 items-start">
      <div className="flex gap-1">
        {scene.text.split('').map((ch, i) => (
          <div key={i} className="mono text-[13px] flex items-center justify-center rounded"
            style={{ width: CELL, height: CELL, background: 'var(--tree-node-idle-fill)', border: '1px solid var(--tree-node-idle-stroke)', color: 'var(--tree-node-idle-text)' }}>
            {ch}
          </div>
        ))}
      </div>
      <div className="flex gap-1" style={{ marginLeft: scene.shift * (CELL + 4) }}>
        {scene.pattern.split('').map((ch, i) => {
          const st = CHAR_STYLE[scene.charStates[i] ?? 'idle'];
          return (
            <div key={i} className="mono text-[13px] font-semibold flex items-center justify-center rounded"
              style={{ width: CELL, height: CELL, background: st.bg, border: `2px solid ${st.border}`, color: st.text }}>
              {ch}
            </div>
          );
        })}
      </div>
    </div>
  );
}
