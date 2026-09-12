import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter03Page from './Chapter03Page';

describe('Chapter03Page', () => {
  it('renders the stage, concept content, complexity table, and quiz', () => {
    render(
      <MemoryRouter>
        <Chapter03Page />
      </MemoryRouter>
    );
    expect(screen.getByText('insert(37)')).toBeInTheDocument();
    // this sentence appears twice (intro paragraph + ConceptCard's first bullet) — use
    // getAllByText, not getByText, or Testing Library throws on the multi-match
    expect(screen.getAllByText(/แต่ละ node มีลูกได้สูงสุด 2 ฝั่ง/).length).toBeGreaterThan(0);
    expect(screen.getByText('search')).toBeInTheDocument();
    expect(screen.getAllByText(/O\(log n\)/).length).toBeGreaterThan(0);
  });
});
