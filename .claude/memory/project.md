# FREAKS Barbershop

## Info
- **Nom:** freaks-barbershop
- **Stack:** Next.js 15 + React 19 + Tailwind CSS 3.4
- **Repo:** ~/projectes/freaks-barbershop
- **Hosting:** Vercel
- **Client:** Juli (barber, propietari FREAKS Barbershop)
- **Estat:** MVP completat i desplegat

## Historial
- 2026-03: Landing page creada amb i18n (ca/es/en), xatbot integrat, galeria, mapa, SEO
- 2026-03-25: Configuracio MemSys3 afegida

## Decisions
- ADR-001: i18n via middleware Next.js amb rutes [locale]
- ADR-002: Xatbot non-streaming per compatibilitat Vercel Edge
- ADR-003: Imatges servides des de /public (no CDN extern)

## Notes
- Obertura barberia: 26 marc 2025
- Ubicacio: Gracia, Barcelona
- Eslogan: "be FREAK, it's cool"
