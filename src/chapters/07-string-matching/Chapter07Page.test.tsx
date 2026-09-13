// src/chapters/07-string-matching/Chapter07Page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter07Page from './Chapter07Page';

describe('Chapter07Page', () => {
  it('renders the stage, concept content, complexity note, and quiz', () => {
    render(
      <MemoryRouter>
        <Chapter07Page />
      </MemoryRouter>
    );
    expect(screen.getByText('naive matching')).toBeInTheDocument();
    expect(screen.getAllByText(/naive matching/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Running time\?/)).toBeInTheDocument();
  });
});
