export interface LessonSection {
  title: string;
  body: string;
}

export default function LessonExplainer({ sections }: { sections: LessonSection[] }) {
  return (
    <div className="grid gap-5 mb-6">
      {sections.map((s, k) => (
        <div key={k}>
          <h3 className="text-[13.5px] font-semibold mb-1.5" style={{ color: 'var(--color-foreground)' }}>
            {s.title}
          </h3>
          <p className="text-[14.5px] leading-[1.85]" style={{ color: 'var(--color-muted-foreground)' }}>
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}
