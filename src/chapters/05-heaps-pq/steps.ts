// Sift-down (Max-Heapify) worked example from "08_Heaps_PriorityQueues_DisjointSets...pdf",
// translated from the PDF's 1-indexed convention to this codebase's 0-indexed arrays (see note
// above) — the two swaps and final array were independently re-simulated and match the PDF exactly.
import type { VisualizerStep, TreeScene, NodeState } from '../../types';

export const HEAP_CODE: string[] = [
  'maxHeapify(A, i):',
  '  l = 2*i + 1; r = 2*i + 2       // 0-indexed children',
  '  largest = i',
  '  if l < A.length and A[l] > A[largest]: largest = l',
  '  if r < A.length and A[r] > A[largest]: largest = r',
  '  if largest != i: swap(A[i], A[largest]); maxHeapify(A, largest)',
];

// Fixed index->slot layout (heap shape never changes; only which value sits where does).
// Indices 0..9 laid out by depth: 0 | 1,2 | 3,4,5,6 | 7,8,9
const SLOT: Record<number, { x: number; y: number }> = {
  0: { x: 390, y: 40 },
  1: { x: 220, y: 100 }, 2: { x: 560, y: 100 },
  3: { x: 140, y: 160 }, 4: { x: 300, y: 160 }, 5: { x: 480, y: 160 }, 6: { x: 640, y: 160 },
  7: { x: 100, y: 220 }, 8: { x: 180, y: 220 }, 9: { x: 260, y: 220 },
};
// parent(i) -> children(i), 0-indexed: left=2i+1, right=2i+2
const INDEX_EDGES: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8], [4, 9]];

const ARRAY_0 = [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]; // before sift-down
const ARRAY_1 = [16, 14, 10, 4, 7, 9, 3, 2, 8, 1]; // after swap(1,3)
const ARRAY_2 = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]; // after swap(3,8) — matches PDF's final array

// NOTE: keys tree nodes by String(value), not by index — this only works because ARRAY_0/1/2
// contain 10 distinct values. A future edit introducing a duplicate value would silently collapse
// two nodes into one on the diagram; keep the dataset distinct if this steps.ts is ever changed.
function positionsFor(arr: number[]): Record<string, { x: number; y: number }> {
  const out: Record<string, { x: number; y: number }> = {};
  arr.forEach((value, index) => { out[String(value)] = SLOT[index]; });
  return out;
}
function edgesFor(arr: number[]): [string, string][] {
  return INDEX_EDGES.map(([pi, ci]) => [String(arr[pi]), String(arr[ci])]);
}

export const HEAP_NODE_POS = positionsFor(ARRAY_0);
export const HEAP_BASE_EDGES = edgesFor(ARRAY_0);

const allIdle = (arr: number[]): Record<string, NodeState> =>
  Object.fromEntries(arr.map((v) => [String(v), 'idle'])) as Record<string, NodeState>;

function heapNodes(arr: number[], overrides: Record<number, NodeState>): Record<string, NodeState> {
  const nodes = allIdle(arr);
  for (const [idx, state] of Object.entries(overrides)) nodes[String(arr[Number(idx)])] = state;
  return nodes;
}
export const HEAP_STEPS: (VisualizerStep & { scene: TreeScene; array: number[]; arrayStates: Record<number, NodeState> })[] = [
  {
    chip: 'เริ่มต้น', lines: [0], array: ARRAY_0, arrayStates: { 1: 'here' },
    scene: { type: 'tree', nodes: heapNodes(ARRAY_0, { 1: 'here' }), positions: positionsFor(ARRAY_0), edgeList: edgesFor(ARRAY_0) },
    narr: 'maxHeapify(A, 1) — ดัชนี 1 (ค่า 4) อาจละเมิด heap property ถ้าลูกของมันมีค่ามากกว่า',
  },
  {
    chip: 'เทียบกับลูกทั้งสอง', lines: [1, 2, 3, 4], array: ARRAY_0, arrayStates: { 1: 'here', 3: 'walk', 4: 'walk' },
    scene: { type: 'tree', nodes: heapNodes(ARRAY_0, { 1: 'here', 3: 'walk', 4: 'walk' }), positions: positionsFor(ARRAY_0), edgeList: edgesFor(ARRAY_0) },
    narr: 'ลูกซ้าย A[3]=14, ลูกขวา A[4]=7 — 14 > 4 และ 14 > 7 ดังนั้น largest = 3 (ลูกซ้าย)',
  },
  {
    chip: 'สลับ 4 กับ 14', lines: [5], array: ARRAY_1, arrayStates: { 1: 'ok', 3: 'walk' },
    scene: { type: 'tree', nodes: heapNodes(ARRAY_1, { 1: 'ok', 3: 'walk' }), positions: positionsFor(ARRAY_1), edgeList: edgesFor(ARRAY_1) },
    narr: 'largest != i (3 != 1) — สลับ A[1] กับ A[3] แล้วเรียก maxHeapify(A, 3) ต่อ',
  },
  {
    chip: 'เทียบรอบถัดไป', lines: [1, 2, 3, 4], array: ARRAY_1, arrayStates: { 3: 'here', 7: 'walk', 8: 'walk' },
    scene: { type: 'tree', nodes: heapNodes(ARRAY_1, { 3: 'here', 7: 'walk', 8: 'walk' }), positions: positionsFor(ARRAY_1), edgeList: edgesFor(ARRAY_1) },
    narr: 'ที่ดัชนี 3 (ค่า 4): ลูกซ้าย A[7]=2, ลูกขวา A[8]=8 — 8 > 4 และ 8 > 2 ดังนั้น largest = 8 (ลูกขวา)',
  },
  {
    chip: 'สลับ 4 กับ 8', lines: [5], array: ARRAY_2, arrayStates: { 3: 'ok', 8: 'walk' },
    scene: { type: 'tree', nodes: heapNodes(ARRAY_2, { 3: 'ok', 8: 'walk' }), positions: positionsFor(ARRAY_2), edgeList: edgesFor(ARRAY_2) },
    narr: 'สลับ A[3] กับ A[8] แล้วเรียก maxHeapify(A, 8) ต่อ — ดัชนี 8 ไม่มีลูก (2*8+1=17 เกินขอบเขต) จบการเรียกซ้ำ',
  },
  {
    chip: 'heap property คืนสภาพ', lines: [], array: ARRAY_2, arrayStates: {},
    scene: { type: 'tree', nodes: heapNodes(ARRAY_2, {}), positions: positionsFor(ARRAY_2), edgeList: edgesFor(ARRAY_2) },
    narr: 'ผลลัพธ์สุดท้าย [16,14,10,8,7,9,3,2,4,1] ตรงกับตัวอย่างในสไลด์ทุกตำแหน่ง',
  },
];
