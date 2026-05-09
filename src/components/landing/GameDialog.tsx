import { toast } from "sonner";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HouseSVG } from "./HouseSVG";
import type { Game } from "@/data/games";

const ACCENT_VAR: Record<Game["accent"], string> = {
  coral: "var(--coral)",
  grass: "var(--grass)",
  sun: "var(--sun)",
  grape: "var(--grape)",
  berry: "var(--berry)",
  sky: "var(--sky)",
};

export function GameDialog({
  game,
  onClose,
}: {
  game: Game | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!game} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="overflow-hidden rounded-3xl border-4 border-white p-0 sm:max-w-md [&>button]:hidden">
        {game && (
          <>
            {/* Custom large close button */}
            <button
              onClick={onClose}
              aria-label="Затвори"
              className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground shadow-lg transition hover:scale-110 active:scale-95"
            >
              <X className="h-7 w-7" strokeWidth={3} />
            </button>

            <div
              className="flex items-center justify-center py-8"
              style={{ backgroundColor: `color-mix(in oklab, ${ACCENT_VAR[game.accent]} 25%, white)` }}
            >
              <div className="h-32 w-32 animate-wiggle">
                <HouseSVG
                  kind={game.kind}
                  accent={ACCENT_VAR[game.accent]}
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="space-y-4 p-6 text-center">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-foreground">
                  {game.title}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {game.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-stretch justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  aria-label="Затвори"
                  className="flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-[oklch(0.65_0.22_25)] px-6 py-4 text-white shadow-[0_5px_0_oklch(0.45_0.18_25)] transition active:translate-y-0.5 active:shadow-[0_2px_0_oklch(0.45_0.18_25)]"
                >
                  <X className="h-8 w-8" strokeWidth={4} />
                </button>
                <button
                  onClick={() => {
                    toast.success("Демо наскоро!", {
                      description: `„${game.title}" се подготвува за тебе.`,
                    });
                  }}
                  aria-label="Играј демо"
                  className="flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-[oklch(0.7_0.2_145)] px-6 py-4 text-white shadow-[0_5px_0_oklch(0.5_0.16_145)] transition active:translate-y-0.5 active:shadow-[0_2px_0_oklch(0.5_0.16_145)]"
                >
                  <Check className="h-8 w-8" strokeWidth={4} />
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
