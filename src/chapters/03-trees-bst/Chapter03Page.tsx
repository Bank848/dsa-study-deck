import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import LessonExplainer, { type LessonSection } from '../../components/content/LessonExplainer';
import ComplexityTable from '../../components/content/ComplexityTable';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import InsertDecisionFlowchart from './InsertDecisionFlowchart';
import TreeDiagram, { NODE_STATE_LEGEND } from './TreeDiagram';
import { BST_INSERT_STEPS, BST_INSERT_CODE, BST_NODE_POS, BST_BASE_EDGES, BST_DEPTH_GUIDES } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { ComplexityRow, QuizQuestion } from '../../types';

const CHAPTER = getChapterBySlug('trees-bst')!;
const { prev, next } = getAdjacentChapters('trees-bst');

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'Binary Search Tree คืออะไร',
    body: 'BST คือ binary tree ที่มีกฎเดียวแต่บังคับใช้กับทุก node ในทรี ไม่ใช่แค่ root: ค่าทุกตัวใน subtree ฝั่งซ้ายของ node ต้องน้อยกว่าค่าของ node นั้น และค่าทุกตัวใน subtree ฝั่งขวาต้องมากกว่าเสมอ ลองดูตัวอย่างในเดโมด้านบน — จาก root 30, ฝั่งซ้ายมี 15 (น้อยกว่า 30) และฝั่งขวามี 42, 45 (มากกว่า 30 ทั้งคู่) กฎนี้ทำให้ทรีทั้งต้นถูกจัดเรียงในตัวเองแบบไม่ต้องมีขั้นตอน sort แยก',
  },
  {
    title: 'insert ทำงานอย่างไร',
    body: 'เริ่มจาก root แล้วเดินลงไปทีละชั้น: ถ้าค่าที่จะแทรกน้อยกว่า node ปัจจุบัน ไปทางซ้าย ถ้ามากกว่า ไปทางขวา ทำซ้ำแบบนี้จนกว่าจะเจอช่องว่าง (ไม่มี node อยู่) แล้ววางค่าใหม่ตรงนั้น อย่างในเดโม insert(37): เทียบกับ 30 ก่อน (37 มากกว่า จึงไปขวา) แล้วเทียบกับ 42 (37 น้อยกว่า จึงไปซ้าย) พอเจอว่าไม่มีลูกซ้ายของ 42 ก็วาง 37 ตรงนั้นเลย รวมเปรียบเทียบ 2 ครั้ง search และ delete ก็เดินตามหลักการเดียวกันนี้ทุกประการ',
  },
  {
    title: 'ทำไมถึงเร็ว O(log n) และตอนไหนที่ไม่เร็ว',
    body: 'ทุกครั้งที่เปรียบเทียบหนึ่งครั้ง เราตัดข้อมูลที่เหลือทิ้งไปครึ่งหนึ่งทันที (เหมือนหลักการของ binary search) ถ้าทรีสมดุลดี ความลึกของทรีจะอยู่ที่ประมาณ log n ทำให้ค้นหา/แทรก/ลบใช้เวลาแค่ O(log n) แต่ถ้าใส่ค่าที่เรียงจากน้อยไปมากอยู่แล้วต่อเนื่องกัน ทรีจะไม่แตกแขนงเลย กลายเป็นเส้นตรงยาว n ชั้น ทำให้ทุก operation กลายเป็น O(n) แทน — นี่คือเหตุผลที่ทรีแบบ AVL (บทถัดไป) ต้องมีการ "หมุนต้นไม้" คอยรักษาความสมดุลไว้',
  },
];

const CONCEPT_POINTS = [
  'แต่ละ node มีลูกได้สูงสุด 2 ฝั่ง ฝั่งซ้ายเก็บค่าที่น้อยกว่า ฝั่งขวาเก็บค่าที่มากกว่าเสมอ',
  'กฎข้อเดียวนี้ทำให้ search, insert, delete เร็วได้ถึง O(log n) เพราะทุกครั้งที่เปรียบเทียบ เราตัดข้อมูลครึ่งหนึ่งทิ้งไปเลย',
  'ความลึกของ node ที่ไปถึง เท่ากับจำนวนครั้งที่เปรียบเทียบพอดี — ดูได้จากเส้น depth guide บนไดอะแกรมด้านบน',
];

const COMPLEXITY_ROWS: ComplexityRow[] = [
  { op: 'search', best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', worstGood: false, growthPct: 85 },
  { op: 'insert', best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', worstGood: false, growthPct: 85 },
  { op: 'delete', best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', worstGood: false, growthPct: 85 },
  { op: 'space', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', worstGood: true, growthPct: 40 },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'compare-count',
    prompt: 'ระหว่างแทรก 37 ด้านบน ต้องเปรียบเทียบกี่ครั้งก่อนเจอที่ว่าง',
    options: [
      { id: 'a', label: '2 ครั้ง — เทียบที่ node 30 แล้ว node 42', correct: true },
      { id: 'b', label: '4 ครั้ง — ทุก node ในทรี', correct: false },
      { id: 'c', label: '1 ครั้ง — เทียบแค่ที่ root', correct: false },
    ],
    explain: 'เทียบที่ 30 (ไปทางขวา) แล้วเทียบที่ 42 (ไปทางซ้าย) แล้วเจอช่องว่าง รวม 2 ครั้ง เท่ากับความลึกของตำแหน่งที่แทรก',
  },
  {
    id: 'worst-case-shape',
    prompt: 'กรณีไหนทำให้ insert กลายเป็น O(n) แทนที่จะเป็น O(log n)',
    options: [
      { id: 'a', label: 'ทรีที่เตี้ยและกว้าง (balanced)', correct: false },
      { id: 'b', label: 'ทรีที่เอียงไปทางเดียวจนกลายเป็นเส้นตรง (unbalanced)', correct: true },
    ],
    explain: 'ถ้าใส่ค่าที่เรียงลำดับอยู่แล้วไปเรื่อยๆ ทรีจะเอียงเป็นเส้นตรง ความลึก = n ทำให้ต้องเปรียบเทียบ n ครั้ง',
  },
];

export default function Chapter03Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="insert(37)"
        scopeLabel="BST"
        steps={BST_INSERT_STEPS}
        code={BST_INSERT_CODE}
        legend={NODE_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'tree' ? (
          <TreeDiagram scene={step.scene} nodePositions={BST_NODE_POS} baseEdges={BST_BASE_EDGES} newNodeId="37" depthGuides={BST_DEPTH_GUIDES} badgeLabel="value = 37" />
        ) : null)}
      />

      <main className="px-6 md:px-10 py-9 max-w-[860px] mx-auto">
        <p className="text-[15px] leading-[1.75] mb-9" style={{ color: 'var(--color-muted-foreground)' }}>
          {CONCEPT_POINTS[0]} {CONCEPT_POINTS[1]}
        </p>

        <section className="mb-10">
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Lesson</h2>
          <LessonExplainer sections={LESSON_SECTIONS} />
        </section>

        <section className="mb-10">
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Concept</h2>
          <ConceptCard points={CONCEPT_POINTS} />
          <InsertDecisionFlowchart />
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
