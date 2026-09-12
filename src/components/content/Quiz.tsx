import { useState } from 'react';
import type { QuizQuestion } from '../../types';

type RevealState = 'correct' | 'wrong' | 'idle';

const OPTION_STYLE: Record<RevealState, { bg: string; border: string; keyBg: string; keyFg: string }> = {
  correct: { bg: 'var(--quiz-option-correct-bg)', border: 'var(--quiz-option-correct-border)', keyBg: 'var(--quiz-option-key-correct-bg)', keyFg: 'var(--quiz-option-key-correct-fg)' },
  wrong: { bg: 'var(--quiz-option-wrong-bg)', border: 'var(--quiz-option-wrong-border)', keyBg: 'var(--quiz-option-key-wrong-bg)', keyFg: 'var(--quiz-option-key-wrong-fg)' },
  idle: { bg: 'var(--quiz-option-bg)', border: 'var(--quiz-option-border)', keyBg: 'var(--color-surface-raised)', keyFg: 'var(--color-muted-foreground)' },
};

export default function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answered, setAnswered] = useState<Record<string, string>>({});

  return (
    <div className="grid gap-4">
      {questions.map((q) => {
        const chosen = answered[q.id];
        return (
          <div key={q.id}>
            <p className="text-[14px] mb-2.5" style={{ color: 'var(--color-foreground)' }}>{q.prompt}</p>
            <div className="grid gap-2">
              {q.options.map((o) => {
                const isChosen = chosen === o.id;
                const revealState: RevealState = chosen && o.correct ? 'correct' : isChosen && !o.correct ? 'wrong' : 'idle';
                const st = OPTION_STYLE[revealState];
                return (
                  <button
                    key={o.id}
                    disabled={!!chosen}
                    onClick={() => setAnswered((a) => ({ ...a, [q.id]: o.id }))}
                    className="text-left px-3.5 py-2.5 rounded-lg text-[13.5px] flex items-center gap-2.5"
                    style={{
                      background: st.bg,
                      border: `1px solid ${st.border}`,
                      color: 'var(--color-foreground)',
                    }}
                  >
                    <span
                      className="mono text-[10.5px] uppercase w-5 h-5 rounded flex items-center justify-center shrink-0"
                      style={{ background: st.keyBg, color: st.keyFg }}
                    >
                      {o.id}
                    </span>
                    <span>{o.label}</span>
                  </button>
                );
              })}
            </div>
            {chosen && (
              <p className="text-[13px] mt-2" style={{ color: 'var(--color-muted-foreground)' }}>{q.explain}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
