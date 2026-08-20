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
- `/mit-hund` — hundefreundliche Seen & Wanderungen (`dogFriendly`-Feld am Post)
- `/familienausfluege` bzw. `/kinderwagen-ausfluege` — kinderwagentaugliche Wege, Familien-Check-Box
- `/fotospots` — Aussichtspunkte & Foto-Stellen je Bundesland
- `/einkehr` — Hütten/Gasthäuser nach der Wanderung (neues `app/lib/einkehr.ts`)
- `/unterkuenfte/am-see`, `/unterkuenfte/romantisch` — kommerzielle Intent-Seiten (Affiliate)
- „Basislager"-Seiten: beste Ausgangsorte je Wanderregion (Affiliate-stark)
- `/sonnenuntergang-spots` — Golden-Hour-Ziele inkl. Rückweg-Hinweis
- `/zwei-ausfluege-an-einem-tag` — Vormittag+Nachmittag-Kombis mit Transferzeit
- Weitere Startstädte in `app/lib/wochenendtrip.ts` — Villach/Bregenz/St. Pölten bewusst **nicht**:
  Villach & St. Pölten überschneiden sich zu stark mit Klagenfurt bzw. Wien (Duplicate Content),
  Bregenz hat im 220-km-Radius nur ~25 Ziele. Erst nachziehen, wenn mehr Vorarlberg-Posts da sind.
- Weitere Seen-Themen in `app/lib/seen.ts` — alle 5 `LakeTag`s haben jetzt eine Seite.
  Für ein neues Thema braucht es zuerst einen neuen Tag im `LakeTag`-Typ (z. B. `hund`, `gratis`).
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
- Themenseiten aus Artikeln heraus verlinken: aktuell zeigen die Landingpages **auf** die
  Artikel, aber kaum ein Artikel zeigt zurück auf eine passende Themenseite.

### Content
- **Neue Artikel** (Slug vorher prüfen!) — dünn besetzte Regionen zuerst.
  Stand 2026-08-20 je Region: Kärnten 44, Burgenland 26, Steiermark 26, Salzburg 19, Tirol 19,
  Wien 9, **Oberösterreich 8, Niederösterreich 7, Vorarlberg 7**.
  Übrige Ideen: Vorarlberg (Arlberg-Sommer, Karren Dornbirn), NÖ (Waldviertel-Stauseen, Grafenegg),
  OÖ (Mondsee, Wolfgangsee-Ostufer).
- **Dünne Artikel ausbauen** — der Durchgang durch Wien, Vorarlberg, NÖ und OÖ ist
  abgeschlossen (2026-08-18). Als Nächstes die kürzeren Artikel in Burgenland und Tirol prüfen.
  Zusätzliche `##`-Abschnitte mit echtem Inhalt (Geschichte, Aktivitäten, beste Zeit,
  Anreise), keine Floskeln, kein Duplicate Content.
- `startCoords` / `startPoint` für weitere Orts-Artikel nachziehen
- `planningMistakes` („Schlecht geplant, wenn …") für weitere Top-Artikel
- `routeVariants` (Kurz/Lang) für weitere Touren-Artikel
- Weitere Badeplätze in `app/lib/badeplaetze.ts`
- Weitere Unterkünfte in `app/lib/unterkuenfte.ts` (mehr Affiliate-Fläche)

---

## Log (neueste zuerst)

<!-- Format: - YYYY-MM-DD — [Feature|Content] Kurzbeschreibung -->

- 2026-08-20 — [Content] `app/lib/badeplaetze.ts` von 19 auf 25 Einträge erweitert — Steiermark war komplett unvertreten (jetzt Grundlsee, Altausseer See, Stubenbergsee), dazu Millstätter See, Keutschacher See und der Neusiedler-See-Hauptteil (Illmitz) ergänzt.
- 2026-08-20 — [Feature] Ausflugsplaner-Teaser auf der Startseite (schmale Banner-Sektion nach dem Kennzahlen-Band) + neue SEO-Keywords (Steyr, Nationalpark Kalkalpen, Ötscher, Semmering) für OÖ/NÖ passend zu den neuen Artikeln.
- 2026-08-20 — [Content] 6 neue Artikel in den drei dünnsten Regionen: Vorarlberg (Montafon, Rappenlochschlucht), Niederösterreich (Ötscher-Tormäuer, Semmeringbahn), Oberösterreich (Nationalpark Kalkalpen, Steyr-Altstadt). Alle mit startCoords, region-passenden bestSeason-Angaben und gegenseitiger Verlinkung wo thematisch passend.
- 2026-08-20 — [Feature] `app/lib/monatstipps.ts` um Jänner–Juni erweitert (60 neue Picks, 6 neue SSG-Seiten unter `/beste-ausfluege/[monat]`) — jetzt alle 12 Monate abgedeckt. Jede Zuordnung gegen das `bestSeason`-Feld des jeweiligen Posts geprüft, damit keine Ziele außerhalb ihrer echten Saison landen (z. B. Klammen erst ab Mai, Minimundus erst ab April). `/beste-ausfluege`-Hub-Text entsprechend aktualisiert.
- 2026-08-20 — [Feature] Neuer Hub `/ausflugsplaner`: bündelt alle 12 Themenseiten (Wetter, Zeit, Seen, Monat, Anreise/Karte) gruppiert mit Kurzbeschreibung. Footer + Sitemap ergänzt, aus 10 bestehenden Themenseiten zurückverlinkt (vorher zeigten sie nur aufeinander, nicht auf eine zentrale Übersicht).
- 2026-08-19 — [Content] 4 neue Wien-Artikel (Donauinsel, Lainzer Tiergarten, MuseumsQuartier, Schloss Belvedere) — Wien war mit 5 Artikeln die dünnste Region, jetzt 9. Alle mit `startCoords`, querverlinkt aus /regentaugliche-ausfluege, /hitzefreundliche-ausfluege, /feierabend-ausfluege und aus bestehenden Wien-Artikeln.
- 2026-08-18 — [Feature] Seen-Datenbestand von 10 auf 23 Seen erweitert + 2 neue Themenseiten (`warme-seen`, `seen-mit-wassersport`). Stärkt alle 5 Themenseiten und `/seen-vergleich` gleichzeitig.
- 2026-08-18 — [Content] Region-FAQs von 37 auf 73 verdoppelt (je 8–9 pro Bundesland). Neue Fragen zielen auf echte Suchintentionen: Aufenthaltsdauer, Schlechtwetter, Auto vs. Öffis, Hunde/Familien. Speist die FAQPage-Rich-Snippets.
- 2026-08-18 — [Feature] Monatsseiten Oktober, November & Dezember ergänzt (je 10 Picks, 3 neue SSG-Seiten). Bewusst jetzt gebaut, damit sie vor der jeweiligen Saison indexiert sind.
- 2026-08-18 — [Content] 6 dünne NÖ-/OÖ-Artikel ausgebaut (Traunsee, Krippenstein, Linz, Schneeberg, Rax, Lunzer See). Damit sind alle vier dünnen Regionen (Wien, Vorarlberg, NÖ, OÖ) durch.
- 2026-08-18 — [Feature] Wochenendtrip-Startstädte Linz, Innsbruck & Klagenfurt ergänzt (3 neue SSG-Seiten). Kandidaten vorab per Haversine-Skript geprüft: Villach/St. Pölten wegen Überschneidung, Bregenz wegen zu weniger Ziele verworfen.
- 2026-08-18 — [Content] Alle 5 Vorarlberg-Artikel ausgebaut (Bregenz, Festspiele, Bregenzerwald, Lünersee, Silvretta): neue Abschnitte zu Geschichte, Holzarchitektur/KäseStrasse, Natur-vs-Stausee und Beste Reisezeit.
- 2026-08-18 — [Feature] `/aussicht-ohne-anstrengung`: 21 Ziele in 4 Gruppen (Seilbahnen, Panoramastraßen, Aussichtstürme, kurze Wege) — Zielgruppe Familien, Senioren, gemütliche Ausflügler.
- 2026-08-18 — [Content] Alle 5 Wien-Artikel ausgebaut (Schönbrunn, Prater, Stephansdom, Alte Donau, Wienerwald): je 2–3 neue Abschnitte (Geschichte, Beste Reisezeit) und vertiefte Praxis-Infos. Wien war die dünnste Region.
- 2026-08-18 — [Feature] `/regentaugliche-ausfluege`: Schlechtwetter-Plan-B mit 28 kuratierten Zielen in 6 Gruppen, ehrlichen „auch bei Regen im Freien"-Hinweisen und Klamm-Sicherheitswarnung.
- 2026-08-18 — [Content] Artikel „Stift Melk" ausgebaut: neue Abschnitte Geschichte, Beste Reisezeit, Anreise; Höhepunkte & Praktische Infos vertieft.
- 2026-07-31 — [Setup] Playbook angelegt, täglicher Lauf eingerichtet.
