# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static
- **Position:** bottom of page

## Visual Description
Dark navy background (same as top bar). Multi-column layout with link groups, addresses, social icons, "Письмо директору" button, copyright bar.

## Footer Top (`.footer-top`)
- backgroundColor: rgb(44, 62, 111) = #2C3E6F
- color: white
- padding: ~32px 0
- height: ~377px

## Inner Layout
- display: grid or flex
- ~5 columns
- maxWidth: ~1200px
- margin: 0 auto

## Column 1 — Catalog links
**Heading:** none (just links)
- Оптом
- Спецодежда
- Защитная спецодежда
- Зимняя спецодежда
- Летняя спецодежда
- Рабочая обувь

## Column 2 — СИЗ / Protection
**Heading:** Средства индивидуальной защиты рук
- Медицинская одежда
- Спецодежда для охраны
- Одежда для ресторанов

## Column 3 — Industry/Sector links
- Одежда для пищевой промышленности
- Одежда для сферы услуг
- Средства индивидуальной защиты

## Column 4 — More categories
- Трикотажная спецодежда

## Column 5 — Contacts
**Г. Москва:**
- Офис: 109052, Рязанский пр-т, 2, стр.49, БЦ "Карачарово"
- тел. +7 (499) 500-40-01

**Г. Погар:**
- Производство: ул. Октябрьская, д. 51
- тел. +7(48349) 2-22-22

## Middle Row
- "ПИСЬМО ДИРЕКТОРУ" button — white border, white text, navy bg
- "Политика конфиденциальности" link
- "Карта сайта" link

## Social Icons Row
- VKontakte (ВК) icon circle
- Telegram icon circle
- Odnoklassniki icon circle
- All circles on navy bg, white icons

## Bottom Bar
- Divider line
- Center text: "Спецодежда и экипировка от производителя Авангард"

## Footer Bottom (below footer-top)
- backgroundColor: slightly darker navy or same
- Copyright: "Copyright © 2004-2026. Все права защищены..."
- Full legal disclaimer text
- Font-size: ~11-12px

## Link Styles
- color: white
- fontSize: ~14px
- text-decoration: none
- Hover: underline or opacity change

## Responsive
- Desktop: 5 columns
- Mobile: stacked columns
