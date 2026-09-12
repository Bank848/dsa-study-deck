import { FileText } from 'lucide-react';
import type { ChapterMeta } from '../../types';

export default function Topbar({ chapter }: { chapter: ChapterMeta }) {
  return (
    <header
      className="h-[56px] px-6 flex items-center gap-4 border-b"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-background)' }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="mono text-[11px] px-1.5 py-0.5 rounded"
          style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
        >
          {chapter.id}
        </span>
        <h1 className="text-[15px] font-semibold truncate">{chapter.title}</h1>
        <span className="hidden md:inline text-[12px] truncate" style={{ color: 'var(--color-faint-foreground)' }}>
          · {chapter.section}
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        {/* relative href resolves against dist/index.html, so it works from file:// (spec §2) */}
        {chapter.pdfs.map((file, i) => (
          <a
            key={file}
            href={`pdf/${file}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 h-8 rounded-lg mono text-[11px] flex items-center gap-1.5"
            style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', color: 'var(--color-muted-foreground)' }}
          >
            <FileText size={13} /> PDF ต้นฉบับ{chapter.pdfs.length > 1 ? ` ${i + 1}` : ''}
          </a>
        ))}
      </div>
    </header>
  );
}
