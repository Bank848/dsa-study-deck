// src/chapters/02-stacks-queues/steps.ts
// Content sourced from "2301265_Stacks_Queues_2026-838647-17863739129894.pdf":
// - Stack push sequence is a natural one consistent with the PDF's push(A)/push(B)/push(C)
//   code examples (no single worked numeric trace is given in the source for the stack ADT).
// - Queue sequence is the PDF's own worked "Queue Example" table, rows 1-6, verbatim.
import type { VisualizerStep, LinearScene } from '../../types';

export const STACK_CODE: string[] = [
  'function push(x):',
  '  if size == capacity: throw FullStackException',
  '  data[size] = x',
  '  size += 1',
  'function pop():',
  '  if size == 0: throw EmptyStackException',
  '  size -= 1',
  '  return data[size]',
];

export const STACK_STEPS: (VisualizerStep & { scene: LinearScene })[] = [
  { chip: 'stack ว่างเปล่า', lines: [1], scene: { type: 'linear', orientation: 'stack', cells: [], pointerLabel: 'top: -' },
    narr: 'Stack ว่างเปล่า — **push** เพิ่มที่ปลายบนสุด (top), **pop** ลบจากปลายบนสุดเช่นกัน (LIFO)' },
  { chip: 'push(A)', lines: [3, 4], scene: { type: 'linear', orientation: 'stack', cells: [{ value: 'A', state: 'pushed' }], pointerLabel: 'top: A' },
    narr: '`push(A)` — ใส่ A ที่ตำแหน่ง size แล้วเพิ่ม size อีก 1' },
  { chip: 'push(B)', lines: [3, 4], scene: { type: 'linear', orientation: 'stack', cells: [{ value: 'A', state: 'idle' }, { value: 'B', state: 'pushed' }], pointerLabel: 'top: B' },
    narr: '`push(B)` — top เปลี่ยนเป็น B' },
  { chip: 'push(C)', lines: [3, 4], scene: { type: 'linear', orientation: 'stack', cells: [{ value: 'A', state: 'idle' }, { value: 'B', state: 'idle' }, { value: 'C', state: 'pushed' }], pointerLabel: 'top: C' },
    narr: '`push(C)` — top เปลี่ยนเป็น C' },
  { chip: 'pop()', lines: [6, 7, 8], pill: 'return C', scene: { type: 'linear', orientation: 'stack', cells: [{ value: 'A', state: 'idle' }, { value: 'B', state: 'idle' }, { value: 'C', state: 'popped' }], pointerLabel: 'top: C (จะถูกลบ)' },
    narr: '`pop()` — คืนค่า C (top เดิม) แล้วลด size ลง 1' },
  { chip: 'หลัง pop', lines: [], scene: { type: 'linear', orientation: 'stack', cells: [{ value: 'A', state: 'idle' }, { value: 'B', state: 'here' }], pointerLabel: 'top: B' },
    narr: 'เหลือ [A, B] — top ชี้ที่ B' },
  { chip: 'top()', lines: [], pill: 'return B', scene: { type: 'linear', orientation: 'stack', cells: [{ value: 'A', state: 'idle' }, { value: 'B', state: 'here' }], pointerLabel: 'top: B' },
    narr: '`top()` (peek) — คืนค่า B โดย**ไม่ลบ**ออกจาก stack' },
];

export const QUEUE_CODE: string[] = [
  'function enqueue(x):',
  '  data[rear] = x',
  '  rear = (rear + 1) mod N',
  '  size += 1',
  'function dequeue():',
  '  if size == 0: throw EmptyQueueException',
  '  x = data[front]',
  '  front = (front + 1) mod N',
  '  size -= 1',
  '  return x',
];

export const QUEUE_STEPS: (VisualizerStep & { scene: LinearScene })[] = [
  { chip: 'queue ว่างเปล่า', lines: [1], scene: { type: 'linear', orientation: 'queue', cells: [], pointerLabel: 'front: - / rear: -' },
    narr: 'Queue ว่างเปล่า — **enqueue** เพิ่มที่ rear, **dequeue** ลบจาก front (FIFO)' },
  { chip: 'enqueue(5)', lines: [2, 3, 4], scene: { type: 'linear', orientation: 'queue', cells: [{ value: '5', state: 'pushed' }], pointerLabel: 'front: 5 / rear: 5' },
    narr: '`enqueue(5)` — front และ rear ชี้ที่ 5 ตัวเดียว' },
  { chip: 'enqueue(3)', lines: [2, 3, 4], scene: { type: 'linear', orientation: 'queue', cells: [{ value: '5', state: 'idle' }, { value: '3', state: 'pushed' }], pointerLabel: 'front: 5 / rear: 3' },
    narr: '`enqueue(3)` — rear เปลี่ยนเป็น 3, front ยังเป็น 5' },
  { chip: 'dequeue()', lines: [7, 8, 9, 10], pill: 'return 5', scene: { type: 'linear', orientation: 'queue', cells: [{ value: '5', state: 'popped' }, { value: '3', state: 'idle' }], pointerLabel: 'front: 5 (จะถูกลบ)' },
    narr: '`dequeue()` — คืนค่า 5 (front เดิม) ตามตาราง Queue Example ในสไลด์' },
  { chip: 'หลัง dequeue', lines: [], scene: { type: 'linear', orientation: 'queue', cells: [{ value: '3', state: 'here' }], pointerLabel: 'front: 3 / rear: 3' },
    narr: 'เหลือ (3) — front และ rear ชี้ที่ 3 ตัวเดียว' },
  { chip: 'enqueue(7)', lines: [2, 3, 4], scene: { type: 'linear', orientation: 'queue', cells: [{ value: '3', state: 'idle' }, { value: '7', state: 'pushed' }], pointerLabel: 'front: 3 / rear: 7' },
    narr: '`enqueue(7)` — rear เปลี่ยนเป็น 7' },
  { chip: 'dequeue()', lines: [7, 8, 9, 10], pill: 'return 3', scene: { type: 'linear', orientation: 'queue', cells: [{ value: '3', state: 'popped' }, { value: '7', state: 'idle' }], pointerLabel: 'front: 3 (จะถูกลบ)' },
    narr: '`dequeue()` — คืนค่า 3 ตามตารางในสไลด์' },
  { chip: 'front()', lines: [], pill: 'return 7', scene: { type: 'linear', orientation: 'queue', cells: [{ value: '7', state: 'here' }], pointerLabel: 'front: 7 / rear: 7' },
    narr: '`front()` — คืนค่า 7 โดยไม่ลบออกจาก queue' },
];
