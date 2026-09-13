import type { VisualizerStep, TreeScene } from '../../types';

export const BST_INSERT_CODE: string[] = [
  'function insert(node, value):',
  '  if node is null:',
  '    return new Node(value)',
  '  if value < node.value:',
  '    node.left  = insert(node.left, value)',
  '  else:',
  '    node.right = insert(node.right, value)',
  '  return node',
];

export const BST_NODE_POS: Record<string, { x: number; y: number }> = {
  '30': { x: 420, y: 58 },
  '15': { x: 250, y: 142 },
  '42': { x: 590, y: 142 },
  '37': { x: 505, y: 226 },
  '45': { x: 675, y: 226 },
};

export const BST_BASE_EDGES: [string, string][] = [['30', '15'], ['30', '42'], ['42', '45'], ['42', '37']];

export const BST_DEPTH_GUIDES: { y: number; label: string }[] = [
  { y: 58, label: '0' },
  { y: 142, label: '1' },
  { y: 226, label: '2' },
];

// Every step here carries a tree scene; the intersection type lets tests read `.scene.nodes`
// without a cast while still being assignable to Stage's `VisualizerStep[]`.
export const BST_INSERT_STEPS: (VisualizerStep & { scene: TreeScene })[] = [
  { chip: 'root', lines: [1], scene: { type: 'tree', nodes: { '30': 'here' } },
    narr: 'เริ่มที่ **root = 30** ค่าที่จะแทรกคือ 37 — เทียบกันก่อนว่าจะลงซ้ายหรือขวา' },
  { chip: '37 > 30', lines: [6, 7], pill: '37 > 30', scene: { type: 'tree', nodes: { '30': 'here' }, edges: { '30-42': 'walk' } },
    narr: '`37 > 30` เข้า **else** → เดินลงกิ่งขวา เรียก insert ซ้ำกับ subtree ขวา' },
  { chip: 'ถึง 42', lines: [1], scene: { type: 'tree', nodes: { '30': 'walk', '42': 'here' }, edges: { '30-42': 'walk' } },
    narr: 'ตอนนี้อยู่ที่ **node 42** — ยังไม่ null จึงต้องเทียบต่ออีกชั้น' },
  { chip: '37 < 42', lines: [4, 5], pill: '37 < 42', scene: { type: 'tree', nodes: { '30': 'walk', '42': 'here', '37': 'slot' }, edges: { '30-42': 'walk', '42-37': 'walk' } },
    narr: '`37 < 42` เข้า **if** → เลี้ยวซ้าย เรียก insert กับ `node.left`' },
  { chip: 'null', lines: [2], pill: 'null', scene: { type: 'tree', nodes: { '30': 'walk', '42': 'walk', '37': 'slot' }, edges: { '30-42': 'walk', '42-37': 'walk' } },
    narr: 'ช่องซ้ายของ 42 เป็น **null** — เจอที่ว่างแล้ว การเดินหยุดที่นี่' },
  { chip: 'new Node', lines: [3], scene: { type: 'tree', nodes: { '30': 'walk', '42': 'walk', '37': 'fresh' }, edges: { '30-42': 'walk', '42-37': 'walk' } },
    narr: 'สร้าง `new Node(37)` แล้วคืนค่ากลับไปให้ตัวเรียก' },
  { chip: 'linked', lines: [8], scene: { type: 'tree', nodes: { '30': 'walk', '42': 'walk', '37': 'ok' }, edges: { '30-42': 'walk', '42-37': 'ok' } },
    narr: '`42.left = 37` ผูกเสร็จ แล้ว return ไต่กลับขึ้น call stack — ใช้เปรียบเทียบแค่ **2 ครั้ง** ทั้งที่ทรีมี 4 node' },
];
