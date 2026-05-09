import type { HouseKind } from "@/data/games";

type Props = { kind: HouseKind; accent: string; className?: string };

// All SVGs use viewBox 0 0 100 100, top-down-ish friendly cartoon style.
// `accent` is a CSS color string (resolved from token by parent).
export function HouseSVG({ kind, accent, className }: Props) {
  switch (kind) {
    case "cottage":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <ellipse cx="50" cy="88" rx="34" ry="6" fill="rgba(0,0,0,0.18)" />
          <rect x="20" y="48" width="60" height="36" rx="4" fill={accent} />
          <polygon points="14,50 50,18 86,50" fill="oklch(0.45 0.15 30)" />
          <rect x="44" y="58" width="14" height="26" rx="2" fill="oklch(0.35 0.08 40)" />
          <circle cx="55" cy="71" r="1.4" fill="oklch(0.9 0.15 90)" />
          <rect x="26" y="56" width="12" height="12" rx="1.5" fill="oklch(0.92 0.1 220)" />
          <rect x="62" y="56" width="12" height="12" rx="1.5" fill="oklch(0.92 0.1 220)" />
          <rect x="46" y="22" width="6" height="14" fill="oklch(0.4 0.12 30)" />
        </svg>
      );
    case "treehouse":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <ellipse cx="50" cy="92" rx="30" ry="5" fill="rgba(0,0,0,0.18)" />
          <rect x="44" y="55" width="12" height="35" fill="oklch(0.4 0.07 40)" />
          <circle cx="50" cy="35" r="30" fill="oklch(0.65 0.18 145)" />
          <circle cx="32" cy="42" r="14" fill="oklch(0.7 0.18 150)" />
          <circle cx="68" cy="42" r="14" fill="oklch(0.7 0.18 150)" />
          <rect x="30" y="40" width="40" height="24" rx="3" fill={accent} />
          <polygon points="26,42 50,24 74,42" fill="oklch(0.45 0.15 30)" />
          <rect x="44" y="48" width="12" height="16" rx="1.5" fill="oklch(0.35 0.08 40)" />
        </svg>
      );
    case "barn":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <ellipse cx="50" cy="88" rx="36" ry="6" fill="rgba(0,0,0,0.18)" />
          <rect x="16" y="46" width="68" height="38" fill={accent} />
          <polygon points="16,46 50,18 84,46" fill="oklch(0.35 0.12 25)" />
          <path d="M20 48 L36 32 M80 48 L64 32 M28 84 V60 M72 84 V60 M28 60 H72" stroke="white" strokeWidth="2" fill="none" />
          <rect x="42" y="56" width="16" height="28" fill="oklch(0.3 0.08 30)" />
          <path d="M42 56 L58 84 M58 56 L42 84" stroke="white" strokeWidth="1.5" />
        </svg>
      );
    case "lighthouse":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <ellipse cx="50" cy="92" rx="26" ry="5" fill="rgba(0,0,0,0.18)" />
          <rect x="32" y="76" width="36" height="14" rx="2" fill="oklch(0.55 0.04 250)" />
          <polygon points="38,76 50,18 62,76" fill="white" />
          <rect x="38" y="32" width="24" height="6" fill={accent} />
          <rect x="38" y="48" width="24" height="6" fill={accent} />
          <rect x="38" y="64" width="24" height="6" fill={accent} />
          <rect x="42" y="22" width="16" height="10" rx="1" fill="oklch(0.9 0.15 90)" />
          <polygon points="46,18 54,18 50,10" fill="oklch(0.45 0.15 30)" />
        </svg>
      );
    case "castle":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <ellipse cx="50" cy="90" rx="38" ry="5" fill="rgba(0,0,0,0.18)" />
          <rect x="14" y="44" width="72" height="42" fill={accent} />
          <rect x="10" y="34" width="14" height="52" fill={accent} />
          <rect x="76" y="34" width="14" height="52" fill={accent} />
          <path d="M10 34 h4 v-6 h2 v6 h2 v-6 h2 v6 h4 M76 34 h4 v-6 h2 v6 h2 v-6 h2 v6 h4 M14 44 h4 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6 h2 v-6 h2 v6" stroke={accent} strokeWidth="0" fill={accent} />
          <rect x="42" y="58" width="16" height="28" rx="8" fill="oklch(0.3 0.08 30)" />
          <polygon points="14,28 22,18 30,28" fill="oklch(0.45 0.15 30)" />
          <polygon points="70,28 78,18 86,28" fill="oklch(0.45 0.15 30)" />
        </svg>
      );
    case "tent":
      return (
        <svg viewBox="0 0 100 100" className={className} aria-hidden>
          <ellipse cx="50" cy="90" rx="34" ry="5" fill="rgba(0,0,0,0.18)" />
          <polygon points="50,18 14,86 86,86" fill={accent} />
          <polygon points="50,18 36,86 50,86" fill="white" opacity="0.25" />
          <polygon points="50,30 38,86 50,86 62,86" fill="oklch(0.3 0.08 30)" />
          <polygon points="46,14 54,14 50,8" fill="oklch(0.45 0.15 30)" />
          <line x1="50" y1="18" x2="50" y2="8" stroke="oklch(0.4 0.07 40)" strokeWidth="1.5" />
        </svg>
      );
  }
}
