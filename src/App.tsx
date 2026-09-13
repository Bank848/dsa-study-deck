import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CHAPTERS } from './data/chapters';
import ComingSoonPage from './pages/ComingSoonPage';
import Chapter01Page from './chapters/01-intro-bigo/Chapter01Page';
import Chapter02Page from './chapters/02-stacks-queues/Chapter02Page';
import Chapter03Page from './chapters/03-trees-bst/Chapter03Page';
import Chapter04Page from './chapters/04-search-trees/Chapter04Page';
import Chapter05Page from './chapters/05-heaps-pq/Chapter05Page';
import Chapter06Page from './chapters/06-hash-tables/Chapter06Page';
import Chapter07Page from './chapters/07-string-matching/Chapter07Page';
import Chapter08Page from './chapters/08-dynamic-programming/Chapter08Page';

export default function App() {
  const firstAvailable = CHAPTERS.find((c) => c.available) ?? CHAPTERS[0];

  // HashRouter, not BrowserRouter (spec §2): history routing breaks silently when dist/index.html
  // is opened from disk — URLs look like index.html#/chapter/trees-bst
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/chapter/${firstAvailable.slug}`} replace />} />
        <Route path="/chapter/intro-bigo" element={<Chapter01Page />} />
        <Route path="/chapter/stacks-queues" element={<Chapter02Page />} />
        <Route path="/chapter/trees-bst" element={<Chapter03Page />} />
        <Route path="/chapter/search-trees" element={<Chapter04Page />} />
        <Route path="/chapter/heaps-pq" element={<Chapter05Page />} />
        <Route path="/chapter/hash-tables" element={<Chapter06Page />} />
        <Route path="/chapter/string-matching" element={<Chapter07Page />} />
        <Route path="/chapter/dynamic-programming" element={<Chapter08Page />} />
        {/* :slug param (not a literal per-chapter path) so ComingSoonPage's useParams() actually
            resolves the chapter — fixes a bug where every unavailable chapter fell back to the
            generic label because no route declared a param for useParams() to read. */}
        <Route path="/chapter/:slug" element={<ComingSoonPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </HashRouter>
  );
}
