export type AnimalKind = "lion" | "bear" | "bird" | "fox" | "rabbit" | "frog";
export type SignTexture = "fuzzy" | "rigid" | "glossy";

type Props = {
  kind: AnimalKind;
  signColor: string;
  signTexture: SignTexture;
  /** "left" → animal on the left of the house, sign points right (→). */
  facing: "left" | "right";
  className?: string;
};

function SignArrow({
  color,
  texture,
  direction,
}: {
  color: string;
  texture: SignTexture;
  direction: "left" | "right";
}) {
  // Arrow as SVG path inside a rounded rect, with a wooden stick.
  // Rotated when facing left.
  const filterId = `sign-${texture}-${Math.random().toString(36).slice(2, 7)}`;
  const rotate = direction === "left" ? 180 : 0;
  return (
    <svg viewBox="0 0 100 60" className="h-full w-full" aria-hidden>
      <defs>
        {texture === "fuzzy" && (
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 0" />
            <feComposite in2="SourceGraphic" operator="in" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode />
            </feMerge>
          </filter>
        )}
        {texture === "glossy" && (
          <linearGradient id={filterId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.15" />
          </linearGradient>
        )}
        {texture === "rigid" && (
          <pattern id={filterId} width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M0 4 L4 0" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
          </pattern>
        )}
      </defs>
      {/* stick */}
      <rect x="46" y="38" width="8" height="22" rx="2" fill="oklch(0.45 0.08 50)" />
      {/* arrow plate, possibly rotated */}
      <g transform={`rotate(${rotate} 50 25)`}>
        <path
          d="M8 10 H62 L82 25 L62 40 H8 Z"
          fill={color}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="2"
          strokeLinejoin="round"
          filter={texture === "fuzzy" ? `url(#${filterId})` : undefined}
        />
        {texture === "glossy" && (
          <path
            d="M8 10 H62 L82 25 L62 40 H8 Z"
            fill={`url(#${filterId})`}
          />
        )}
        {texture === "rigid" && (
          <path
            d="M8 10 H62 L82 25 L62 40 H8 Z"
            fill={`url(#${filterId})`}
          />
        )}
      </g>
    </svg>
  );
}

function AnimalBody({ kind }: { kind: AnimalKind }) {
  switch (kind) {
    case "lion":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <ellipse cx="50" cy="92" rx="22" ry="4" fill="rgba(0,0,0,0.18)" />
          <circle cx="50" cy="55" r="30" fill="oklch(0.78 0.16 70)" />
          <circle cx="50" cy="55" r="22" fill="oklch(0.88 0.13 85)" />
          <circle cx="42" cy="52" r="3" fill="#222" />
          <circle cx="58" cy="52" r="3" fill="#222" />
          <ellipse cx="50" cy="62" rx="4" ry="3" fill="#3a2a1a" />
          <path d="M46 66 Q50 70 54 66" stroke="#3a2a1a" strokeWidth="2" fill="none" />
        </svg>
      );
    case "bear":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <ellipse cx="50" cy="92" rx="22" ry="4" fill="rgba(0,0,0,0.18)" />
          <circle cx="28" cy="38" r="10" fill="oklch(0.45 0.06 60)" />
          <circle cx="72" cy="38" r="10" fill="oklch(0.45 0.06 60)" />
          <circle cx="50" cy="55" r="28" fill="oklch(0.55 0.07 55)" />
          <circle cx="50" cy="62" r="14" fill="oklch(0.82 0.06 70)" />
          <circle cx="42" cy="50" r="3" fill="#222" />
          <circle cx="58" cy="50" r="3" fill="#222" />
          <ellipse cx="50" cy="62" rx="3" ry="2.5" fill="#222" />
        </svg>
      );
    case "bird":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <ellipse cx="50" cy="92" rx="20" ry="4" fill="rgba(0,0,0,0.18)" />
          <ellipse cx="50" cy="60" rx="26" ry="22" fill="oklch(0.78 0.15 220)" />
          <circle cx="50" cy="40" r="16" fill="oklch(0.85 0.13 220)" />
          <circle cx="46" cy="38" r="2.5" fill="#222" />
          <polygon points="56,40 70,42 56,46" fill="oklch(0.85 0.18 70)" />
          <path d="M30 70 Q22 78 32 80" fill="oklch(0.65 0.15 220)" />
        </svg>
      );
    case "fox":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <ellipse cx="50" cy="92" rx="22" ry="4" fill="rgba(0,0,0,0.18)" />
          <polygon points="20,30 36,40 28,55" fill="oklch(0.7 0.18 40)" />
          <polygon points="80,30 64,40 72,55" fill="oklch(0.7 0.18 40)" />
          <ellipse cx="50" cy="60" rx="26" ry="22" fill="oklch(0.74 0.18 40)" />
          <ellipse cx="50" cy="68" rx="14" ry="10" fill="oklch(0.92 0.04 80)" />
          <circle cx="42" cy="56" r="2.8" fill="#222" />
          <circle cx="58" cy="56" r="2.8" fill="#222" />
          <ellipse cx="50" cy="68" rx="3" ry="2" fill="#222" />
        </svg>
      );
    case "rabbit":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <ellipse cx="50" cy="92" rx="20" ry="4" fill="rgba(0,0,0,0.18)" />
          <ellipse cx="40" cy="22" rx="6" ry="16" fill="oklch(0.92 0.03 320)" />
          <ellipse cx="60" cy="22" rx="6" ry="16" fill="oklch(0.92 0.03 320)" />
          <ellipse cx="40" cy="22" rx="3" ry="10" fill="oklch(0.78 0.1 0)" />
          <ellipse cx="60" cy="22" rx="3" ry="10" fill="oklch(0.78 0.1 0)" />
          <circle cx="50" cy="58" r="26" fill="oklch(0.95 0.02 320)" />
          <circle cx="42" cy="54" r="2.8" fill="#222" />
          <circle cx="58" cy="54" r="2.8" fill="#222" />
          <ellipse cx="50" cy="62" rx="2.5" ry="1.8" fill="oklch(0.78 0.1 0)" />
        </svg>
      );
    case "frog":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <ellipse cx="50" cy="92" rx="24" ry="4" fill="rgba(0,0,0,0.18)" />
          <circle cx="32" cy="36" r="12" fill="oklch(0.75 0.18 145)" />
          <circle cx="68" cy="36" r="12" fill="oklch(0.75 0.18 145)" />
          <circle cx="32" cy="36" r="5" fill="white" />
          <circle cx="68" cy="36" r="5" fill="white" />
          <circle cx="32" cy="36" r="2.5" fill="#222" />
          <circle cx="68" cy="36" r="2.5" fill="#222" />
          <ellipse cx="50" cy="62" rx="30" ry="22" fill="oklch(0.72 0.18 145)" />
          <path d="M36 66 Q50 78 64 66" stroke="#1a3" strokeWidth="2" fill="none" />
        </svg>
      );
  }
}

export function AnimalSVG({ kind, signColor, signTexture, facing, className }: Props) {
  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <div className="absolute inset-x-[5%] bottom-0 top-[35%] animate-hop">
        <AnimalBody kind={kind} />
      </div>
      <div
        className={`absolute top-0 h-[55%] w-[85%] animate-sign-bob ${
          facing === "left" ? "left-[-35%]" : "right-[-35%]"
        }`}
      >
        <SignArrow
          color={signColor}
          texture={signTexture}
          direction={facing === "left" ? "right" : "left"}
        />
      </div>
    </div>
  );
}
