# Registre del sistema d'IA — FREAKS Barbershop Xatbot

> Annex IV (versió simplificada) del Reglament (UE) 2024/1689.

**Sistema:** FREAKS Barbershop Xatbot v1.0.0
**Data:** 2026-04-20 | **Revisió:** 2027-04-20 | **Tier:** RISC_LIMITAT

---

## 1. Descripció

- **Nom:** FREAKS Barbershop Xatbot (identitat: "FREAKS Bot")
- **Finalitat:** Xatbot integrat al web freaksbarbershop.com (Next.js) que respon en 3 idiomes (ca/es/en) sobre serveis, preus, horaris, ubicació. Deriva reserves a Booksy.
- **Sector:** barberia / servei presencial
- **Output:** text curt (max 200 tokens) + cards tipus (SERVICES, BOOKSY, LOCATION, SCHEDULE, CONTACT, WHATSAPP)

### Provider
- **Nom:** Manel Hernández Cabezo (autònom, marca IAvers)
- **NIF:** 38803352Y
- **Adreça:** Josep Pla 43, 08398 Santa Susanna (Barcelona)
- **Contacte:** manel@iavers.com

### Deployer
- **Nom:** FREAKS Barbershop
- **Ubicació:** Gràcia, Barcelona
- **Contacte:** via Booksy + Instagram @freaks_barbershop + WhatsApp +34 693 95 23 47

### Stack
- Next.js 15 (React 19) amb component `ChatWidget.tsx` embegut al web
- API Edge route `/api/chat` (rate limiting 5 msg/min per IP)
- MLX local (servidor a infraestructura IAvers, port 8090)
- Deploy Vercel (web) + Mac Mini IAvers (MLX backend via freaks-mlx.iavers.com)

---

## 2. Model base (GPAI)

- **Model:** mlx-community/Qwen3.5-9B-MLX-4bit
- **Proveïdor:** Alibaba (Qwen team) — compilació MLX comunitària
- **GPAI?** Sí (model pre-entrenat d'ús general)
- **Docs:** https://qwenlm.github.io/ + https://huggingface.co/mlx-community
- **Llicència:** Apache 2.0
- **Inferència:** local (MLX a Mac Mini IAvers, OpenAI-compatible API)

**Dades d'usuari:** mai surten de la infraestructura IAvers. Inputs del visitant → Vercel Edge function → MLX local → resposta.

---

## 3. Arquitectura

```
Visitant web (freaksbarbershop.com)
  ↓
ChatWidget.tsx (React, localitzat ca/es/en)
  ↓
POST /api/chat (Next.js Edge runtime)
  ↓  (rate limit 5 msg/min per IP)
fetch http://localhost:8090/v1/chat/completions (MLX)
  ↓
mlx-community/Qwen3.5-9B-MLX-4bit
  ↓
Response JSON → extractCardType → ChatWidget renderitza text + card
```

---

## 4. Dades

- **Inputs:** text lliure en ca/es/en (preguntes sobre barberia)
- **Outputs:** text curt + cardType suggerit (SERVICES, BOOKSY, etc.)
- **Dades personals:** cap tractament directe — les reserves es fan a Booksy (responsable extern)
- **Retenció:** converses no persistides. Rate limit en memòria (Map) per IP, reset cada 60s

---

## 5. Monitoreig

- Logs Vercel Edge (errors capturats a `console.error`)
- Logs MLX local (stdout servidor)
- No Sentry integrat encara

---

## 6. Canvis

- Versionat Git (SemVer)
- PR + review + deploy Vercel
- Re-classificació si canvia abast o model base

---

## 7. Dades personals (GDPR cross-ref)

El xatbot **no recull dades personals**. Les reserves amb dades personals es fan a Booksy (responsable de dades: Booksy). Per tant no és necessari generar `docs/compliance/` per aquest xatbot. La web principal de FREAKS pot tenir el seu propi compliance GDPR (cookies, analytics).

---

*Generat per skill `ai-compliance` d'IAvers Factory. Signat per: Manel Hernández Cabezo (autònom, marca IAvers) — 2026-04-20.*
