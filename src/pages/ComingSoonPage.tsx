import { useParams } from 'react-router-dom';
import { getChapterBySlug } from '../data/chapters';

export default function ComingSoonPage() {
  const { slug } = useParams<{ slug: string }>();
  const chapter = slug ? getChapterBySlug(slug) : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div>
        <p className="mono text-[11px] tracking-[.14em] uppercase mb-2" style={{ color: 'var(--color-faint-foreground)' }}>
          {chapter ? `${chapter.id} · ${chapter.title}` : 'บทนี้'}
        </p>
        <h1 className="text-[20px] font-semibold mb-2">กำลังจะมาเร็วๆ นี้</h1>
        <p className="text-[14px]" style={{ color: 'var(--color-muted-foreground)' }}>
          บทนี้ยังไม่เปิดใช้งาน ลองดูบท 03 · Trees &amp; BST ที่พร้อมแล้วก่อนได้
        </p>
      </div>
    </div>
  );
}
