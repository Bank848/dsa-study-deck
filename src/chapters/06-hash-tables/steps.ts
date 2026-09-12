// src/chapters/06-hash-tables/steps.ts
// Content sourced from "07_Hash_Tables-1038601-17884271445313.pdf": h(k) = k mod N with N=7,
// separate-chaining insert order 76,93,40,47,10,55,62 is the PDF's own fully-worked example
// (the linear/quadratic-probing/double-hashing slides only show blank template tables, so
// this plan scopes the demo to chaining, per spec §1's fidelity rule).
import type { VisualizerStep, BucketScene } from '../../types';

export const HASH_CODE: string[] = [
  'function insert(k):',
  '  i = h(k)              // h(k) = k mod N, N = 7',
  '  bucket[i].append(k)   // chaining on collision',
];

const INSERT_ORDER: { key: number; index: number }[] = [
  { key: 76, index: 6 },
  { key: 93, index: 2 },
  { key: 40, index: 5 },
  { key: 47, index: 5 },
  { key: 10, index: 3 },
  { key: 55, index: 6 },
  { key: 62, index: 6 },
];

function bucketsAfter(n: number): BucketScene['buckets'] {
  const buckets: BucketScene['buckets'] = Array.from({ length: 7 }, (_, i) => ({ index: i, values: [], state: 'idle' as const }));
  for (const { key, index } of INSERT_ORDER.slice(0, n)) {
    const b = buckets[index];
    const collided = b.values.length > 0;
    b.values.push(String(key));
    b.state = collided ? 'collision' : 'placed';
  }
  return buckets;
}

export const HASH_STEPS: (VisualizerStep & { scene: BucketScene })[] = [
  { chip: 'N = 7', lines: [1, 2], scene: { type: 'bucket', buckets: bucketsAfter(0) },
    narr: 'แฮชด้วย **h(k) = k mod 7** ตาราง N = 7 ช่อง เริ่มต้นว่างทั้งหมด — ชนกันแล้วต่อท้ายด้วย chaining' },
  { chip: 'insert 76', lines: [2, 3], scene: { type: 'bucket', buckets: bucketsAfter(1) },
    narr: '76 mod 7 = 6 → ใส่ที่ bucket 6' },
  { chip: 'insert 93', lines: [2, 3], scene: { type: 'bucket', buckets: bucketsAfter(2) },
    narr: '93 mod 7 = 2 → ใส่ที่ bucket 2' },
  { chip: 'insert 40', lines: [2, 3], scene: { type: 'bucket', buckets: bucketsAfter(3) },
    narr: '40 mod 7 = 5 → ใส่ที่ bucket 5' },
  { chip: 'insert 47', lines: [2, 3], pill: 'collision @ 5', scene: { type: 'bucket', buckets: bucketsAfter(4) },
    narr: '47 mod 7 = 5 → **ชนกับ 40** ที่มีอยู่แล้ว → ต่อท้ายด้วย chaining เป็น [40, 47]' },
  { chip: 'insert 10', lines: [2, 3], scene: { type: 'bucket', buckets: bucketsAfter(5) },
    narr: '10 mod 7 = 3 → ใส่ที่ bucket 3' },
  { chip: 'insert 55', lines: [2, 3], pill: 'collision @ 6', scene: { type: 'bucket', buckets: bucketsAfter(6) },
    narr: '55 mod 7 = 6 → ชนกับ 76 → chaining เป็น [76, 55]' },
  { chip: 'insert 62', lines: [2, 3], pill: 'collision @ 6', scene: { type: 'bucket', buckets: bucketsAfter(7) },
    narr: '62 mod 7 = 6 → ชนอีกครั้งที่ bucket 6 → กลายเป็น [76, 55, 62]' },
];
