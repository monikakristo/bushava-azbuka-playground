export type HouseKind =
  | "cottage"
  | "treehouse"
  | "barn"
  | "lighthouse"
  | "castle"
  | "tent";

export type Game = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  kind: HouseKind;
  /** primary accent color token (CSS variable name) */
  accent: "coral" | "grass" | "sun" | "grape" | "berry" | "sky";
};

export const games: Game[] = [
  {
    id: "find-letter",
    title: "Најди ја буквата",
    description:
      "Препознај ја точната буква меѓу другите. Совршена игра за првите чекори низ азбуката.",
    emoji: "🔍",
    kind: "cottage",
    accent: "coral",
  },
  {
    id: "build-word",
    title: "Состави збор",
    description:
      "Подреди ги расфрланите букви за да добиеш убав мал македонски збор.",
    emoji: "🧩",
    kind: "treehouse",
    accent: "grass",
  },
  {
    id: "animals-sounds",
    title: "Животни и звуци",
    description:
      "Поврзи ја секоја буква со животното кое започнува со неа. Слушни ги нивните звуци!",
    emoji: "🦁",
    kind: "barn",
    accent: "sun",
  },
  {
    id: "alphabet-song",
    title: "Песна на азбуката",
    description:
      "Слушај ја и пеј ја мелодичната песна на македонската азбука заедно со нашите ликови.",
    emoji: "🎵",
    kind: "castle",
    accent: "grape",
  },
  {
    id: "magic-stories",
    title: "Магични приказни",
    description:
      "Кратки и волшебни приказни во кои главни хероини се самите букви.",
    emoji: "📖",
    kind: "lighthouse",
    accent: "berry",
  },
  {
    id: "color-letters",
    title: "Боење на букви",
    description:
      "Обој ги меките и бушави букви со твоите омилени бои. Пушти ја фантазијата!",
    emoji: "🎨",
    kind: "tent",
    accent: "sky",
  },
];
