# Behaviors — avangard-sp.ru

## Interaction Sweep Results

### Scroll Behavior
- Header appears sticky (top bar + main header stay visible on scroll)
- No scroll-driven animations detected
- No snap points
- Standard browser scrolling (no Lenis/Locomotive Scroll)

### Hero Slider
- **Type:** Owl Carousel auto-playing
- **Slides:** 5-6 slides, each is a full-width image (text baked into image)
- **Controls:** Dot indicators at bottom left
- **No text overlay in DOM** — text is part of the image

### Category Grid (Лучшие категории)
- **Type:** Slick Slider (or static responsive grid at desktop)
- **Items:** ~8 cards, 4 visible at desktop
- **Each card:** background image + title text overlay + "Подробнее" button

### Navigation Dropdowns
- "О компании ▼" — has dropdown submenu
- "Авангард Лайф ▼" — has dropdown
- "Клиентам ▼" — has dropdown
- **Interaction:** hover/click to reveal

### Promo Banners (right_slider)
- 3 promotional image banners in a row (may be Slick slider)
- Static at desktop

### Reviews Carousel
- Slick carousel, 3 visible cards, arrow navigation
- Each card: company logo (circle), bold quote title, quote text, "Развернуть" link, company name

### CTA Row Buttons
- 4 buttons: ЗАКАЗАТЬ ПРОДУКЦИЮ, ЗАДАТЬ ВОПРОС ЭКСПЕРТУ, ЗАПРОСИТЬ СЕРТИФИКАТЫ, СКАЧАТЬ КАТАЛОГ
- All open modal forms (fancybox.ajax)
- **Interaction model:** click-driven modal

### Hover States
- Navigation links: color change on hover
- CTA buttons: likely bg color change on hover (navy fill)
- Product cards: border highlight on hover

### Responsive
- Site has `.desktop` class on top nav bar (hidden on mobile)
- Mobile shows different header (hamburger menu)
