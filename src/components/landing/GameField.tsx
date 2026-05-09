import { useMemo } from "react";
import { games, type Game } from "@/data/games";
import { HouseSVG } from "./HouseSVG";
import { AnimalSVG } from "./AnimalSVG";

const ACCENT_VAR: Record<Game["accent"], string> = {
  coral: "var(--coral)",
  grass: "var(--grass)",
  sun: "var(--sun)",
  grape: "var(--grape)",
  berry: "var(--berry)",
  sky: "var(--sky)",
};

const TOP_PAD = 6;
const BOTTOM_PAD = 8;
// Houses are closer together now (was 32).
const PER_GAME_VH = 22;
const MIN_VH = 160;

export function GameField({ onSelect }: { onSelect: (g: Game) => void }) {
  const fieldVh = Math.max(MIN_VH, games.length * PER_GAME_VH + 30);

  const pathD = useMemo(() => {
    const segments = 6;
    const stepY = 1000 / segments;
    let d = "M 50 0";
    for (let i = 1; i <= segments; i++) {
      const y = i * stepY;
      const cpY = y - stepY / 2;
      const cpX = i % 2 === 0 ? 78 : 22;
      d += ` Q ${cpX} ${cpY} 50 ${y}`;
    }
    return d;
  }, []);

  const positioned = useMemo(() => {
    const usable = 100 - TOP_PAD - BOTTOM_PAD;
    return games.map((g, i) => {
      const t = games.length === 1 ? 0.5 : i / (games.length - 1);
      const yPct = TOP_PAD + t * usable;
      const xPct = 50 + Math.sin(t * Math.PI * 3) * 28;
      const side = xPct > 50 ? "right" : "left";
      return { g, xPct, yPct, side: side as "left" | "right" };
    });
  }, []);

  return (
    <section
      id="map"
      className="field-grass relative w-full overflow-hidden"
      style={{ height: `${fieldVh}vh` }}
      aria-label="Мапа со игри"
    >
      <FieldDecor count={Math.round(fieldVh / 7)} />

      {/* Wider winding path */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={pathD}
          fill="none"
          stroke="oklch(0.72 0.06 75)"
          strokeWidth="22"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pathD}
          fill="none"
          stroke="oklch(0.88 0.05 80)"
          strokeWidth="16"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pathD}
          fill="none"
          stroke="oklch(0.95 0.04 85)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="3 9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Houses + animals */}
      {positioned.map(({ g, xPct, yPct, side }) => {
        // animal sits opposite the label rotation, on the path side
        const animalSide: "left" | "right" = side === "right" ? "left" : "right";
        return (
          <div
            key={g.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${xPct}%`, top: `${yPct}%` }}
          >
            <div className="relative flex items-end gap-2 sm:gap-3">
              {animalSide === "left" && (
                <div className="h-20 w-20 sm:h-28 sm:w-28">
                  <AnimalSVG
                    kind={g.animal}
                    signColor={g.signColor}
                    signTexture={g.signTexture}
                    facing="left"
                  />
                </div>
              )}

              <button
                onClick={() => onSelect(g)}
                className="group relative flex flex-col items-center rounded-3xl p-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70 sm:p-4"
                style={{ minWidth: 140, minHeight: 160 }}
                aria-label={g.title}
              >
                <div className="h-32 w-32 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 group-active:scale-95 sm:h-40 sm:w-40">
                  <HouseSVG
                    kind={g.kind}
                    accent={ACCENT_VAR[g.accent]}
                    className="h-full w-full drop-shadow-[0_10px_12px_rgba(0,0,0,0.22)]"
                  />
                </div>
                <span
                  className={`mt-1 inline-block rounded-md border-2 border-[oklch(0.4_0.07_40)] bg-[oklch(0.85_0.08_80)] px-3 py-1 text-sm font-extrabold text-[oklch(0.3_0.08_40)] shadow-md sm:text-base ${
                    side === "right" ? "rotate-[-3deg]" : "rotate-[3deg]"
                  }`}
                >
                  {g.title}
                </span>
              </button>

              {animalSide === "right" && (
                <div className="h-20 w-20 sm:h-28 sm:w-28">
                  <AnimalSVG
                    kind={g.animal}
                    signColor={g.signColor}
                    signTexture={g.signTexture}
                    facing="right"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function FieldDecor({ count }: { count: number }) {
  const items = useMemo(() => {
    const arr: {
      x: number;
      y: number;
      kind: "tree" | "bush" | "flower" | "hill" | "rock";
      size: number;
      delay: number;
      key: number;
    }[] = [];
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 2 ** 32;
      return seed / 2 ** 32;
    };
    for (let i = 0; i < count; i++) {
      const x = rand() * 100;
      const y = rand() * 100;
      const distFromCenter = Math.abs(x - 50);
      // wider clear corridor for the wider path
      if (distFromCenter < 22) continue;
      const r = rand();
      const kind =
        r < 0.35 ? "tree" : r < 0.6 ? "bush" : r < 0.78 ? "flower" : r < 0.92 ? "hill" : "rock";
      arr.push({
        x,
        y,
        kind,
        size: 0.7 + rand() * 0.8,
        delay: rand() * 2,
        key: i,
      });
    }
    return arr;
  }, [count]);

  return (
    <>
      {items.map((it) => {
        const baseSize =
          it.kind === "tree" ? 70 : it.kind === "bush" ? 48 : it.kind === "flower" ? 22 : it.kind === "hill" ? 130 : 28;
        const animClass =
          it.kind === "tree"
            ? "animate-sway"
            : it.kind === "bush"
              ? "animate-bush-shake"
              : it.kind === "flower"
                ? "animate-sway"
                : "";
        return (
          <div
            key={it.key}
            className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 ${animClass}`}
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              width: `${it.size * baseSize}px`,
              height: `${it.size * baseSize}px`,
              animationDelay: `${it.delay}s`,
              transformOrigin: "50% 90%",
            }}
          >
            {it.kind === "tree" && (
              <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">
                <ellipse cx="32" cy="58" rx="14" ry="3" fill="rgba(0,0,0,0.18)" />
                <rect x="28" y="34" width="8" height="22" fill="oklch(0.4 0.07 40)" />
                <circle cx="32" cy="24" r="20" fill="oklch(0.62 0.18 145)" />
                <circle cx="20" cy="30" r="12" fill="oklch(0.7 0.18 150)" />
                <circle cx="44" cy="30" r="12" fill="oklch(0.7 0.18 150)" />
              </svg>
            )}
            {it.kind === "bush" && (
              <svg viewBox="0 0 44 44" className="h-full w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.12)]">
                <ellipse cx="22" cy="40" rx="14" ry="2" fill="rgba(0,0,0,0.15)" />
                <circle cx="14" cy="28" r="10" fill="oklch(0.7 0.18 150)" />
                <circle cx="30" cy="28" r="10" fill="oklch(0.7 0.18 150)" />
                <circle cx="22" cy="22" r="11" fill="oklch(0.72 0.18 148)" />
              </svg>
            )}
            {it.kind === "flower" && (
              <svg viewBox="0 0 22 22" className="h-full w-full">
                <circle cx="6" cy="11" r="3" fill="oklch(0.78 0.18 0)" />
                <circle cx="16" cy="11" r="3" fill="oklch(0.78 0.18 0)" />
                <circle cx="11" cy="6" r="3" fill="oklch(0.78 0.18 0)" />
                <circle cx="11" cy="16" r="3" fill="oklch(0.78 0.18 0)" />
                <circle cx="11" cy="11" r="3" fill="oklch(0.88 0.15 90)" />
              </svg>
            )}
            {it.kind === "hill" && (
              <svg viewBox="0 0 130 80" className="h-full w-full drop-shadow-[0_5px_6px_rgba(0,0,0,0.12)]">
                <ellipse cx="65" cy="76" rx="55" ry="6" fill="rgba(0,0,0,0.15)" />
                <path d="M5 70 Q40 12 65 30 Q90 12 125 70 Z" fill="oklch(0.55 0.1 145)" />
                <path d="M30 60 Q60 28 95 55" stroke="oklch(0.7 0.12 145)" strokeWidth="2" fill="none" />
              </svg>
            )}
            {it.kind === "rock" && (
              <svg viewBox="0 0 28 28" className="h-full w-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.18)]">
                <ellipse cx="14" cy="24" rx="10" ry="2" fill="rgba(0,0,0,0.18)" />
                <path d="M4 22 Q2 12 12 8 Q24 6 26 18 Q24 24 14 24 Z" fill="oklch(0.6 0.02 250)" />
                <path d="M8 18 Q12 14 18 16" stroke="oklch(0.75 0.02 250)" strokeWidth="1.2" fill="none" />
              </svg>
            )}
          </div>
        );
      })}
    </>
  );
}
