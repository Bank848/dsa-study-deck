export default function InsertDecisionFlowchart() {
  const box = { fill: 'var(--color-surface-raised)', stroke: 'var(--color-border-strong)' };
  return (
    <svg width="100%" height="150" viewBox="0 0 560 150">
      <rect x="10" y="55" width="120" height="40" rx="8" fill={box.fill} stroke={box.stroke} />
      <text x="70" y="79" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--color-foreground)">node is null?</text>

      <line x1="130" y1="45" x2="220" y2="20" stroke="var(--color-success)" strokeWidth="1.6" />
      <text x="165" y="28" fontFamily="JetBrains Mono" fontSize="10" fill="var(--color-success)">ใช่</text>
      <rect x="220" y="4" width="150" height="34" rx="8" fill="var(--color-success-soft)" stroke="var(--color-success)" />
      <text x="295" y="25" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10.5" fill="var(--color-success)">return new Node(value)</text>

      <line x1="130" y1="85" x2="220" y2="105" stroke="var(--color-warning)" strokeWidth="1.6" />
      <text x="165" y="112" fontFamily="JetBrains Mono" fontSize="10" fill="var(--color-warning)">ไม่</text>
      <rect x="220" y="88" width="150" height="34" rx="8" fill={box.fill} stroke={box.stroke} />
      <text x="295" y="109" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10.5" fill="var(--color-foreground)">value &lt; node.value?</text>

      <line x1="370" y1="97" x2="430" y2="70" stroke="var(--color-accent)" strokeWidth="1.6" />
      <text x="392" y="80" fontFamily="JetBrains Mono" fontSize="10" fill="var(--color-accent)">ใช่</text>
      <rect x="430" y="55" width="120" height="34" rx="8" fill="var(--color-accent-soft)" stroke="var(--color-accent)" />
      <text x="490" y="76" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10"  fill="var(--color-accent)">ไปทางซ้าย</text>

      <line x1="370" y1="113" x2="430" y2="130" stroke="var(--color-accent)" strokeWidth="1.6" />
      <text x="392" y="128" fontFamily="JetBrains Mono" fontSize="10" fill="var(--color-accent)">ไม่</text>
      <rect x="430" y="113" width="120" height="34" rx="8" fill="var(--color-accent-soft)" stroke="var(--color-accent)" />
      <text x="490" y="134" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--color-accent)">ไปทางขวา</text>
    </svg>
  );
}
