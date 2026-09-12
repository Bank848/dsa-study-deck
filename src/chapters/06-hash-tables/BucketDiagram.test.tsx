// src/chapters/06-hash-tables/BucketDiagram.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BucketDiagram from './BucketDiagram';
import { HASH_STEPS } from './steps';

describe('BucketDiagram', () => {
  it('renders 7 buckets', () => {
    const { container } = render(<BucketDiagram scene={HASH_STEPS[0].scene} />);
    expect(container.querySelectorAll('[class*="grid-cols-7"] > div').length).toBe(7);
  });
  it('shows a chained bucket with both values after a collision', () => {
    render(<BucketDiagram scene={HASH_STEPS[4].scene} />);
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('47')).toBeInTheDocument();
  });
});
