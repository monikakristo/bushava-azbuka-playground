import { motion } from "framer-motion";
import mapBg from "@/assets/map-field.jpg";
import { games, type Game } from "@/data/games";

export function GameMap({ onSelect }: { onSelect: (g: Game) => void }) {
  return (
    <section
      id="map"
      className="relative overflow-hidden bg-grass/20 py-12 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-display text-4xl text-foreground md:text-5xl">
          Избери куќичка, започни авантура
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground md:text-lg">
          Секоја куќичка крие своја мала игра. Допри ја за да видиш што те чека внатре!
        </p>
      </div>

      <div className="relative mx-auto mt-10 w-[min(100%,1200px)] px-4">
        <div
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border-8 border-white shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)]"
          style={{
            backgroundImage: `url(${mapBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {games.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => onSelect(g)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${g.x}%`, top: `${g.y}%` }}
              aria-label={g.title}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white text-4xl shadow-[0_8px_0_rgba(0,0,0,0.15)] sm:h-20 sm:w-20 sm:text-5xl ${g.color}`}
                >
                  {g.house}
                </div>
                <span className="mt-2 max-w-[10rem] rounded-full bg-white/95 px-3 py-1 text-center text-xs font-extrabold text-foreground shadow sm:text-sm">
                  {g.title}
                </span>
              </div>
            </motion.button>
          ))}

          {/* sun */}
          <div className="absolute right-6 top-6 h-14 w-14 animate-float rounded-full bg-sun shadow-[0_0_40px_var(--sun)]" />
        </div>
      </div>
    </section>
  );
}
