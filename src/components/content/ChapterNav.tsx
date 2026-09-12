import { Link } from 'react-router-dom';
import type { ChapterMeta } from '../../types';

export default function ChapterNav({ prev, next }: { prev?: ChapterMeta; next?: ChapterMeta }) {
  return (
    <nav className="grid grid-cols-2 gap-3 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
      {prev ? (
        <Link to={`/chapter/${prev.slug}`} className="p-3 rounded-lg" style={{ border: '1px solid var(--color-border)' }}>
          <p className="text-[11px]" style={{ color: 'var(--color-faint-foreground)' }}>← ก่อนหน้า</p>
          <p className="text-[13px]">{prev.id} · {prev.title}</p>
        </Link>
      ) : <div />}
      {next ? (
        <Link to={`/chapter/${next.slug}`} className="p-3 rounded-lg text-right" style={{ border: '1px solid var(--color-border)' }}>
          <p className="text-[11px]" style={{ color: 'var(--color-faint-foreground)' }}>ถัดไป →</p>
          <p className="text-[13px]">{next.id} · {next.title}</p>
        </Link>
      ) : <div />}
    </nav>
  );
}
