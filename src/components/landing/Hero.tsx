import heroImg from "@/assets/hero-bushava.png";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky/60 via-sky/30 to-cream pt-10 pb-16 md:pt-16 md:pb-24">
      {/* floating letters */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {["Г", "Д", "Ѓ", "Е", "Ж", "З"].map((l, i) => (
          <span
            key={l}
            className="absolute font-display text-5xl md:text-7xl opacity-30 animate-float"
            style={{
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 8) % 70}%`,
              color: ["var(--coral)", "var(--grape)", "var(--berry)", "var(--grass)", "var(--sun)", "var(--sky)"][i],
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {l}
          </span>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-bold text-coral shadow-sm backdrop-blur">
            🌟 Учи играјќи · 3–8 години
          </span>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-grape">Бушава</span>
            <br />
            <span className="text-coral">Азбука</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground md:mx-0 md:text-xl">
            Низ песна, боја и игра, малечките ја откриваат македонската азбука —
            една меко-бушава буква по една.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <button
              onClick={onStart}
              className="group rounded-full bg-coral px-8 py-4 text-lg font-extrabold text-white shadow-[0_8px_0_oklch(0.55_0.17_30)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_oklch(0.55_0.17_30)] hover:-translate-y-0.5"
            >
              Започни игра →
            </button>
            <button className="rounded-full border-4 border-grape/30 bg-white px-8 py-4 text-lg font-extrabold text-grape shadow-sm transition hover:border-grape/60">
              За родители
            </button>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroImg}
            alt="Бушава Азбука — пријателски животни и деца со меки кирилични букви"
            width={1536}
            height={1024}
            className="w-full drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
