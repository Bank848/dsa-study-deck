// src/chapters/06-hash-tables/Chapter06Page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter06Page from './Chapter06Page';

describe('Chapter06Page', () => {
  it('renders the stage, concept content, complexity note, and quiz', () => {
    render(
      <MemoryRouter>
        <Chapter06Page />
      </MemoryRouter>
    );
    expect(screen.getByText('insert (separate chaining)')).toBeInTheDocument();
    expect(screen.getAllByText(/without performing a search/).length).toBeGreaterThan(0);
    expect(screen.getByText(/เฉลี่ย O\(1\)/)).toBeInTheDocument();
  });
});
