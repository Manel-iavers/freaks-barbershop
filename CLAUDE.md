# FREAKS Barbershop

Landing page + xatbot per a FREAKS Barbershop, barberia a Gracia, Barcelona.

## Stack

| Camp | Valor |
|------|-------|
| Framework | Next.js 15 + React 19 |
| CSS | Tailwind CSS 3.4 |
| Idiomes | ca/es/en (i18n amb middleware) |
| Xatbot | API route `/api/chat` |
| Hosting | Vercel |
| Node | >=18.17 |

## Estructura

```
src/
├── app/
│   ├── [locale]/        → Pagines amb i18n (layout + page)
│   ├── api/chat/        → API xatbot
│   ├── layout.tsx       → Layout arrel
│   └── page.tsx         → Redirect
├── components/
│   ├── chat/            → ChatWidget, ChatCards
│   ├── layout/          → LanguageSwitcher, JsonLd
│   └── sections/        → Hero, About, Gallery, Location, Footer
├── lib/
│   ├── chat-config.ts   → Config xatbot
│   └── dictionaries.ts  → Traduccions ca/es/en
└── middleware.ts         → Routing i18n
```

## Comandes

```bash
npm run dev      # Desenvolupament
npm run build    # Build produccio
npm run lint     # Lint
```

## Convencions

- Commits: Conventional Commits (feat:, fix:, docs:)
- Idioma codi: angles
- Idioma docs/commits: angles o catala
- Deploy: Vercel (automatic via push a main)
