import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Game } from "@/data/games";

export function GameDialog({
  game,
  onClose,
}: {
  game: Game | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!game} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="overflow-hidden rounded-3xl border-4 border-white p-0 sm:max-w-md">
        {game && (
          <>
            <div
              className={`flex items-center justify-center py-10 text-7xl ${game.color}`}
            >
              <span className="animate-wiggle inline-block">{game.house}</span>
            </div>
            <div className="space-y-4 p-6 text-center">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-foreground">
                  {game.emoji} {game.title}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {game.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    toast.success("Демо наскоро! 🎉", {
                      description: `„${game.title}" се подготвува за тебе.`,
                    });
                  }}
                  className="rounded-full bg-coral px-6 py-3 text-base font-extrabold text-white shadow-[0_6px_0_oklch(0.55_0.17_30)] transition active:translate-y-0.5 active:shadow-[0_2px_0_oklch(0.55_0.17_30)]"
                >
                  Играј демо ▶
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full px-6 py-2 text-sm font-bold text-muted-foreground hover:text-foreground"
                >
                  Затвори
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
