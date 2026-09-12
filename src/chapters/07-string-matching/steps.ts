// src/chapters/07-string-matching/steps.ts
// Content sourced from "06_String_Matching-1038601-17884269975673.pdf", naive-matcher trace
// on slide 8: T = "acaabc", P = "aab". This is the PDF's only genuinely left-to-right,
// shift-by-1 sliding comparison — see scope note in Chapter07Page.tsx.
import type { VisualizerStep, MatchScene } from '../../types';

export const MATCH_CODE: string[] = [
  'for s in 0 .. n-m:',
  '  for i in 0 .. m-1:',
  '    if T[s+i] != P[i]:',
  '      break               // mismatch: try next shift',
  '  if i == m:',
  '    report "match at shift s"',
];

export const MATCH_STEPS: (VisualizerStep & { scene: MatchScene })[] = [
  { chip: 's=0', lines: [1, 2], pill: 'shift=0', scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 0, charStates: { 0: 'compare' } },
    narr: 'เทียบ T[0]=a กับ P[0]=a' },
  { chip: 'match', lines: [2], scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 0, charStates: { 0: 'match', 1: 'compare' } },
    narr: 'ตรงกัน (a=a) → เทียบตัวถัดไป T[1]=c กับ P[1]=a' },
  { chip: 'mismatch', lines: [3, 4], scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 0, charStates: { 0: 'match', 1: 'mismatch' } },
    narr: 'c ≠ a → mismatch เลื่อน pattern ไปทางขวา 1 ช่อง (s=1)' },
  { chip: 's=1', lines: [1, 2], pill: 'shift=1', scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 1, charStates: { 0: 'compare' } },
    narr: 'เทียบ T[1]=c กับ P[0]=a' },
  { chip: 'mismatch', lines: [3, 4], scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 1, charStates: { 0: 'mismatch' } },
    narr: 'c ≠ a → mismatch ทันที เลื่อนไป s=2' },
  { chip: 's=2', lines: [1, 2], pill: 'shift=2', scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 2, charStates: { 0: 'compare' } },
    narr: 'เทียบ T[2]=a กับ P[0]=a' },
  { chip: 'match', lines: [2], scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 2, charStates: { 0: 'match', 1: 'compare' } },
    narr: 'a=a ตรงกัน → เทียบ T[3]=a กับ P[1]=a' },
  { chip: 'match', lines: [2], scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 2, charStates: { 0: 'match', 1: 'match', 2: 'compare' } },
    narr: 'a=a ตรงกันอีก → เทียบ T[4]=b กับ P[2]=b' },
  { chip: 'พบ pattern!', lines: [5, 6], pill: 'shift=2', scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 2, charStates: { 0: 'match', 1: 'match', 2: 'match' } },
    narr: 'ตรงกันครบ 3 ตัว → **พบ pattern ที่ shift 2** ("Pattern occurs with shift 2")' },
  { chip: 's=3', lines: [1, 2], pill: 'shift=3', scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 3, charStates: { 0: 'compare' } },
    narr: 'เลื่อนต่อ เทียบ T[3]=a กับ P[0]=a' },
  { chip: 'mismatch', lines: [3, 4], scene: { type: 'match', text: 'acaabc', pattern: 'aab', shift: 3, charStates: { 0: 'match', 1: 'mismatch' } },
    narr: 'a=a ตรงกัน แต่ T[4]=b ≠ P[1]=a → mismatch จบการสไลด์ (s เกินขอบเขตของ T)' },
];
