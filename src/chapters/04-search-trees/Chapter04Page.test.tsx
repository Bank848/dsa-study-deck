import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter04Page from './Chapter04Page';

describe('Chapter04Page', () => {
  it('renders the stage, concept content, complexity table, and quiz', () => {
    render(
      <MemoryRouter>
        <Chapter04Page />
      </MemoryRouter>
    );
    expect(screen.getByText('insert(54) + rebalance')).toBeInTheDocument();
    expect(screen.getAllByText(/ต่างกันไม่เกิน 1/).length).toBeGreaterThan(0);
    expect(screen.getByText('restructure (1 rotation)')).toBeInTheDocument();
  });

  it('shows node 62 in the diagram itself as the new subtree root after the rotation step', () => {
    render(
      <MemoryRouter>
        <Chapter04Page />
      </MemoryRouter>
    );
    // step chips are buttons labeled "N chip-text" — scope to role=button since the lesson/
    // concept/quiz prose also mentions "หมุนต้นไม้" in plain text elsewhere on the page
    const rotateChip = screen.getByRole('button', { name: /หมุนต้นไม้/ });
    fireEvent.click(rotateChip);
    // scope to the tree diagram's own SVG specifically (its viewBox is "0 0 780 ..."), not the
    // small GitBranch icon svg that Stage also renders in its header, and not the whole page —
    // a quiz answer option is also literally labeled '62'
    const svg = screen.getByTestId('stage').querySelector('svg[viewBox^="0 0 780"]')!;
    const svgLabels = Array.from(svg.querySelectorAll('text')).map((t) => t.textContent);
    expect(svgLabels).toContain('62');
    expect(svgLabels).toContain('54'); // regression guard: node 54 must not be a dangling edge with no node
  });
});
