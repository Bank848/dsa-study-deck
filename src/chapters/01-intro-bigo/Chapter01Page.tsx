import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import LessonExplainer, { type LessonSection } from '../../components/content/LessonExplainer';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import CounterDiagram, { COUNTER_STATE_LEGEND } from './CounterDiagram';
import GrowthChart from './GrowthChart';
import { ARRAYMAX_STEPS, ARRAYMAX_CODE } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { QuizQuestion } from '../../types';

const CHAPTER = getChapterBySlug('intro-bigo')!;
const { prev, next } = getAdjacentChapters('intro-bigo');

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'ทำไมต้องวัดความเร็วอัลกอริทึมด้วย Big-O',
    body: 'เวลารันจริงของโปรแกรมขึ้นกับหลายอย่างที่ควบคุมไม่ได้ — ฮาร์ดแวร์เครื่องไหน ภาษาไหน คอมไพเลอร์ตัวไหน แม้แต่โปรแกรมเดียวกันก็รันเร็วช้าต่างกันไปตามเครื่อง สไลด์จึงเสนอวิธีวิเคราะห์แบบ asymptotic แทน คือดูว่าเวลาทำงาน "โตขึ้นเร็วแค่ไหน" เมื่อขนาดข้อมูล n ใหญ่ขึ้นเรื่อยๆ โดยไม่สนใจตัวคูณคงที่หรือรายละเอียดเครื่อง — และมักโฟกัสที่ worst case เพราะวิเคราะห์ตรงไปตรงมากว่า และสำคัญกับงานที่ต้องการความแน่นอนของเวลาที่ใช้ เช่นเกม ระบบการเงิน หุ่นยนต์',
  },
  {
    title: 'นิยาม Big-O อ่านยังไงให้เข้าใจง่าย',
    body: 'นิยามในสไลด์บอกว่า f(n) เป็น O(g(n)) ถ้ามีค่าคงที่บวก c และจุดเริ่ม n0 ที่ทำให้ f(n) ≤ c·g(n) เมื่อ n มากกว่าหรือเท่ากับ n0 — พูดง่ายๆ คือ "ตั้งแต่ n มากพอ f(n) จะไม่มีวันโตเร็วเกินกว่า g(n) คูณตัวเลขคงที่ตัวหนึ่ง" ดังนั้น O(g(n)) จึงเป็นแค่ขอบเขตบน (upper bound) ไม่ใช่ค่าที่แน่นอน — และในทางปฏิบัติมีกฎย่อสูตรสองข้อ: ตัดพจน์ที่ดีกรีต่ำกว่าทิ้งไปเลย (เพราะพจน์ดีกรีสูงสุดครอบงำเมื่อ n ใหญ่พอ) และตัดค่าคงที่ที่คูณอยู่ทิ้งไปด้วย — พหุนามดีกรี d เท่าไหร่ ก็จะเหลือแค่ O(n^d)',
  },
  {
    title: 'ตัวอย่าง arrayMax: นับ operation จริงยังไง',
    body: 'สไลด์สาธิตด้วยฟังก์ชัน arrayMax ที่หาค่ามากสุดในอาเรย์ โดยนับทุก primitive operation ที่เกิดขึ้นจริง (การเปรียบเทียบ, การกำหนดค่า, การเพิ่มค่า, การ initialize ตัวแปร, การ return) แล้วรวมเป็นสูตร — ในกรณีแย่ที่สุด (อาเรย์เรียงจากน้อยไปมาก ทำให้ต้องอัปเดตค่าสูงสุดทุกรอบ) ผลรวมคือ 7n − 1 ครั้งพอดี เดโมด้านบนใช้อาเรย์ตัวอย่าง [3,7,2,9,5] ซึ่งไม่ได้เรียงต่อเนื่อง ผลรวม operation จึงน้อยกว่า 7n − 1 (คำนวณได้ 23 ครั้งจาก n=5) แต่หลักการนับเดียวกันทุกประการ — ตัวเลขนี้คือที่มาของการสรุปว่า arrayMax เป็น O(n)',
  },
];

const CONCEPT_POINTS = [
  'Big-O ให้ขอบเขตบนของอัตราการเติบโต: f(n) เป็น O(g(n)) ถ้ามีค่าคงที่ c และ n0 ที่ทำให้ f(n) ≤ c·g(n) เมื่อ n ≥ n0',
  'วิเคราะห์แบบ asymptotic เพื่อประเมินความเร็วอัลกอริทึมโดยไม่ขึ้นกับฮาร์ดแวร์/ซอฟต์แวร์ — โฟกัสที่ worst case เพราะวิเคราะห์ง่ายกว่าและสำคัญกับงานที่ต้องการความแน่นอน เช่นเกม การเงิน หุ่นยนต์',
  'กฎย่อสูตร Big-O: ตัดพจน์ดีกรีต่ำกว่าทิ้ง และตัดค่าคงที่คูณทิ้ง — พหุนามดีกรี d จะได้ f(n) เป็น O(n^d)',
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'bigo-def',
    prompt: 'ตามนิยามในสไลด์ f(n) เป็น O(g(n)) เมื่อมีค่าคงที่บวก c และ n0 ที่ทำให้เงื่อนไขใดเป็นจริง',
    options: [
      { id: 'a', label: 'f(n) = c·g(n) ทุก n', correct: false },
      { id: 'b', label: 'f(n) ≤ c·g(n) เมื่อ n ≥ n0', correct: true },
      { id: 'c', label: 'f(n) ≥ c·g(n) เมื่อ n ≥ n0', correct: false },
      { id: 'd', label: 'g(n) ≤ c·f(n) ทุก n', correct: false },
    ],
    explain: 'นิยามตรงจากสไลด์ Asymptotic Notation (Big-Oh Notation)',
  },
  {
    id: 'arraymax-total',
    prompt: 'จากตัวอย่าง arrayMax ในสไลด์ จำนวนปฏิบัติการเบื้องต้นรวมในกรณีแย่ที่สุด (worst case) คือสูตรใด',
    options: [
      { id: 'a', label: 'n', correct: false },
      { id: 'b', label: '2n', correct: false },
      { id: 'c', label: '7n − 1', correct: true },
      { id: 'd', label: 'n²', correct: false },
    ],
    explain: 'ตารางในสไลด์ Counting Primitive Operations สรุป Total = 7n − 1',
  },
  {
    id: 'sort-properties',
    prompt: 'สไลด์ Important Problem Types ระบุว่าคุณสมบัติสองอย่างของอัลกอริทึม sorting ที่ "deserve special mention" คืออะไร',
    options: [
      { id: 'a', label: 'Recursive และ iterative', correct: false },
      { id: 'b', label: 'Stable และ in place', correct: true },
      { id: 'c', label: 'Exact และ approximate', correct: false },
      { id: 'd', label: 'Comparison-based และ non-comparison-based', correct: false },
    ],
    explain: 'ระบุตรงในสไลด์ Important Problem Types',
  },
];

export default function Chapter01Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="arrayMax"
        scopeLabel="Big-O"
        steps={ARRAYMAX_STEPS}
        code={ARRAYMAX_CODE}
        legend={COUNTER_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'counter' ? <CounterDiagram scene={step.scene} /> : null)}
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
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Growth rates</h2>
          <GrowthChart />
          <p className="text-[12px] mt-2" style={{ color: 'var(--color-faint-foreground)' }}>
            แผนภาพประกอบ (ไม่ใช่มาตราส่วนจริง) — จากสไลด์ Growth Rates ที่แสดง 3 เส้นโค้ง: Linear, Quadratic, Cubic
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mono text-[10.5px] tracking-[.14em] uppercase mb-4" style={{ color: 'var(--color-faint-foreground)' }}>Complexity of named algorithms</h2>
          <ul className="text-[13.5px] grid gap-1.5" style={{ color: 'var(--color-muted-foreground)' }}>
            <li>arrayMax — O(n), สูตรแม่นตรง 7n − 1 ในกรณีแย่ที่สุด</li>
            <li>SequentialSearch — O(n) กรณีแย่ที่สุด, O(1) กรณีดีที่สุด</li>
            <li>UniqueElements — Θ(n²)</li>
            <li>MatrixMultiplication — Θ(n³)</li>
            <li>BinRec (การหารครึ่งซ้ำ) — Θ(log n)</li>
          </ul>
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
