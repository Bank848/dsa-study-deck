import type { LucideIcon } from 'lucide-react';

export type NodeState = 'idle' | 'walk' | 'here' | 'slot' | 'fresh' | 'ok';
export type EdgeState = 'idle' | 'walk' | 'ok';

/** Scene payload for the `tree` diagram renderer (spec §5). Other scene types (array/stack for
 *  chapters 01/02) are a known gap — add a new member to `Scene` when that content exists. */
export interface TreeScene {
  type: 'tree';
  /** node id -> visual state, keys are BST node values as strings */
  nodes: Record<string, NodeState>;
  /** "a-b" edge key -> visual state */
  edges?: Record<string, EdgeState>;
  /** per-step position override; falls back to nodePositions when a node id is absent. */
  positions?: Record<string, { x: number; y: number }>;
  /** exact edge list for this step, overriding the diagram's default base-edge list — needed
   *  when a step changes the tree's structure itself (e.g. a rotation), not just node
   *  states/positions. Omit to use the diagram's own baseEdges (filtered by newNodeId). */
  edgeList?: [string, string][];
}
export type LinearCellState = 'idle' | 'here' | 'pushed' | 'popped';
/** Scene payload for stack/queue diagrams (chapter 02). `orientation` picks the layout;
 *  `cells` is the full current contents in order (front/bottom -> rear/top). */
export interface LinearScene {
  type: 'linear';
  orientation: 'stack' | 'queue';
  cells: { value: string; state: LinearCellState }[];
  /** label under the pointer end, e.g. "top: B" or "front: 7 / rear: 7" */
  pointerLabel: string;
}

export type BucketSlotState = 'idle' | 'probe' | 'collision' | 'placed';
/** Scene payload for hash-table diagrams (chapter 06). One entry per bucket index;
 *  chained buckets hold more than one value. `probe` is defined for a future open-addressing
 *  demo but unused by chapter 06's chaining-only walkthrough (spec §3 note). */
export interface BucketScene {
  type: 'bucket';
  buckets: { index: number; values: string[]; state: BucketSlotState }[];
}

export type MatchCharState = 'idle' | 'compare' | 'match' | 'mismatch';
/** Scene payload for string-matching diagrams (chapter 07), scoped to naive/brute-force
 *  sliding comparison (spec §1 disclosure). `charStates` is keyed by pattern index. */
export interface MatchScene {
  type: 'match';
  text: string;
  pattern: string;
  /** text index the pattern's [0] currently aligns to */
  shift: number;
  charStates: Record<number, MatchCharState>;
}

export type GridCellState = 'idle' | 'filling' | 'filled' | 'source';
/** Scene payload for the DP 2D-table diagram (chapter 08). `cells` is row-major, null = not
 *  yet computed. `cellState` is keyed `${row}-${col}`. */
export interface GridScene {
  type: 'grid';
  cells: (number | null)[][];
  /** row headers, index 0 aligns with cells[0] (e.g. '-' for the base row) */
  rowLabels: string[];
  /** column headers, index 0 aligns with each row's first cell (e.g. '-' for the base column) */
  colLabels: string[];
  activeCell?: [number, number];
  /** cells that fed the active cell's recurrence, for dependency highlighting */
  sourceCells?: [number, number][];
  cellState: Record<string, GridCellState>;
}

export interface CounterScene {
  type: 'counter';
  /** the array being walked */
  values: number[];
  /** index currently being compared/visited this step */
  activeIndex?: number;
  /** index holding the best/tracked value found so far (e.g. current max) — distinct from
   *  activeIndex, which is "being looked at right now, not necessarily the winner" */
  markedIndex?: number;
  /** running count of primitive operations executed so far */
  opCount: number;
}

export type Scene = TreeScene | LinearScene | BucketScene | MatchScene | GridScene | CounterScene;

/** Generic step envelope shared by every demo in every chapter (spec §5). */
export interface VisualizerStep {
  /** short label shown on the step chip, e.g. "37 > 30" */
  chip: string;
  /** 1-indexed pseudocode line numbers to highlight for this step */
  lines: number[];
  /** narration text. Markup is limited to **bold** and `code` (spec §5) — parsed by
   *  NarrationBar's renderNarr() into real <strong>/<code> elements, never innerHTML. */
  narr: string;
  /** optional comparison/status pill, e.g. "37 > 30" — omit for demos with nothing to compare */
  pill?: string;
  /** optional diagram payload; `scene.type` selects the renderer. Omit for diagram-less demos. */
  scene?: Scene;
}

export interface ChapterMeta {
  /** two-digit chapter number, e.g. "03" */
  id: string;
  /** route slug, e.g. "trees-bst" */
  slug: string;
  title: string;
  /** breadcrumb text after the title, e.g. "Trees & BST" */
  section: string;
  icon: LucideIcon;
  /** false => sidebar links to the ComingSoon page instead of a real chapter page */
  available: boolean;
  /** source PDF filenames under public/pdf/ (spec §2) — chapter 01 has two */
  pdfs: string[];
}

export interface QuizOption {
  id: string;
  label: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  /** shown after the learner answers, regardless of correct/incorrect */
  explain: string;
}

export interface ComplexityRow {
  op: string;
  best: string;
  avg: string;
  worst: string;
  /** true -> worst-case rendered with the "good" badge, false -> "warn" badge */
  worstGood: boolean;
  /** 0-100, drives the growth-bar visual width */
  growthPct: number;
}
