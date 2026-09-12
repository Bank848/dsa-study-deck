import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HeapArrayDiagram from './HeapArrayDiagram';

describe('HeapArrayDiagram', () => {
  it('renders one cell per array value with its index label', () => {
    const { getByText } = render(<HeapArrayDiagram values={[16, 4, 10]} states={{}} />);
    expect(getByText('16')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument(); // index label for the 3rd cell
  });
});
