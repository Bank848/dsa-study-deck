// src/chapters/08-dynamic-programming/steps.ts
// Content sourced from "06_Dynamic_Programming-838647-17875466674679.pdf", LCS section
// (slides 30-34). X and Y and the recurrence are the PDF's own; every cell value below was
// hand-computed from that recurrence and cross-checked against the PDF's stated c[7,6]=4.
import type { VisualizerStep, GridScene } from '../../types';

export const LCS_CODE: string[] = [
  'if i == 0 or j == 0:',
  '  c[i,j] = 0',
  'elif X[i] == Y[j]:',
  '  c[i,j] = c[i-1,j-1] + 1',
  'else:',
  '  c[i,j] = max(c[i,j-1], c[i-1,j])',
];

// X = A,B,C,B,D,A,B (rows 1-7); Y = B,D,C,A,B,A (cols 1-6)
const ROW_LABELS = ['-', 'A', 'B', 'C', 'B', 'D', 'A', 'B'];
const COL_LABELS = ['-', 'B', 'D', 'C', 'A', 'B', 'A'];

const FINAL_TABLE: (number | null)[][] = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 2, 2],
  [0, 1, 1, 2, 2, 2, 2],
  [0, 1, 1, 2, 2, 3, 3],
  [0, 1, 2, 2, 2, 3, 3],
  [0, 1, 2, 2, 3, 3, 4],
  [0, 1, 2, 2, 3, 4, 4],
];

function baseTable(): (number | null)[][] {
  return [
    [0, 0, 0, 0, 0, 0, 0],
    [0, null, null, null, null, null, null],
    [0, null, null, null, null, null, null],
    [0, null, null, null, null, null, null],
    [0, null, null, null, null, null, null],
    [0, null, null, null, null, null, null],
    [0, null, null, null, null, null, null],
    [0, null, null, null, null, null, null],
  ];
}

function withRow1(uptoCol: number): (number | null)[][] {
  const t = baseTable();
  for (let j = 1; j <= uptoCol; j++) t[1][j] = FINAL_TABLE[1][j];
  return t;
}

const idleState: Record<string, 'idle' | 'filled'> = {};
for (let i = 0; i <= 7; i++) for (let j = 0; j <= 6; j++) if (i === 0 || j === 0) idleState[`${i}-${j}`] = 'filled';

function filledThrough(uptoCol: number): Record<string, GridScene['cellState'][string]> {
  const out: Record<string, GridScene['cellState'][string]> = { ...idleState };
  for (let j = 1; j <= uptoCol; j++) out[`1-${j}`] = 'filled';
  return out;
}

function finalCellState(): Record<string, GridScene['cellState'][string]> {
  const out: Record<string, GridScene['cellState'][string]> = {};
  for (let i = 0; i <= 7; i++) for (let j = 0; j <= 6; j++) out[`${i}-${j}`] = 'filled';
  return out;
}

export const LCS_STEPS: (VisualizerStep & { scene: GridScene })[] = [
  { chip: 'ฐาน: i=0 หรือ j=0', lines: [1, 2], scene: { type: 'grid', cells: baseTable(), rowLabels: ROW_LABELS, colLabels: COL_LABELS, cellState: { ...idleState } },
    narr: 'ถ้า i=0 หรือ j=0 แปลว่าสายหนึ่งยาว 0 ตัวอักษร ดังนั้น LCS ยาว 0 — เติมแถวบนสุดและคอลัมน์ซ้ายสุดเป็น 0 ทั้งหมด' },
  { chip: 'X1=A, Y1=B', lines: [5, 6], scene: { type: 'grid', cells: withRow1(1), rowLabels: ROW_LABELS, colLabels: COL_LABELS, activeCell: [1, 1], sourceCells: [[0, 1], [1, 0]], cellState: filledThrough(1) },
    narr: 'A ≠ B → c[1,1] = max(c[0,1], c[1,0]) = max(0, 0) = 0' },
  { chip: 'X1=A, Y2=D', lines: [5, 6], scene: { type: 'grid', cells: withRow1(2), rowLabels: ROW_LABELS, colLabels: COL_LABELS, activeCell: [1, 2], sourceCells: [[0, 2], [1, 1]], cellState: filledThrough(2) },
    narr: 'A ≠ D → c[1,2] = max(c[0,2], c[1,1]) = max(0, 0) = 0' },
  { chip: 'X1=A, Y3=C', lines: [5, 6], scene: { type: 'grid', cells: withRow1(3), rowLabels: ROW_LABELS, colLabels: COL_LABELS, activeCell: [1, 3], sourceCells: [[0, 3], [1, 2]], cellState: filledThrough(3) },
    narr: 'A ≠ C → c[1,3] = max(c[0,3], c[1,2]) = max(0, 0) = 0' },
  { chip: 'X1=A, Y4=A', lines: [3, 4], scene: { type: 'grid', cells: withRow1(4), rowLabels: ROW_LABELS, colLabels: COL_LABELS, activeCell: [1, 4], sourceCells: [[0, 3]], cellState: filledThrough(4) },
    narr: 'A = A ตรงกัน! → c[1,4] = c[0,3] + 1 = 0 + 1 = 1' },
  { chip: 'X1=A, Y5=B', lines: [5, 6], scene: { type: 'grid', cells: withRow1(5), rowLabels: ROW_LABELS, colLabels: COL_LABELS, activeCell: [1, 5], sourceCells: [[0, 5], [1, 4]], cellState: filledThrough(5) },
    narr: 'A ≠ B → c[1,5] = max(c[0,5], c[1,4]) = max(0, 1) = 1' },
  { chip: 'X1=A, Y6=A', lines: [3, 4], scene: { type: 'grid', cells: withRow1(6), rowLabels: ROW_LABELS, colLabels: COL_LABELS, activeCell: [1, 6], sourceCells: [[0, 5]], cellState: filledThrough(6) },
    narr: 'A = A ตรงกัน! → c[1,6] = c[0,5] + 1 = 0 + 1 = 1' },
  { chip: 'ตารางเต็ม', lines: [], pill: 'LCS length = 4', scene: { type: 'grid', cells: FINAL_TABLE, rowLabels: ROW_LABELS, colLabels: COL_LABELS, activeCell: [7, 6], cellState: finalCellState() },
    narr: 'เติมด้วยกฎเดียวกันไปจนครบทุกแถว (แถว 3-7 ไม่ได้ไล่ทีละช่องในสาธิตนี้) — คำตอบสุดท้าย **c[7,6] = 4** คือความยาวของ LCS' },
];
