export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ color: "var(--brand)" }}>
      <path
        d="M6 8L26 8L16 26Z M6 8L16 16 M26 8L16 16 M16 26L16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="8" r="3.2" fill="currentColor" />
      <circle cx="26" cy="8" r="3.2" fill="currentColor" />
      <circle cx="16" cy="26" r="3.2" fill="currentColor" />
      <circle cx="16" cy="16" r="2.6" style={{ fill: "var(--text)" }} />
    </svg>
  );
}
