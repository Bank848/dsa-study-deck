// src/chapters/02-stacks-queues/Chapter02Page.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter02Page from './Chapter02Page';

describe('Chapter02Page', () => {
  it('renders both stages, concept content, complexity table, and quiz', () => {
    render(
      <MemoryRouter>
        <Chapter02Page />
      </MemoryRouter>
    );
    expect(screen.getByText('push / pop')).toBeInTheDocument();
    expect(screen.getByText('enqueue / dequeue')).toBeInTheDocument();
    expect(screen.getAllByText(/Last-In-First-Out/i).length).toBeGreaterThan(0);
    expect(screen.getByText('push / enqueue')).toBeInTheDocument();
  });
});
