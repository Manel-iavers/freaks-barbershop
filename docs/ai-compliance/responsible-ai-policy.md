# Política d'ús responsable d'IA — FREAKS Barbershop Xatbot

**Sistema:** FREAKS Barbershop Xatbot v1.0.0
**Provider:** Manel Hernández Cabezo (autònom, marca IAvers) | **Deployer:** FREAKS Barbershop
**Data:** 2026-04-20 | **Revisió:** 2027-04-20

---

## 1. Principis

Segueix els 7 principis de l'Ètica de la IA de la Comissió Europea (HLEG 2019):
supervisió humana, robustesa, privacitat, transparència, equitat, benestar, responsabilitat.

## 2. Usos permesos

- Respondre consultes sobre FREAKS (serveis, preus, horaris, ubicació) en català, castellà i anglès
- Derivar reserves cap a Booksy (enllaç extern)
- Derivar contacte humà cap a WhatsApp o Instagram
- Proporcionar info pública i general sobre estil, tendències de barberia

## 3. Usos prohibits

- Qualsevol pràctica de l'art. 5 AI Act (manipulació, discriminació, etc.)
- Generar contingut il·legal, ofensiu, sexualitzat o amb biaixos racistes/sexistes
- Fer diagnòstics mèdics (problemes de cuir cabellut, etc.) — sempre derivar a professional
- Recomanar tractaments específics que requereixen avaluació professional
- Finalitats fora de l'àmbit FREAKS (el SYSTEM_PROMPT ho limita)

## 4. Supervisió

Operació automatitzada dins àmbit. Cap decisió automàtica afecta drets. Visitants poden:
- Derivar-se a WhatsApp (+34 693 95 23 47) per atenció humana
- Reservar a Booksy (procés humà extern)
- Contactar Instagram @freaks_barbershop

## 5. Transparència

- Badge "IA" permanent al chat — veure `transparency-clauses.md`
- Model base documentat (Qwen3.5-9B-MLX-4bit)
- Visitants poden sol·licitar info tècnica a manel@iavers.com

## 6. Biaixos

- Model pre-entrenat per Alibaba (Qwen team) — biaixos heretats
- Monitoreig manual periòdic de converses (logs Vercel/MLX)
- El sector barberia té risc baix de generar biaixos sensibles (no RRHH, no credit scoring)
- Reports d'usuaris: via WhatsApp o Instagram

## 7. Privacitat

- **Cap tractament de dades personals pel xatbot** — no recull nom/email/telèfon
- Reserves amb dades personals es fan a Booksy (responsable dades: Booksy)
- Rate limiting per IP (no identifica persona, només prevenció abús)

## 8. Model subjacent (GPAI)

- **Model:** mlx-community/Qwen3.5-9B-MLX-4bit (Ollama/MLX local)
- **Infraestructura:** servidor local d'IAvers (Mac Mini) — les dades mai surten a tercers
- **Llicència:** Apache 2.0

## 9. Responsabilitat

- **Provider:** Manel Hernández Cabezo (autònom, marca IAvers) — disseny, manteniment, monitoreig MLX
- **Deployer:** FREAKS Barbershop — ús comercial al web
- **Contactes:** manel@iavers.com (provider), WhatsApp +34 693 95 23 47 (deployer)

## 10. Incidents

1. Report a manel@iavers.com
2. Avaluació <24h
3. Mesures correctives al Git
4. Notificació AESIA si incident greu (<15 dies, art. 73 AI Act)

## 11. Revisió

Anual (2027-04-20) o per esdeveniment (canvi model, canvi abast, normes harmonitzades, incident).

---

*Generat per skill `ai-compliance` d'IAvers Factory. Aprovat per: Manel Hernández Cabezo (autònom, marca IAvers) + FREAKS Barbershop.*
