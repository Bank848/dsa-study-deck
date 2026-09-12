import { Link } from 'react-router-dom';
import { CHAPTERS } from '../../data/chapters';
import type { ChapterMeta } from '../../types';

export default function SidebarRail({ activeSlug }: { activeSlug: string }) {
  return (
    <aside
      className="w-[72px] shrink-0 sticky top-0 h-screen flex flex-col items-center py-5 gap-3 border-r"
      style={{ background: 'var(--color-background-rail)', borderColor: 'var(--color-border)' }}
    >
      {CHAPTERS.map((c: ChapterMeta) => {
        const Icon = c.icon;
        const active = c.slug === activeSlug;
        return (
          <Link
            key={c.slug}
            to={`/chapter/${c.slug}`}
            title={`${c.id} · ${c.title}`}
            className="w-[42px] h-[42px] rounded-lg flex items-center justify-center"
            style={{
              background: active ? 'var(--color-accent-soft)' : 'transparent',
              color: active ? 'var(--color-accent)' : 'var(--color-faint-foreground)',
            }}
          >
            <Icon size={17} />
          </Link>
        );
      })}
    </aside>
  );
}
