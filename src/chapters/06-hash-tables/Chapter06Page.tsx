// src/chapters/06-hash-tables/Chapter06Page.tsx
import ChapterLayout from '../../components/layout/ChapterLayout';
import Stage from '../../components/visualizer/Stage';
import ConceptCard from '../../components/content/ConceptCard';
import Quiz from '../../components/content/Quiz';
import ChapterNav from '../../components/content/ChapterNav';
import LessonExplainer from '../../components/content/LessonExplainer';
import ComplexityNote from '../../components/content/ComplexityNote';
import BucketDiagram, { BUCKET_STATE_LEGEND } from './BucketDiagram';
import { HASH_STEPS, HASH_CODE } from './steps';
import { getChapterBySlug, getAdjacentChapters } from '../../data/chapters';
import type { QuizQuestion } from '../../types';
import type { LessonSection } from '../../components/content/LessonExplainer';

const CHAPTER = getChapterBySlug('hash-tables')!;
const { prev, next } = getAdjacentChapters('hash-tables');

const CONCEPT_POINTS = [
  'Hash table ดึงค่าด้วย index ที่คำนวณจาก key โดยตรง แทนที่จะต้องค้นหาทีละตัว — "retrieves the value using the index obtained from key without performing a search"',
  'Hash function h แม็พแต่ละ key ไปยัง index ในช่วง [0, N-1] เช่น h(x) = x mod N เมื่อ N คือขนาดของ bucket array',
  'เมื่อสอง key แฮชได้ index เดียวกัน (collision) วิธีจัดการมีสองแบบหลัก: separate chaining (ต่อ linked list ในช่องเดียวกัน) และ open addressing (probing หาช่องว่างถัดไป)',
];

const LESSON_SECTIONS: LessonSection[] = [
  {
    title: 'ทำไม hash table ถึงเร็ว',
    body: 'โครงสร้างข้อมูลอย่าง array หรือ linked list ถ้าจะหาว่า key หนึ่งอยู่ตรงไหน ปกติต้องไล่สแกนทีละช่องจนกว่าจะเจอ ยิ่งข้อมูลเยอะยิ่งช้า แต่ hash table เลือกวิธีอื่นไปเลย มันคำนวณตำแหน่ง (index) ของ key นั้นขึ้นมาตรงๆ ผ่านฟังก์ชันที่เรียกว่า hash function แล้วกระโดดไปที่ index นั้นทันทีโดยไม่ต้องค้นหาเลยสักครั้ง สไลด์เรียกเทคนิคนี้ว่า hashing และอธิบายไว้ตรงๆ ว่ามันคือการดึงค่าด้วย index ที่ได้จาก key โดยไม่ต้องทำการค้นหา (without performing a search) — นี่คือเหตุผลที่การ insert, search, remove ใน hash table ที่ออกแบบดีใช้เวลาเฉลี่ยแค่ O(1) เท่านั้น ไม่ว่าตารางจะมีข้อมูลอยู่กี่ตัวก็ตาม',
  },
  {
    title: 'hash function ทำงานยังไง — h(k) = k mod N',
    body: 'ตัวที่ทำหน้าที่แปลง key ให้กลายเป็น index คือ hash function ซึ่งสไลด์ตั้งเป้าไว้ว่าต้องแม็พทุก key ให้อยู่ในช่วง [0, N-1] โดย N คือขนาดของ bucket array (จำนวนช่องทั้งหมดในตาราง) สำหรับ key ที่เป็นจำนวนเต็ม วิธีที่ง่ายและสไลด์ใช้เป็นตัวอย่างหลักคือ h(x) = x mod N คือเอา key หารเอาเศษด้วย N นั่นเอง ในดีโมของบทนี้ตั้ง N = 7 แล้วลองใส่คีย์ 76, 93, 40, 47, 10, 55, 62 ตามลำดับ จะเห็นว่า 76 mod 7 ได้ 6 จึงไปอยู่ที่ bucket 6, 93 mod 7 ได้ 2 ไปอยู่ที่ bucket 2, 40 mod 7 ได้ 5 ไปอยู่ที่ bucket 5 — สังเกตว่าไม่ว่า key จะมีค่าเท่าไหร่ สูตรเดียวกันนี้คำนวณตำแหน่งได้ทันทีในขั้นตอนเดียว',
  },
  {
    title: 'collision คืออะไร แก้ยังไงด้วย separate chaining',
    body: 'ปัญหาที่หลีกเลี่ยงไม่ได้คือบางครั้ง key สองตัวที่ต่างกันดันคำนวณ hash ได้ index เดียวกัน สไลด์เรียกเหตุการณ์นี้ว่า collision เกิดขึ้นเมื่อสอง key ถูกแม็พไปที่ index เดียวกันในตาราง วิธีหนึ่งที่สไลด์อธิบายไว้คือ separate chaining คือแทนที่จะพยายามหาช่องว่างใหม่ ให้เก็บทุก entry ที่ hash ไป index เดียวกันไว้ในที่เดียวกันเป็น container ที่เรียกว่า bucket ซึ่งเก็บได้หลาย entry พร้อมกัน (ต่อกันเป็น linked list) ในดีโมของบทนี้ 40 mod 7 ได้ 5 จึงเข้า bucket 5 ก่อน พอ 47 mod 7 ก็ได้ 5 เหมือนกัน เกิด collision ที่ bucket 5 ระบบก็แค่ต่อ 47 เข้าไปในบักเก็ตเดียวกันกลายเป็น [40, 47] เช่นเดียวกับ bucket 6 ที่มี 76 อยู่ก่อน แล้ว 55 กับ 62 ก็แฮชมาชนซ้ำที่ 6 เหมือนกัน สุดท้าย bucket 6 จึงมีรายการต่อกันเป็น [76, 55, 62]',
  },
  {
    title: 'อีกแนวทางหนึ่งที่ยังไม่ได้สาธิต — open addressing',
    body: 'นอกจาก separate chaining แล้ว สไลด์ยังพูดถึงอีกแนวทางหนึ่งสำหรับจัดการ collision เรียกว่า open addressing ซึ่งแนวคิดต่างออกไปคือแทนที่จะเก็บของหลายตัวไว้ในบักเก็ตเดียวกัน มันจะย้าย item ที่ชนไปไว้ในช่องอื่นของตารางแทน โดยมีสามวิธีย่อยที่สไลด์ระบุไว้คือ linear probing, quadratic probing และ double hashing แต่ละแบบมีสูตรหาช่องถัดไปต่างกันไป ทว่าดีโมเชิงโต้ตอบของบทนี้เลือกสาธิตเฉพาะ separate chaining เท่านั้น เพราะเป็นตัวอย่างที่สไลด์คำนวณผลลัพธ์ไว้ครบทุกขั้นตอนจริง ส่วน open addressing ในสไลด์มีแค่ตารางเปล่าให้ฝึกคำนวณเอง จึงเป็นความรู้เสริมไว้ก่อนว่ามีแนวทางนี้อยู่ในโลกของ hash table เช่นกัน',
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'hash-calc',
    prompt: 'ใช้ h(x) = x mod N โดย N = 7 แล้ว h(93) เท่ากับเท่าไหร่',
    options: [
      { id: 'a', label: '2', correct: true },
      { id: 'b', label: '5', correct: false },
      { id: 'c', label: '3', correct: false },
      { id: 'd', label: '6', correct: false },
    ],
    explain: '93 mod 7 = 2 — ตรงกับสไลด์ Hash Functions',
  },
  {
    id: 'collision-types',
    prompt: 'ข้อใดไม่ใช่ sub-type ของ open addressing ตามสไลด์ Collision Handling',
    options: [
      { id: 'a', label: 'Linear probing', correct: false },
      { id: 'b', label: 'Quadratic probing', correct: false },
      { id: 'c', label: 'Separate chaining', correct: true },
      { id: 'd', label: 'Double hashing', correct: false },
    ],
    explain: 'สไลด์แบ่งเป็น 2 หมวดหลัก: open addressing (linear/quadratic/double hashing) กับ separate chaining ซึ่งเป็นอีกหมวดแยกต่างหาก',
  },
  {
    id: 'avg-time',
    prompt: 'ใน hash table ที่ออกแบบดี operation ต่างๆ ใช้เวลาเฉลี่ยเท่าไหร่ตามสไลด์',
    options: [
      { id: 'a', label: 'O(log n)', correct: false },
      { id: 'b', label: 'O(1)', correct: true },
      { id: 'c', label: 'O(n)', correct: false },
      { id: 'd', label: 'O(n log n)', correct: false },
    ],
    explain: 'ข้อความในสไลด์: "In a well-formed hash table, each of these operations take on average O(1) time."',
  },
];

export default function Chapter06Page() {
  return (
    <ChapterLayout chapter={CHAPTER}>
      <Stage
        operationLabel="insert (separate chaining)"
        scopeLabel="Hash Table"
        steps={HASH_STEPS}
        code={HASH_CODE}
        legend={BUCKET_STATE_LEGEND}
        renderDiagram={(step) => (step.scene?.type === 'bucket' ? <BucketDiagram scene={step.scene} /> : null)}
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
          <ComplexityNote>
            แหล่งข้อมูล (PDF) ระบุแค่ว่าในตาราง hash ที่ออกแบบดี การทำงานทุกอย่างใช้เวลา
            <strong>เฉลี่ย O(1)</strong> เท่านั้น — ไม่ได้ให้ค่า best/worst-case แยกไว้ จึงไม่แสดงเป็นตารางเปรียบเทียบ
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
