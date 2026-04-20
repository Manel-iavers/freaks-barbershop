# Checklist de deployment — FREAKS Barbershop Xatbot

**Sistema:** FREAKS Barbershop Xatbot v1.0.0 | **Tier:** RISC_LIMITAT | **Data:** 2026-04-20
**Deadline AI Act:** 2 agost 2026

---

## A. Comú a tots els tiers

- [x] `risk-classification.md` generat
- [x] `ai-system-registry.md` generat
- [x] Model base anotat amb versió exacta (mlx-community/Qwen3.5-9B-MLX-4bit)
- [x] Documentació oficial accessible (https://qwenlm.github.io/ + Hugging Face)
- [ ] Sentry integrat — **pendent**
- [x] Secrets a `.env` (MLX_API_URL)
- [x] `.env` al `.gitignore`
- [x] `responsible-ai-policy.md` generat

## B. RISC_LIMITAT

- [x] `transparency-clauses.md` generat
- [ ] Banner IA visible al chat (3 idiomes) — **pendent commit**
- [ ] Badge "IA" / "AI" permanent al header — **pendent commit**
- [ ] Headers X-AI-Generated a `/api/chat` — **pendent commit**
- [ ] Tests E2E Playwright disclaimer (3 locales) — **pendent**
- [ ] systemPrompt amb identificació IA (ca/es/en) — **pendent commit**

## C. Compliance transversal

### GDPR
- [x] **Cap tractament directe de dades personals pel xatbot** — no cal `docs/compliance/` específic per aquest component
- [ ] Política privacitat general del web freaksbarbershop.com (web, no xatbot) — responsabilitat FREAKS

### Seguretat
- [x] Rate limiting actiu (5 msg/min per IP)
- [x] Validació inputs (locale whitelist, array check)
- [x] Timeout 25s a crida MLX
- [x] Edge runtime Vercel (sandbox)

## D. Deployment pipeline

- [x] Vercel Edge runtime + MLX local (freaks-mlx.iavers.com:8090)
- [ ] `/validate` skill executat — **pendent**
- [ ] CI GitHub Actions — **pendent**
- [x] Gate no-placeholders verd

## E. Post-deployment

- [x] Monitor Vercel actiu
- [x] Canal feedback (WhatsApp, Instagram)
- [x] Calendari revisió anual: 2027-04-20

---

## Pendents crítics abans 2 ago 2026

1. Aplicar banner IA localitzat al ChatWidget (3 idiomes)
2. Afegir headers X-AI-* a route.ts
3. Afegir identificació IA al systemPrompt (3 idiomes)
4. Integrar Sentry (opcional, no blocking)
5. CI GitHub Actions (opcional)

---

## Signatures

| Rol | Nom | Data | Signat |
|-----|-----|------|--------|
| Provider (Manel Hernández Cabezo, autònom, marca IAvers) | Manel H. | 2026-04-20 | ☐ |
| Deployer (FREAKS Barbershop) | — | — | ☐ |

---

*Generat per skill `ai-compliance` d'IAvers Factory.*
