import {
  Compass, Layers, GitBranch, Search, TrendingUp, Hash, TextSearch, Grid3x3,
} from 'lucide-react';
import type { ChapterMeta } from '../types';

export const CHAPTERS: ChapterMeta[] = [
  { id: '01', slug: 'intro-bigo',     title: 'Intro & Big-O',            section: 'Intro & Analysis',  icon: Compass,    available: true,
    pdfs: ['2301265_01_Introduction-838647-17854249839839.pdf', '2301265_02_Analysis-838647-17854250657128.pdf'] },
  { id: '02', slug: 'stacks-queues',  title: 'Stacks & Queues',          section: 'Stacks & Queues',   icon: Layers,     available: true,
    pdfs: ['2301265_Stacks_Queues_2026-838647-17863739129894.pdf'] },
  { id: '03', slug: 'trees-bst',      title: 'Binary Search Trees',      section: 'Trees & BST',       icon: GitBranch,  available: true,
    pdfs: ['2301265_Trees_PDF-838647-17863747172453.pdf'] },
  { id: '04', slug: 'search-trees',   title: 'Search Trees',             section: 'Search Trees',      icon: Search,     available: true,
    pdfs: ['2301265_Search_Trees_V3-838647-17875466296651.pdf'] },
  { id: '05', slug: 'heaps-pq',       title: 'Heaps & Priority Queues',  section: 'Heaps & PQ',        icon: TrendingUp, available: true,
    pdfs: ['08_Heaps_PriorityQueues_DisjointSets-1038601-17884272948501.pdf'] },
  { id: '06', slug: 'hash-tables',    title: 'Hash Tables',              section: 'Hash Tables',       icon: Hash,       available: true,
    pdfs: ['07_Hash_Tables-1038601-17884271445313.pdf'] },
  { id: '07', slug: 'string-matching',title: 'String Matching',          section: 'String Matching',   icon: TextSearch, available: true,
    pdfs: ['06_String_Matching-1038601-17884269975673.pdf'] },
  { id: '08', slug: 'dynamic-programming', title: 'Dynamic Programming', section: 'Dynamic Programming', icon: Grid3x3,  available: true,
    pdfs: ['06_Dynamic_Programming-838647-17875466674679.pdf'] },
];

export function getChapterBySlug(slug: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string): { prev?: ChapterMeta; next?: ChapterMeta } {
  const i = CHAPTERS.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  return { prev: CHAPTERS[i - 1], next: CHAPTERS[i + 1] };
}
