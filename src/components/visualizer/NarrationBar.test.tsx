import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NarrationBar from './NarrationBar';

describe('NarrationBar', () => {
  it('turns **bold** and `code` markup into real elements, not innerHTML', () => {
    render(<NarrationBar text="เข้า **else** → เรียก `node.right`" />);
    expect(screen.getByText('else').tagName).toBe('STRONG');
    expect(screen.getByText('node.right').tagName).toBe('CODE');
  });

  it('never interprets raw HTML in narration text', () => {
    render(<NarrationBar text="<b>x</b>" />);
    expect(screen.getByText('<b>x</b>')).toBeInTheDocument();
  });
});
