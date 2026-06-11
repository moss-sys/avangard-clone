# ReviewsSection Specification

## Overview
- **Target file:** `src/components/ReviewsSection.tsx`
- **Interaction model:** static or simple carousel (3 cards visible, arrow navigation)
- **Position:** below NewsSection

## Visual Description
Section heading "Отзывы". Wide container with light gray border.
3 review cards side-by-side. Left/right arrow navigation. Each card has company logo (circle), bold quote title, quote text, "Развернуть" expand link, company name.

## Section Container
- border: 1px solid #ddd (approximate)
- padding: ~24px
- backgroundColor: white or very light

## Section Header
- Text: "Отзывы"
- fontSize: ~18-20px
- fontWeight: bold
- marginBottom: ~16px

## Review Card
- display: flex
- flexDirection: column
- alignItems: center (logo centered)
- gap: ~12px
- padding: ~16px
- width: ~33% (3 columns)

## Company Logo
- Shape: circle
- Size: ~80px diameter
- border: 1px solid #ddd
- Contains company logo image/text

## Card Content
- Bold title (quote headline), fontSize: ~14px, color: black
- Quote body text, fontSize: ~13px, color: ~#333, line-height: 1.5
- "Развернуть" link in navy color
- Company name at bottom, fontSize: ~13px

## Review Data (from extraction)

### Review 1
- Logo: circle with "ТЕХСТРОЙ" text
- Title: "«Квалифицированный поставщик спецодежды. Что простые рабочие, что ИТР - все довольны качеством»"
- Text: "ООО «ТехСтрой» плодотворно сотрудничает с ООО «ГК Авангард Сэйфети» уже несколько лет..."
- Company: "ООО «ТехСтрой»"

### Review 2
- Logo: circle with "БАЙСАД" text
- Title: "«Предоставляется широкий ассортимент спецодежды (зима, лето), обувь, СИЗ»"
- Text: "Хотелось бы выразить благодарность фирме ООО «ГК Авангард Сэйфети» за многолетнее сотрудничество..."
- Company: "ОАО «БАЙСАД-Кашира»"

### Review 3
- Logo: circle with "AVON" text
- Title: "«Благодарим за многолетнюю совместную работу»"
- Text: "Компания «Эйвон Бьюти Продактс Компани» благодарит за многолетнюю совместную работу..."
- Company: "ООО «Эйвон Бьюти Продактс Компани»"

## Navigation Arrows
- Left arrow: "‹" positioned absolute left
- Right arrow: "›" positioned absolute right
- Both: fontSize: ~24px, color: navy or gray

## Responsive
- Desktop: 3 cards in row
- Mobile: 1 card, swipeable
