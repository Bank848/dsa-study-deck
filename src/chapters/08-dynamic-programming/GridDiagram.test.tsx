// src/chapters/08-dynamic-programming/GridDiagram.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GridDiagram from './GridDiagram';
import { LCS_STEPS } from './steps';

describe('GridDiagram', () => {
  it('renders the base row/column as 0', () => {
    const { container } = render(<GridDiagram scene={LCS_STEPS[0].scene} />);
    const cells = Array.from(container.querySelectorAll('td div')).map((d) => d.textContent);
    expect(cells[0]).toBe('0');
  });
  it('renders the final table with c[7][6] = 4', () => {
    const { container } = render(<GridDiagram scene={LCS_STEPS[7].scene} />);
    const rows = container.querySelectorAll('tbody tr');
    const lastRow = rows[rows.length - 1];
    const lastCell = lastRow.querySelectorAll('td div')[6];
    expect(lastCell.textContent).toBe('4');
  });
});
