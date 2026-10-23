export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 8L26 8L16 26Z M6 8L16 16 M26 8L16 16 M16 26L16 16"
        stroke="#FF6B1A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="8" r="3.2" fill="#FF6B1A" />
      <circle cx="26" cy="8" r="3.2" fill="#FF6B1A" />
      <circle cx="16" cy="26" r="3.2" fill="#FF6B1A" />
      <circle cx="16" cy="16" r="2.6" fill="#F5EFE6" />
    </svg>
  );
}
