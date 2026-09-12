import type { ReactNode } from 'react';
import { CornerDownRight, CheckCircle2 } from 'lucide-react';

/** spec.md §5 narration markup: only **bold** and `code`. One regex split, real elements, no innerHTML.
 *  Capturing group keeps the delimiters in the split output so we can classify each piece. */
const MARK = /(\*\*[^*]+\*\*|`[^`]+`)/g;

export function renderNarr(text: string): ReactNode[] {
  return text.split(MARK).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="mono text-[12px]">{part.slice(1, -1)}</code>;
    return part;
  });
}

export default function NarrationBar({ text, done = false }: { text: string; done?: boolean }) {
  const Icon = done ? CheckCircle2 : CornerDownRight;
  return (
    <div
      className="px-6 py-2.5 flex items-start gap-2.5 border-t"
      style={{ borderColor: 'var(--color-border-subtle)', background: done ? 'var(--narration-bar-done-bg)' : 'var(--narration-bar-bg)' }}
    >
      <Icon size={14} style={{ color: done ? 'var(--narration-bar-done-icon)' : 'var(--narration-bar-icon)' }} className="shrink-0 mt-0.5" />
      <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--narration-bar-fg)' }}>{renderNarr(text)}</p>
    </div>
  );
}
