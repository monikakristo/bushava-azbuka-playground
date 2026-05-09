import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Intro } from "@/components/landing/Intro";
import { GameField } from "@/components/landing/GameField";
import { GameDialog } from "@/components/landing/GameDialog";
import { Footer } from "@/components/landing/Footer";
import type { Game } from "@/data/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Бушава Азбука — играј, учи, расти" },
      {
        name: "description",
        content:
          "Македонска платформа со игри за најмалите. Откриј ја азбуката низ песни, бои и пријателски ликови.",
      },
      { property: "og:title", content: "Бушава Азбука — играј, учи, расти" },
      {
        property: "og:description",
        content:
          "Шест мали куќички со игри ја прават македонската азбука забавна и мека како плишано играче.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [selected, setSelected] = useState<Game | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-cream">
      <div
        aria-hidden={!unlocked}
        style={{ pointerEvents: unlocked ? "auto" : "none" }}
      >
        <GameField onSelect={setSelected} />
        <Footer />
      </div>
      <GameDialog game={selected} onClose={() => setSelected(null)} />
      {!unlocked && <Intro onDone={() => setUnlocked(true)} />}
      <Toaster position="top-center" richColors />
    </main>
  );
}
