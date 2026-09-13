# DSA Study Deck

เว็บ self-study สำหรับวิชา Data Structures & Algorithms — dark mode, โทน dev-tool
เน้น step-through visualizer ของแต่ละอัลกอริทึมมากกว่าตัวหนังสือ

## บทที่มีอยู่ (8/8)

| บท | หัวข้อ | Visualizer |
|---|---|---|
| 01 | Intro & Big-O | นับ primitive operation ของ `arrayMax` ทีละสเต็ป |
| 02 | Stacks & Queues | push/pop, enqueue/dequeue |
| 03 | Trees & BST | เดิน BST หา/แทรกโหนด |
| 04 | Search Trees | AVL rotation |
| 05 | Heaps & Priority Queues | sift-down บน binary heap (array แทน tree) |
| 06 | Hash Tables | chaining + collision |
| 07 | String Matching | naive sliding-window matching |
| 08 | Dynamic Programming | ตาราง DP 2 มิติ (LCS) |

ทุกบทมี: เนื้อหาสอนละเอียด (LessonExplainer), การ์ด concept + flowchart, ตาราง
complexity, quiz 2 ข้อพร้อมเฉลย, และ step-through visualizer พร้อม pseudocode
highlight

## Stack

React + TypeScript + Vite + Tailwind CSS, `HashRouter` (ไม่ใช้ `BrowserRouter`
เพราะ build ปลายทางเปิดจาก `dist/index.html` บนดิสก์ตรงๆ ไม่ผ่าน dev server),
Vitest + Testing Library

## รันโปรเจกต์

```bash
npm install
npm run dev       # dev server
npm test          # vitest
npm run build     # tsc -b + vite build -> dist/
```

`dist/index.html` เปิดได้จากดิสก์ตรงๆ (double-click) ไม่ต้องมี server — ใช้
`vite-plugin-singlefile` inline asset ทั้งหมดเข้าไฟล์เดียว

## โครงสร้าง

```
src/
  chapters/<NN>-<slug>/   # แต่ละบท: Page component + steps.ts + diagram component + test
  data/chapters.ts        # chapter manifest (data-driven sidebar/routing)
  types.ts                # Scene union + VisualizerStep envelope ที่ทุกบทใช้ร่วมกัน
  App.tsx                 # routes
public/pdf/               # ชีทเรียนต้นฉบับ (PDF)
```

Visualizer ทุกบทใช้ envelope เดียวกัน (`{chip, lines, narr, pill?, scene?}`)
เรนเดอร์ผ่าน `<Stage>` — diagram แต่ละบทเลือก renderer ตาม `scene.type`
(`tree` / `linear` / `bucket` / `match` / `grid` / `counter`)

## เอกสารเพิ่มเติม

- [spec.md](spec.md) — design decision ที่ approve แล้ว (layout, design token, state model)
- [ai use.md](ai%20use.md) — log ว่าสั่ง AI อะไรไปบ้างระหว่างพัฒนา
