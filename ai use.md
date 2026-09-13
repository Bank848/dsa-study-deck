# AI Use Log — DSA Study Deck (com-sci-site)

บันทึกว่าใน session นี้สั่ง AI (Claude Code) อะไรไปบ้าง แล้ว AI ทำ/ตอบอะไรกลับมา เรียงตามลำดับเวลาจริง ไม่ใช่สรุปปลายทางอย่างเดียว

## 1. แก้ mockup (`mockup-v3-opus.html`)

**สั่ง:** "ตรง insert 37 ไม่ต้องทำให้มันเป็นแบบย่อแถบ และก็ที่เนื้อหาด้านล่าง โซนด้านขวาเหลือเยอะเกิน"

**AI ทำ:** เอาปุ่มย่อแถบ/collapse ของ stage ออก (ทั้ง HTML และ JS handler) แล้วขยาย+จัดกึ่งกลางคอลัมน์เอกสารจาก `780px` ชิดซ้าย เป็น `860px` กึ่งกลาง เพื่อลดพื้นที่ว่างฝั่งขวาบนจอกว้าง

**สั่ง:** (ส่ง screenshot) "ให้มันไม่ต้องแยกส่วนกัน"

**AI ทำ:** แก้ panel pseudocode ให้ยืดความสูงตาม panel diagram (`flex-1`) แทนที่จะสูงแค่พอดีบรรทัดโค้ดแล้วเหลือที่ว่างลอยด้านล่าง — ทำให้สอง panel ดูเป็นแถบเดียวกันแทนที่จะแยกเป็นสองการ์ด

**สั่ง:** "อย่าไป pin มันดิ ให้มันอยู่หน้าเดียวกัน"

**AI ทำ:** ถอด `sticky top-[56px] z-20` ออกจาก stage section — visualizer เลื่อนไปพร้อมหน้าปกติแล้ว

## 2. เขียน spec

**สั่ง:** "เขียนspecได้เลย"

**AI ทำ:** เขียน `spec.md` สรุป design decision ที่ approve แล้วทั้งหมด (เป้าหมาย, deliverable, ขอบเขต MVP 3 บท, design system, layout spec อ้างอิง mockup, content pipeline, known gaps, out of scope)

## 3. `/plan-pro` — สร้างแผน implementation

**สั่ง:** `/plan-pro`

**AI ทำ:** เขียนแผน implementation 8 task (scaffold, types/router, layout shell, visualizer engine, content component, BST diagram data, chapter assembly, build verification) เป็น HTML — จำกัดสโคปเหลือแค่บท 03 (Trees & BST) เพราะบท 01/02 ยังไม่มี content จริง แล้วบอกเหตุผลไว้ในแผนตรงๆ ว่าทำไมไม่ทำครบ 3 บทตามสโคป MVP เดิม

จากนั้น spawn subagent สองตัวไปรีวิวแผนคนละมุม (coverage/gaps กับ critical correctness/sequencing) — เจอบั๊กจริง 2-3 จุด (parallelization batch ผิด, timer test ไม่ตรงกับ implementation, duplicate-text test ที่ `getByText` จะ throw) แก้เข้าไปในแผนแล้วรายงานสรุปให้

## 4. Scrutinize ตัว design เอง (fable 5.1)

**สั่ง:** "ให้ fable 5.1 ตรวจ design ออกแบบแล้วก็หา gaps"

**AI ทำ:** เรียกสกิล `scrutinize` แล้ว spawn fable-medium ไปไล่อ่าน `spec.md`, `mockup-v3-opus.html`, `tokens.json`/`tokens.css`, `opus-theme-rationale.md` เต็มเรื่อง — เจอ gap ระดับ major 6 จุด: step schema ของ visualizer ผูกกับ BST ตรงๆ (บท 01/02 ไม่มี node/edge เลย), routing/build config ยังไม่ตัดสินใจ (เปิดจากดิสก์จะพัง), ไม่มีนิยาม "จบบท"/quiz state, `opus-theme-rationale.md` ขัดกับ spec เอง 3 จุด, token กับ mockup ไม่ตรงกันสองทาง, amber (สี "current step") รั่วไปใช้ผิดความหมาย 2 จุด

**สั่ง:** "แก้เลย"

**AI ทำ:** แก้ `spec.md` ทั้ง §2/§4/§5/§6/§7/§8 ตาม gap ที่เจอ (schema ใหม่แบบ envelope+scene, HashRouter+PDF copy, ตัด progress persistence, quiz ตอบได้ครั้งเดียว, keyboard shortcut ผูกกับ stage ไม่ใช่ window ทั้งหน้า) — แก้ `tokens.json` เพิ่ม/ตัด token ให้ตรงกับที่ mockup ใช้จริงแล้ว regenerate `tokens.css` — แก้ `mockup-v3-opus.html` 2 จุดที่ amber รั่ว (badge `value=37`, cmp pill ตอนว่าง) — แปะ superseded banner ใน `opus-theme-rationale.md` ชี้กลับมาที่ spec — แล้ว commit ทั้งหมดเป็น `b14de7f2`

## 5. รีวิวแผนอีกรอบ + ponytail + ai use log

**สั่ง:** "เอา fable 5.1 รีวิวแผนอีกรอบ ในแผนใช้ ponytail ด้วยตอนเขียนโค้ด แล้วเขียน ai use.md เป็นการสรุปว่าเรา prompt อะไรแล้วก็ ai ทำอะไรไปบ้าง ตอบอะไรบ้าง"

**AI ทำ:**
1. เพิ่มข้อ "ponytail discipline on every new-code step" เข้า Global Constraints ของแผน — ให้ทุก step ที่เขียนโค้ดใหม่ไต่ ladder YAGNI→stdlib→native→dependency→one-liner ก่อน ยกเว้น step ที่เป็น algorithm จริงหรือเป็นการพอร์ตข้อมูล 1:1
2. spawn fable-medium ไปเทียบแผน (ที่เขียนไว้ก่อน scrutinize pass) กับ spec ที่แก้แล้วในข้อ 4 — เพราะแผนไม่เคยถูก re-pass ตาม spec ใหม่เลย มีแค่แก้ตาม reviewer เดิมของมันเอง
3. fable-medium คืน patch set 28 จุด (F1-F28) พร้อมเหตุผล/โค้ดจริงทุกจุด สองจุดที่เจอเพิ่มเองนอกเหนือ checklist ที่ให้ไป: `base: './'` เฉยๆ ไม่พอให้เปิดจาก `file://` ได้จริง (ES module โดน CORS บล็อกใน Chrome ต้อง inline ด้วย `vite-plugin-singlefile`) และ font ที่ยังลิงก์ Google Fonts CDN อยู่ทั้งที่ spec บอกต้องใช้งานได้แบบ offline
4. เอา patch ทั้ง 28 จุดไปแก้แผนจริง — ครอบคลุม: schema `VisualizerStep`/`Scene`/`TreeScene` ใหม่ทั้งชุด, `BrowserRouter`→`HashRouter` ทุกจุด (App.tsx ทั้งใน Task 2 และ Task 7, test file), เพิ่ม step copy PDF เข้า `public/pdf/`, self-host font แทน CDN, keyboard handler ย้ายจาก `window` มาเป็น element-scoped `onKeyDown`, narration parser (`**bold**`/`` `code` ``) แทน `dangerouslySetInnerHTML`, quiz key badge ใช้ token ใหม่, TreeDiagram รับ `scene` แทน `step` ทั้งตัว, เพิ่ม build-verification step ให้เปิด `dist/index.html` จากดิสก์จริงๆ ไม่ใช่แค่ `npm run preview`
5. เขียนไฟล์นี้

## 6. รัน implementation plan จริง (parallel subagent execution)

**สั่ง:** "Parallel subagent execution" (เลือกจากตัวเลือก execution ที่ plan-pro เสนอไว้)

**AI ทำ:** รันแผน 8 task ตาม parallelization analysis ที่เขียนไว้ในแผนเอง — แบ่งเป็น 5 batch:

- Batch 1: Task 1 (scaffold) เดี่ยวๆ — spawn subagent 1 ตัว, commit `755dcd57`
- Batch 2: Task 2 (types + chapter manifest + router) เดี่ยวๆ เพราะ Task 3-6 ทุกตัว import type/data จากตรงนี้ — commit `e33156ca`
- Batch 3: Task 3, 4, 5, 6 พร้อมกัน 4 subagent (layout shell / visualizer engine / content components / BST diagram data) เพราะแก้คนละไฟล์กันหมด — ได้ 4 commit (`cda22e1e`, `f7cb3ea5`, `8a9edd8d`, `9f55b454`)
- Batch 4: Task 7 (assemble Chapter03Page + เปิด route) — commit `e863a68e`
- Batch 5: Task 8 (build verification — เปิด `dist/index.html` จาก disk จริงผ่าน BrowserOS neo ไม่ใช่แค่ `npm run preview`) — ผ่านหมด ไม่มี commit เพิ่มเพราะไม่ต้องแก้อะไร

ระหว่างแต่ละ batch เป็นคนรวบผลเอง (aggregating reviewer) — รัน `npm test` กับ `npx tsc -b` เต็มโปรเจกต์หลัง batch 3 merge ก่อนปล่อยให้ Task 7 เริ่ม เจอ deviation เล็กๆจาก subagent สองจุดที่ตัดสินใจเองแบบสมเหตุสมผล (แก้ smoke test ที่ assert text เดิมของ stub เพราะ router จริงเข้ามาแทนแล้ว, ย้าย `InsertDecisionFlowchart.tsx` ไปทำใน Task 7 ตามขอบเขตไฟล์จริงในแผนแทนที่จะทำใน Task 6 ตาม brief ที่ให้ไปผิด)

จบทั้ง 8 task แล้วรัน `/code-review` (effort medium, 8 finder angle) กับ `/simplify` (4 cleanup agent) พร้อมกันตามที่ plan-pro บอกไว้ว่าต้องทำเป็น final pass ก่อนปิดงาน — เจอบั๊กจริง 1 จุด: route ของบทที่ยังไม่เปิดใช้ตั้งเป็น path ตายตัวทีละบท (`/chapter/stacks-queues` ฯลฯ) ไม่ใช่ `/chapter/:slug` ทำให้ `ComingSoonPage` เรียก `useParams()` ได้ `undefined` ทุกครั้ง หัวข้อบทที่ขึ้นแสดงเลยเป็น fallback กลางๆ ตลอด ไม่ขึ้นชื่อบทจริง — แก้เป็น route param เดียว. เจอ cleanup อีก 4 จุด (badge "value = 37" ในไดอะแกรมดันใช้สีเหลือง amber ซึ่ง spec สงวนไว้ให้ "current step" เท่านั้น, ย่อหน้าเปิดบทซ้ำข้อความจาก `CONCEPT_POINTS` ตรงๆ, ปุ่ม quiz เขียน ternary 3 สถานะซ้ำ 5 รอบในไฟล์เดียว, legend สีของ diagram แยก hardcode เองจาก token ที่ diagram ใช้จริงเสี่ยงสีเพี้ยนไม่ตรงกันทีหลัง) — แก้ทั้งหมด commit `3a8dc43d`

## หมายเหตุ

- ไฟล์ที่แก้รวมทั้ง session: `spec.md`, `design-tokens/tokens.json`, `design-tokens/tokens.css`, `design-tokens/opus-theme-rationale.md`, `mockup-v3-opus.html`, `docs/superpowers/plans/2026-09-12-mvp-scaffold-trees-bst.html`, แล้วก็ทั้งโปรเจกต์ `com-sci-site/` ที่ implement จริงตามแผน (51 ไฟล์ใหม่จาก 8 task + 6 ไฟล์แก้จากรอบ review)
- แผน execute เสร็จครบทั้ง 8 task แล้ว ผ่าน test 24/24, `tsc -b` clean, เปิด `dist/index.html` จาก disk จริงได้ (HashRouter + vite-plugin-singlefile ทำงานตามที่ตั้งใจ) — commit ล่าสุดคือ `3a8dc43d`
- ยังไม่ได้ push ไป remote — รอ ship
- reviewer ที่ใช้ตลอด session: general-purpose subagent 2 ตัว (รีวิวแผนรอบแรก), fable-medium 2 ครั้ง (scrutinize ตัว design, reconciliation ตัวแผนกับ spec), general-purpose subagent 8 ตัว execute แผน (batch 1/2/4 เดี่ยว, batch 3 พร้อมกัน 4 ตัว), general-purpose subagent อีก 12 ตัว (`/code-review` 8 angle + `/simplify` 4 angle) เป็น final review pass
- ยังไม่ได้ทำต่อ: บท 01 (Intro & Big-O) กับ 02 (Stacks & Queues) — ตามที่แผนบอกไว้ตั้งแต่แรกว่าจะทำบท 03 ให้จบเป็นตัวอย่างก่อน ค่อยตามด้วยแผนแยกทีหลัง

## 7. Plan A — บท 02/06/07/08 (parallel subagent execution, session แยกต่างหาก)

**สั่ง:** "Execute the approved implementation plan at `docs/superpowers/plans/2026-09-13-plan-a-new-scene-chapters.html`" (Plan A ของ 4 แผนที่ plan-pro เขียนไว้ต่อจากบท 03 — ครอบคลุมบท 02 Stacks & Queues, 06 Hash Tables, 07 String Matching, 08 Dynamic Programming)

**AI ทำ:** อ่านแผนเต็ม (8 task) แล้ว execute ตาม parallelization analysis ที่แผนกำหนดไว้ — 5 batch เหมือนรูปแบบบท 03:

- Batch 1: Task 1 (`Scene` union เพิ่ม `LinearScene`/`BucketScene`/`MatchScene`/`GridScene`) เดี่ยวๆ — commit `aec2c127`
- Batch 2: Task 2 (flip `available: true` ทั้ง 4 บท — PDF ต้นทางมีอยู่ใน `public/pdf/` แล้วจากรอบก่อน ไม่ต้อง copy ใหม่) — commit `99be5c39`
- Batch 3: Task 3-6 (4 บทใหม่ พร้อมกัน 4 subagent เพราะแก้คนละ directory) — commit `5d6ce3d0`/`e357a408`/`deea99f5`/`d33a29f3`
- Batch 4: Task 7 (wire route + แก้ root-redirect test เพราะบท 02 แซงบท 03 เป็นบทแรกสุดที่เปิดใช้งานแล้ว) — commit `c927a923`
- Batch 5: Task 8 (build verification — เปิด `dist/index.html` จาก disk ผ่าน static server + BrowserOS neo เพราะ file:// ตรงๆ ค้างโหลดไม่จบ) — ผ่านหมด ไม่มี commit เพิ่ม

ระหว่างแต่ละ batch รวบผลเอง รัน `npx vitest run`/`npx tsc -b` เต็มโปรเจกต์ก่อนปล่อย batch ถัดไปเหมือนเดิม — รอบนี้ไม่เจอ deviation จาก subagent เลย ทุกไฟล์ตรงตามแผนที่เขียนไว้ล่วงหน้า (ต่างจากบท 03 ที่เจอ 2 จุดต้องตัดสินใจเอง)

จบ 8 task แล้วรัน `/code-review` (effort low, scoped เฉพาะ diff ของ Plan A) — ไม่เจอบั๊ก

## 8. เพิ่มเนื้อหาสอนแบบละเอียด (LessonExplainer) — งานนอกแผนเดิม + ประสาน session คู่ขนาน

**สั่ง:** "อย่าลืมว่าไม่ได้มีแค่ quiz นะ ต้องมีสอนเนื้อหาด้วย มีเนื้อหาสอนทั้งหมดโดยละเอียดแบบ tech ย่อยง่าย แล้วก็มี bullet point ร่วมด้วย" — ถามต่อว่าทำแค่ 4 บทใหม่หรือรวมบท 03 ด้วย ผู้ใช้ตอบว่าทำทุกบทให้มาตรฐานเดียวกัน

**AI ทำ:** ระหว่างเตรียมจะสร้าง component ใหม่ พบว่ามี **session คู่ขนานอีกตัว (`com-sci-learn-27`)** กำลังแก้ `Chapter03Page.tsx` เพิ่ม component ชื่อ `LessonExplainer` (`{title, body}` sections) อยู่พอดี — ได้รับ request เดียวกันจาก user คนละ session — จึงลบ component ที่เพิ่งสร้างซ้ำทิ้ง แล้วส่งข้อความประสานงานผ่าน `SendMessage` ตกลงแบ่งงาน: เขาทำบท 02/03 (เผลอชนกันตอนแรกเพราะทั้งคู่เริ่มแก้บท 02 พร้อมกัน — ฆ่า subagent ของตัวเองทันทีที่รู้ตัว ไม่มีไฟล์เสีย) ผมทำบท 06/07/08 — reuse `LessonExplainer` เดิมไม่แก้ไฟล์นั้น

spawn subagent 3 ตัว (บท 06/07/08) อ่าน PDF ต้นทางของแต่ละบทตรงๆ เขียน `LESSON_SECTIONS` 3-4 หัวข้อ/บท (ไม่ใช่แค่ bullet เดิม) วางไว้เป็น section "Lesson" ก่อน section "Concept" — เนื้อหาอิงข้อเท็จจริงที่มีอยู่แล้วใน `steps.ts`/PDF เท่านั้น ไม่มีการเสริมข้อมูลใหม่ — commit `cc136414`

## 9. Final review pass รอบสอง (/simplify ครอบคลุมงานใหม่) + push

**AI ทำ:** รัน `/simplify` (4 cleanup agent: reuse/simplification/efficiency/altitude) กับ diff รวมของ Plan A + งาน lesson content — เจอ 4 จุดจริง (efficiency/reuse ไม่เจออะไร):
- **altitude:** ย่อหน้า "PDF ไม่ให้ complexity มา" ใน Chapter06/07 hand-write ซ้ำกันแยกไฟล์ ควรมี shared component แทน → สร้าง `ComplexityNote.tsx`
- **altitude:** `GridDiagram.tsx` hardcode `ROW_LABELS`/`COL_LABELS` เฉพาะ LCS demo นี้ ทั้งที่ `GridScene` ตั้งใจให้ reuse ได้กับบท DP อื่นในอนาคต → ย้าย label เข้า `GridScene` เป็น field ใหม่ (`rowLabels`/`colLabels`) แล้วให้ทุก step ส่งมาเอง
- **simplification:** `steps.ts` (08) ถอด `cellState` เป็น literal ยาวขึ้นเรื่อยๆ ทีละ step (`{...idleState, '1-1':'filled', '1-2':'filled', ...}`) → เขียน helper `filledThrough(uptoCol)` แทน
- **simplification:** `steps.ts` (06) `bucketsAfter()` รับ array ที่พิมพ์ซ้ำทุก entry ก่อนหน้าทุก step → ดึงลำดับ insert ออกมาเป็น `INSERT_ORDER` คงที่ตัวเดียว แล้วเรียก `bucketsAfter(n)` ที่ slice ข้างในแทน

แก้ทั้ง 4 จุด รัน test/tsc ผ่านหมด (42/42, clean) commit `c1000f17`

**ประสานงาน push:** เพราะ repo นี้เป็น personal vault backup (ไม่มี PR flow) และ local master ตอนนั้นนำหน้า origin 28-30 commits จากทั้งสอง session พร้อมกัน (ผม + `com-sci-learn-27` ที่ทำ Plan B บทฮีป/heaps คู่ขนานอยู่) — ถาม user ว่าจะ push ยังไง ผู้ใช้เลือก "รอ peer session เสร็จก่อนค่อย push" — ส่งข้อความถาม peer ผ่าน `SendMessage` ยืนยันว่าทำเสร็จแล้วทั้งคู่ก่อนเดินหน้า push จริง

## 10. Plan D/B/C — บท 04/05/01 (ต่อจาก vault repo เดิม, sync เข้า repo แยกนี้)

**สั่ง:** "execute Plan D → Plan B → Plan C" (3 แผนสุดท้ายจาก 4 แผนที่ plan-pro เขียนไว้ — Plan D
บท 04 Search Trees/AVL rotation, Plan B บท 05 Heaps/sift-down, Plan C บท 01 Intro & Big-O/arrayMax)
ตามด้วย `/code-review` + `/simplify` เต็มไดฟ์ แล้ว ship

**AI ทำ:** รันในโปรเจกต์ต้นทาง `D:\brain\com sci learn\com-sci-site` (vault repo,
`brain-vault-backup`) ตามลำดับที่แผนกำหนด (Plan D ก่อนเพราะ generalize `TreeDiagram.tsx` ที่ Plan
B ก็ต้องใช้ร่วม):

- **Plan D (บท 04):** แก้ `TreeDiagram.tsx` จาก hardcode เฉพาะบท 03 เป็น prop-driven
  (`nodePositions`/`baseEdges`/`viewBoxHeight` ฯลฯ), เพิ่ม `positions`/`edgeList` ใน `TreeScene`
  รองรับ animate rotation ด้วย CSS transition (สลับ before/after snapshot แทน JS tween)
- **Plan B (บท 05):** เพิ่ม `HeapArrayDiagram.tsx` ใหม่ (array-as-tree แทน pointer tree จริง),
  `INDEX_EDGES` derive จาก `ARRAY_0.length`
- **Plan C (บท 01):** เพิ่ม `CounterScene`/`CounterDiagram.tsx`/`GrowthChart.tsx` สำหรับนับ
  primitive operation ของ `arrayMax`

เจอบั๊กจริงระหว่างทำ (ไม่ใช่แค่ plan บอกไว้แล้ว): SVG `height` ไม่ scale ตาม `viewBoxHeight` ใหม่
(บท 04 สูงกว่าบท 03), `AFTER_POS` ของ rotation เขียนพิกัดซ้ำทั้ง 9 โหนดทั้งที่ขยับจริงแค่ 4,
`INDEX_EDGES` ของ heap hardcode ทั้งที่ derive จาก array length ได้ — แก้ทั้งหมด, บวก false-positive
2 จุดจาก Angle A reviewer (เข้าใจผิดว่า pseudocode line highlight offset ผิด ทั้งที่ `Stage.tsx`
ใช้ 1-indexed ถูกอยู่แล้ว — ตรวจเองแล้วไม่เอาเข้ารายงาน) รัน `/code-review`(medium)+`/simplify` จบ
ผ่าน test 55/55, `tsc -b` clean

**ประสานงาน sync:** ระหว่างทำ พบว่า **repo แยกต่างหาก `dsa-study-deck` ถูกสร้างขึ้นแล้ว** (import
มาจาก vault snapshot ก่อนหน้า, มี PR #1 เปิดค้างอยู่) — user ยืนยันให้ทำงานต่อใน vault repo ตามเดิม
แล้วค่อย sync ผลลัพธ์เข้า `dsa-study-deck` ทีหลัง

ระหว่างจะ ship พบว่า **peer session อีกตัวใน local clone เดียวกัน push+merge งานเทียบเท่าเข้า
`origin/master` ของ vault ไปแล้วโดยตรง** (ไม่ผ่าน PR) สองครั้งติดกัน (race เกิดขึ้นระหว่างที่กำลัง
เซ็ต branch ของตัวเองพอดี) — ตรวจ diff แล้วยืนยันว่าเนื้อหาตรงกัน 100% ไม่มีข้อมูลหาย, ลบ branch
ของตัวเองที่กลายเป็น redundant ทิ้ง (local; remote เก็บไว้ตามที่ user ขอ) แล้ว sync โค้ดจริงจาก
vault master เข้า `dsa-study-deck`'s PR #1 (branch `initial-import`) ด้วย `git archive` (ดึงเฉพาะ
ไฟล์ที่ git track จริง ไม่เอา `node_modules`/`dist`) — มีแค่ 3 ไฟล์ที่ต่างจาก snapshot เดิม
(`TreeDiagram.tsx`, `04-search-trees/steps.ts`, `05-heaps-pq/steps.ts`) commit เข้า PR

**สั่ง:** "merge ไหม" → "mark ready and merge"

**AI ทำ:** `gh pr ready` แล้ว `gh pr merge --squash` — PR #1 merge เข้า `main` ของ
`dsa-study-deck` แล้ว

**หมายเหตุ:** browser-based visual verification (Task 5 ของแต่ละแผน — เปิด `dist/index.html`
สเต็ปดู demo จริง) ทำไม่ได้ทั้ง 3 แผนเพราะ `browseros-neo` timeout ทุกครั้งที่เรียก
snapshot/screenshot/act กับหน้าที่มีเนื้อหาจริง (ยืนยันว่าเป็นปัญหาระดับ tool ไม่ใช่ตัวเว็บพัง)
— แจ้ง user ไว้เป็น known gap, พึ่ง automated test coverage (55/55 ผ่าน) แทน
