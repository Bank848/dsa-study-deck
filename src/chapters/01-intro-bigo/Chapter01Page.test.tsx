import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter01Page from './Chapter01Page';

describe('Chapter01Page', () => {
  it('renders the stage, concept content, growth chart section, and quiz', () => {
    render(
      <MemoryRouter>
        <Chapter01Page />
      </MemoryRouter>
    );
    expect(screen.getByText('arrayMax')).toBeInTheDocument();
    expect(screen.getAllByText(/f\(n\) ≤ c·g\(n\)/).length).toBeGreaterThan(0);
    expect(screen.getByText('Growth rates')).toBeInTheDocument();
    expect(screen.getAllByText(/7n − 1/).length).toBeGreaterThan(0);
  });
});
