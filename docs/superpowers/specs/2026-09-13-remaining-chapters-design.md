# Remaining 7 Chapters — Design Spec

**Status:** approved by user 2026-09-13 (scope: "ทำให้ครบเลย" — all 7 in one wave; chapter 04 rotation: full animated, via CSS-transition position override)

## 1. Scope

Build the 7 chapters left unbuilt after chapter 03 (Trees & BST, shipped at commit `da4f8a48`):

| # | slug | Title | Source PDF(s) (under `D:\brain\com sci learn\`) |
|---|------|-------|---------------------------------------------------|
| 01 | `intro-bigo` | Intro & Big-O | `2301265_01_Introduction-838647-17854249839839.pdf`, `2301265_02_Analysis-838647-17854250657128.pdf` |
| 02 | `stacks-queues` | Stacks & Queues | `2301265_Stacks_Queues_2026-838647-17863739129894.pdf` |
| 04 | `search-trees` | Search Trees (AVL) | `2301265_Search_Trees_V3-838647-17875466296651.pdf` |
| 05 | `heaps-pq` | Heaps & Priority Queues | `08_Heaps_PriorityQueues_DisjointSets-1038601-17884272948501.pdf` |
| 06 | `hash-tables` | Hash Tables | `07_Hash_Tables-1038601-17884271445313.pdf` |
| 07 | `string-matching` | String Matching | `06_String_Matching-1038601-17884269975673.pdf` |
| 08 | `dynamic-programming` | Dynamic Programming | `06_Dynamic_Programming-838647-17875466674679.pdf` |

Each PDF must be copied into `com-sci-site/public/pdf/` (same as chapter 03's Task 1 step) and each chapter's `pdfs` array in `chapters.ts` populated. `available: false` flips to `true` only for chapters actually built.

**Content-fidelity rule (binding on every task that writes concept bullets, complexity tables, or quiz questions):** derive facts, tables, and quiz answers ONLY from what is literally stated in that chapter's PDF(s). If the PDF leaves a question open (e.g. heaps/string-matching PDFs leave "running time?" unanswered), the chapter's complexity section must say so explicitly instead of stating a number — never invent a Big-O bound, a worked value, or a fact the source doesn't contain.

## 2. Architecture: extending `Scene`

Chapter 03 shipped with `Scene = TreeScene` as a single-member placeholder (`src/types.ts`). This wave turns it into a real union. `VisualizerStep`, `useVisualizer`, and `Stage` are unchanged — they've always been diagram-agnostic, dispatching to whatever `renderDiagram(step)` the page supplies. Only `Scene` grows and each chapter gets its own renderer component (mirroring `TreeDiagram.tsx`).

### 2.1 New scene types

```ts
// src/types.ts additions

export type CounterState = 'idle' | 'active' | 'done';
export interface CounterScene {
  type: 'counter';
  /** array being walked, rendered as a row of cells */
  values: number[];
  /** index currently being visited, or undefined between steps */
  activeIndex?: number;
  /** running operation-count tally shown next to the array */
  opCount: number;
}

export type LinearCellState = 'idle' | 'here' | 'pushed' | 'popped';
export interface LinearScene {
  type: 'linear';
  orientation: 'stack' | 'queue';
  cells: { value: string; state: LinearCellState }[];
  /** label under the pointer end, e.g. "top" or "front" */
  pointerLabel: string;
}

export type BucketSlotState = 'idle' | 'probe' | 'collision' | 'placed';
export interface BucketScene {
  type: 'bucket';
  /** one entry per bucket index; chained buckets hold >1 value */
  buckets: { index: number; values: string[]; state: BucketSlotState }[];
}

export type MatchCharState = 'idle' | 'compare' | 'match' | 'mismatch';
export interface MatchScene {
  type: 'match';
  text: string;
  pattern: string;
  /** text index the pattern's [0] currently aligns to */
  shift: number;
  /** per-pattern-index state, e.g. {0:'match',1:'compare'} */
  charStates: Record<number, MatchCharState>;
}

export type GridCellState = 'idle' | 'filling' | 'filled' | 'source';
export interface GridScene {
  type: 'grid';
  /** row-major values; null = not yet computed */
  cells: (number | null)[][];
  /** cell currently being computed */
  activeCell?: [number, number];
  /** cells that fed the active cell's recurrence, for dependency arrows */
  sourceCells?: [number, number][];
  cellState: Record<string, GridCellState>; // key `${row}-${col}`
}

export interface ArrayScene {
  type: 'array';
  values: number[];
  /** index -> visual state, reuses NodeState so heap array + heap tree share one palette */
  states: Record<number, NodeState>;
  /** draws parent/child arrows for the indices given */
  highlightEdges?: [number, number][];
}
```

`Scene` becomes:

```ts
export type Scene = TreeScene | CounterScene | LinearScene | BucketScene | MatchScene | GridScene | ArrayScene;
```

### 2.2 `TreeScene` extension for chapter 04 (AVL rotation)

Add one optional field, nothing else changes:

```ts
export interface TreeScene {
  type: 'tree';
  nodes: Record<string, NodeState>;
  edges?: Record<string, EdgeState>;
  /** per-step position override; falls back to the chapter's static layout (BST_NODE_POS-style
   *  const) when a node id is absent. Only chapter 04's rotation steps set this. */
  positions?: Record<string, { x: number; y: number }>;
}
```

`TreeDiagram.tsx` (chapter 03's, reused by 04/05) changes in exactly two places:
1. Position lookup becomes `scene.positions?.[id] ?? BST_NODE_POS[id]` (rename the const per-chapter, e.g. `AVL_NODE_POS` for 04, or keep it chapter-local — each chapter's diagram file owns its own default layout constant, same pattern as chapter 03's `steps.ts`).
2. The `<circle>`/`<text>` elements for each node get `style={{ transition: 'cx 400ms ease, cy 400ms ease' }}` (SVG circles support `cx`/`cy` as animatable presentation attributes in modern browsers — no JS tween loop, no rAF, no new prop).

When a rotation step's `positions` swaps two nodes' coordinates, the browser interpolates the move for free between the pre-rotation and post-rotation render. Chapters 03 and 05 never set `positions`, so they're pixel-identical to today — this is additive, not a rewrite.

**Chapters 04 and 05 reuse `TreeDiagram` as-is** (04 via the `positions` extension above, 05 unchanged) rather than forking a copy — both live under `src/chapters/0X-.../` but `import TreeDiagram from '../03-trees-bst/TreeDiagram'`. If a second `TreeScene` demo needs different `NODE_STYLE` colors, that's a future concern (already flagged as debt in chapter 03's ai use.md log) — not addressed in this wave since all three tree-based chapters use the same walk/here/ok/slot/fresh/idle vocabulary.

## 3. Per-chapter renderer & content shape

Each new chapter directory `src/chapters/0N-<slug>/` gets the same three files chapter 03 has: `steps.ts` (step data + any layout consts), `<Name>Diagram.tsx` (the scene renderer), `Chapter0NPage.tsx` (assembly: concept bullets, complexity table, quiz, nav — same structure as `Chapter03Page.tsx`).

| Chapter | Scene(s) | Renderer file | Notes |
|---|---|---|---|
| 01 Big-O | `CounterScene` | `CounterDiagram.tsx` | Also include one static (non-stepped) growth-curve SVG comparing O(1)/O(log n)/O(n)/O(n²) — not a `Scene`, just a fixed illustration rendered above or beside the stepper, since Big-O growth isn't itself a step-through algorithm |
| 02 Stacks/Queues | `LinearScene` | `LinearDiagram.tsx` | One stepper demo per structure (push/pop stack, enqueue/dequeue queue), `orientation` flag switches layout |
| 04 Search Trees | `TreeScene` (+ `positions`) | reuse `TreeDiagram.tsx` | Demo: insert causing imbalance → single or double rotation → rebalanced. Static per-step positions, no manual tween code (§2.2) |
| 05 Heaps | `TreeScene` + `ArrayScene` | reuse `TreeDiagram.tsx` + new `HeapArrayDiagram.tsx` | Stage shows both side by side for the same step (sift-up/sift-down demo); `renderDiagram` returns a two-column fragment when `step.scene` is one and a paired second scene is supplied via a `pairedScene?` field on the step, OR — simpler — the page renders two `<Stage>`-adjacent diagrams reading the same `steps` array with two different `renderDiagram` closures. Pick the simpler option (two renderDiagram closures over one steps array) — no `VisualizerStep` schema change needed |
| 06 Hash Tables | `BucketScene` | `BucketDiagram.tsx` | Chaining collision demo (matches what's actually in the PDF — confirm chaining vs open addressing from the source before writing steps) |
| 07 String Matching | `MatchScene` | `MatchDiagram.tsx` | Naive/brute-force sliding comparison, matches PDF's actual algorithm coverage |
| 08 Dynamic Programming | `GridScene` | `GridDiagram.tsx` | Classic 2D table fill (e.g. LCS or knapsack — whichever the PDF actually worked through) with dependency arrows from `sourceCells` |

Complexity tables and quiz questions per chapter: 2-3 concept bullets, one `ComplexityRow[]` table **only where the PDF states one** (else a one-line note instead — see §1 fidelity rule), 2-3 `QuizQuestion[]` — same shape as chapter 03's, content sourced at plan-task-authoring time by reading that chapter's PDF directly (not fabricated at spec time).

## 4. Decomposition into plans

One spec (this file), four plan-pro plans, grouped by shared new scene type so each plan is independently executable and doesn't block on another:

- **Plan A — new-scene chapters (02, 06, 07, 08):** four structurally identical chapters (new scene type + diagram + page, no shared code beyond `types.ts`). Can run as one plan with parallel batches, one batch per chapter.
- **Plan B — heaps (05):** dual-view (`TreeScene` + new `ArrayScene`), depends on chapter 03's `TreeDiagram` existing (already true).
- **Plan C — Big-O (01):** `CounterScene` + the one static growth-chart illustration; smallest scope.
- **Plan D — search trees (04):** `TreeScene` `positions` extension + rotation demo; touches the shared `TreeDiagram.tsx`, so kept isolated from Plan B to avoid two plans editing the same file concurrently.

Each plan ends with the same production-build verification chapter 03's Task 8 did (open `dist/index.html` from disk, confirm HashRouter + singlefile still work) and updates `App.tsx`'s route registration (already parameterized via `/chapter/:slug` — no route changes needed) and `chapters.ts`'s `available: true` flip for its chapters only.

## 5. Out of scope

- No changes to `useVisualizer`/`Stage`/`ChapterLayout`/`SidebarRail`/`Topbar` — confirmed chapter-agnostic already.
- No animated rotation beyond the CSS-transition position swap in §2.2 — no physics, no easing curves beyond the one `ease` transition, no multi-step rotation choreography (a rotation is one `positions` swap, one step).
- No retrofitting chapter 03's `TreeDiagram` to be more generic than the `positions` addition requires — the existing insert(37)-specific bits (hardcoded `'37'` slot logic) stay as-is per chapter 03's own documented debt; chapters 04/05 route around it rather than refactor it.
