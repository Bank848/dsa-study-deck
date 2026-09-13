// Worked example from "2301265_Search_Trees_V3...pdf" pp.14-16: insert 54 as 62's right child,
// z=78/y=50/x=62 become unbalanced, double rotation makes 62 the new subtree root. Complexity
// statements from p.21 ("a single restructure is O(1)", "insert is O(log n)").
import type { VisualizerStep, TreeScene } from '../../types';

export const AVL_CODE: string[] = [
  'insert(v)  // expand external node, same as plain BST insert',
  'walk back up from v, updating heights',
  'if a node z becomes unbalanced (height diff > 1):',
  '  y = taller child of z; x = taller child of y',
  '  restructure(x, y, z)  // single or double rotation, O(1)',
  '  // repeat check upward; total insert cost is O(log n)',
];

const BEFORE_POS: Record<string, { x: number; y: number }> = {
  '44': { x: 390, y: 40 }, '17': { x: 220, y: 100 }, '78': { x: 600, y: 100 },
  '32': { x: 260, y: 160 }, '50': { x: 480, y: 160 }, '88': { x: 700, y: 160 },
  '48': { x: 430, y: 220 }, '62': { x: 540, y: 220 }, '54': { x: 560, y: 280 },
};

// only 78, 62, 54, 88 actually move in the rotation — the rest stay put, so derive from BEFORE_POS
// rather than re-listing all 9 nodes (a future layout tweak to an unmoved node then only needs
// one edit, not two kept in sync by hand)
const AFTER_POS: Record<string, { x: number; y: number }> = {
  ...BEFORE_POS,
  '62': { x: 560, y: 100 },
  '78': { x: 660, y: 160 },
  '54': { x: 530, y: 220 },
  '88': { x: 700, y: 220 },
};

const BEFORE_EDGES: [string, string][] = [['44', '17'], ['44', '78'], ['17', '32'], ['78', '50'], ['78', '88'], ['50', '48'], ['50', '62']];
const AFTER_EDGES: [string, string][] = [['44', '17'], ['44', '62'], ['17', '32'], ['62', '50'], ['62', '78'], ['50', '48'], ['50', '54'], ['78', '88']];

export const AVL_NODE_POS = BEFORE_POS;
export const AVL_BASE_EDGES = BEFORE_EDGES;
export const AVL_DEPTH_GUIDES = [{ y: 40, label: '0' }, { y: 100, label: '1' }, { y: 160, label: '2' }, { y: 220, label: '3' }, { y: 280, label: '4' }];

const idleAll = { '44': 'idle', '17': 'idle', '78': 'idle', '32': 'idle', '50': 'idle', '88': 'idle', '48': 'idle', '62': 'idle' } as const;

export const AVL_INSERT_STEPS: (VisualizerStep & { scene: TreeScene })[] = [
  { chip: 'ต้นไม้เริ่มต้น', lines: [], scene: { type: 'tree', nodes: { ...idleAll }, positions: BEFORE_POS, edgeList: BEFORE_EDGES },
    narr: 'AVL tree ที่สมดุลอยู่แล้ว — ทุก node ความสูงของลูกซ้าย-ขวาต่างกันไม่เกิน 1' },
  { chip: 'insert 54', lines: [1, 2], scene: { type: 'tree', nodes: { ...idleAll, '62': 'walk', '54': 'fresh' }, positions: BEFORE_POS, edgeList: [...BEFORE_EDGES, ['62', '54']] },
    narr: 'แทรก 54 เป็นลูกขวาของ 62 (ขยาย external node เหมือน BST ปกติ) — ทำให้ 62 สูงขึ้นเป็น 2, 78 สูงขึ้นเป็น 4, 44 สูงขึ้นเป็น 5' },
  { chip: 'พบจุดไม่สมดุล', lines: [3, 4], scene: { type: 'tree', nodes: { ...idleAll, '78': 'here', '50': 'walk', '62': 'walk', '54': 'ok' }, positions: BEFORE_POS, edgeList: [...BEFORE_EDGES, ['62', '54']] },
    narr: 'เดินย้อนกลับขึ้นไปพบ **z=78** (ancestor แรกที่ไม่สมดุล), **y=50** (ลูกที่สูงกว่าของ z), **x=62** (ลูกที่สูงกว่าของ y) — inorder ของ (x,y,z) คือ (50, 62, 78)' },
  { chip: 'หมุนต้นไม้ (double rotation)', lines: [5], scene: { type: 'tree', nodes: { ...idleAll, '62': 'ok', '50': 'walk', '78': 'walk', '54': 'ok' }, positions: AFTER_POS, edgeList: AFTER_EDGES },
    narr: '**62 กลายเป็น root ใหม่ของ subtree นี้** — 50 เป็นลูกซ้าย (พร้อม 48, 54), 78 เป็นลูกขวา (พร้อม 88) — การหมุนใช้เวลา O(1)' },
  { chip: 'สมดุลแล้ว', lines: [6], scene: { type: 'tree', nodes: { ...idleAll, '62': 'idle', '54': 'idle' }, positions: AFTER_POS, edgeList: AFTER_EDGES },
    narr: 'ต้นไม้สมดุลอีกครั้ง ตรงกับผลลัพธ์ในสไลด์ทุกประการ — insert ทั้งหมด (find + restructure) ใช้เวลารวม O(log n)' },
];
