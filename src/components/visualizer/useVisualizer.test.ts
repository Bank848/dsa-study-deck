// src/components/visualizer/useVisualizer.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useVisualizer } from './useVisualizer';
import type { VisualizerStep } from '../../types';

const STEPS: VisualizerStep[] = [
  { chip: 'a', lines: [1], narr: 'first' },
  { chip: 'b', lines: [2], narr: 'second' },
  { chip: 'c', lines: [3], narr: 'third' },
];

describe('useVisualizer', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('starts at index 0 with the first step', () => {
    const { result } = renderHook(() => useVisualizer(STEPS));
    expect(result.current.index).toBe(0);
    expect(result.current.step.narr).toBe('first');
    expect(result.current.total).toBe(3);
  });

  it('next() advances but clamps at the last step', () => {
    const { result } = renderHook(() => useVisualizer(STEPS));
    act(() => result.current.next());
    act(() => result.current.next());
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.index).toBe(2);
  });

  it('prev() clamps at 0', () => {
    const { result } = renderHook(() => useVisualizer(STEPS));
    act(() => result.current.prev());
    expect(result.current.index).toBe(0);
  });

  it('goTo() jumps directly to a step', () => {
    const { result } = renderHook(() => useVisualizer(STEPS));
    act(() => result.current.goTo(2));
    expect(result.current.index).toBe(2);
    expect(result.current.step.narr).toBe('third');
  });

  it('reset() returns to index 0', () => {
    const { result } = renderHook(() => useVisualizer(STEPS));
    act(() => result.current.goTo(2));
    act(() => result.current.reset());
    expect(result.current.index).toBe(0);
  });

  it('onKeyDown() advances on ArrowRight (handler is element-scoped, not a window listener)', () => {
    const { result } = renderHook(() => useVisualizer(STEPS));
    const ev = { key: 'ArrowRight', preventDefault() {}, target: document.body } as unknown as React.KeyboardEvent<HTMLElement>;
    act(() => result.current.onKeyDown(ev));
    expect(result.current.index).toBe(1);
  });

  it('togglePlay() auto-advances on an interval and stops at the last step', () => {
    const { result } = renderHook(() => useVisualizer(STEPS));
    act(() => result.current.togglePlay());
    expect(result.current.playing).toBe(true);
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.index).toBe(2);
    expect(result.current.playing).toBe(false);
  });
});
