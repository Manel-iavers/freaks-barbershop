# Classificació de risc — FREAKS Barbershop Xatbot

**Sistema:** FREAKS Barbershop Xatbot v1.0.0
**Finalitat:** Xatbot integrat a la web de FREAKS Barbershop (Gràcia, Barcelona). Respon dubtes sobre serveis, preus, ubicació, horaris i deriva a reserva via Booksy.
**Provider:** Manel Hernández Cabezo (autònom, marca IAvers, NIF 38803352Y)
**Deployer:** FREAKS Barbershop (Gràcia, Barcelona)
**Data classificació:** 2026-04-20
**Revisió prevista:** 2027-04-20
**Idioma:** ca + es + en

---

## 1. Resultat

| Camp | Valor |
|------|-------|
| **Tier** | **RISC_LIMITAT** |
| Article AI Act aplicable | Art. 50.1 |
| Annex III aplicable? | No |

### Raonament
Xatbot multilingüe (ca/es/en) que respon en llenguatge natural (art. 50.1). No és biometria, educació, RRHH, serveis essencials ni justícia. No fa decisions automatitzades. Simplement orienta cap a la reserva a Booksy (decisió humana final).

---

## 2. Característiques

- **Sector:** barberia / cosmètica masculina / servei presencial
- **Interactua amb persones?** Sí (visitants web, 3 idiomes)
- **Decisions sobre persones?** No (deriva a Booksy, decisió humana)
- **Contingut sintètic?** Sí (text curt)
- **Model base:** mlx-community/Qwen3.5-9B-MLX-4bit (MLX local, infraestructura IAvers)
- **GPAI?** Sí (Qwen3.5-9B pre-entrenat per Alibaba, versió MLX)
- **Dades personals?** No (el xatbot només respon informació pública, reserves es fan a Booksy externament)
- **Human in the loop?** No, però amb derivació fàcil a WhatsApp

---

## 3. Obligacions RISC_LIMITAT

1. Informar que interactua amb IA (art. 50.1) → `transparency-clauses.md`
2. Marcar contingut generat (art. 50.2) → headers API + badge UI
3. Registre intern → `ai-system-registry.md`
4. Política ús responsable → `responsible-ai-policy.md`
5. Checklist deployment → `deployment-checklist.md`

**Deadline:** 2 agost 2026.

---

*Generat per skill `ai-compliance` d'IAvers Factory. Autor: Manel Hernández Cabezo (autònom, marca IAvers).*
