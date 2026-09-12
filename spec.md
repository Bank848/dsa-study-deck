# Spec — DSA Study Deck (com-sci-site)

สถานะ: design ผ่านการอนุมัติแล้ว (v3-opus + patch เพิ่มเติมตามด้านล่าง) — แก้รอบ 2 หลัง
fable-medium `scrutinize` pass (2026-09-12) หา gap ก่อนเข้า `/plan-pro` พบ 6 major finding (step
schema ผูกกับ BST, routing/build config ยังไม่ตัดสินใจ, ไม่มีนิยาม "บทจบ"/quiz state,
opus-theme-rationale.md ขัดกับ spec นี้เอง, token↔mockup drift สองทาง, amber leak 2 จุด) — ทุกจุด
แก้แล้วในรอบนี้ (ดู §5/§6/§7 และ `design-tokens/tokens.json`/`opus-theme-rationale.md` ที่แก้คู่กัน)
พร้อมเข้า `/plan-pro`

## 1. เป้าหมาย

เว็บ self-study สำหรับวิชา Data Structures & Algorithms จากชีทเรียนจริงใน
`D:\brain\com sci learn\*.pdf` (9 ไฟล์) — dark mode, โทน dev-tool จริงจัง (ไม่ใช่เว็บเรียน
พาสเทล), เน้น **รูป/flowchart/step-through visualizer มากกว่าตัวหนังสือ**

## 2. Deliverable

- React + Vite + Tailwind, build เป็น **static HTML/JS/CSS** (`dist/`) — **ไม่มี backend**
- อยู่ใน subfolder แยก: `D:\brain\com sci learn\com-sci-site\` (กัน pack ส่งแล้วไฟล์หลุด)
- ปลายทางสุดท้ายคือไฟล์ `.html` จริง **ไม่ใช่ Claude Artifact** — ต้องเปิดได้จาก `dist/index.html`
  บนดิสก์ตรงๆ (double-click) ไม่ใช่แค่ผ่าน dev server เท่านั้น ซึ่งบังคับ 3 เรื่องที่ mockup ไม่ได้
  ตัดสินใจไว้ (scrutinize finding #2):
  - **Routing:** `HashRouter` (ไม่ใช่ `BrowserRouter`) — history routing พังเงียบๆ ตอนเปิดจากดิสก์
  - **Vite base path:** `base: './'` ใน `vite.config.ts` (ไม่ใช้ absolute `/assets/...` default)
  - **PDF ต้นฉบับ:** copy 9 ไฟล์ PDF เข้า `public/pdf/` ตอน build (ไม่ลิงก์ออกไปที่โฟลเดอร์แม่
    `D:\brain\com sci learn\*.pdf` เดิม ซึ่งอยู่นอก `dist/` และหายไปตอน pack ส่งงาน)

## 3. ขอบเขต MVP (build รอบแรก)

3 บทแรกจาก 8 บทตามแผนเต็ม (mapping เต็มอยู่ใน
[design-tokens/icons.md](design-tokens/icons.md)):

| บท | มาจาก PDF | สถานะ |
|---|---|---|
| 01 · Intro & Big-O | `2301265_01_Introduction`, `2301265_02_Analysis` | **MVP** |
| 02 · Stacks & Queues | `2301265_Stacks_Queues_2026` | **MVP** |
| 03 · Trees & BST | `2301265_Trees_PDF` | **MVP** (มี mockup แล้ว — `insert(37)` demo) |
| 04 · Search Trees | `2301265_Search_Trees_V3` | รอบ 2 |
| 05 · Heaps & Priority Queues | `08_Heaps_PriorityQueues_DisjointSets` | รอบ 2 |
| 06 · Hash Tables | `07_Hash_Tables` | รอบ 2 |
| 07 · String Matching | `06_String_Matching` | รอบ 2 |
| 08 · Dynamic Programming | `06_Dynamic_Programming` | รอบ 2 |

โครง routing/sidebar ต้องรองรับเพิ่มบทได้โดยไม่ต้องรื้อ (data-driven จาก chapter manifest
ไม่ hardcode component ต่อบท)

## 4. Design system

Source of truth: `design-tokens/tokens.json` → compile เป็น `design-tokens/tokens.css`
(3 ชั้น primitive/semantic/component ตาม DTCG schema, สคริปต์ compile อยู่ที่
`~/.claude/skills/design-system/scripts/generate-tokens.cjs`)

**Palette (v3-opus, อนุมัติแล้ว, แทนที่ teal/amber ของ v2):** หลักการ "1 สี = 1 ความหมาย"
- `accent` น้ำเงิน `#6E9BFF` — โครงสร้าง/interactive/เส้นทางที่เดินผ่านแล้ว
- `highlight` ส้ม `#FFBE5C` — **สงวนไว้ให้ "กำลังอยู่ตรงนี้" เท่านั้น** ห้ามใช้ความหมายอื่น
- `success` เขียว `#46E3A0` — ถูก/complexity ดี/บทจบ
- `warning` ชมพูแดง `#FF7D8F` — worst case/ผิด (ไม่ใช้เหลือง กันชนกับ highlight)
- พื้น `#0A0C10`, ทุกคู่สีผ่าน WCAG AA — รายละเอียดเหตุผลเต็ม →
  [design-tokens/opus-theme-rationale.md](design-tokens/opus-theme-rationale.md) §1-2

**Typography:** JetBrains Mono (โค้ด/label) + IBM Plex Sans / IBM Plex Sans Thai (เนื้อหา)

**Icons:** Lucide เท่านั้น (`lucide-react`) — ไม่ใช้ AI-generated icon, mapping เต็มที่
[design-tokens/icons.md](design-tokens/icons.md)

**Token คือ canonical name เสมอ (แก้จาก scrutinize finding #5):** `tokens.css` (generated จาก
`tokens.json`) เป็นชื่อตัวแปรที่ component ต้องใช้จริง — ชื่อ CSS var ใน `mockup-v3-opus.html`
เอง (`--focus`, `--surface-2`, `--code-bg`, `--accent-fg`) เป็นแค่ของ mockup ตอนต้นแบบ ไม่ใช่
ชื่อที่พอร์ตเข้า React ตรงๆ ต้อง map เป็นชื่อ `tokens.css` เสมอ (`--color-highlight`,
`--color-surface-raised`, `--color-code-surface`, `--color-accent-foreground` ตามลำดับ) —
mapping เต็มอยู่ที่ plan-pro implementation plan's component code. รอบแก้นี้เพิ่ม token ที่ mockup
ใช้จริงแต่ยังไม่มีมาก่อน (`tree-edge.*`, `step-chip.done-bg/done-border/current-bg`,
`tree-node.*-text`/`here-ring`, `quiz-option.key-correct-*/key-wrong-*`,
`narration-bar.done-icon`, `step-control.autoplay-interval`) และตัด token ที่ v3 เลิกใช้ทิ้ง
(`step-control.track-*` — แทนที่ด้วย step chip ไปแล้ว) — สอง shadow token
(`primitive.shadow.node-halo` = amber halo รอบ node "here"/"fresh", `semantic.shadow.focus-ring`
= accent-blue สำหรับ `:focus-visible` จริง) แยกกันเด็ดขาด **ห้ามใช้ตัวเดียวกัน** เพราะ amber
สงวนไว้ให้ "current step" เท่านั้น ไม่ใช่ keyboard focus indicator

## 5. Layout & component spec

อ้างอิง mockup ที่ทำเสร็จและแก้จนเป็น final แล้ว:
[mockup-v3-opus.html](../mockup-v3-opus.html)

โครงหน้า (บนลงล่าง):
1. **Icon rail ซ้าย** (72px, sticky เต็มความสูงจอ) — ไอคอน Lucide ต่อบท + เลข + active state
   (ไม่มี progress ring/checkmark สะสม — ตัด progress persistence ทิ้งทั้งหมด ดูรายละเอียดด้านล่าง)
2. **Topbar** (56px, sticky) — เลขบท + ชื่อบท + breadcrumb + ปุ่ม "PDF ต้นฉบับ"
3. **Stage (visualizer)** — **ไม่ sticky** (เลื่อนไปพร้อมหน้าปกติ ตามที่ user ยืนยันแก้จาก draft
   แรกที่เคย sticky), เป็นแถบเดียวรวม:
   - Stage header: ชื่อ operation (เช่น `insert(37)`) + step chip แบบมีป้ายชื่อขั้น (กดกระโดดได้)
     + ปุ่มควบคุม prev/play-pause/next/reset (คีย์ลัด `←` `→` `space` `R`)
     — **ไม่มีปุ่มย่อแถบ/collapse** (เอาออกแล้วตามที่ user สั่ง ให้ stage แสดงเต็มตลอด)
   - Stage body: diagram (ซ้าย, กว้าง `1fr`) + pseudocode (ขวา, กว้างคงที่ `412px`) วางข้างกัน
     **ระดับสายตาเดียวกัน** ทั้งสอง panel สูงเท่ากันเสมอ (pseudocode ยืด `flex-1` ตามความสูง
     diagram ไม่ใช่สูงแค่พอดีบรรทัดโค้ดแล้วเหลือพื้นที่ว่างลอยด้านล่าง — แก้ไปแล้วในรอบ mockup นี้)
   - Legend แถวเล็กใต้ diagram อธิบาย 4 สถานะสี (เดินผ่านแล้ว/กำลังอยู่ตรงนี้/สำเร็จ/ยังไม่แตะ)
   - Narration bar เต็มความกว้าง พาดใต้ diagram+pseudocode พร้อมกัน (ไม่แทรกกลาง)
4. **Document column** — คอลัมน์เดียว, `max-w-[860px]` **จัดกึ่งกลาง (`mx-auto`)** (แก้จาก
   `780px` ชิดซ้ายเดิม ที่ทำให้จอกว้างเหลือพื้นที่ว่างฝั่งขวาเยอะเกิน) มี section: เกริ่นนำ →
   Concept (การ์ด + flowchart ตัดสินใจ) → Complexity table (มีแถว Space + growth bar) →
   Quiz (2 ข้อ ตอบได้จริง มีเฉลย+เหตุผล) → prev/next chapter nav

**State model ของ visualizer (แก้จาก scrutinize finding #1 — เดิมเขียนว่า "component เดียว
เรนเดอร์ทุกบท" แต่ schema เดิมผูกกับ BST ตรงๆ ผ่าน `nodes`/`edges`/`cmp` ซึ่งบทที่ 01/02 ไม่มี
ต้นไม้เลย):**

- **Envelope ทั่วไป (ทุก demo ทุกบทใช้ร่วมกัน):** `{chip, lines, narr, pill?}` — `chip` ขับ step
  chip ที่ active, `lines` ขับบรรทัด pseudocode ที่ highlight, `narr` คือ narration text,
  `pill?` คือ comparison/status pill แบบ optional (บทที่ไม่มีการเทียบค่า เช่น Big-O ไม่ต้องส่ง)
- **Scene payload เฉพาะประเภท diagram** แยกออกจาก envelope ผ่าน key `scene: { type, ...data }`
  — `type` บอกว่าใช้ diagram renderer ตัวไหน (ลงทะเบียนต่อ diagram-type ใน chapter manifest ไม่ใช่
  hardcode เดียวทั้งเว็บ):
  - `type: "tree"` → `{ nodes, edges }` (โครงเดิมของ BST, ย้ายจาก mockup ตรงๆ)
  - บทที่ 01 (Big-O)/02 (Stack, Queue) ยังไม่มี `scene.type` ที่นิยามไว้ — **เป็น known gap
    เปิดอยู่จริง** ไม่ใช่สมมติว่า `tree` type ครอบคลุมได้ (ดู §7) ต้องออกแบบ `scene.type`
    ใหม่ต่อบทตอนเขียน content ของบทนั้นจริง (เช่น `array`/`stack` scene สำหรับ 02) — MVP รอบนี้
    (§3) implement แค่ diagram type `tree` เพราะมีแค่บท 03 ที่มี content
- **Diagram canvas ไม่ fix ขนาดตายตัว:** `viewBox`/legend/depth-guide ของ diagram มาจาก scene
  data ของ demo นั้นๆ ไม่ hardcode ใน component (mockup เดิม hardcode `viewBox="0 0 780 260"` และ
  legend text "แทรกสำเร็จ" ไว้ในตัว renderer เอง ซึ่งใช้ได้กับ BST insert เท่านั้น)
- **1 บทมีได้หลาย demo (0..n):** ถ้ามีมากกว่า 1 ให้ stage header มี demo switcher (เช่น tab แถว
  บนสุดของ stage) — บทที่ไม่มี demo เลย (เช่นเนื้อหาทฤษฎีล้วน) ให้ stage เป็น `null`/ซ่อนได้
- **Height ของ panel:** diagram height มาจาก scene's aspect ratio ของ demo นั้น, ความสูง panel
  คู่ (diagram/pseudocode) = `max(diagram-height, pseudocode-height)` ไม่ใช่ fix 246px ตายตัว
  (246px เป็นแค่ค่า floor สำหรับ demo ที่มีเนื้อหาน้อย ดู
  `visualizer-panel.diagram-min-height`)
- index เดียวขับทุกอย่างในหนึ่ง demo (chip ที่ active, บรรทัด pseudocode ที่ highlight, สีของ
  scene ใน SVG, ข้อความ narration) — หลักการนี้ยังใช้ได้เหมือนเดิม ย้ายเป็น React state
  (`useState<number>` + derive ที่เหลือ) ได้ตรงๆ ต่อ 1 demo, สลับ demo แล้ว index รีเซ็ต

**Narration formatting (แก้จาก scrutinize finding #8):** mockup ใส่ `<b>`/`<code>` ดิบใน `narr`
แล้ว render ผ่าน `innerHTML` — พอร์ตเข้า React ตรงๆ จะกลายเป็น `dangerouslySetInnerHTML` ทุก
narration ซึ่งเป็นความเสี่ยง XSS ที่ไม่จำเป็น (ถึงแม้ content เป็นของทีมเองไม่ใช่ user input ก็ตาม)
— ใช้ markup แบบง่ายแทน: `**ตัวหนา**` และ `` `โค้ด` `` parse ผ่าน helper function เดียว (regex
replace เป็น `<strong>`/`<code>` element จริงใน JSX ไม่ใช่ string HTML ดิบ) ไม่รองรับ markup อื่น

**Keyboard shortcuts scope (แก้จาก scrutinize finding #7):** `← → space R` ต้อง**ผูกกับ stage
element เท่านั้น** (เช่นเช็คว่า focus อยู่ใน/last-interacted กับ stage) ไม่ใช่ผูกกับ `window`
ทั้งหน้าแบบ mockup เดิม — เหตุผล: `space` จะไป`preventDefault`ทับปุ่ม quiz option ตอน user tab
ไปโฟกัสปุ่มแล้วกด space (ตั้งใจตอบ กลับกลายเป็นสั่ง autoplay แทน), `R` จะชนกับ input ในอนาคต

**Progress/completion (แก้จาก scrutinize finding #3 — mockup มี progress ring `2/8` และ
chapter-done state แต่ spec ไม่มี backend และไม่เคยนิยามว่า "จบบท" คืออะไร):** MVP นี้**ตัด
persisted completion ทิ้งทั้งหมด** — icon rail แสดงแค่ "กำลังอยู่บทไหน" (active state) ไม่มี
progress ring ไม่มี checkmark สะสม ไม่มี localStorage ผูกกับ completion ใดๆ — เก็บเป็น future work
(ถ้าจะทำต้องนิยาม "จบบท" ให้ชัดก่อน เช่น กดปุ่ม "ทำเครื่องหมายว่าจบแล้ว" เอง ไม่ใช่ auto-detect)

**Quiz semantics (แก้จาก scrutinize finding #3):** ตอบได้ **ครั้งเดียวต่อโหลดหน้า** — พอเลือกแล้ว
ล็อกตัวเลือกทั้งหมด (แสดงถูก/ผิด + คำอธิบายตามเดิม) ไม่ให้กดตอบซ้ำไปเรื่อยๆ (mockup เดิมกดตอบใหม่
ได้ไม่จำกัดซึ่งทำให้ "ตอบถูก" ไม่มีความหมายจริง) — quiz state ไม่ผูกกับ progress/completion ใดๆ
(ดูข้อบนนี้ — completion ตัดออกจาก MVP ทั้งหมด)

**Layout breakpoint (แก้จาก scrutinize finding #9):** diagram+pseudocode วางข้างกัน "ระดับสายตา
เดียวกัน" ใช้ได้จริงเฉพาะ `xl:` (≥1280px) ขึ้นไป — ต่ำกว่านั้น stack แนวตั้ง (diagram บน,
pseudocode ล่าง) ระดับสายตาเดียวกันใช้ไม่ได้ที่ breakpoint แคบกว่านี้ ยังไม่นับเป็น mobile-ready
(mobile ยังเป็น known gap ตาม §7 เดิม)

## 6. Content pipeline

PDF ต้นฉบับ → คนคัดเนื้อหา/สรุป Concept/สร้าง step array ของ visualizer เอง (ไม่ auto-parse
PDF เป็น content — ความเสี่ยงตีความผิดสูงกว่าที่ประหยัดเวลาได้) → เขียนเป็น chapter data file
(TS/JSON) ตาม envelope schema ใน §5 (`{chip, lines, narr, pill?, scene?}`) → shell component
(layout/visualizer engine) ใช้ร่วมกันทุกบทจริง (data-driven), ส่วน diagram renderer เป็น
per-`scene.type` (ลงทะเบียนใน chapter manifest) ไม่ใช่ตัวเดียวเรนเดอร์ทุกชนิด diagram — บทใหม่ที่
ใช้ scene type เดิม (เช่น "tree" อีกบท) ไม่ต้องเขียน renderer ใหม่, บทที่ scene type ใหม่ (เช่น
array/stack สำหรับบท 02) ต้องเขียน renderer ใหม่ 1 ตัวสำหรับ type นั้น

## 7. Known gaps (ยังไม่ได้ตอบใน mockup — ต้องตัดสินใจตอน implement)

จาก [opus-theme-rationale.md](design-tokens/opus-theme-rationale.md) §5 (ตอนนี้ superseded by
spec นี้ — ดู banner บนไฟล์นั้น):
- **Mobile:** ยังไม่ออกแบบจริง — แนวทางคร่าวคือย้าย stage เป็น dock ติดขอบล่างบนจอแคบ. เกี่ยวข้อง:
  ระดับ `xl:` (≥1280px) เท่านั้นที่ diagram+pseudocode วางข้างกันได้จริง (§5) — mobile ต้องออกแบบ
  ทั้ง breakpoint กลาง (md/lg) และ breakpoint แคบสุดแยกกัน ไม่ใช่แค่จุดเดียว
- **บทที่ diagram โตกว่านี้ (DP table 2 มิติ, hash table ที่มี chain):** แม้ §5 รอบนี้แก้ให้ diagram
  height มาจาก scene aspect ratio แล้ว (ไม่ fix 246px ตายตัวอีกต่อไป) เลย์เอาต์ pseudocode
  `412px` คงที่ยังไม่เคยทดสอบกับโค้ดที่ยาวกว่าตัวอย่าง BST insert (8 บรรทัด) — โค้ด 20+ บรรทัดของ
  DP จะทำให้ pseudocode pane สูงกว่า diagram มาก (`max(diagram, pseudocode)` ตาม §5 จะยืดตาม
  pseudocode แทน) ต้องทำ mockup ทดสอบก่อนเริ่ม build บทที่ 06/08 (อยู่นอก MVP นี้อยู่แล้ว ไม่บล็อก
  MVP)
- **Scene type สำหรับบท 01/02:** MVP รอบนี้ implement diagram type `tree` เท่านั้น (§5/§6) — บท 01
  (Big-O)/02 (Stack, Queue) ยังไม่มี `scene.type` ที่นิยามจริง เพราะยังไม่มี content ของบทเหล่านั้น
  ต้องออกแบบตอนเขียน content บทนั้นจริง (นอก MVP ของรอบนี้ ตาม §3)
- **Step transition:** ตอนนี้เปลี่ยนทันที ไม่มี motion — ถ้าจะเพิ่ม ใส่ทีหลังได้ ไม่บล็อก MVP
- **Accessibility:** SVG diagram ไม่มี `role`/`aria-label`, rail icon พึ่ง `title=` tooltip เป็น
  accessible name เดียว — ยังไม่บล็อก MVP แต่ต้องเติมก่อน ship จริง
- **Font/CDN:** mockup โหลด Google Fonts + Tailwind play-CDN จาก CDN ตรงๆ — deliverable ที่ต้อง
  เปิดจากดิสก์แบบ offline (§2) ต้อง self-host font ตอน implement ไม่ใช่พึ่ง CDN
- **`faint-foreground` contrast:** ผ่าน WCAG AA เฉพาะ mono label ตามที่ rationale ตั้งใจ แต่ mockup
  เอาไปใช้กับ sans text อ่านได้บางจุด (footnote, flowchart caption) — ต้องเลือกใช้
  `muted-foreground` แทนในจุดที่เป็นเนื้อหาอ่านจริง ไม่ใช่ label ประกอบ
- **Chapter/section hierarchy:** topbar โชว์ทั้งชื่อบทและ section ย่อย (เช่น "Binary Search Trees"
  ใต้ "Trees & BST") — chapter manifest (§3) ยังไม่นิยามว่าบทมี section/หน้าย่อยได้ไหม ตอนนี้ถือว่า
  1 บท = 1 หน้าเสมอ ไม่มี sub-page

## 8. Out of scope (MVP นี้)

- Backend/database/auth ใดๆ
- บทที่ 04-08 (รอบ 2)
- Mobile-optimized layout (ดู §7)
- AI-generated asset ใดๆ (icon ใช้ Lucide, ไม่มีภาพ AI-gen ในสโคปนี้)
- Progress/completion tracking ทุกรูปแบบ (progress ring, checkmark สะสม, localStorage ผูก
  completion) — ตัดออกทั้งหมดตาม §5, ไม่มี persisted state ข้าม session ใดๆ ใน MVP นี้
- Rich narration markup เกินกว่า `**bold**`/`` `code` `` (ดู §5) — ไม่มี list/link/heading ใน
  narration text
- Search (`⌘K`) — mockup มี hint แต่ไม่เคย spec ไว้ ไม่อยู่ใน MVP นี้

## 9. ขั้นตอนถัดไป

เข้า `/plan-pro` เพื่อแตกเป็น implementation plan (scaffold Vite+Tailwind, wire tokens.css,
component ของ layout, chapter-01/02/03 content + visualizer data, deploy เป็น static `dist/`)
