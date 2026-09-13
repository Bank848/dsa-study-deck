// src/components/content/ComplexityTable.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComplexityTable from './ComplexityTable';
import type { ComplexityRow } from '../../types';

const ROWS: ComplexityRow[] = [
  { op: 'search', best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', worstGood: false, growthPct: 80 },
  { op: 'insert', best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', worstGood: false, growthPct: 80 },
];

describe('ComplexityTable', () => {
  it('renders one row per operation with its worst-case value', () => {
    render(<ComplexityTable rows={ROWS} />);
    expect(screen.getByText('search')).toBeInTheDocument();
    expect(screen.getAllByText('O(n)')).toHaveLength(2);
  });
});
