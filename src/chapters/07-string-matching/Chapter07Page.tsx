// src/chapters/07-string-matching/Chapter07Page.tsx
import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import LessonExplainer from '../../components/content/LessonExplainer';
import ComplexityNote from '../../components/content/ComplexityNote';
import MatchDiagram, { MATCH_STATE_LEGEND } from './MatchDiagram';
import { MATCH_STEPS, MATCH_CODE } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { QuizQuestion } from '../../types';
import type { LessonSection } from '../../components/content/LessonExplainer';

const CHAPTER = getChapterBySlug('string-matching')!;
const { prev, next } = getAdjacentChapters('string-matching');

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'โจทย์ string matching คืออะไร',
    body: 'ตามสไลด์ Introduction ของ PDF ต้นฉบับ text T เป็น array ความยาว n และ pattern P เป็น array ความยาว m ทั้งคู่มาจากชุดตัวอักษรเดียวกัน Σ เป้าหมายของ string matching คือหาทุกตำแหน่งที่ pattern ปรากฏอยู่ในข้อความ พูดให้แม่นยำขึ้นคือหาทุกค่า shift s ที่ 0 ≤ s ≤ n-m ซึ่งทำให้ T[s+1..s+m] เท่ากับ P[1..m] ครบทุกตัวอักษร ค่า s แบบนี้สไลด์เรียกว่า valid shift ส่วน s ที่มีตัวอักษรไม่ตรงกันแม้แต่ตัวเดียวเรียกว่า invalid shift งานของทุกอัลกอริทึมในบทนี้คือการไล่หา valid shift ให้ครบ ต่างกันแค่วิธีไล่หาที่เร็วช้าไม่เท่ากันเท่านั้น',
  },
  {
    title: 'naive matcher เดินตามตัวอย่าง T=acaabc, P=aab',
    body: 'วิธีที่ตรงไปตรงมาที่สุดคือ naive matcher ลองทุกค่า shift s ตั้งแต่ 0 ถึง n-m ทีละค่าโดยไม่เตรียมข้อมูลล่วงหน้าเลย ในแต่ละ s จะเทียบ pattern กับ text ทีละตัวอักษรจากซ้ายไปขวา พอเจอตัวที่ไม่ตรงกันก็หยุดเทียบทันทีแล้วขยับไป s ถัดไป ตัวอย่างในสไลด์ใช้ T=acaabc กับ P=aab ที่ s=0 เทียบ T[0]=a กับ P[0]=a ได้ผลตรงกัน แต่พอเทียบ T[1]=c กับ P[1]=a กลับไม่ตรง จึงเลื่อนไป s=1 ทันที ที่ s=1 เทียบ T[1]=c กับ P[0]=a ไม่ตรงตั้งแต่ตัวแรก เลื่อนไป s=2 ต่อ ที่ s=2 เทียบ T[2]=a, T[3]=a, T[4]=b กับ P[0..2] คือ a, a, b ตรงกันครบทั้งสามตัว จึงสรุปได้ว่าพบ pattern ที่ shift เท่ากับ 2',
  },
  {
    title: 'จุดอ่อนของ naive matcher',
    body: 'ข้อสังเกตสำคัญคือทุกครั้งที่เลื่อนไป s ใหม่ อัลกอริทึมเริ่มเทียบจาก P[0] ใหม่หมดโดยไม่สนใจว่ารอบก่อนหน้าเทียบไปถึงไหนหรือรู้อะไรเกี่ยวกับ text ไปแล้วบ้าง งานเทียบตัวอักษรที่ทำไปในรอบก่อนถูกทิ้งไปเปล่าๆ ทุกครั้ง ในกรณีตัวอย่าง acaabc กับ aab แต่ละ shift เจอ mismatch เร็วจึงไม่ช้ามาก แต่ถ้า text กับ pattern มีตัวอักษรซ้ำกันเยอะ เช่น text เป็นตัวอักษร a ยาวต่อกันกับ pattern ที่เกือบทั้งหมดเป็น a เช่นกัน แต่ละ shift อาจต้องเทียบไปเกือบสุดความยาวของ pattern ก่อนจะเจอ mismatch ทำให้จำนวนการเทียบรวมทั้งหมดพุ่งสูงมาก นี่คือเหตุผลที่สไลด์ทิ้งเรื่องเวลาทำงานของ naive matcher ไว้เป็นคำถามเปิด แทนที่จะฟันธงเป็นตัวเลขเดียว และเป็นแรงจูงใจให้ต้องคิดค้นอัลกอริทึมที่ฉลาดกว่านี้',
  },
  {
    title: 'แล้ว KMP, Horspool, Boyer-Moore ต่างกันตรงไหน',
    body: 'PDF ฉบับเดียวกันนี้ยังพูดถึงอัลกอริทึมที่เร็วกว่า naive อีกสามกลุ่ม คือ string matching ด้วย finite automaton, Knuth-Morris-Pratt (KMP) ที่ใช้ prefix function ช่วยไม่ต้องเริ่มเทียบใหม่จากศูนย์ทุกครั้ง และ Horspool ซึ่งเป็นเวอร์ชันย่อของ Boyer-Moore แต่ทั้งหมดนี้ไม่ได้ถูกสาธิตด้วยไดอะแกรมด้านบน เพราะมันเลื่อนและตัดสินใจข้ามช่วงต่างจาก naive ที่เลื่อนทีละหนึ่งช่องตรงไปตรงมา ต้องใช้ภาพเคลื่อนไหวคนละแบบถึงจะอธิบายได้ถูกต้อง เนื้อหาที่ลึกกว่านี้ของสามอัลกอริทึมนี้จึงเก็บไว้แค่ในหัวข้อ Concept และ Quiz ด้านล่างเท่านั้น',
  },
];

const CONCEPT_POINTS = [
  'String matching หา shift s ที่ทำให้ T[s+1..s+m] เท่ากับ pattern P[1..m] ทุกตัว — naive matcher ลองทุกค่า s ตั้งแต่ 0 ถึง n-m โดยไม่ต้อง preprocess อะไรก่อน',
  'PDF ฉบับนี้ครอบคลุมหลายอัลกอริทึม: naive, finite-automaton matcher, KMP (ใช้ prefix function π), Horspool, และ Boyer-Moore เต็มรูปแบบ — สาธิตด้านล่างจำกัดขอบเขตไว้แค่ **naive matching** เพราะเป็นแบบเดียวที่เป็นการเลื่อนเทียบทีละตัวจากซ้ายไปขวาอย่างตรงไปตรงมา',
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'naive-shift',
    prompt: 'จากตัวอย่าง naive matcher ในสไลด์ (P="aab", T="acaabc") pattern ตรงกันเต็มที่ shift เท่าไหร่',
    options: [
      { id: 'a', label: 's=0', correct: false },
      { id: 'b', label: 's=1', correct: false },
      { id: 'c', label: 's=2', correct: true },
      { id: 'd', label: 's=3', correct: false },
    ],
    explain: 'ไดอะแกรมในสไลด์แสดง 4 panel (s=0..3) — ที่ s=2 ตรงกันครบ 3 ตัวอักษร',
  },
  {
    id: 'kmp-prefix',
    prompt: 'ฟังก์ชัน prefix π[q] ของ KMP หมายถึงอะไรตามนิยามในสไลด์',
    options: [
      { id: 'a', label: 'ขนาดของ alphabet', correct: false },
      { id: 'b', label: 'ความยาวของ proper prefix ที่ยาวที่สุดของ P ที่เป็น suffix ของ P_q ด้วย', correct: true },
      { id: 'c', label: 'จำนวนครั้งที่ mismatch', correct: false },
      { id: 'd', label: 'ความยาวของ text', correct: false },
    ],
    explain: 'นิยามตรงจากสไลด์ที่อธิบาย prefix function ของ KMP',
  },
  {
    id: 'horspool-desc',
    prompt: 'อัลกอริทึมใดถูกอธิบายว่าเป็น "a simplified version of Boyer-Moore" ในสไลด์',
    options: [
      { id: 'a', label: 'Naive matcher', correct: false },
      { id: 'b', label: 'KMP', correct: false },
      { id: 'c', label: "Horspool's algorithm", correct: true },
      { id: 'd', label: 'Finite automaton matcher', correct: false },
    ],
    explain: 'สไลด์ระบุ Horspool ว่าเป็นเวอร์ชันย่อของ Boyer-Moore ที่เลื่อนตามอักขระสุดท้ายของ pattern เทียบกับ text เสมอ',
  },
];

export default function Chapter07Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="naive matching"
        scopeLabel="String Matching"
        steps={MATCH_STEPS}
        code={MATCH_CODE}
        legend={MATCH_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'match' ? <MatchDiagram scene={step.scene} /> : null)}
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
          <ComplexityNote>
            PDF ต้นฉบับไม่ได้ระบุ Big-O ไว้ชัดเจนที่จุดไหนเลย — ทุกบรรทัด running time ในสไลด์ตั้งเป็นคำถามเปิด
            ("Running time?") ไม่มีคำตอบให้ จึงไม่แสดงเป็นตัวเลข
          </ComplexityNote>
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
