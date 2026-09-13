// src/components/content/Quiz.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Quiz from './Quiz';
import type { QuizQuestion } from '../../types';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'สมมุติมีค่านี้ ต้องเปรียบเทียบกี่ครั้ง?',
    options: [
      { id: 'a', label: '2 ครั้ง', correct: true },
      { id: 'b', label: '4 ครั้ง', correct: false },
    ],
    explain: 'ความลึกของ node ที่แทรกคือ 2 จึงเปรียบเทียบ 2 ครั้ง',
  },
];

describe('Quiz', () => {
  it('shows the explanation only after an option is clicked', () => {
    render(<Quiz questions={QUESTIONS} />);
    expect(screen.queryByText(/ความลึกของ node/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('2 ครั้ง'));
    expect(screen.getByText(/ความลึกของ node/)).toBeInTheDocument();
  });

  it('marks the clicked wrong option and does not crash', () => {
    render(<Quiz questions={QUESTIONS} />);
    fireEvent.click(screen.getByText('4 ครั้ง'));
    expect(screen.getByText(/ความลึกของ node/)).toBeInTheDocument();
  });

  it('locks every option after the first answer (spec §5: one attempt per page load)', () => {
    render(<Quiz questions={QUESTIONS} />);
    fireEvent.click(screen.getByText('4 ครั้ง'));
    screen.getAllByRole('button').forEach((b) => expect(b).toBeDisabled());
  });
});
