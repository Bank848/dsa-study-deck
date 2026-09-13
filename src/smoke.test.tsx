import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App scaffold', () => {
  it('renders without crashing', () => {
    // chapter 03 (trees-bst) is real as of Task 7, so the root redirect no longer lands on
    // ComingSoonPage — point this smoke test at a nonexistent chapter slug instead, since all 8
    // chapters are now built (heaps-pq shipped in Plan B, the last one still unbuilt)
    window.location.hash = '#/chapter/does-not-exist';
    render(<App />);
    expect(screen.getByText(/กำลังจะมาเร็วๆ นี้/)).toBeInTheDocument();
  });
});
