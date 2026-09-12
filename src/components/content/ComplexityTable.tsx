import type { ComplexityRow } from '../../types';

export default function ComplexityTable({ rows }: { rows: ComplexityRow[] }) {
  return (
    <table className="w-full text-[13px] border-collapse mb-2">
      <thead>
        <tr style={{ color: 'var(--color-faint-foreground)' }} className="mono text-[10px] uppercase tracking-[.08em]">
          <th className="text-left py-2 font-medium">operation</th>
          <th className="text-left py-2 font-medium">best</th>
          <th className="text-left py-2 font-medium">average</th>
          <th className="text-left py-2 font-medium">worst</th>
          <th className="text-left py-2 font-medium">growth</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.op} style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            <td className="py-2.5 mono">{r.op}</td>
            <td className="py-2.5 mono" style={{ color: 'var(--color-muted-foreground)' }}>{r.best}</td>
            <td className="py-2.5 mono" style={{ color: 'var(--color-muted-foreground)' }}>{r.avg}</td>
            <td className="py-2.5">
              <span
                className="mono text-[11px] px-2 py-0.5 rounded"
                style={{
                  background: r.worstGood ? 'var(--complexity-badge-good-bg)' : 'var(--complexity-badge-warn-bg)',
                  color: r.worstGood ? 'var(--complexity-badge-good-fg)' : 'var(--complexity-badge-warn-fg)',
                }}
              >
                {r.worst}
              </span>
            </td>
            <td className="py-2.5 w-24">
              <div className="h-1.5 rounded-full" style={{ background: 'var(--color-surface-raised)' }}>
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${r.growthPct}%`, background: r.worstGood ? 'var(--color-success)' : 'var(--color-warning)' }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
