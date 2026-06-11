# TopNavBar Specification

## Overview
- **Target file:** `src/components/TopNavBar.tsx`
- **Interaction model:** static with dropdown menus on hover/click
- **Position:** top of page, always first visible element

## Visual Description
Dark navy bar (height: 40px) spanning full width. Left side has text navigation links, right side has region info + phone centers link + user icon + "Войти" text.

## Computed Styles

### Container `.header-bottom.desktop`
- backgroundColor: rgb(44, 62, 111) = #2C3E6F
- height: 40px
- width: 100%
- display: block

### Inner wrapper (centered content)
- max-width: ~1200px
- margin: 0 auto
- display: flex
- align-items: center
- justify-content: space-between

### Nav links
- color: rgb(235, 235, 235) = #EBEBEB
- fontSize: 16px (renders small due to compact bar)
- fontFamily: Calibri, Tahoma, sans-serif
- fontWeight: 400
- text-decoration: none
- Hover: likely slightly lighter or underline

### Dropdown indicator
- "▼" triangle after: О компании, Авангард Лайф, Клиентам

## Navigation Links (Left Side)
1. О компании ▼ (dropdown)
2. Доставка
3. Оплата
4. Авангард Лайф ▼ (dropdown)
5. Клиентам ▼ (dropdown)
6. Академия
7. Контакты

## Right Side Content
- "Ваш регион: Москва" (text)
- "Телефоны центров продаж" (link, underlined)
- User/login icon (SVG)
- "Войти" (text link)

## Responsive
- Desktop (1440px): full bar visible
- Mobile: hidden (`.desktop` class implies display:none on mobile)

## Assets
- No images needed, SVG login icon can be inline
