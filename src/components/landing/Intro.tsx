import { useEffect, useMemo, useState } from "react";

const TITLE = "Бушава Азбука";
const COLORS = [
  "var(--coral)",
  "var(--sun)",
  "var(--grass)",
  "var(--sky)",
  "var(--grape)",
  "var(--berry)",
];

const FALL_DURATION_MS = 1100;

export function Intro({ onDone }: { onDone: () => void }) {
  // letters that have started falling, in order of click
  const [fallen, setFallen] = useState<Set<number>>(new Set());
  const [hidden, setHidden] = useState(false);

  const indices = useMemo(
    () => TITLE.split("").map((_, i) => i).filter((i) => TITLE[i] !== " "),
    [],
  );

  const allFallen = fallen.size >= indices.length;

  useEffect(() => {
    if (!allFallen) return;
    const t = setTimeout(() => {
      setHidden(true);
      onDone();
    }, FALL_DURATION_MS + 200);
    return () => clearTimeout(t);
  }, [allFallen, onDone]);

  const handleClick = () => {
    setFallen((prev) => {
      const remaining = indices.filter((i) => !prev.has(i));
      if (remaining.length === 0) return prev;
      const pick = remaining[Math.floor(Math.random() * remaining.length)];
      const next = new Set(prev);
      next.add(pick);
      return next;
    });
  };

  if (hidden) return null;

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-gradient-to-b from-sky/50 via-cream to-grass/30 backdrop-blur-sm"
      role="dialog"
      aria-label="Допри ги буквите за да започнеш"
    >
      <h1 className="font-display select-none text-center text-6xl leading-none sm:text-7xl md:text-8xl lg:text-9xl">
        {TITLE.split("").map((ch, i) => {
          const isSpace = ch === " ";
          const color = COLORS[i % COLORS.length];
          const isFalling = fallen.has(i);
          return (
            <span
              key={i}
              className={`inline-block ${isSpace ? "w-6 sm:w-8" : ""} ${
                isFalling ? "intro-letter-fall" : "intro-letter-idle"
              }`}
              style={
                {
                  color,
                  textShadow: isSpace
                    ? "none"
                    : `0 1px 0 rgba(255,255,255,0.6),
                       0 2px 0 rgba(0,0,0,0.08),
                       0 4px 0 rgba(0,0,0,0.06),
                       0 6px 0 rgba(0,0,0,0.05),
                       0 8px 0 rgba(0,0,0,0.04),
                       0 14px 24px rgba(0,0,0,0.25)`,
                  ["--idle-delay" as never]: `${i * 0.1}s`,
                } as React.CSSProperties
              }
            >
              {isSpace ? "\u00A0" : ch}
            </span>
          );
        })}
      </h1>

      <p className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-5 py-2 text-sm font-bold text-foreground shadow-md backdrop-blur">
        Допри ги буквите ({indices.length - fallen.size} преостанати)
      </p>
    </div>
  );
}
