import type { NodeState } from '../../types';

const CELL_STYLE: Record<NodeState, { fill: string; stroke: string; text: string }> = {
  idle: { fill: 'var(--tree-node-idle-fill)', stroke: 'var(--tree-node-idle-stroke)', text: 'var(--tree-node-idle-text)' },
  walk: { fill: 'var(--tree-node-walk-fill)', stroke: 'var(--tree-node-walk-stroke)', text: 'var(--tree-node-walk-text)' },
  here: { fill: 'var(--tree-node-here-fill)', stroke: 'var(--tree-node-here-stroke)', text: 'var(--tree-node-here-text)' },
  slot: { fill: 'var(--tree-node-slot-fill)', stroke: 'var(--tree-node-slot-stroke)', text: 'var(--tree-node-slot-text)' },
  fresh: { fill: 'var(--tree-node-fresh-fill)', stroke: 'var(--tree-node-fresh-stroke)', text: 'var(--tree-node-fresh-text)' },
  ok: { fill: 'var(--tree-node-ok-fill)', stroke: 'var(--tree-node-ok-stroke)', text: 'var(--tree-node-ok-text)' },
};

export interface HeapArrayDiagramProps {
  values: number[];
  states: Record<number, NodeState>;
}

export default function HeapArrayDiagram({ values, states }: HeapArrayDiagramProps) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {values.map((v, i) => {
        const st = CELL_STYLE[states[i] ?? 'idle'];
        return (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              data-testid={`heap-cell-value-${i}`}
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'JetBrains Mono', fontSize: 14, borderRadius: 6, border: `2px solid ${st.stroke}`,
                background: st.fill, color: st.text, transition: 'background 300ms ease, border-color 300ms ease',
              }}
            >
              {v}
            </div>
            <div style={{ fontSize: 10, marginTop: 2, color: 'var(--color-faint-foreground)', fontFamily: 'JetBrains Mono' }}>{i}</div>
          </div>
        );
      })}
    </div>
  );
}
