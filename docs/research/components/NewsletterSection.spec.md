# NewsletterSection Specification

## Overview
- **Target file:** `src/components/NewsletterSection.tsx`
- **Interaction model:** static form (non-functional in clone)
- **Position:** near bottom, above SEO text

## Visual Description
Full-width light gray background section. Centered text label + email input + subscribe button on one line.

## Container
- backgroundColor: ~#f5f5f5 or white (light gray section)
- padding: ~32px 0
- width: 100%

## Inner layout
- display: flex
- align-items: center
- justify-content: center
- gap: ~16px

## Label
- Text: "ПОДПИСАТЬСЯ НА НАШИ НОВОСТИ:"
- fontSize: ~16px
- fontWeight: bold or uppercase
- color: black
- textTransform: uppercase

## Email Input
- width: ~300px
- height: ~40px
- border: 1px solid #ccc
- padding: 0 12px
- placeholder: "Введите ваш e-mail"
- fontSize: 14px

## Subscribe Button
- Text: "ПОДПИСАТЬСЯ"
- backgroundColor: rgb(44, 62, 111)
- color: white
- border: none
- padding: 0 20px
- height: ~40px
- fontSize: 14px
- textTransform: uppercase
- cursor: pointer
