import type { ReactNode } from 'react';
import { GitBranch } from 'lucide-react';
import { useVisualizer } from './useVisualizer';
import StepChips from './StepChips';
import StageControls from './StageControls';
import NarrationBar from './NarrationBar';
import type { VisualizerStep } from '../../types';

export interface StageProps {
  operationLabel: string;
  scopeLabel?: string;
  steps: VisualizerStep[];
  code: string[];
  /** legend comes from the demo (spec §5), as a CSS color/var string — Stage knows no node states */
  legend: { color: string; label: string }[];
  renderDiagram: (step: VisualizerStep, index: number) => ReactNode;
}

export default function Stage({ operationLabel, scopeLabel, steps, code, legend, renderDiagram }: StageProps) {
  const v = useVisualizer(steps);

  return (
    <section
      data-testid="stage"
      tabIndex={0}
      onKeyDown={v.onKeyDown}
      className="border-b"
      style={{ borderColor: 'var(--color-border)', background: 'var(--visualizer-panel-bg)' }}
    >
      <div className="px-6 h-[46px] flex items-center gap-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="flex items-center gap-2 shrink-0">
          <GitBranch size={14} style={{ color: 'var(--color-accent)' }} />
          <span className="mono text-[12px] font-semibold">{operationLabel}</span>
          {scopeLabel && <span className="mono text-[10px]" style={{ color: 'var(--color-faint-foreground)' }}>· {scopeLabel}</span>}
        </div>
        <StepChips steps={steps} index={v.index} onSelect={v.goTo} />
        <StageControls index={v.index} total={v.total} playing={v.playing} onPrev={v.prev} onNext={v.next} onTogglePlay={v.togglePlay} onReset={v.reset} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_412px]">
        <div className="px-6 py-3 border-b xl:border-b-0 xl:border-r" style={{ borderColor: 'var(--color-border-subtle)' }}>
          {renderDiagram(v.step, v.index)}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 mono text-[9.5px]" style={{ color: 'var(--color-faint-foreground)' }}>
            {legend.map((l) => (
              <span key={l.label} className="flex items-center gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full border-2 inline-block" style={{ borderColor: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="px-4 py-3 flex flex-col gap-2 min-w-0 h-full">
          <div className="flex items-center justify-between">
            <span className="mono text-[9.5px] tracking-[.12em] uppercase" style={{ color: 'var(--color-faint-foreground)' }}>pseudocode</span>
            {v.step.pill && (
              <span className="mono text-[10.5px] px-2 py-0.5 rounded" style={{ background: 'var(--color-highlight-soft)', color: 'var(--color-highlight)' }}>
                {v.step.pill}
              </span>
            )}
          </div>
          <pre
            className="mono text-[11px] leading-[1.8] rounded-[10px] py-2.5 overflow-x-auto flex-1"
            style={{ background: 'var(--color-code-surface)', border: '1px solid var(--color-border)' }}
          >
            {code.map((line, k) => {
              const active = v.step.lines.includes(k + 1);
              return (
                <div
                  key={k}
                  className="px-3"
                  style={{
                    background: active ? 'var(--pseudocode-block-active-line-bg)' : 'transparent',
                    color: active ? 'var(--pseudocode-block-active-line-fg)' : 'var(--pseudocode-block-idle-line-fg)',
                    borderLeft: active ? '2px solid var(--pseudocode-block-active-line-border)' : '2px solid transparent',
                  }}
                >
                  <span className="inline-block w-5" style={{ color: 'var(--pseudocode-block-gutter-fg)' }}>{k + 1}</span>
                  {line}
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      <NarrationBar text={v.step.narr} done={v.index === v.total - 1} />
    </section>
  );
}
