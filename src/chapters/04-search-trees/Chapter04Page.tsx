import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import LessonExplainer, { type LessonSection } from '../../components/content/LessonExplainer';
import ComplexityTable from '../../components/content/ComplexityTable';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import TreeDiagram, { NODE_STATE_LEGEND } from '../03-trees-bst/TreeDiagram';
import { AVL_INSERT_STEPS, AVL_CODE, AVL_NODE_POS, AVL_BASE_EDGES, AVL_DEPTH_GUIDES } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { ComplexityRow, QuizQuestion } from '../../types';

const CHAPTER = getChapterBySlug('search-trees')!;
const { prev, next } = getAdjacentChapters('search-trees');

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'ทำไม BST ธรรมดาไม่พอ',
    body: 'BST ปกติ (บทที่แล้ว) เร็วแค่ตอนทรีสมดุลเท่านั้น ถ้าใส่ค่าตามลำดับต่อเนื่องกันเรื่อยๆ ทรีจะเอียงเป็นเส้นตรงและกลายเป็น O(n) แทน O(log n) — AVL tree แก้ปัญหานี้โดยเพิ่มกฎบังคับความสมดุลเข้าไป: ทุก internal node ต้องมีความสูงของ subtree ซ้ายกับขวาต่างกันไม่เกิน 1 เสมอ (นิยามตรงจากสไลด์ AVL Tree Definition) กฎนี้การันตีว่าความสูงของทั้งทรีจะไม่มีวันเกิน O(log n) ไม่ว่าจะแทรกข้อมูลตามลำดับไหนก็ตาม',
  },
  {
    title: 'trinode restructuring คืออะไร ทำไมต้องมี z, y, x',
    body: 'เมื่อ insert ทำให้ node ใดกลายเป็น "ไม่สมดุล" (ต่างกันเกิน 1) สไลด์ตั้งชื่อ node นั้นว่า z (ancestor ตัวแรกที่ไม่สมดุล เดินย้อนขึ้นจาก node ที่เพิ่งแทรก), y (ลูกของ z ฝั่งที่สูงกว่า), x (ลูกของ y ฝั่งที่สูงกว่า) — สามตัวนี้เรียงกันเป็น 3 ระดับต่อเนื่อง trinode restructuring คือการจัดเรียง z, y, x ใหม่ให้ node ตรงกลาง (เรียงตาม inorder) กลายเป็น root ใหม่ของ subtree นี้แทน ทำให้ความสูงกลับมาเท่าเดิมก่อนแทรก การจัดเรียงใหม่นี้คือสิ่งที่เห็นเป็น "การหมุนต้นไม้" บนไดอะแกรม',
  },
  {
    title: 'เดโมด้านบนเกิดอะไรขึ้นบ้าง',
    body: 'เดโมสาธิตตัวอย่างจากสไลด์ตรงๆ: แทรก 54 เข้าไปทำให้ node 78 กลายเป็นตัวไม่สมดุล (z=78) โดยลูกที่สูงกว่าของ 78 คือ 50 (y=50) และลูกที่สูงกว่าของ 50 คือ 62 (x=62) — เรียง (x,y,z) ตาม inorder ได้ (50, 62, 78) ดังนั้น 62 (ตัวกลาง) จึงกลายเป็น root ใหม่ของ subtree นี้ โดยมี 50 เป็นลูกซ้ายและ 78 เป็นลูกขวา การหมุนใช้เวลาแค่ O(1) เพราะแค่จัดเรียง pointer 3 ตัวใหม่ ไม่ต้องแตะ node อื่นในทรีเลย',
  },
  {
    title: 'ทำไม insert ทั้งหมดยังคง O(log n)',
    body: 'insert ทำสองขั้นตอน: (1) เดินจาก root ลงไปหาตำแหน่งที่ควรแทรก ซึ่งใช้เวลา O(log n) เพราะความสูงของ AVL tree ถูกการันตีไว้ไม่เกิน O(log n) เสมอ และ (2) เดินย้อนกลับขึ้นไปเช็คความสมดุลทีละชั้น ซึ่งก็ยาวสุด O(log n) ชั้นเช่นกัน — trinode restructuring เกิดขึ้นอย่างมากแค่ 1 ครั้งต่อการแทรก 1 ครั้ง และแต่ละครั้งใช้แค่ O(1) รวมทั้งหมดจึงยังคงเป็น O(log n) ตามที่สไลด์ Running Times for AVL Trees ระบุไว้',
  },
];

const CONCEPT_POINTS = [
  'AVL tree คือ BST ที่ทุก internal node มีความสูงของลูกซ้าย-ขวาต่างกันไม่เกิน 1 — ทำให้ความสูงของทั้งต้นไม้อยู่ที่ O(log n) เสมอ',
  'การแทรกทำแบบ BST ปกติก่อน (ขยาย external node) แล้วเดินย้อนขึ้นไปหา ancestor แรกที่ไม่สมดุล — ถ้าเจอให้ทำ trinode restructuring (หมุนต้นไม้) เพื่อดึงสมดุลกลับมา',
  'การหมุนแต่ละครั้งใช้เวลา O(1) และเกิดขึ้นอย่างมาก 1 ครั้งต่อการแทรก 1 ครั้ง — รวมกับการค้นหา O(log n) ทำให้ insert ทั้งหมดยังคง O(log n)',
];

const COMPLEXITY_ROWS: ComplexityRow[] = [
  { op: 'find', best: 'O(log n)', avg: 'O(log n)', worst: 'O(log n)', worstGood: true, growthPct: 30 },
  { op: 'insert', best: 'O(log n)', avg: 'O(log n)', worst: 'O(log n)', worstGood: true, growthPct: 30 },
  { op: 'remove', best: 'O(log n)', avg: 'O(log n)', worst: 'O(log n)', worstGood: true, growthPct: 30 },
  { op: 'restructure (1 rotation)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', worstGood: true, growthPct: 10 },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'avl-balance-def',
    prompt: 'ตามนิยาม AVL tree ความสูงของลูกทั้งสองฝั่งของ internal node ใดๆ ต่างกันได้ไม่เกินเท่าไหร่',
    options: [
      { id: 'a', label: '0', correct: false },
      { id: 'b', label: '1', correct: true },
      { id: 'c', label: '2', correct: false },
      { id: 'd', label: 'log n', correct: false },
    ],
    explain: 'สไลด์ AVL Tree Definition ระบุตรงๆ ว่าความสูงของลูกต่างกันได้ไม่เกิน 1',
  },
  {
    id: 'avl-new-root',
    prompt: 'ในตัวอย่าง trinode restructuring ของสไลด์ หลังแทรก 54 และหมุนต้นไม้แล้ว node ใดกลายเป็น root ใหม่ของ subtree แทนที่ 78',
    options: [
      { id: 'a', label: '50', correct: false },
      { id: 'b', label: '54', correct: false },
      { id: 'c', label: '62', correct: true },
      { id: 'd', label: '78', correct: false },
    ],
    explain: 'สไลด์ "Insertion Example, continued" แสดง 62 เป็น root ใหม่ของ subtree นี้',
  },
  {
    id: 'avl-insert-time',
    prompt: 'ตามสไลด์ Running Times for AVL Trees การแทรก (insert) ใช้เวลาเท่าไหร่',
    options: [
      { id: 'a', label: 'O(n)', correct: false },
      { id: 'b', label: 'O(n log n)', correct: false },
      { id: 'c', label: 'O(log n)', correct: true },
      { id: 'd', label: 'O(1)', correct: false },
    ],
    explain: 'ระบุตรงในสไลด์ "insert is O(log n)"',
  },
];

export default function Chapter04Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="insert(54) + rebalance"
        scopeLabel="AVL Tree"
        steps={AVL_INSERT_STEPS}
        code={AVL_CODE}
        legend={NODE_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'tree' ? (
          <TreeDiagram scene={step.scene} nodePositions={AVL_NODE_POS} baseEdges={AVL_BASE_EDGES} newNodeId="54" depthGuides={AVL_DEPTH_GUIDES} viewBoxHeight={320} />
        ) : null)}
      />

      <main className="px-6 md:px-10 py-9 max-w-[860px] mx-auto">
        <p className="text-[15px] leading-[1.75] mb-9" style={{ color: 'var(--color-muted-foreground)' }}>
          {CONCEPT_POINTS[0]}
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
          <ComplexityTable rows={COMPLEXITY_ROWS} />
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
