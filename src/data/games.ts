export type Game = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  house: string; // emoji for the house style
  color: string; // tailwind bg class via tokens
  // Position on the map (percent)
  x: number;
  y: number;
};

export const games: Game[] = [
  {
    id: "find-letter",
    title: "Најди ја буквата",
    description:
      "Препознај ја точната буква меѓу другите. Совршена игра за првите чекори низ азбуката.",
    emoji: "🔍",
    house: "🏡",
    color: "bg-coral",
    x: 18,
    y: 58,
  },
  {
    id: "build-word",
    title: "Состави збор",
    description:
      "Подреди ги расфрланите букви за да добиеш убав мал македонски збор.",
    emoji: "🧩",
    house: "🌳",
    color: "bg-grass",
    x: 32,
    y: 32,
  },
  {
    id: "animals-sounds",
    title: "Животни и звуци",
    description:
      "Поврзи ја секоја буква со животното кое започнува со неа. Слушни ги нивните звуци!",
    emoji: "🦁",
    house: "🛖",
    color: "bg-sun",
    x: 50,
    y: 70,
  },
  {
    id: "alphabet-song",
    title: "Песна на азбуката",
    description:
      "Слушај ја и пеј ја мелодичната песна на македонската азбука заедно со нашите ликови.",
    emoji: "🎵",
    house: "🏰",
    color: "bg-grape",
    x: 68,
    y: 30,
  },
  {
    id: "magic-stories",
    title: "Магични приказни",
    description:
      "Кратки и волшебни приказни во кои главни хероини се самите букви.",
    emoji: "📖",
    house: "🗼",
    color: "bg-berry",
    x: 82,
    y: 60,
  },
  {
    id: "color-letters",
    title: "Боење на букви",
    description:
      "Обој ги меките и бушави букви со твоите омилени бои. Пушти ја фантазијата!",
    emoji: "🎨",
    house: "⛺",
    color: "bg-sky",
    x: 50,
    y: 18,
  },
];
