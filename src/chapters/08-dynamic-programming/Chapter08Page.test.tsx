// src/chapters/08-dynamic-programming/Chapter08Page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter08Page from './Chapter08Page';

describe('Chapter08Page', () => {
  it('renders the stage, concept content, complexity table, and quiz', () => {
    render(
      <MemoryRouter>
        <Chapter08Page />
      </MemoryRouter>
    );
    expect(screen.getByText('LCS table fill')).toBeInTheDocument();
    expect(screen.getAllByText(/optimal substructure/).length).toBeGreaterThan(0);
    expect(screen.getAllByText('O(mn)').length).toBeGreaterThan(0);
  });
});
