import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Stage from './Stage';
import type { VisualizerStep } from '../../types';

const STEPS: VisualizerStep[] = [
  { chip: 'root', lines: [1], narr: 'first narration' },
  { chip: 'done', lines: [2], narr: 'second narration' },
];
const CODE = ['line one', 'line two'];
const LEGEND = [{ color: 'var(--tree-node-ok-stroke)', label: 'สำเร็จ' }];

describe('Stage', () => {
  it('renders operation label, pseudocode, legend, and first-step narration', () => {
    render(
      <Stage
        operationLabel="insert(37)"
        scopeLabel="BST"
        steps={STEPS}
        code={CODE}
        legend={LEGEND}
        renderDiagram={(step) => <div data-testid="diagram">{step.chip}</div>}
      />
    );
    expect(screen.getByText('insert(37)')).toBeInTheDocument();
    expect(screen.getByText('line one')).toBeInTheDocument();
    expect(screen.getByText('สำเร็จ')).toBeInTheDocument();
    expect(screen.getByText('first narration')).toBeInTheDocument();
    expect(screen.getByTestId('diagram')).toHaveTextContent('root');
  });

  it('advances the diagram and narration when a step chip is clicked', () => {
    render(
      <Stage operationLabel="insert(37)" steps={STEPS} code={CODE} legend={LEGEND}
        renderDiagram={(step) => <div data-testid="diagram">{step.chip}</div>} />
    );
    fireEvent.click(screen.getByText('2 done'));
    expect(screen.getByTestId('diagram')).toHaveTextContent('done');
    expect(screen.getByText('second narration')).toBeInTheDocument();
  });

  it('keyboard shortcuts fire only on the stage element, not the whole page (spec §5)', () => {
    render(
      <Stage operationLabel="insert(37)" steps={STEPS} code={CODE} legend={LEGEND}
        renderDiagram={(step) => <div data-testid="diagram">{step.chip}</div>} />
    );
    fireEvent.keyDown(document.body, { key: 'ArrowRight' });
    expect(screen.getByTestId('diagram')).toHaveTextContent('root');
    fireEvent.keyDown(screen.getByTestId('stage'), { key: 'ArrowRight' });
    expect(screen.getByTestId('diagram')).toHaveTextContent('done');
  });
});
