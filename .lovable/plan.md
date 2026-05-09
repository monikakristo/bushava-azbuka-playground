ns
# Bushava Azbuka — Landing Page Plan

A single, vibrant landing page for a Macedonian children's game platform. Cartoonish, playful style with friendly animals, fuzzy Cyrillic letters, and a green-field map of "houses" (games). Clicking a house opens a popup with the game title and short description.

## Page structure (single route: `/`)

1. **Hero band (top)**
   - Big playful logo wordmark "Бушава Азбука"
   - Subtitle in Macedonian: "Учи ја азбуката низ игра!"
   - Soft sky background with clouds, sun, and floating fuzzy Cyrillic letters (А, Б, В…)
   - Two large buttons: "Започни игра" (scrolls to map) and "За родители" (placeholder)

2. **Game map (main section)**
   - Green grass field as the backdrop
   - A central winding path that branches to 5–6 little houses/attractions
   - Friendly animal characters scattered around (lion, bear, bird)
   - Happy diverse kid characters interacting with giant fuzzy letters
   - Each house is a clickable button with a label (game name) on a wooden sign
   - Hover: gentle bounce/scale animation; the house glows

3. **Game popup (Dialog)**
   - Opens when a house is clicked
   - Shows: game illustration/emoji, title, short Macedonian description, "Играј демо" button (placeholder, shows toast "Demo соon")
   - Close button

4. **Footer band**
   - Friendly tagline, small credits, language switch placeholder

## Games (placeholder content, 6 houses)

| House | Game title (MK) | Short description |
|---|---|---|
| Cottage | Најди ја буквата | Препознај ја точната буква меѓу другите. |
| Treehouse | Состави збор | Подреди ги буквите за да добиеш збор. |
| Barn | Животни и звуци | Поврзи ја буквата со животното. |
| Lighthouse | Песна на азбуката | Слушај и пеј ја азбуката. |
| Castle | Магични приказни | Кратки приказни со буквите. |
| Tent | Боење на букви | Обој ги фуззи буквите. |

## Visual / design direction

- Cartoonish, soft-edged, "fuzzy" letter aesthetic
- Bright but cohesive palette: sky blue, sunny yellow, grass green, warm coral, soft cream
- Rounded, chunky typography (display font like Fredoka / Baloo for headings, Nunito for body) loaded from Google Fonts
- Generous rounded corners, soft shadows, gentle hover bounces
- Clouds and sun drift slowly (subtle CSS / framer-motion animations)

## Technical details

- TanStack Start, single route `src/routes/index.tsx` (replaces placeholder)
- Components:
  - `src/components/landing/Hero.tsx`
  - `src/components/landing/GameMap.tsx` (SVG path + absolutely positioned house buttons)
  - `src/components/landing/HouseButton.tsx`
  - `src/components/landing/GameDialog.tsx` (uses shadcn `dialog`)
  - `src/components/landing/Footer.tsx`
  - `src/data/games.ts` (array of 6 game objects)
- Hero illustration generated with `imagegen` (premium, since it includes Cyrillic letters) → `src/assets/hero-bushava.png`
- Map background generated with `imagegen` (standard) → `src/assets/map-field.jpg`
- Small house illustrations: use emoji + styled cards (no per-house image generation needed) to keep it fast and consistent
- Animation via `framer-motion` (install if not present)
- Design tokens: extend `src/styles.css` with playful palette (`--sky`, `--grass`, `--sun`, `--coral`, `--cream`) plus gradients and soft shadows; use Tailwind utilities only via tokens
- SEO: `head()` with Macedonian title/description, og tags
- Fully responsive: map scales; on mobile, houses reflow into a vertical winding layout

## Out of scope (demo only)

- No actual games are implemented; "Играј демо" shows a toast
- No backend / auth / persistence
- No i18n switch logic, just a placeholder button
