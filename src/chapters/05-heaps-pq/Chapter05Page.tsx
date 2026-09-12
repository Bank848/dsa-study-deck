import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import LessonExplainer, { type LessonSection } from '../../components/content/LessonExplainer';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import TreeDiagram, { NODE_STATE_LEGEND } from '../03-trees-bst/TreeDiagram';
import HeapArrayDiagram from './HeapArrayDiagram';
import { HEAP_STEPS, HEAP_CODE, HEAP_NODE_POS, HEAP_BASE_EDGES } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { QuizQuestion } from '../../types';

const CHAPTER = getChapterBySlug('heaps-pq')!;
const { prev, next } = getAdjacentChapters('heaps-pq');

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'binary heap คืออะไร ทำไมเก็บใน array ธรรมดาได้',
    body: 'binary heap คือ complete binary tree ที่เก็บอยู่ในอาเรย์ตรงๆ ไม่ต้องมี pointer ชี้ลูก/พ่อเลย เพราะตำแหน่งของทุก node คำนวณได้จากดัชนีในอาเรย์อย่างเดียว — สไลด์ให้สูตรแบบ 1-indexed ที่ root อยู่ที่ A[1]: parent(i)=floor(i/2), left(i)=2i, right(i)=2i+1 (โค้ดในเดโมนี้แปลงเป็น 0-indexed ให้ตรงกับภาษาที่ใช้จริง: parent(i)=floor((i-1)/2), left(i)=2i+1, right(i)=2i+2) "complete" หมายความว่าทุกชั้นเต็มยกเว้นชั้นล่างสุดที่อาจเติมจากซ้ายไปขวาไม่ครบ ทำให้ไม่มีช่องว่างกลางอาเรย์เลย',
  },
  {
    title: 'max-heap property คืออะไร',
    body: 'max-heap property บังคับว่า node พ่อต้องมีค่ามากกว่าหรือเท่ากับลูกทุกตัวเสมอ ทุกชั้นในทรี — ผลที่ตามมาคือค่ามากที่สุดในฮีปทั้งหมดต้องอยู่ที่ root เสมอ (ตำแหน่งดัชนี 0) นี่คือเหตุผลที่ heap ถูกใช้ทำ priority queue: หยิบค่าสูงสุดออกได้ในเวลาคงที่โดยแค่ดูที่ root แต่หลังจากหยิบออกไปแล้ว โครงสร้างจะเสีย heap property ชั่วคราว ต้องมีขั้นตอนซ่อมกลับมา ซึ่งก็คือ maxHeapify ที่สาธิตในเดโมด้านบนนี่เอง',
  },
  {
    title: 'maxHeapify (sift-down) ทำงานอย่างไร',
    body: 'maxHeapify(A, i) รับดัชนี i ที่ "สงสัยว่าอาจละเมิด" heap property แล้วไล่แก้ลงไปทีละชั้น: เทียบค่า A[i] กับลูกทั้งสอง (ถ้ามี) หาตัวที่มากที่สุดในสาม — ถ้า A[i] มากสุดอยู่แล้วก็จบเลย แต่ถ้าลูกตัวใดมากกว่า ให้สลับ A[i] กับลูกตัวนั้น แล้วเรียก maxHeapify ซ้ำที่ตำแหน่งใหม่ของค่าที่เพิ่งถูกสลับลงไป ทำแบบนี้ไปเรื่อยๆ จนกว่าค่านั้นจะอยู่ในตำแหน่งที่ไม่ละเมิด heap property อีก หรือจนกว่าจะไม่มีลูกเหลือให้เทียบ — เดโมด้านบนแสดงตัวอย่างจากสไลด์ที่ต้องสลับสองครั้งกว่าจะจบ (ดัชนี 1↔3 แล้ว 3↔8)',
  },
];

const CONCEPT_POINTS = [
  'binary heap เก็บใน array ธรรมดา — สำหรับดัชนี 0-indexed: parent(i) = floor((i-1)/2), left(i) = 2i+1, right(i) = 2i+2 (ต้นฉบับสไลด์เขียนแบบ 1-indexed: PARENT(i)=floor(i/2), LEFT(i)=2i, RIGHT(i)=2i+1, root=A[1] — สลับกันแค่จุดเริ่มนับ)',
  'max-heap property: ทุก node มีค่ามากกว่าหรือเท่ากับลูกของมันเสมอ — root จึงเป็นค่ามากที่สุดในฮีปเสมอ',
  'maxHeapify(A, i) ("sift-down") ดันค่าที่ดัชนี i ลงไปยังตำแหน่งที่ถูกต้อง โดยสลับกับลูกที่มีค่ามากกว่าซ้ำไปเรื่อยๆ จนกว่า heap property จะกลับมาจริง',
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'heap-parent-formula',
    prompt: 'ตามสูตรของสไลด์ (1-indexed, root = A[1]) ลูกซ้ายของ node ที่ดัชนี i คือดัชนีใด',
    options: [
      { id: 'a', label: 'i - 1', correct: false },
      { id: 'b', label: '2i', correct: true },
      { id: 'c', label: '2i + 1', correct: false },
      { id: 'd', label: 'floor(i/2)', correct: false },
    ],
    explain: 'สไลด์ระบุ LEFT(i) = 2i ในรูปแบบ 1-indexed ที่ root อยู่ที่ A[1]',
  },
  {
    id: 'heap-max-property',
    prompt: 'ใน max-heap ค่าที่มากที่สุดในทั้งฮีปอยู่ที่ตำแหน่งใดเสมอ',
    options: [
      { id: 'a', label: 'ใบสุดท้ายทางขวา', correct: false },
      { id: 'b', label: 'root', correct: true },
      { id: 'c', label: 'ที่ไหนก็ได้ ไม่แน่นอน', correct: false },
      { id: 'd', label: 'ใบซ้ายสุด', correct: false },
    ],
    explain: 'max-heap property บังคับว่า parent >= ลูกเสมอ ดังนั้น root ต้องมากที่สุด',
  },
  {
    id: 'heap-siftdown-swap-count',
    prompt: 'ในตัวอย่าง maxHeapify ของสไลด์ที่สอนในบทนี้ ต้องสลับค่ากี่ครั้งกว่าจะจบ',
    options: [
      { id: 'a', label: '1 ครั้ง', correct: false },
      { id: 'b', label: '2 ครั้ง', correct: true },
      { id: 'c', label: '3 ครั้ง', correct: false },
      { id: 'd', label: 'ไม่มีการสลับเลย', correct: false },
    ],
    explain: 'ตัวอย่างในสไลด์สลับสองครั้ง (ดัชนี 1↔3 แล้ว 3↔8) ก่อนที่ heap property จะกลับมา',
  },
];

export default function Chapter05Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="maxHeapify(A, 1)"
        scopeLabel="Max-Heap"
        steps={HEAP_STEPS}
        code={HEAP_CODE}
        legend={NODE_STATE_LEGEND}
        renderDiagram={(step) => {
          const s = step as (typeof HEAP_STEPS)[number];
          if (s.scene?.type !== 'tree') return null;
          return (
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <TreeDiagram scene={s.scene} nodePositions={HEAP_NODE_POS} baseEdges={HEAP_BASE_EDGES} viewBoxHeight={260} />
              <HeapArrayDiagram values={s.array} states={s.arrayStates} />
            </div>
          );
        }}
      />

      <main className="px-6 md:px-10 py-9 max-w-[860px] mx-auto">
        <p className="text-[15px] leading-[1.75] mb-9" style={{ color: 'var(--color-muted-foreground)' }}>
          {CONCEPT_POINTS[1]}
        </p>

        <section className="mb-10">
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Lesson</h2>
          <LessonExplainer sections={LESSON_SECTIONS} />
        </section>

        <section className="mb-10">
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Concept</h2>
          <ConceptCard points={CONCEPT_POINTS} />
        </section>

        <section className="mb-10">
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Complexity</h2>
          <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--color-muted-foreground)' }}>
            สไลด์บทนี้ไม่ได้ระบุ Big-O ของ maxHeapify/buildMaxHeap/priority-queue operations ไว้ตรงๆ
            ที่ไหนเลย — จึงไม่มีตารางความซับซ้อนสำหรับบทนี้ (ตามกฎความถูกต้องของเนื้อหา:
            ไม่เดาตัวเลขที่ต้นฉบับไม่ได้ระบุ)
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Quiz</h2>
          <Quiz questions={QUIZ_QUESTIONS} />
        </section>

        <ChapterNav prev={prev} next={next} />
      </main>
    </ChapterLayout>
  );
}
