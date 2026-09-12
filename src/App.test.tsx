import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// HashRouter (spec §2) reads window.location.hash, so tests drive the hash, not history.pushState
describe('App router', () => {
  it('renders the coming-soon page for a nonexistent chapter slug (all 8 chapters are now built)', () => {
    window.location.hash = '#/chapter/does-not-exist';
    render(<App />);
    expect(screen.getByText(/กำลังจะมาเร็วๆ นี้/)).toBeInTheDocument();
  });

  it('redirects the root path to chapter 01 (now earliest available in curriculum order)', () => {
    window.location.hash = '#/';
    render(<App />);
    expect(screen.getByText('arrayMax')).toBeInTheDocument();
  });

  it('serves chapter 01 directly at its own route', () => {
    window.location.hash = '#/chapter/intro-bigo';
    render(<App />);
    expect(screen.getByText('arrayMax')).toBeInTheDocument();
  });

  it('still serves chapter 03 directly at its own route', () => {
    window.location.hash = '#/chapter/trees-bst';
    render(<App />);
    expect(screen.getByText('insert(37)')).toBeInTheDocument();
  });

  it('serves chapter 04 at its own route', () => {
    window.location.hash = '#/chapter/search-trees';
    render(<App />);
    expect(screen.getByText('insert(54) + rebalance')).toBeInTheDocument();
  });

  it('serves chapter 05 at its own route', () => {
    window.location.hash = '#/chapter/heaps-pq';
    render(<App />);
    expect(screen.getByText('maxHeapify(A, 1)')).toBeInTheDocument();
  });
});
