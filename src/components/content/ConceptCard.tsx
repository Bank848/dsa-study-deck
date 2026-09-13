import { Check } from 'lucide-react';

export default function ConceptCard({ points }: { points: string[] }) {
  return (
    <div className="grid gap-2.5 mb-5">
      {points.map((p, k) => (
        <div
          key={k}
          className="rounded-xl p-4 flex gap-3"
          style={{ background: 'var(--concept-card-bg)', border: '1px solid var(--concept-card-border)' }}
        >
          <span
            className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
          >
            <Check size={12} strokeWidth={3} />
          </span>
          <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--color-foreground)' }}>{p}</p>
        </div>
      ))}
    </div>
  );
}
