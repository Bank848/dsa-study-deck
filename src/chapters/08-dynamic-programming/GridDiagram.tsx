// src/chapters/08-dynamic-programming/GridDiagram.tsx
import type { GridScene, GridCellState } from '../../types';

const CELL_STYLE: Record<GridCellState, { bg: string; border: string; text: string }> = {
  idle:    { bg: 'var(--tree-node-idle-fill)', border: 'var(--tree-node-idle-stroke)', text: 'var(--color-faint-foreground)' },
  filling: { bg: 'var(--tree-node-here-fill)', border: 'var(--tree-node-here-stroke)', text: 'var(--tree-node-here-text)' },
  filled:  { bg: 'var(--tree-node-ok-fill)',   border: 'var(--tree-node-ok-stroke)',   text: 'var(--tree-node-ok-text)' },
  source:  { bg: 'var(--tree-node-walk-fill)', border: 'var(--tree-node-walk-stroke)', text: 'var(--tree-node-walk-text)' },
};

export const GRID_STATE_LEGEND: { color: string; label: string }[] = [
  { color: CELL_STYLE.filling.border, label: 'กำลังคำนวณ' },
  { color: CELL_STYLE.source.border, label: 'ใช้เป็นค่าอ้างอิง' },
  { color: CELL_STYLE.filled.border, label: 'คำนวณแล้ว' },
];

export default function GridDiagram({ scene }: { scene: GridScene }) {
  const isSource = (r: number, c: number) => (scene.sourceCells ?? []).some(([sr, sc]) => sr === r && sc === c);
  return (
    <div className="overflow-x-auto py-4">
      <table className="border-collapse mono text-[11px] mx-auto">
        <thead>
          <tr>
            <th></th>
            {scene.colLabels.map((l, j) => <th key={j} className="px-1.5 py-1" style={{ color: 'var(--color-faint-foreground)' }}>{l}</th>)}
          </tr>
        </thead>
        <tbody>
          {scene.cells.map((row, i) => (
            <tr key={i}>
              <td className="px-1.5 py-1" style={{ color: 'var(--color-faint-foreground)' }}>{scene.rowLabels[i]}</td>
              {row.map((v, j) => {
                const active = scene.activeCell?.[0] === i && scene.activeCell?.[1] === j;
                const state: GridCellState = active ? 'filling' : isSource(i, j) ? 'source' : (scene.cellState[`${i}-${j}`] ?? 'idle');
                const st = CELL_STYLE[state];
                return (
                  <td key={j} className="p-0.5">
                    <div className="w-7 h-7 flex items-center justify-center rounded"
                      style={{ background: st.bg, border: `2px solid ${st.border}`, color: st.text }}>
                      {v ?? ''}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
