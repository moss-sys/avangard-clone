# CTAButtonsRow Specification

## Overview
- **Target file:** `src/components/CTAButtonsRow.tsx`
- **Interaction model:** static row (buttons open modals on original, non-functional in clone)
- **Position:** below CategoryGrid, above PromoBanners

## Visual Description
4 buttons in a horizontal row, centered. All have identical styling: white background, navy border, navy uppercase text.

## Container
- display: flex
- justify-content: center
- gap: ~16px
- padding: ~24px 0
- width: 100%

## Button Styles (all identical)
- backgroundColor: rgb(255, 255, 255)
- color: rgb(44, 62, 111)
- border: 1.5px solid rgb(44, 62, 111)
- fontSize: 16px
- fontWeight: 400
- textTransform: uppercase
- padding: 11px (all sides)
- width: ~228px
- height: ~41-56px (varies by text length)
- cursor: pointer
- fontFamily: Calibri, Tahoma, sans-serif
- borderRadius: 0px

## Button Labels
1. ЗАКАЗАТЬ ПРОДУКЦИЮ
2. ЗАДАТЬ ВОПРОС ЭКСПЕРТУ
3. ЗАПРОСИТЬ СЕРТИФИКАТЫ
4. СКАЧАТЬ КАТАЛОГ

## Hover State
- backgroundColor: rgb(44, 62, 111) (navy fill)
- color: rgb(255, 255, 255)
- transition: background-color 0.2s, color 0.2s

## Responsive
- Desktop: 4 buttons in one row
- Mobile: wrap to 2×2 or 1×4
