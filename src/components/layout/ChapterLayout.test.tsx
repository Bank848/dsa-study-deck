import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ChapterLayout from './ChapterLayout';
import { CHAPTERS } from '../../data/chapters';

describe('ChapterLayout', () => {
  it('renders the chapter title and its children', () => {
    const chapter = CHAPTERS.find((c) => c.slug === 'trees-bst')!;
    render(
      <MemoryRouter>
        <ChapterLayout chapter={chapter}>
          <p>chapter body content</p>
        </ChapterLayout>
      </MemoryRouter>
    );
    expect(screen.getByText('Binary Search Trees')).toBeInTheDocument();
    expect(screen.getByText('chapter body content')).toBeInTheDocument();
  });
});
