# HeroSlider Specification

## Overview
- **Target file:** `src/components/HeroSlider.tsx`
- **Interaction model:** auto-cycling image carousel (Owl Carousel on original, implement with CSS/simple JS)
- **Position:** below MainHeader, full width with rounded corners

## Visual Description
Full-width image carousel (~1200px wide, height ~450px) with rounded corners (~16px). Text/headlines are BAKED INTO the images (no separate text overlay in DOM). Bottom-left has dot indicators. No arrows visible (dots only).

## Container Styles
- maxWidth: ~1240px
- margin: 0 auto
- borderRadius: ~16px
- overflow: hidden
- height: ~450px (approximate from screenshot)

## Slide Images (all downloaded to public/images/hero/)
1. `/images/hero/slide-1.webp` — link: /catalog/specodezhda/letnyaya/
2. `/images/hero/slide-2.webp` — no link
3. `/images/hero/slide-3.webp` — link: /catalog/specodezhda/trikotazh/
4. `/images/hero/slide-4.webp` — link: /catalog/siz/
5. `/images/hero/slide-5.webp` — link: /catalog/specodezhda/zashchitnaya/dlya_svarshchikov/
6. `/images/hero/slide-6.webp` — link (truncated)

## Text in Images (for reference, NOT in DOM)
- Slide 1: "НАДЕЖНАЯ РАБОЧАЯ ОБУВЬ" / "ФУНКЦИОНАЛЬНЫЕ МАТЕРИАЛЫ И СОВРЕМЕННЫЕ ТЕХНОЛОГИИ" / Полуботинки "ФУТГАРД"
- Slide 2: "РАБОЧАЯ ОДЕЖДА И СРЕДСТВА ЗАЩИТЫ ДЛЯ СВАРЩИКОВ" / Костюм «БАКЛЕР»
- Slide 3: "СРЕДСТВА ИНДИВИДУАЛЬНОЙ ЗАЩИТЫ" / "МАКСИМАЛЬНЫЙ УРОВЕНЬ БЕЗОПАСНОСТИ" / Линейка СИЗОД "АВАНГАРД"

## Dot Indicators
- Position: bottom-left (absolute), ~20px from bottom
- Active dot: filled circle (white or navy)
- Inactive: hollow/lighter circle
- 5-6 dots total

## Auto-play
- Auto-cycling every ~4 seconds
- Fade or slide transition

## Implementation Notes
- Use `useState` + `useEffect` for auto-cycling
- Each slide is an `<img>` that fills the container with `object-fit: cover`
- Dots are absolutely positioned over the slider
- Whole slide is wrapped in `<a>` for link
