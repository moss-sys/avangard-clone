# MainHeader Specification

## Overview
- **Target file:** `src/components/MainHeader.tsx`
- **Interaction model:** static (search input + CTA buttons are non-functional in clone)
- **Position:** below TopNavBar, height ~58px

## Visual Description
White background bar. Left to right:
1. АВАНГАРД logo (SVG text + red helm icon)
2. "≡ КАТАЛОГ" button (blue/navy bg? No — white with navy text and navy left border? Actually it's a dark rectangle)
3. Search input with magnifier icon
4. Phone: +7 (499) 500-40-01 / inform@avangard-sp.ru (stacked)
5. "ЗАПРОСИТЬ ПРАЙС" button (navy border, navy text, white bg)
6. "ОТПРАВИТЬ ЗАЯВКУ" button (navy border, navy text, white bg)  
7. Chart/comparison icon
8. Cart icon with "0" badge (navy bg badge)

## Computed Styles

### Main header wrapper `.header-top`
- backgroundColor: rgba(0,0,0,0) = white (body is white)
- height: ~58px
- display: flex
- align-items: center
- padding: ~10px 0
- width: 100%

### Logo area
- margin-left: 18px
- margin-top: 12px (slightly offset)
- Logo SVG: 191×34px
- Helm PNG: 58×49px (positioned to right of SVG text)

### КАТАЛОГ button
- backgroundColor: rgb(44, 62, 111) — navy
- color: rgb(255, 255, 255)
- fontSize: 13px
- Has hamburger menu icon (≡) before text
- border: none
- padding: ~8px 12px
- height: ~36px

### Search input
- backgroundColor: rgb(250, 250, 250)
- border: 1px solid #ccc (approximate)
- height: 41px
- width: ~215px
- Has magnifier icon on right

### Phone/email block
- Two lines stacked
- "+7 (499) 500-40-01" — bold or normal weight
- "inform@avangard-sp.ru" — smaller, link

### CTA buttons (ЗАПРОСИТЬ ПРАЙС, ОТПРАВИТЬ ЗАЯВКУ)
- backgroundColor: rgb(255, 255, 255)
- color: rgb(44, 62, 111)
- border: 1.5px solid rgb(44, 62, 111)
- fontSize: 13px
- width: ~148px
- height: 36px
- textTransform: uppercase
- fontFamily: Calibri, Tahoma, sans-serif
- cursor: pointer

### Cart icon/badge
- Cart icon PNG: 24×24px
- Badge: backgroundColor: rgb(44, 62, 111), color: white, 20×20px circle, shows "0"

## Assets
- Logo SVG: `/images/logo.svg`
- Helm icon: `/images/helm.png`
- Cart icon: `/images/cart-icon.png`
- Search icon: `/images/icon/search-blue.png` (17×17)
- Login icon: `/images/icon/registration-icon.png` (18×21)

## Responsive
- Desktop: full layout as described
- Mobile: different layout (not in scope for this clone)

## Text Content
- Phone: +7 (499) 500-40-01
- Email: inform@avangard-sp.ru
- Button 1: ЗАПРОСИТЬ ПРАЙС
- Button 2: ОТПРАВИТЬ ЗАЯВКУ
- Catalog btn: КАТАЛОГ
- Login: Войти
