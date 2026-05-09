import { useMemo } from "react";
import { games, type Game } from "@/data/games";
import { HouseSVG } from "./HouseSVG";

const ACCENT_VAR: Record<Game["accent"], string> = {
  coral: "var(--coral)",
  grass: "var(--grass)",
  sun: "var(--sun)",
  grape: "var(--grape)",
  berry: "var(--berry)",
  sky: "var(--sky)",
};

// Layout constants — tweak to scale field length as games are added.
const TOP_PAD = 8; // % from top before first house
const BOTTOM_PAD = 10; // % from bottom after last house
// Field height ~ 2 viewports for the current 6 games; grows automatically.
const PER_GAME_VH = 32;
const MIN_VH = 200;

export function GameField({ onSelect }: { onSelect: (g: Game) => void }) {
  const fieldVh = Math.max(MIN_VH, games.length * PER_GAME_VH + 40);

  // Winding path as an SVG path string (viewBox 100 x 1000), scaled to fieldVh.
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

  // Compute each game's position along the field.
  const positioned = useMemo(() => {
    const usable = 100 - TOP_PAD - BOTTOM_PAD;
    return games.map((g, i) => {
      const t = games.length === 1 ? 0.5 : i / (games.length - 1);
      const yPct = TOP_PAD + t * usable;
      // sine wave to mirror the path's curvature
      const xPct = 50 + Math.sin(t * Math.PI * 3) * 28;
      const side = xPct > 50 ? "right" : "left";
      return { g, xPct, yPct, side };
    });
  }, []);

  return (
    <section
      id="map"
      className="relative w-full overflow-hidden field-grass"
      style={{ height: `${fieldVh}vh` }}
      aria-label="Мапа со игри"
    >
      {/* Decorative scenery: bushes & trees scattered (deterministic) */}
      <FieldDecor count={Math.round(fieldVh / 12)} />

      {/* Winding path */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={pathD}
          fill="none"
          stroke="oklch(0.78 0.05 80)"
          strokeWidth="9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pathD}
          fill="none"
          stroke="oklch(0.92 0.04 85)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="2 6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Houses */}
      {positioned.map(({ g, xPct, yPct, side }) => (
        <button
          key={g.id}
          onClick={() => onSelect(g)}
          className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          style={{ left: `${xPct}%`, top: `${yPct}%` }}
          aria-label={g.title}
        >
          <div className="flex flex-col items-center">
            <div className="h-28 w-28 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-105 sm:h-36 sm:w-36">
              <HouseSVG
                kind={g.kind}
                accent={ACCENT_VAR[g.accent]}
                className="h-full w-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.18)]"
              />
            </div>
            <span
              className={`mt-1 inline-block rounded-md border-2 border-[oklch(0.4_0.07_40)] bg-[oklch(0.85_0.08_80)] px-3 py-1 text-xs font-extrabold text-[oklch(0.3_0.08_40)] shadow-md sm:text-sm ${
                side === "right" ? "rotate-[-3deg]" : "rotate-[3deg]"
              }`}
            >
              {g.title}
            </span>
          </div>
        </button>
      ))}
    </section>
  );
}

/** Deterministic decorative props (trees, bushes, flowers). */
function FieldDecor({ count }: { count: number }) {
  const items = useMemo(() => {
    const arr: { x: number; y: number; kind: "tree" | "bush" | "flower"; size: number; key: number }[] = [];
    // simple LCG for determinism
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 2 ** 32;
      return seed / 2 ** 32;
    };
    for (let i = 0; i < count; i++) {
      const x = rand() * 100;
      const y = rand() * 100;
      // keep clear of central path band
      const distFromCenter = Math.abs(x - 50);
      if (distFromCenter < 18) continue;
      const r = rand();
      const kind = r < 0.45 ? "tree" : r < 0.8 ? "bush" : "flower";
      arr.push({ x, y, kind, size: 0.7 + rand() * 0.7, key: i });
    }
    return arr;
  }, [count]);

  return (
    <>
      {items.map((it) => (
        <div
          key={it.key}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: `${it.size * (it.kind === "tree" ? 64 : it.kind === "bush" ? 44 : 22)}px`,
            height: `${it.size * (it.kind === "tree" ? 64 : it.kind === "bush" ? 44 : 22)}px`,
          }}
        >
          {it.kind === "tree" && (
            <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.15)]">
              <ellipse cx="32" cy="56" rx="14" ry="3" fill="rgba(0,0,0,0.18)" />
              <rect x="28" y="34" width="8" height="20" fill="oklch(0.4 0.07 40)" />
              <circle cx="32" cy="26" r="20" fill="oklch(0.62 0.18 145)" />
              <circle cx="20" cy="32" r="12" fill="oklch(0.7 0.18 150)" />
              <circle cx="44" cy="32" r="12" fill="oklch(0.7 0.18 150)" />
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
        </div>
      ))}
    </>
  );
}
