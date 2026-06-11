# CategoryGrid Specification

## Overview
- **Target file:** `src/components/CategoryGrid.tsx`
- **Interaction model:** static grid (4 cards visible at desktop, horizontal scroll/slider on mobile)
- **Section heading:** "Лучшие категории  все категории" (where "все категории" is a link)

## Visual Description
4-column grid of category cards, each ~611px wide (scaled to ~280px at desktop in a 4-col layout).
Each card has: background image + title text overlay + "Подробнее" button.
Background: rgb(222, 222, 222) as fallback.

## Section Header
- Text: "Лучшие категории" + underlined link "все категории"
- fontSize: ~16px
- marginBottom: ~12px

## Card Structure
Each card (`.banner-item`):
- backgroundColor: rgb(222, 222, 222)
- width: ~280px (at desktop in 4-col)
- height: ~510px (from extraction)
- position: relative
- overflow: hidden
- Background image fills card (object-fit: cover or background-size: cover)
- Inside: title + Подробнее button at bottom

## Card Title
- Text in ALL CAPS (e.g., "СПЕЦОДЕЖДА", "РАБОЧАЯ ОБУВЬ")
- Color: black or white depending on card bg
- fontWeight: bold
- fontSize: ~18-20px
- Position: near top or center of card

## "Подробнее" Button
- backgroundColor: rgb(44, 62, 111) — navy
- color: white
- fontSize: ~14px
- padding: ~8px 20px
- border: none
- Position: bottom center of card

## Category Data (from extraction)
1. Форма для поваров — img: `/images/categories/forma-povarov.jpg` — link: /catalog/specodezhda/
2. Летняя одежда — img: `/images/categories/letnyaya.jpg` — link: (from slider)
3. Новинки — img: `/images/categories/novinki.jpg`
4. Защитная одежда — img: `/images/categories/zashchitnaya.jpg`
+ more from slick slider (not all loaded)

## Top Categories shown in screenshots (the FIRST section, 2-col):
Actually the FIRST section shows:
- СПЕЦОДЕЖДА (jackets image on gray bg)
- РАБОЧАЯ ОБУВЬ (boots image on gray bg)
These are 2-wide cards with product photo centered on gray bg.

Then below them (or same slider):
- СИЗ / helmets image
- Перчатки / gloves image

## Implementation
- Use a simple 4-column CSS grid (desktop) / 2-column (tablet) / 1-column (mobile)
- Each card as a link wrapping bg image + overlay text + button
- No actual carousel needed at desktop; show static grid of 4 cards

## Assets
- `/images/categories/forma-povarov.jpg`
- `/images/categories/letnyaya.jpg`
- `/images/categories/novinki.jpg`
- `/images/categories/zashchitnaya.jpg`
- Also need product images for СПЕЦОДЕЖДА/РАБОЧАЯ ОБУВЬ cards — these use centered product photos on gray bg
