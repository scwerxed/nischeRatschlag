# DAILY.md — Playbook für die tägliche Weiterentwicklung

Dieses Dokument steuert den **automatischen Tageslauf** (scheduled task `daily-site-improvement`).
Jeder Lauf startet **ohne Gedächtnis** an frühere Sessions — dieses File + `git log` sind der Kontext.

**Ziel:** Pro Tag genau **eine** sinnvolle, fertige Verbesserung der Website — entweder ein
**Feature** oder **Content**. Lieber eine Sache richtig als drei halbe.

---

## Ablauf je Lauf

1. **Orientieren:** dieses File lesen, dazu `git log --oneline -15` — was kam zuletzt?
2. **Auswählen:** genau *eine* Aufgabe aus dem Backlog unten (oder eine bessere eigene Idee).
   - **Abwechseln:** War der letzte Lauf ein Feature, nimm heute Content — und umgekehrt.
   - Nichts nehmen, was im Log unten schon steht.
3. **Umsetzen:** sorgfältig, nach den Regeln unten.
4. **Doku:** `CLAUDE.md` aktualisieren, wenn sich Architektur/Routen ändern.
5. **Log:** unten einen Eintrag ergänzen (Datum, was, warum).
6. **Backlog pflegen:** erledigten Punkt entfernen, neue Ideen ergänzen.
7. **Commit + Push** auf `main` (aussagekräftige Message, Co-Authored-By-Zeile).

---

## Harte Regeln

- ⚠️ **Kein lokaler Build möglich** (kein Node/pnpm auf der Maschine). Also:
  **keine riskanten Umbauten**, keine neuen Dependencies, keine Änderungen an Build-Config.
  Jede Änderung durch sorgfältiges Review absichern — bestehende Muster kopieren, nicht erfinden.
- **Sprache:** Alle Inhalte auf **Deutsch**, Zielgebiet **Österreich** (langfristig DACH).
- **Keine erfundenen Fakten.** Keine exakten Preise, Öffnungszeiten oder Fahrpläne behaupten.
  Vorsichtig formulieren („kostenpflichtig", „vorab prüfen") — die Seite lebt von Ehrlichkeit.
- **Slugs prüfen:** Jeder in einer kuratierten Liste referenzierte Slug muss in
  `app/lib/posts.ts` existieren. Vor dem Commit per grep gegenchecken.
- **Keine Slug-Dubletten** bei neuen Artikeln.
- **Muster einhalten:** `CATEGORY_STYLE` (blog-utils), `PostArtwork`, `regionName()`,
  `breadcrumbSchema` + `ItemList`-JSON-LD, neue Seiten in `app/sitemap.ts` **und**
  im Footer (`app/ui/footer.tsx`) verlinken, untereinander querverlinken.
- **Affiliate-Links** immer über `cloak()` aus `app/lib/affiliate.ts`.
- Bei neuen Orts-Artikeln nach Möglichkeit `startCoords` (+ `startPoint`) setzen.

---

## Backlog (eine Sache pro Tag herausnehmen)

### Features / neue Seiten
- `/regentaugliche-ausfluege` — Schlechtwetter-Plan-B (Thermen, Museen, Klammen, Höhlen)
- `/mit-hund` — hundefreundliche Seen & Wanderungen (`dogFriendly`-Feld am Post)
- `/familienausfluege` bzw. `/kinderwagen-ausfluege` — kinderwagentaugliche Wege, Familien-Check-Box
- `/fotospots` — Aussichtspunkte & Foto-Stellen je Bundesland
- `/einkehr` — Hütten/Gasthäuser nach der Wanderung (neues `app/lib/einkehr.ts`)
- `/unterkuenfte/am-see`, `/unterkuenfte/romantisch` — kommerzielle Intent-Seiten (Affiliate)
- „Basislager"-Seiten: beste Ausgangsorte je Wanderregion (Affiliate-stark)
- `/aussicht-ohne-anstrengung` — viel Aussicht, wenig Höhenmeter (Bergbahnen, kurze Wege)
- `/sonnenuntergang-spots` — Golden-Hour-Ziele inkl. Rückweg-Hinweis
- `/zwei-ausfluege-an-einem-tag` — Vormittag+Nachmittag-Kombis mit Transferzeit
- Weitere Monate in `app/lib/monatstipps.ts` (Oktober, November, Dezember, …)
- Weitere Startstädte in `app/lib/wochenendtrip.ts` (Linz, Innsbruck, Klagenfurt, Villach)
- Weitere Seen-Themen in `app/lib/seen.ts` (`seen-mit-wassersport`, `warme-seen`)
- `/karte`: Filter-Chips (Unterkünfte/Gipfel/Wege) — Layer-Panel existiert bereits
- Post-Feld `season` → „Saison-Ampel" (jetzt / geht / eher nicht) auf Karten & Artikeln
- Post-Feld `oeffi` → „Mit Öffis erreichbar"-Badge auf Artikel- und Übersichtskarten
- Post-Feld `kosten` → Budget-Karte (Parken, Bahn, Eintritt, Bergbahn, Essen)
- „Wenn dir diese Tour gefällt …" — ähnliche Touren je Artikel (Region+Kategorie+Schwierigkeit)
- Region-Seiten: Vergleichstabelle der Touren (Dauer, Schwierigkeit, Höhenmeter, Baden)
- Artikel: „Auto oder Öffis?"-Vergleichsblock
- Artikel: „1 Nacht reicht?"-Block für Tagesziele mit langer Anfahrt
- „Route in Google Maps / Komoot öffnen"-Buttons bei Touren-Artikeln
- `/blog`: Pagination bzw. „Mehr laden" (aktuell werden alle ~155 Karten gerendert)
- Technisch: `any`-Typen in den Leaflet-Dateien durch `@types/leaflet` ersetzen

### Content
- **Neue Artikel** (Slug vorher prüfen!) — dünn besetzte Regionen zuerst:
  Wien, Vorarlberg, Niederösterreich, Oberösterreich
- **Dünne Artikel ausbauen** — v. a. die zuletzt ergänzten Regional-Artikel (~150 Wörter).
  Zusätzliche `##`-Abschnitte mit echtem Inhalt (Geschichte, Aktivitäten, beste Zeit,
  Anreise), keine Floskeln, kein Duplicate Content.
- `startCoords` / `startPoint` für weitere Orts-Artikel nachziehen
- `planningMistakes` („Schlecht geplant, wenn …") für weitere Top-Artikel
- `routeVariants` (Kurz/Lang) für weitere Touren-Artikel
- FAQs je Region in `app/lib/faqs.ts` erweitern
- Weitere Badeplätze in `app/lib/badeplaetze.ts`
- Weitere Unterkünfte in `app/lib/unterkuenfte.ts` (mehr Affiliate-Fläche)

---

## Log (neueste zuerst)

<!-- Format: - YYYY-MM-DD — [Feature|Content] Kurzbeschreibung -->

- 2026-08-18 — [Content] Artikel „Stift Melk" ausgebaut: neue Abschnitte Geschichte, Beste Reisezeit, Anreise; Höhepunkte & Praktische Infos vertieft.
- 2026-07-31 — [Setup] Playbook angelegt, täglicher Lauf eingerichtet.
