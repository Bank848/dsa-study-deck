import type { ReactNode } from 'react';
import SidebarRail from './SidebarRail';
import Topbar from './Topbar';
import type { ChapterMeta } from '../../types';

export default function ChapterLayout({ chapter, children }: { chapter: ChapterMeta; children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarRail activeSlug={chapter.slug} />
      <div className="flex-1 min-w-0">
        <Topbar chapter={chapter} />
        {children}
      </div>
    </div>
  );
}
