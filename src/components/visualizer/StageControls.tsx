import { ChevronLeft, Play, Pause, ChevronRight, RotateCcw } from 'lucide-react';

export default function StageControls({
  index, total, playing, onPrev, onNext, onTogglePlay, onReset,
}: {
  index: number; total: number; playing: boolean;
  onPrev: () => void; onNext: () => void; onTogglePlay: () => void; onReset: () => void;
}) {
  const btn = 'w-7 h-7 rounded-md flex items-center justify-center';
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="mono text-[10.5px] mr-1 tabular-nums" style={{ color: 'var(--color-faint-foreground)' }}>
        {index + 1} / {total}
      </span>
      <button className={btn} title="ย้อน 1 ขั้น (←)" onClick={onPrev} style={{ background: 'var(--step-control-btn-bg)', color: 'var(--color-foreground)' }}>
        <ChevronLeft size={14} />
      </button>
      <button
        className={btn}
        title="เล่นอัตโนมัติ (space)"
        onClick={onTogglePlay}
        style={{ background: 'var(--step-control-btn-primary-bg)', color: 'var(--step-control-btn-primary-fg)' }}
      >
        {playing ? <Pause size={13} /> : <Play size={13} />}
      </button>
      <button className={btn} title="ถัดไป 1 ขั้น (→)" onClick={onNext} style={{ background: 'var(--step-control-btn-bg)', color: 'var(--color-foreground)' }}>
        <ChevronRight size={14} />
      </button>
      <button className={btn} title="เริ่มใหม่ (R)" onClick={onReset} style={{ background: 'var(--step-control-btn-bg)', color: 'var(--color-foreground)' }}>
        <RotateCcw size={13} />
      </button>
    </div>
  );
}
