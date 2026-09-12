import type { TreeScene, NodeState, EdgeState } from '../../types';

const R = 27;

const NODE_STYLE: Record<NodeState, { fill: string; stroke: string; text: string; w: number; dash: string; weight: string }> = {
  idle: { fill: 'var(--tree-node-idle-fill)', stroke: 'var(--tree-node-idle-stroke)', text: 'var(--tree-node-idle-text)', w: 2, dash: '', weight: '400' },
  walk: { fill: 'var(--tree-node-walk-fill)', stroke: 'var(--tree-node-walk-stroke)', text: 'var(--tree-node-walk-text)', w: 2, dash: '', weight: '500' },
  here: { fill: 'var(--tree-node-here-fill)', stroke: 'var(--tree-node-here-stroke)', text: 'var(--tree-node-here-text)', w: 2.6, dash: '', weight: '700' },
  slot: { fill: 'var(--tree-node-slot-fill)', stroke: 'var(--tree-node-slot-stroke)', text: 'var(--tree-node-slot-text)', w: 2, dash: '4 4', weight: '600' },
  fresh: { fill: 'var(--tree-node-fresh-fill)', stroke: 'var(--tree-node-fresh-stroke)', text: 'var(--tree-node-fresh-text)', w: 2.6, dash: '', weight: '700' },
  ok: { fill: 'var(--tree-node-ok-fill)', stroke: 'var(--tree-node-ok-stroke)', text: 'var(--tree-node-ok-text)', w: 2.6, dash: '', weight: '700' },
};

const EDGE_STYLE: Record<EdgeState, { c: string; w: number }> = {
  idle: { c: 'var(--tree-edge-idle-stroke)', w: 2 },
  walk: { c: 'var(--tree-edge-walk-stroke)', w: 2.4 },
  ok: { c: 'var(--tree-edge-ok-stroke)', w: 2.6 },
};

export const NODE_STATE_LEGEND: { color: string; label: string }[] = [
  { color: NODE_STYLE.walk.stroke, label: 'เดินผ่านแล้ว' },
  { color: NODE_STYLE.here.stroke, label: 'กำลังอยู่ตรงนี้' },
  { color: NODE_STYLE.ok.stroke, label: 'เสร็จสิ้น/สำเร็จ' },
  { color: NODE_STYLE.idle.stroke, label: 'ยังไม่แตะ' },
];

export interface TreeDiagramProps {
  scene: TreeScene;
  /** default layout for every node that can ever appear in this demo */
  nodePositions: Record<string, { x: number; y: number }>;
  /** every edge that can ever appear, before newNodeId filtering — ignored for a step that sets
   *  scene.edgeList (a rotation changes the edge set itself, not just node states) */
  baseEdges: [string, string][];
  /** the one node id that doesn't exist until scene.nodes includes it (e.g. the node being
   *  inserted this step) — omit if every node in nodePositions exists from step 1 */
  newNodeId?: string;
  /** dashed depth-guide rows drawn behind the tree — omit for no guides */
  depthGuides?: { y: number; label: string }[];
  /** static label badge in the top-left corner (e.g. "value = 37") — omit for no badge */
  badgeLabel?: string;
  /** SVG viewBox height; width is always 780. Default 260 (chapter 03's original size). */
  viewBoxHeight?: number;
}

export default function TreeDiagram({
  scene, nodePositions, baseEdges, newNodeId, depthGuides = [], badgeLabel, viewBoxHeight = 260,
}: TreeDiagramProps) {
  const nodes = scene.nodes;
  const edges: Record<string, EdgeState> = scene.edges ?? {};
  const showNew = newNodeId ? newNodeId in nodes : true;
  const allEdges: [string, string][] = scene.edgeList ?? baseEdges.filter(
    ([a, b]) => (a !== newNodeId || showNew) && (b !== newNodeId || showNew)
  );

  return (
    <svg width="100%" height="246" viewBox={`0 0 780 ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet">
      {depthGuides.map(({ y, label }) => (
        <g key={label}>
          <line x1={108} y1={y} x2={770} y2={y} stroke="var(--color-border-subtle)" strokeWidth={1} strokeDasharray="2 6" />
          <text x={98} y={y + 4} textAnchor="end" fontFamily="JetBrains Mono" fontSize={9.5} fill="var(--color-faint-foreground)">
            depth {label}
          </text>
        </g>
      ))}

      {allEdges.map(([a, b]) => {
        const st = EDGE_STYLE[edges[`${a}-${b}`] ?? 'idle'];
        const dash = newNodeId && nodes[newNodeId] === 'slot' && b === newNodeId ? '5 4' : '';
        const pa = scene.positions?.[a] ?? nodePositions[a];
        const pb = scene.positions?.[b] ?? nodePositions[b];
        return (
          <line key={`${a}-${b}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
            stroke={st.c} strokeWidth={st.w} strokeDasharray={dash} strokeLinecap="round"
            style={{ transition: 'x1 400ms ease, y1 400ms ease, x2 400ms ease, y2 400ms ease' }} />
        );
      })}

      {Object.keys(nodePositions).map((id) => {
        if (id === newNodeId && !showNew) return null;
        const state = nodes[id] ?? 'idle';
        const st = NODE_STYLE[state];
        const n = scene.positions?.[id] ?? nodePositions[id];
        const label = state === 'slot' ? '?' : id;
        return (
          <g key={id}>
            {(state === 'here' || state === 'fresh') && (
              <circle cx={n.x} cy={n.y} r={35} fill="none" stroke="var(--tree-node-here-stroke)" strokeOpacity={0.35} strokeWidth={1.2}
                style={{ transition: 'cx 400ms ease, cy 400ms ease' }} />
            )}
            {state !== 'slot' && <circle cx={n.x} cy={n.y} r={R} fill="var(--tree-node-base-fill)" style={{ transition: 'cx 400ms ease, cy 400ms ease' }} />}
            <circle cx={n.x} cy={n.y} r={R} fill={st.fill} stroke={st.stroke} strokeWidth={st.w} strokeDasharray={st.dash}
              style={{ transition: 'cx 400ms ease, cy 400ms ease' }} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontFamily="JetBrains Mono" fontSize={state === 'slot' ? 14 : 15} fontWeight={st.weight} fill={st.text}
              style={{ transition: 'x 400ms ease, y 400ms ease' }}>
              {label}
            </text>
            {state === 'here' && (
              <text x={n.x + R + 8} y={n.y - R - 4} fontFamily="JetBrains Mono" fontSize={10} fill="var(--color-highlight)">◂ กำลังดู</text>
            )}
            {state === 'ok' && (
              <text x={n.x + R + 9} y={n.y + 4} fontFamily="JetBrains Mono" fontSize={10} fill="var(--color-success)">◂ เสร็จแล้ว</text>
            )}
          </g>
        );
      })}

      {badgeLabel && (
        <g>
          <rect x={10} y={8} width={114} height={30} rx={8} fill="var(--color-surface-raised)" stroke="var(--color-border-strong)" strokeDasharray="3 3" />
          <text x={67} y={27} textAnchor="middle" fontFamily="JetBrains Mono" fontSize={12} fill="var(--color-muted-foreground)">{badgeLabel}</text>
        </g>
      )}
    </svg>
  );
}
