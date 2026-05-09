# Landing Page Theme and Design

## Overview

The landing page for `Бушава Азбука` is designed as a warm, playful introduction to a Macedonian alphabet game experience. The page is built around a storybook-style grassy field, bright friendly color tokens, animated character-driven illustrations, and a tactile initial interaction that unlocks the full game map.

## Visual Theme

- **Color palette**
  - Primary brand colors are drawn from custom CSS variables such as `--sky`, `--grass`, `--sun`, `--coral`, `--grape`, and `--berry`.
  - The page uses a soft cream background (`--cream`) for the overall shell, with grassy field greens and pastel accent colors that feel child-friendly and gentle.
  - Each game tile uses a unique accent color to differentiate content sections: coral, grass, sun, grape, berry, and sky.

- **Illustration style**
  - The landing page uses hand-drawn-inspired SVG illustrations with simple shapes, rounded corners, and gentle shadows.
  - `HouseSVG` components render stylized locations such as cottages, treehouses, barns, lighthouses, castles, and tents.
  - `AnimalSVG` components render friendly animal characters (lion, bear, bird, fox, rabbit, frog) with playful sign arrows, soft bodies, and animated movement.
  - Visual textures appear in sign arrows via fuzzy noise, glossy gradients, or rigid patterns, reinforcing the tactile theme.

- **Typography**
  - The landing page uses `Fredoka` as the display font and `Nunito` as the main body font.
  - Font choices are rounded and approachable, matching the soft children’s learning aesthetic.
  - Large heading text uses expressive display styling for the title and game labels.

## Page Structure

### Intro Overlay

- The landing begins with an interactive overlay introduced by the `Intro` component.
- A large animated heading `Бушава Азбука` appears in bold, multi-colored letters.
- Each letter is a separate animated span with:
  - idle bobbing motion (`intro-letter-idle`)
  - on-click falling animation (`intro-letter-fall`)
  - vivid multi-color treatment from the theme palette
- The overlay invites the child to touch letters and counts down how many remain.
- Once all letters fall, the overlay fades away and unlocks the main page.

### Main Map Area

- After unlocking, the page reveals the main game field rendered by `GameField`.
- The field is a full-width grassy background (`field-grass`) with a tileable pattern of light grassy spots and a subtle vertical gradient.
- A winding path travels down the screen using layered stroked SVG curves, giving the impression of a magical trail.
- Six game locations are positioned along this path.

### Game Tiles

- Each game tile is represented by a house illustration plus a label badge.
- Houses are placed along an S-shaped route with positional variation and side-specific alignment.
- The tile button includes:
  - a `HouseSVG` in a colored accent tone
  - a rotated label badge with playful tilt depending on left/right placement
  - hover and active transforms for lively interaction
- Adjacent animals appear on the path side, with their facing direction adjusted to maintain visual balance.
- Animals float and hop with subtle animations, adding motion to the page.

### Surrounding Decor

- The grassy field is populated with randomized decor elements: trees, bushes, flowers, hills, and rocks.
- Decorative items appear only outside a clear corridor around the path to preserve readability.
- They use gentle animation classes like sway and bush shake to keep the scene alive without distraction.

### Game Dialog

- Clicking a tile opens a `GameDialog` modal.
- The dialog uses softly rounded corners and a thick white border.
- Top section features a large `HouseSVG` illustration and background tinted with the selected game accent color.
- Dialog text includes the game title and description in center-aligned layout.
- Action buttons are chunky, pill-shaped, and use deep contrasting shadows for a toy-like pressable feel.

### Footer

- The footer is a simple band of pastel purple (`bg-grape/10`) with centered text.
- It reinforces the brand with the title `Бушава Азбука` and a gentle supporting line about Macedonian learning.
- A language selector is shown as button chips for `Македонски` and `English`.

## Interaction and Motion

- The landing page is interaction-first:
  - the intro overlay requires user interaction to reveal the page
  - game tiles respond to hover and tap
  - the dialog is accessible with a custom close button and clear intent
- Animations are used sparingly but effectively:
  - wobbling intro letters
  - curve-following floating path and field decor
  - animated animal sign bobbing and character hopping
  - dialog house wiggle effect

## Mood and Narrative

- The landing page feels like a **storybook village** designed for young learners.
- It combines educational structure with playful discovery:
  - the alphabet is presented as a journey through friendly houses and animals
  - each location is a self-contained little game world
  - the layout invites exploration rather than overwhelming the child
- The tone is warm, gentle, and supportive, ideal for preschool and early elementary users.

## Technical Details

- Built with React and Tailwind CSS utility classes.
- Uses CSS custom properties and OKLCH color values for consistent theming.
- The overlay is implemented with a full-screen fixed dialog and `backdrop-blur-sm`.
- The field background is generated with CSS radial gradients rather than bitmap images.
- The page is responsive, with scalable SVG illustrations and adaptive spacing.

## Key Components

- `src/components/landing/Intro.tsx`
  - entrance overlay, letter animation, interactive unlock
- `src/components/landing/GameField.tsx`
  - main map, path, game tile layout, field decoration
- `src/components/landing/GameDialog.tsx`
  - modal game preview, accent-backed illustration
- `src/components/landing/Footer.tsx`
  - branding, language buttons, footer note
- `src/styles.css`
  - theme tokens, animation keyframes, field background, intro letter motion

## Design Intent

- Emphasize playfulness without sacrificing clarity.
- Reinforce Macedonian alphabet learning through metaphor: a village path, houses, and animal friends.
- Use color and animation to guide attention rather than distract.
- Make the landing page feel like the beginning of a calm, joyful learning journey.
