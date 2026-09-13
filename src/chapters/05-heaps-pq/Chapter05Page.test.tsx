import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Chapter05Page from './Chapter05Page';

describe('Chapter05Page', () => {
  it('renders the stage (tree + array views), concept content, and quiz; no complexity table', () => {
    const { container } = render(
      <MemoryRouter>
        <Chapter05Page />
      </MemoryRouter>
    );
    expect(screen.getByText('maxHeapify(A, 1)')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument(); // tree view
    expect(screen.getAllByText('16').length).toBeGreaterThan(0); // array view, index 0
    expect(screen.getByText(/ไม่ได้ระบุ Big-O/)).toBeInTheDocument();
  });

  it('shows the final swapped array after stepping to the last chip', () => {
    render(
      <MemoryRouter>
        <Chapter05Page />
      </MemoryRouter>
    );
    // index 3 starts at value 4 (ARRAY_0) — a page-wide getAllByText('8') would trivially pass
    // even without stepping, since ARRAY_0 already has an unrelated '8' at index 8 (both the
    // cell value and its index label render as text '8') — assert on the specific cell instead
    expect(screen.getByTestId('heap-cell-value-3')).toHaveTextContent('4');
    const lastChip = screen.getByText(/heap property คืนสภาพ/);
    fireEvent.click(lastChip);
    expect(screen.getByTestId('heap-cell-value-3')).toHaveTextContent('8'); // index 3 now holds 8, moved from 4
  });
});
