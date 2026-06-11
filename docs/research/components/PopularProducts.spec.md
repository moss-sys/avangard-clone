# PopularProducts Specification

## Overview
- **Target file:** `src/components/PopularProducts.tsx`
- **Interaction model:** static grid
- **Position:** below PromoBanners

## Visual Description
Section with heading "Популярные товары". 4-column grid of product cards.

## Section Header
- Text: "Популярные товары"
- fontSize: ~18-20px
- fontWeight: bold or 400
- color: black
- margin-bottom: ~16px

## Product Card (`.element`)
- backgroundColor: white (transparent)
- border: 0.75px solid rgb(196, 196, 196) = #C4C4C4
- borderRadius: 0px
- width: 275px
- height: 384px
- padding: 5px 10px
- display: flex
- flexDirection: column
- position: relative

## Card Content (top to bottom)
1. Russian flag badge — top-left corner, small PNG `/images/rf-flag.jpg` (made-in-Russia)
2. Product image — centered, ~273×280px
3. Product name — 1-2 lines, black text, ~14px
4. Price "X *** руб." — navy color rgb(44,62,111), then "(Опт)" in same color
5. Article number "Арт. XXXXXX" — smaller, gray text

## Products Data
1. Name: Полуботинки мужские рабочие летние "Легион", МП
   Image: `/images/products/legion.jpg`
   Price: 2 204 руб. (Опт)
   Article: 077115

2. Name: Костюм мужской рабочий летний для ИТР "Виват"
   Image: `/images/products/vivat.jpg`
   Price: 5 975 руб. (Опт)
   Article: 171868

3. Name: Костюм мужской "Джокер" NEW
   Image: `/images/products/djoker.jpg`
   Price: 4 400 руб. (Опт)
   Article: 177619

4. Name: Ботинки с высоким берцем "Корвет-2", КП
   Image: `/images/products/korvet.jpg`
   Price: 3 801 руб. (Опт)
   Article: 176484

## Price Styles
- Price number: color rgb(44, 62, 111), fontWeight: bold or 400
- "(Опт)": same color, smaller or same size
- "Арт. XXXXXX": fontSize: ~12px, color: #666 or black

## Flag Badge
- Position: absolute, top: 5px, left: 5px
- Size: ~30×20px
- Image: `/images/rf-flag.jpg`

## Hover State
- Border color likely changes to navy on hover
- Possible slight shadow

## Responsive
- Desktop (1440px): 4 columns
- Tablet: 2 columns
- Mobile: 1 column
