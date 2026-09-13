import { describe, it, expect } from 'vitest';
import type { LinearScene, BucketScene, MatchScene, GridScene, Scene } from './types';

describe('Scene union (Plan A additions)', () => {
  it('accepts a LinearScene as a Scene', () => {
    const linear: LinearScene = { type: 'linear', orientation: 'stack', cells: [{ value: 'A', state: 'idle' }], pointerLabel: 'top: A' };
    const s: Scene = linear;
    expect(s.type).toBe('linear');
  });
  it('accepts a BucketScene as a Scene', () => {
    const bucket: BucketScene = { type: 'bucket', buckets: [{ index: 0, values: [], state: 'idle' }] };
    const s: Scene = bucket;
    expect(s.type).toBe('bucket');
  });
  it('accepts a MatchScene as a Scene', () => {
    const match: MatchScene = { type: 'match', text: 'ab', pattern: 'a', shift: 0, charStates: { 0: 'compare' } };
    const s: Scene = match;
    expect(s.type).toBe('match');
  });
  it('accepts a GridScene as a Scene', () => {
    const grid: GridScene = { type: 'grid', cells: [[0]], rowLabels: ['-'], colLabels: ['-'], cellState: { '0-0': 'filled' } };
    const s: Scene = grid;
    expect(s.type).toBe('grid');
  });
});

describe('CounterScene (Plan C addition)', () => {
  it('accepts a CounterScene as a Scene', () => {
    const s: Scene = { type: 'counter', values: [3, 7, 2], activeIndex: 1, markedIndex: 0, opCount: 4 };
    expect(s.type).toBe('counter');
  });
});
