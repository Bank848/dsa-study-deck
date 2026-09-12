import { useCallback, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { VisualizerStep } from '../../types';

/** Mirrors design token `step-control.autoplay-interval` (--step-control-autoplay-interval: 1200ms).
 *  Kept as a number because setInterval needs ms, not a CSS string — change both together. */
const PLAY_INTERVAL_MS = 1200;

export function useVisualizer(steps: VisualizerStep[]) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = steps.length - 1;

  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(last, i))), [last]);
  const next = useCallback(() => setIndex((i) => Math.min(last, i + 1)), [last]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const reset = useCallback(() => setIndex(0), []);
  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const n = Math.min(last, i + 1);
        if (n === last) setPlaying(false);
        return n;
      });
    }, PLAY_INTERVAL_MS);
    return () => clearInterval(id); // ponytail: effect cleanup owns the id, no timerRef needed
  }, [playing, last]);

  /** spec §5: shortcuts are scoped to the stage element (attach via onKeyDown on a tabIndex=0
   *  element), never window — so `space` on a focused quiz option still answers the quiz.
   *  Space is also left alone when a button inside the stage has focus, so a focused chip/control
   *  activates normally instead of being hijacked into play/pause. */
  const onKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === ' ' && (e.target as HTMLElement).tagName !== 'BUTTON') { e.preventDefault(); togglePlay(); }
    else if (e.key === 'r' || e.key === 'R') reset();
  }, [next, prev, togglePlay, reset]);

  return { index, step: steps[index], total: steps.length, playing, next, prev, reset, goTo, togglePlay, onKeyDown };
}
