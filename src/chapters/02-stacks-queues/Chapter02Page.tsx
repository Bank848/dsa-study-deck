// src/chapters/02-stacks-queues/Chapter02Page.tsx
import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import LessonExplainer, { type LessonSection } from '../../components/content/LessonExplainer';
import ComplexityTable from '../../components/content/ComplexityTable';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import LinearDiagram, { LINEAR_STATE_LEGEND } from './LinearDiagram';
import { STACK_STEPS, STACK_CODE, QUEUE_STEPS, QUEUE_CODE } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { ComplexityRow, QuizQuestion } from '../../types';

const CHAPTER = getChapterBySlug('stacks-queues')!;
const { prev, next } = getAdjacentChapters('stacks-queues');

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'Stack คืออะไร — กฎ LIFO',
    body: 'Stack เป็น ADT ที่เข้าถึงข้อมูลได้ที่ปลายเดียวเท่านั้น เรียกจุดนั้นว่า top สไลด์เปรียบเทียบไว้ว่าเหมือนกองจานแบบสปริง (spring-loaded plate dispenser) ในร้านอาหาร จานที่วางซ้อนล่าสุดจะอยู่บนสุด และก็เป็นใบที่ถูกหยิบออกไปใช้ก่อนเสมอ พฤติกรรมนี้เรียกว่า LIFO (Last-In-First-Out) จากตัวอย่าง push(A), push(B), push(C) แล้วตามด้วย pop() — pop() จะคืนค่า C กลับมาก่อน เพราะ C คือตัวที่ถูกวางบนสุดล่าสุด ไม่ใช่ A ที่วางไว้ตั้งแต่แรก',
  },
  {
    title: 'กลไกเบื้องหลัง push และ pop',
    body: 'ถ้าดูตัวอย่างสไลด์ที่ implement stack ด้วย array จะมีตัวแปรตัวเดียวคอยชี้ตำแหน่ง top อยู่เสมอ (ในสไลด์เรียกว่า t) push(x) ทำสองอย่างคือใส่ค่า x ลงที่ตำแหน่งถัดจาก top ปัจจุบัน แล้วขยับ top ไปอีกหนึ่งช่อง — ส่วน pop() ทำตรงข้ามกัน คือขยับ top ถอยกลับมาหนึ่งช่องก่อน แล้วค่อยอ่านและคืนค่าที่ตำแหน่งเดิมออกไป จะเห็นว่าทั้งสอง operation แตะแค่ค่า top ตัวเดียวกับข้อมูลตรงปลายบนสุด ไม่ต้องไปยุ่งกับสมาชิกตัวอื่นในกองเลย และถ้าเรียก pop() หรือ top() ตอน stack ว่างเปล่า (size เป็น 0) ก็จะโยน error ที่ชื่อ EmptyStackException ออกมาทันที',
  },
  {
    title: 'Queue คืออะไร — กฎ FIFO และกลไกของ enqueue/dequeue',
    body: 'Queue ต่างจาก stack ตรงที่มีสองปลาย: เพิ่มข้อมูล (enqueue) ที่ปลาย rear เสมอ ส่วนเอาข้อมูลออก (dequeue) ต้องเอาจากปลาย front เสมอ พฤติกรรมนี้เรียกว่า FIFO (First-In-First-Out) เทียบได้กับคิวต่อแถวจริงที่มาก่อนก็ได้คิวก่อน จากตาราง Queue Example ในสไลด์: enqueue(5) แล้ว enqueue(3) ทำให้ queue มี (5, 3) พอเรียก dequeue() จะได้ 5 กลับมาเพราะ 5 เข้าคิวก่อน เหลือแค่ (3) ในเชิงกลไก การ implement ด้วย array จะมีตัวแปรสองตัวคือ front (ชี้ตำแหน่งตัวแรกสุด) กับ rear (ชี้ตำแหน่งถัดจากตัวสุดท้าย) enqueue(x) จะวางค่าที่ตำแหน่ง rear แล้วขยับ rear ไปข้างหน้าหนึ่งช่อง ส่วน dequeue() จะอ่านค่าที่ตำแหน่ง front แล้วขยับ front ไปข้างหน้าหนึ่งช่องตามกัน (วนกลับมาที่ต้น array ได้ด้วยการใช้ modulo เมื่อชนขอบ array) เหมือนกับ stack ตรงที่แตะแค่ตัวชี้สองตัวนี้ ไม่ต้องเลื่อนสมาชิกตัวอื่นเลย',
  },
  {
    title: 'ทำไมทุก operation ถึงเร็ว O(1)',
    body: 'ทั้ง push/pop ของ stack และ enqueue/dequeue ของ queue ทำงานแค่ที่ปลายคงที่ (top ของ stack, front/rear ของ queue) เท่านั้น ไม่ว่าข้อมูลในโครงสร้างจะมีกี่ตัวก็ไม่ต้องเลื่อนสมาชิกตัวอื่นแม้แต่ตัวเดียว ต่างจากการแทรกหรือลบข้อมูลตรงกลาง array ทั่วไปที่ต้องเลื่อนสมาชิกที่เหลือทั้งหมดให้ขยับที่ สไลด์ "Performance and Limitations" จึงสรุปตรงๆ ว่าแต่ละ operation ใช้เวลา O(1) โดยพื้นที่ที่ใช้เก็บข้อมูลทั้งหมดยังคงเป็น O(n) ตามจำนวนสมาชิกตามปกติ',
  },
];

const CONCEPT_POINTS = [
  'Stack ADT ทำงานแบบ Last-In-First-Out (LIFO) — เพิ่มและลบข้อมูลที่ปลายเดียวกันเสมอ (top) ด้วย push และ pop',
  'Queue ADT ทำงานแบบ First-In-First-Out (FIFO) — เพิ่มข้อมูลที่ปลาย rear แล้วลบออกจากปลาย front ด้วย enqueue และ dequeue',
  'ทั้งสองโครงสร้างใช้พื้นที่ O(n) และทุกการทำงาน (push/pop/enqueue/dequeue) ทำในเวลา O(1) เพราะไม่ต้องเลื่อนข้อมูลตัวอื่น',
];

const COMPLEXITY_ROWS: ComplexityRow[] = [
  { op: 'push / enqueue', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', worstGood: true, growthPct: 15 },
  { op: 'pop / dequeue', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', worstGood: true, growthPct: 15 },
  { op: 'top / front (peek)', best: 'O(1)', avg: 'O(1)', worst: 'O(1)', worstGood: true, growthPct: 15 },
  { op: 'space', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', worstGood: true, growthPct: 40 },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'stack-order',
    prompt: 'Stack ADT ทำงานตามกฎการเพิ่ม/ลบข้อมูลแบบใด',
    options: [
      { id: 'a', label: 'FIFO', correct: false },
      { id: 'b', label: 'LIFO', correct: true },
      { id: 'c', label: 'เข้าถึงแบบสุ่ม (random access)', correct: false },
      { id: 'd', label: 'จัดลำดับความสำคัญ (priority-based)', correct: false },
    ],
    explain: 'สไลด์ "The Stack ADT" ระบุตรงๆ ว่า "Insertions and deletions follow the last-in first-out scheme"',
  },
  {
    id: 'queue-example',
    prompt: 'จากตาราง Queue Example ในสไลด์: enqueue(5); enqueue(3); dequeue() — dequeue() คืนค่าอะไร และเหลืออะไรใน queue',
    options: [
      { id: 'a', label: 'คืนค่า 3, เหลือ (5)', correct: false },
      { id: 'b', label: 'คืนค่า 5, เหลือ (3)', correct: true },
      { id: 'c', label: 'คืนค่า 5, เหลือ (5,3)', correct: false },
      { id: 'd', label: 'คืนค่า 3, เหลือ ()', correct: false },
    ],
    explain: 'ตาราง Queue Example แถวที่ 1-3 ในสไลด์แสดงผลลัพธ์นี้ตรงๆ',
  },
  {
    id: 'stack-array-time',
    prompt: 'สไลด์ "Performance and Limitations" ระบุว่าแต่ละ operation ของ array-based Stack ใช้เวลาเท่าไหร่',
    options: [
      { id: 'a', label: 'O(log n)', correct: false },
      { id: 'b', label: 'O(1)', correct: true },
      { id: 'c', label: 'O(n)', correct: false },
      { id: 'd', label: 'ไม่ได้ระบุไว้', correct: false },
    ],
    explain: 'ข้อความในสไลด์: "Each operation runs in time O(1)."',
  },
];

export default function Chapter02Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="push / pop"
        scopeLabel="Stack"
        steps={STACK_STEPS}
        code={STACK_CODE}
        legend={LINEAR_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'linear' ? <LinearDiagram scene={step.scene} /> : null)}
      />
      <Stage
        operationLabel="enqueue / dequeue"
        scopeLabel="Queue"
        steps={QUEUE_STEPS}
        code={QUEUE_CODE}
        legend={LINEAR_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'linear' ? <LinearDiagram scene={step.scene} /> : null)}
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
