// src/chapters/02-stacks-queues/LinearDiagram.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LinearDiagram from './LinearDiagram';
import { STACK_STEPS, QUEUE_STEPS } from './steps';

describe('LinearDiagram', () => {
  it('shows "ว่าง" when the stack has no cells', () => {
    render(<LinearDiagram scene={STACK_STEPS[0].scene} />);
    expect(screen.getByText('ว่าง')).toBeInTheDocument();
  });
  it('renders every cell value for a populated stack', () => {
    render(<LinearDiagram scene={STACK_STEPS[3].scene} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
  it('shows the queue pointer label', () => {
    render(<LinearDiagram scene={QUEUE_STEPS[1].scene} />);
    expect(screen.getByText('front: 5 / rear: 5')).toBeInTheDocument();
  });
});
