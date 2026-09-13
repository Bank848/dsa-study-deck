// arrayMax algorithm from "2301265_02_Analysis...pdf" p.6 (pseudocode) and p.10 (operation
// costs: each comparison/assignment/increment = 2 primitive ops, return = 1, per the source's
// own cost model). Demo array [3,7,2,9,5] is illustrative (PDF gives no concrete numbers) and
// is NOT strictly increasing, so its real op count (23, computed below) differs from the PDF's
// worst-case FORMULA 7n-1 (=34 for n=5) — both facts are shown separately on the page, not conflated.
import type { VisualizerStep, CounterScene } from '../../types';

export const ARRAYMAX_CODE: string[] = [
  'currentMax ← A[0]',
  'for i ← 1 to n-1 do',
  '  if A[i] > currentMax then',
  '    currentMax ← A[i]',
  'return currentMax',
];

const A = [3, 7, 2, 9, 5];

export const ARRAYMAX_STEPS: (VisualizerStep & { scene: CounterScene })[] = [
  { chip: 'init', lines: [1], scene: { type: 'counter', values: A, activeIndex: 0, markedIndex: 0, opCount: 2 },
    narr: '`currentMax ← A[0] = 3` — การกำหนดค่าเริ่มต้นนับเป็น 2 ops (อ่านค่า + กำหนดค่า) ตามตารางในสไลด์' },
  { chip: 'i=1: 7 > 3', lines: [2, 3, 4], pill: '7 > 3', scene: { type: 'counter', values: A, activeIndex: 1, markedIndex: 1, opCount: 8 },
    narr: 'A[1]=7 > currentMax=3 → **currentMax = 7** (เทียบ 2 + กำหนดค่า 2 + เพิ่ม i 2 = 6 ops, รวมเป็น 8)' },
  { chip: 'i=2: 2 ≤ 7', lines: [2, 3], pill: '2 ≤ 7', scene: { type: 'counter', values: A, activeIndex: 2, markedIndex: 1, opCount: 12 },
    narr: 'A[2]=2 ≤ currentMax=7 → ไม่อัปเดต (เทียบ 2 + เพิ่ม i 2 = 4 ops, รวมเป็น 12)' },
  { chip: 'i=3: 9 > 7', lines: [2, 3, 4], pill: '9 > 7', scene: { type: 'counter', values: A, activeIndex: 3, markedIndex: 3, opCount: 18 },
    narr: 'A[3]=9 > currentMax=7 → **currentMax = 9** (6 ops, รวมเป็น 18)' },
  { chip: 'i=4: 5 ≤ 9', lines: [2, 3], pill: '5 ≤ 9', scene: { type: 'counter', values: A, activeIndex: 4, markedIndex: 3, opCount: 22 },
    narr: 'A[4]=5 ≤ currentMax=9 → ไม่อัปเดต (4 ops, รวมเป็น 22)' },
  { chip: 'return 9', lines: [5], pill: 'return 9', scene: { type: 'counter', values: A, markedIndex: 3, opCount: 23 },
    narr: 'คืนค่า currentMax = 9 (return 1 op) — รวม **23 ops** สำหรับอาเรย์ตัวอย่างนี้ (สูตร worst-case ในสไลด์คือ 7n-1 = 34 ครั้ง สำหรับอาเรย์ขนาด 5 ที่เรียงจากน้อยไปมากตลอด — อาเรย์ตัวอย่างนี้ไม่ได้เรียงแบบนั้น จึงมี ops น้อยกว่า)' },
];
