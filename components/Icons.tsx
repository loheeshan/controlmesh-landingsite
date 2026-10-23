type P = { size?: number; color?: string };

const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true as const });

export const PlayIcon = ({ size = 14 }: P) => (
  <svg {...base(size)} fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
export const PauseIcon = ({ size = 16 }: P) => (
  <svg {...base(size)} fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
);
export const ChevronRight = ({ size = 16, color = "currentColor" }: P) => (
  <svg {...base(size)} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
);
export const ChevronDown = ({ size = 14, color = "currentColor" }: P) => (
  <svg {...base(size)} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
);
export const SearchIcon = ({ size = 18 }: P) => (
  <svg {...base(size)} fill="none" stroke="#9A9087" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
);
export const PlusIcon = ({ size = 18 }: P) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);
export const MinusIcon = ({ size = 18 }: P) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14" /></svg>
);
export const HomeIcon = ({ size = 18 }: P) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v9H4z" /></svg>
);
export const PackageIcon = ({ size = 22, color = "#FF8A47" }: P) => (
  <svg {...base(size)} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /></svg>
);
export const LockIcon = ({ size = 18, color = "#8EC5FF" }: P) => (
  <svg {...base(size)} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
export const ShieldIcon = ({ size = 26, color = "#8EC5FF" }: P) => (
  <svg {...base(size)} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
);
export const MailIcon = ({ size = 14 }: P) => (
  <svg {...base(size)} fill="none" stroke="#0F0E0D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const FileIcon = ({ size = 14 }: P) => (
  <svg {...base(size)} fill="none" stroke="#0F0E0D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6" /></svg>
);
export const CrossIcon = ({ size = 14 }: P) => (
  <svg {...base(size)} fill="#F5EFE6"><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" /></svg>
);
