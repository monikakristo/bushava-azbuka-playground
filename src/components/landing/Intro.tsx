import { useEffect, useState } from "react";

const TITLE = "Бушава Азбука";
const COLORS = [
  "var(--coral)",
  "var(--sun)",
  "var(--grass)",
  "var(--sky)",
  "var(--grape)",
  "var(--berry)",
];

const HOLD_MS = 3000;
const FALL_STAGGER_MS = 180;
const FALL_DURATION_MS = 1100;

export function Intro({ onDone }: { onDone: () => void }) {
  const [falling, setFalling] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFalling(true), HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!falling) return;
    const total = TITLE.length * FALL_STAGGER_MS + FALL_DURATION_MS;
    const t = setTimeout(() => {
      setHidden(true);
      onDone();
    }, total);
    return () => clearTimeout(t);
  }, [falling, onDone]);

  if (hidden) return null;

  return (
    <div
      onClick={() => !falling && setFalling(true)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-sky/50 via-cream to-grass/30 backdrop-blur-sm"
      role="dialog"
      aria-label="Добредојде во Бушава Азбука"
    >
      <h1 className="font-display text-center text-6xl leading-none sm:text-7xl md:text-8xl lg:text-9xl select-none">
        {TITLE.split("").map((ch, i) => {
          const isSpace = ch === " ";
          const color = COLORS[i % COLORS.length];
          const delay = i * FALL_STAGGER_MS;
          return (
            <span
              key={i}
              className={`inline-block ${isSpace ? "w-6 sm:w-8" : ""} ${
                falling ? "intro-letter-fall" : "intro-letter-idle"
              }`}
              style={
                {
                  color,
                  animationDelay: `${delay}ms`,
                  textShadow: isSpace
                    ? "none"
                    : `0 1px 0 rgba(255,255,255,0.6),
                       0 2px 0 rgba(0,0,0,0.08),
                       0 4px 0 rgba(0,0,0,0.06),
                       0 6px 0 rgba(0,0,0,0.05),
                       0 8px 0 rgba(0,0,0,0.04),
                       0 14px 24px rgba(0,0,0,0.25)`,
                  // idle wobble offset for variety
                  ["--idle-delay" as never]: `${i * 0.1}s`,
                } as React.CSSProperties
              }
            >
              {isSpace ? "\u00A0" : ch}
            </span>
          );
        })}
      </h1>

      {!falling && (
        <button
          onClick={() => setFalling(true)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-5 py-2 text-sm font-bold text-foreground shadow-md backdrop-blur transition hover:bg-white"
        >
          Допри за да започнеш ✨
        </button>
      )}
    </div>
  );
}
