# NewsSection Specification

## Overview
- **Target file:** `src/components/NewsSection.tsx`
- **Interaction model:** static 3-column layout
- **Position:** below PopularProducts

## Visual Description
3 columns, each with a heading + one large image card + date + title below.
Column headings: "Новости", "Блог", "Наша экспертиза"

## Container
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: ~24px
- maxWidth: ~1200px
- margin: 0 auto
- padding: 0 ~20px

## Column Header
- Text: "Новости" / "Блог" / "Наша экспертиза"
- fontSize: ~16px
- fontWeight: bold
- margin-bottom: ~12px

## News Card (image + overlay text)
- Relative container
- Image fills card (object-fit: cover), height: ~200px
- Dark overlay gradient at bottom
- Title text in white over overlay
- Below image: date in gray small text + full title in black

## News Items

### Column 1: Новости
- Image: `/images/news/forma-povarov.png`
- Overlay text: "Новинки формы поваров: Стандарты стиля и комфорта"
- Date: 29 апреля 2026
- Title below: "Новинки формы поваров"
- Link: /news/news/novinki-formy-povarov/

### Column 2: Блог
- Image: (group photo with green jackets in front of building)
- Overlay text: "Академия «Авангард» уходит в цеха Екатеринбурга"
- Date: 19 мая 2026
- Title below: "Академия «Авангард» уходит в цеха: эксперты «Спец-СИЗ» подтвердили квалификацию на заводах Екатеринбурга"
- Link: /news/blog/...

### Column 3: Наша экспертиза
- Image: (two workers in black/blue workwear)
- Overlay text: "5 стереотипов о рабочей экипировке: что важно знать о спецодежде"
- Date: 12 мая 2026
- Title below: "5 стереотипов о рабочей экипировке: что важно знать о спецодежде"
- Link: /news/...

## Image Card Overlay
- Position: absolute bottom gradient
- background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)
- Title text: color white, fontSize: ~16px, fontWeight: normal/bold, padding: 12px

## Date Style
- fontSize: ~12-13px
- color: #666 or similar gray
- margin-top: 8px

## Full Title (below image)
- fontSize: ~14px
- color: black
- margin-top: 4px
- line-height: 1.4

## Responsive
- Desktop: 3 columns
- Mobile: 1 column stacked
