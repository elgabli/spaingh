---
title: "Spain Digital Nomad Visa Eligibility Checker"
description: "Find out if you qualify for Spain's Digital Nomad Visa in under 2 minutes."
lang: en
slug: digital-nomad-visa-eligibility-checker
translationGroup: nomada-digital
pilar: nomada-digital
publishedDate: 2026-08-27
updatedDate: 2026-09-11
---

## How This Tool Works

This eligibility checker evaluates your profile against the core requirements of Spain's
Digital Nomad Visa, established under the **Startup Law (Ley 28/2022)**.

### Criteria Evaluated

| Requirement | Legal Basis | What We Check |
|---|---|---|
| Prior tax residency | Art. 74.2 Ley de Extranjería (as modified) | No Spanish tax residency in last 5 years ⚠️ *pendiente de confirmación jurídica — ver nota abajo* |
| Remote work | Art. 74.2.bis Ley de Extranjería | Work for non-Spanish company or foreign clients (≥80% income from abroad) |
| Minimum income | Ley 14/2013, art. 71 (reglamento de desarrollo) | ≥200% SMI (~€2,400/month in 2026) |
| Professional experience | Art. 74.2.bis Ley de Extranjería | 3+ years experience OR university degree |
| Health insurance | Art. 74.2.bis Ley de Extranjería | Comprehensive private health coverage in Spain |
| Criminal record | Art. 74.2.bis Ley de Extranjería | Clean record in all countries of residence (last 5 years) |

> **Nota de corrección (11-sep-2026):** la tabla en producción citaba "Royal Decree 1001/2023"
> y "Orden PRE/1033/2023" para el requisito de ingresos — ninguna de las dos normas existe con
> ese número en el BOE (verificado exhaustivamente). Se ha quitado la cita falsa aquí; queda
> **pendiente identificar la norma real** con la fuente jurídica de Elena antes de publicar.

<div class="warning-box">
<p><strong>Important limitations:</strong> This tool does not evaluate all possible grounds for
refusal (e.g., being on a list of inadmissible persons, prior deportation orders, or specific
country restrictions). It also does not assess the validity of your employment contract, the
solvency of your employer, or whether your profession qualifies as "highly qualified." These
factors are assessed by Spanish consulates and immigration authorities on a case-by-case basis.</p>
</div>

### Sources

- [Ley 28/2022, de 21 de diciembre, de fomento del ecosistema de las empresas emergentes (BOE)](https://www.boe.es/buscar/act.php?id=BOE-A-2022-21739)
- [Ministerio de Inclusión, Seguridad Social y Migraciones — Extranjería](https://extranjeros.inclusion.gob.es/es/)

⚠️ **Pendiente jurídico (no técnico, no tocar sin confirmación de Elena):** el bloqueo del
requisito "sin residencia fiscal en España en los últimos 5 años" corresponde, según la auditoría
del 10-sep-2026, al régimen fiscal Beckham (art. 93 LIRPF) y no al visado de teletrabajador
internacional en sí. Se mantiene en el checker tal y como está en producción hasta que Elena lo
confirme — ver `rescate/NOTAS-SPAINGH.md`.
