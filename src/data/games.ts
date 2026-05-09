import type { AnimalKind, SignTexture } from "@/components/landing/AnimalSVG";

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
  kind: HouseKind;
  /** primary accent color token (CSS variable name) */
  accent: "coral" | "grass" | "sun" | "grape" | "berry" | "sky";
  animal: AnimalKind;
  signColor: string;
  signTexture: SignTexture;
};

export const games: Game[] = [
  {
    id: "find-letter",
    title: "Најди ја буквата",
    description:
      "Препознај ја точната буква меѓу другите. Совршена игра за првите чекори низ азбуката.",
    kind: "cottage",
    accent: "coral",
    animal: "lion",
    signColor: "oklch(0.78 0.18 30)",
    signTexture: "fuzzy",
  },
  {
    id: "build-word",
    title: "Состави збор",
    description:
      "Подреди ги расфрланите букви за да добиеш убав мал македонски збор.",
    kind: "treehouse",
    accent: "grass",
    animal: "bear",
    signColor: "oklch(0.7 0.18 145)",
    signTexture: "rigid",
  },
  {
    id: "animals-sounds",
    title: "Животни и звуци",
    description:
      "Поврзи ја секоја буква со животното кое започнува со неа. Слушни ги нивните звуци!",
    kind: "barn",
    accent: "sun",
    animal: "fox",
    signColor: "oklch(0.85 0.17 85)",
    signTexture: "glossy",
  },
  {
    id: "alphabet-song",
    title: "Песна на азбуката",
    description:
      "Слушај ја и пеј ја мелодичната песна на македонската азбука заедно со нашите ликови.",
    kind: "castle",
    accent: "grape",
    animal: "rabbit",
    signColor: "oklch(0.65 0.2 295)",
    signTexture: "glossy",
  },
  {
    id: "magic-stories",
    title: "Магични приказни",
    description:
      "Кратки и волшебни приказни во кои главни хероини се самите букви.",
    kind: "lighthouse",
    accent: "berry",
    animal: "bird",
    signColor: "oklch(0.7 0.2 0)",
    signTexture: "fuzzy",
  },
  {
    id: "color-letters",
    title: "Боење на букви",
    description:
      "Обој ги меките и бушави букви со твоите омилени бои. Пушти ја фантазијата!",
    kind: "tent",
    accent: "sky",
    animal: "frog",
    signColor: "oklch(0.78 0.12 220)",
    signTexture: "rigid",
  },
];
