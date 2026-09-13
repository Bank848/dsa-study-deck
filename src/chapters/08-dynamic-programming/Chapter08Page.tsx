// src/chapters/08-dynamic-programming/Chapter08Page.tsx
import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import ComplexityTable from '../../components/content/ComplexityTable';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import LessonExplainer from '../../components/content/LessonExplainer';
import GridDiagram, { GRID_STATE_LEGEND } from './GridDiagram';
import { LCS_STEPS, LCS_CODE } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { ComplexityRow, QuizQuestion } from '../../types';
import type { LessonSection } from '../../components/content/LessonExplainer';

const CHAPTER = getChapterBySlug('dynamic-programming')!;
const { prev, next } = getAdjacentChapters('dynamic-programming');

const CONCEPT_POINTS = [
  'Dynamic programming ใช้ได้เมื่อโจทย์มี optimal substructure และ overlapping subproblems — แก้ subproblem แต่ละตัวแค่ครั้งเดียวแล้วเก็บผลไว้ใช้ซ้ำ แทนที่จะคำนวณซ้ำแบบ recursion ธรรมดา',
  'Longest Common Subsequence (LCS) สร้างตาราง c ขนาด (m+1)×(n+1): c[i,j]=0 ถ้า i=0 หรือ j=0, เป็น c[i-1,j-1]+1 ถ้าตัวอักษรตรงกัน, ไม่งั้นเป็น max(c[i,j-1], c[i-1,j])',
  'เติมตารางจากซ้ายไปขวา บนลงล่าง — แต่ละช่องต้องรู้ค่าช่องด้านบน ซ้าย และทแยงบน-ซ้ายก่อนเท่านั้น',
];

const COMPLEXITY_ROWS: ComplexityRow[] = [
  { op: 'LCS (fill table)', best: 'O(mn)', avg: 'O(mn)', worst: 'O(mn)', worstGood: true, growthPct: 70 },
  { op: 'LCS (traceback)', best: 'O(m+n)', avg: 'O(m+n)', worst: 'O(m+n)', worstGood: true, growthPct: 30 },
];

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'Dynamic programming แก้ปัญหาซ้ำๆ ให้ฉลาดขึ้นได้ยังไง',
    body:
      'โจทย์บางแบบมีคุณสมบัติสองอย่างที่ทำให้ dynamic programming ใช้ได้ผลดีเป็นพิเศษ อย่างแรกคือ optimal substructure หมายความว่าคำตอบที่ดีที่สุดของโจทย์ใหญ่ ประกอบขึ้นจากคำตอบที่ดีที่สุดของโจทย์ย่อยข้างในมันเอง (สไลด์เรียกอันนี้ว่า Optimal-Substructure of an LCS Theorem) อย่างที่สองคือ overlapping subproblems คือโจทย์ย่อยพวกนั้นถูกเรียกซ้ำไปซ้ำมาหลายรอบระหว่างการคำนวณ ถ้าใช้ recursion ธรรมดาไล่คำนวณทุกครั้งที่เจอ โจทย์ย่อยเดิมจะถูกคำนวณซ้ำนับครั้งไม่ถ้วนโดยเปล่าประโยชน์ dynamic programming แก้ปัญหานี้ด้วยการคำนวณโจทย์ย่อยแต่ละตัวแค่ครั้งเดียว แล้วเก็บผลลัพธ์ไว้ในตาราง พอต้องใช้ค่านั้นอีกก็แค่หยิบจากตารางมาใช้ ไม่ต้องคำนวณใหม่',
  },
  {
    title: 'LCS คืออะไร และสูตร c[i,j] จับภาพปัญหานี้ไว้ยังไง',
    body:
      'Longest Common Subsequence คือการหาลำดับตัวอักษรที่ยาวที่สุดที่ปรากฏอยู่ในสายทั้งสองสาย (X และ Y) โดยต้องเรียงตามลำดับเดิม แต่ไม่จำเป็นต้องติดกันเป็นก้อนเดียว เช่นถ้า X=A,B,C,B,D,A,B และ Y=B,D,C,A,B,A ลำดับ B,C,A ก็นับเป็น common subsequence ได้ทั้งที่ในแต่ละสายตัวอักษรเหล่านี้ไม่ได้อยู่ติดกัน สูตร c[i,j] ในสไลด์จับแนวคิดนี้ไว้เป็นสามกรณี ถ้า i=0 หรือ j=0 (แปลว่าสายใดสายหนึ่งยาว 0 ตัวอักษรแล้ว) ก็ไม่มีอะไรให้จับคู่ได้เลย c[i,j]=0 ถ้าตัวอักษรตำแหน่งนั้นตรงกัน (x_i = y_j) ก็เอาความยาว LCS ของสายที่สั้นลงทั้งคู่ (c[i-1,j-1]) มาบวกหนึ่ง เพราะเจอตัวที่จับคู่ได้เพิ่มมาหนึ่งตัว ถ้าไม่ตรงกันก็เลือกทางที่ดีที่สุดระหว่างตัดตัวสุดท้ายของ X ออกหรือตัดตัวสุดท้ายของ Y ออก คือ max(c[i,j-1], c[i-1,j]) ตัวอย่างจริงจากการสาธิตในบทนี้ตอน X1=A เทียบกับ Y4=A ทั้งสองตัวตรงกันพอดี ทำให้ c[1,4] = c[0,3] + 1 = 0 + 1 = 1 ซึ่งตรงกับกรณีที่สองของสูตรเป๊ะๆ',
  },
  {
    title: 'ทำไมต้องเติมตารางจากซ้ายไปขวา บนลงล่าง',
    body:
      'จากสูตร c[i,j] จะเห็นว่าแต่ละช่องต้องพึ่งค่าจากช่องด้านบน (c[i-1,j]) ช่องด้านซ้าย (c[i,j-1]) หรือช่องทแยงมุมบน-ซ้าย (c[i-1,j-1]) เท่านั้น ไม่มีช่องไหนต้องพึ่งค่าที่ยังไม่ถูกคำนวณเลย การเติมตารางจากแถวบนสุดลงมาแถวล่างสุด และในแต่ละแถวก็ไล่จากคอลัมน์ซ้ายไปขวา จึงรับประกันได้ว่าตอนจะคำนวณช่องไหน ช่องที่มันต้องใช้อ้างอิง (บน ซ้าย ทแยงบน-ซ้าย) ถูกเติมค่าเสร็จไปแล้วเสมอ แถวบนสุดกับคอลัมน์ซ้ายสุดเป็นฐานตั้งต้นที่เติมเป็น 0 ทั้งหมดไว้ก่อน (เพราะ i=0 หรือ j=0) จากนั้นทุกช่องที่เหลือก็ไล่คำนวณต่อไปตามลำดับนี้ไปเรื่อยๆ จนเต็มตาราง',
  },
  {
    title: 'ทำไมวิธีนี้เร็วกว่า recursion ธรรมดามาก',
    body:
      'ถ้าเขียน LCS แบบ recursion ตรงไปตรงมาโดยไม่เก็บผลลัพธ์ไว้เลย แต่ละครั้งที่เจอกรณี x_i ≠ y_j โปรแกรมจะแตกออกเป็นสองสาขาย่อย (c[i,j-1] และ c[i-1,j]) และแต่ละสาขาก็แตกต่อไปอีกเรื่อยๆ ทำให้โจทย์ย่อยเดิมถูกคำนวณซ้ำซ้อนกันมหาศาลจนเวลาทำงานพุ่งแบบเอ็กซ์โพเนนเชียล แต่พอใช้ตาราง c ขนาด (m+1)×(n+1) เก็บผลของทุกคู่ (i,j) ไว้ แต่ละช่องถูกคำนวณแค่ครั้งเดียวจริงๆ ทำให้เวลาทำงานทั้งหมดเป็นสัดส่วนกับจำนวนช่องในตาราง คือ O(mn) พอดีกับที่ตาราง Complexity ด้านล่างระบุไว้ ส่วนขั้นตอน traceback ที่ไล่ย้อนจากมุมขวาล่างกลับไปหาคำตอบจริงก็ใช้เวลาแค่ O(m+n) เพราะเดินตามเส้นทางเดียวจากมุมหนึ่งไปอีกมุมหนึ่งเท่านั้น',
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'lcs-match-case',
    prompt: 'ตามสูตร LCS ในสไลด์ ถ้า i,j > 0 และ x_i = y_j แล้ว c[i,j] เท่ากับอะไร',
    options: [
      { id: 'a', label: 'max(c[i,j-1], c[i-1,j])', correct: false },
      { id: 'b', label: 'c[i-1,j-1] + 1', correct: true },
      { id: 'c', label: 'c[i-1,j] + 1', correct: false },
      { id: 'd', label: '0', correct: false },
    ],
    explain: 'สไลด์ "A recursive solution to sub-problems" ระบุ c[i-1,j-1]+1 เมื่อ i,j>0 และ x_i=y_j',
  },
  {
    id: 'lcs-runtime',
    prompt: 'อัลกอริทึม LCS ในสไลด์ใช้เวลาทำงานเท่าไหร่',
    options: [
      { id: 'a', label: 'O(m+n)', correct: false },
      { id: 'b', label: 'O(mn)', correct: true },
      { id: 'c', label: 'O(2^n)', correct: false },
      { id: 'd', label: 'O(n log n)', correct: false },
    ],
    explain: 'สไลด์ "Compute the LCS" ระบุตรงๆ ว่า "The algorithm runs in O(mn) time"',
  },
  {
    id: 'dp-technique',
    prompt: 'สไลด์ "The General Dynamic Programming Technique" ระบุ 3 คุณสมบัติที่โจทย์ต้องมีคืออะไร',
    options: [
      { id: 'a', label: 'Greedy choice, matroid structure, convexity', correct: false },
      { id: 'b', label: 'Simple subproblems, subproblem optimality, subproblem overlap', correct: true },
      { id: 'c', label: 'Divide, conquer, combine', correct: false },
      { id: 'd', label: 'Memoization, recursion, base case', correct: false },
    ],
    explain: 'ตรงตามหัวข้อสไลด์ "The General Dynamic Programming Technique"',
  },
];

export default function Chapter08Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="LCS table fill"
        scopeLabel="Dynamic Programming"
        steps={LCS_STEPS}
        code={LCS_CODE}
        legend={GRID_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'grid' ? <GridDiagram scene={step.scene} /> : null)}
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
