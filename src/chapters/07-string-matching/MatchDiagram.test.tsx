// src/chapters/07-string-matching/MatchDiagram.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MatchDiagram from './MatchDiagram';
import { MATCH_STEPS } from './steps';

describe('MatchDiagram', () => {
  it('renders every text character', () => {
    render(<MatchDiagram scene={MATCH_STEPS[0].scene} />);
    'acaabc'.split('').forEach((ch) => expect(screen.getAllByText(ch).length).toBeGreaterThan(0));
  });
  it('renders the full pattern once matched', () => {
    render(<MatchDiagram scene={MATCH_STEPS[8].scene} />);
    expect(screen.getAllByText('a').length).toBeGreaterThan(0);
    expect(screen.getAllByText('b').length).toBeGreaterThan(0);
  });
});
