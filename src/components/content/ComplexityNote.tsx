import type { ReactNode } from 'react';

/** Fallback for the "Complexity" section slot when the source PDF gives no Big-O to
 *  put in a ComplexityTable — same slot, plain-text explanation instead. */
export default function ComplexityNote({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13.5px]" style={{ color: 'var(--color-muted-foreground)' }}>
      {children}
    </p>
  );
}
