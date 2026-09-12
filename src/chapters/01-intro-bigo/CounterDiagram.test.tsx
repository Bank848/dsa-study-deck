import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CounterDiagram from './CounterDiagram';
import { ARRAYMAX_STEPS } from './steps';

describe('CounterDiagram', () => {
  it('renders every array value', () => {
    const { container } = render(<CounterDiagram scene={ARRAYMAX_STEPS[0].scene} />);
    // value cells only, not the index labels below each cell — index 2 and value 2 would
    // otherwise collide under a plain getByText('2')
    const cellTexts = Array.from(container.querySelectorAll('.font-semibold')).map((el) => el.textContent);
    [3, 7, 2, 9, 5].forEach((v) => expect(cellTexts).toContain(String(v)));
  });
  it('shows the running op count', () => {
    render(<CounterDiagram scene={ARRAYMAX_STEPS[5].scene} />);
    expect(screen.getByText('23')).toBeInTheDocument();
  });
});
