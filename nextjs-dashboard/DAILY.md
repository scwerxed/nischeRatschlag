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
- `/zwei-ausfluege-an-einem-tag` — Vormittag+Nachmittag-Kombis mit Transferzeit
- Weitere Startstädte in `app/lib/wochenendtrip.ts` — Villach/Bregenz/St. Pölten bewusst **nicht**:
  Villach & St. Pölten überschneiden sich zu stark mit Klagenfurt bzw. Wien (Duplicate Content),
  Bregenz hat im 220-km-Radius nur ~25 Ziele. Erst nachziehen, wenn mehr Vorarlberg-Posts da sind.
- Weitere Seen-Themen in `app/lib/seen.ts` — alle 5 `LakeTag`s haben jetzt eine Seite.
  Für ein neues Thema braucht es zuerst einen neuen Tag im `LakeTag`-Typ (z. B. `hund`, `gratis`).
- „Mit Öffis erreichbar"-Badge existiert seit 2026-08-23 auf der Artikelseite und seit
  2026-09-03 auch auf Magazin-Grid + Regionsseiten-Karten (`isOeffiErreichbar()`).
  **Offen:** mehr Artikel in `BAHNHOF_GROUPS` aufnehmen, damit das Badge auf mehr als
  den ~20 kuratierten Karten erscheint.
- Post-Feld `kosten` → Budget-Karte (Parken, Bahn, Eintritt, Bergbahn, Essen) — ⚠️ kollidiert
  mit der „keine exakten Preise"-Regel; falls umgesetzt, nur grobe Kategorien
  ("günstig/mittel/teuer"), keine Beträge.
- Region-Seiten: Vergleichstabelle der Touren (Dauer, Schwierigkeit, Höhenmeter) — Datenlage
  aktuell dünn: nur 3 Posts haben `trails`, 7 `routeVariants`, die meisten Wandern-Artikel
  liefern nur `difficulty`. Erst sinnvoll, wenn mehr Touren strukturierte Länge/Dauer/Höhenmeter-
  Daten haben (`routeVariants`-Backlog-Punkt unten nachziehen).
- Artikel: „Auto oder Öffis?"-Vergleichsblock
- Artikel: „1 Nacht reicht?"-Block für Tagesziele mit langer Anfahrt
- `/blog`: Pagination bzw. „Mehr laden" (aktuell werden alle ~155 Karten gerendert)
- Technisch: `any`-Typen in den Leaflet-Dateien durch `@types/leaflet` ersetzen

### Content
- ⚠️ **Newsletter scharfschalten:** Code steht, es fehlen nur die drei Brevo-Env-Vars in
  Vercel (`BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`). Solange sie fehlen,
  antwortet `/api/newsletter` mit 503 und das Formular sagt das ehrlich. Das muss der
  Betreiber selbst im Brevo-Konto anlegen — nicht im Tageslauf machbar.
- **Neue Artikel** (Slug vorher prüfen!) — dünn besetzte Regionen zuerst.
  Stand 2026-09-06 je Region: Kärnten 44, Burgenland 26, Steiermark 26, Salzburg 19, Tirol 19,
  Wien 10, Niederösterreich 9, **Oberösterreich 9, Vorarlberg 9** (jetzt die dünnsten).
  Übrige Ideen: OÖ (Wolfgangsee-Ostufer), Vorarlberg (weiterer Ort im Bregenzerwald oder Walgau),
  NÖ (Waldviertel allgemein, Pielachtal/Dirndlweg).
- **Dünne Artikel ausbauen** — der Durchgang durch Wien, Vorarlberg, NÖ, OÖ sowie die
  12 kürzesten Burgenland-/Tirol-Artikel ist abgeschlossen (2026-08-23/24: kittsee-schloss,
  naturpark-rosalia-kogelberg, seefeld-tirol, hintertuxer-gletscher, st-anton-am-arlberg,
  walchsee-kaiserwinkl, podersdorf-am-see, burg-lockenhaus, schloss-halbturn,
  steppentierpark-pamhagen, stubaital-stubaier-gletscher, pitztaler-gletscher). Als Nächstes
  bei Bedarf die übrigen Regionen (Salzburg, Steiermark) auf besonders kurze Artikel prüfen.
  Zusätzliche `##`-Abschnitte mit echtem Inhalt (Geschichte, Aktivitäten, beste Zeit, Anreise),
  keine Floskeln, kein Duplicate Content.
- `startCoords` / `startPoint` für weitere Orts-Artikel nachziehen
- `planningMistakes` („Schlecht geplant, wenn …") für weitere Top-Artikel
- `routeVariants` (Kurz/Lang) für weitere Touren-Artikel
- Weitere Badeplätze in `app/lib/badeplaetze.ts`
- Weitere Unterkünfte in `app/lib/unterkuenfte.ts` (mehr Affiliate-Fläche)

---

## Log (neueste zuerst)

<!-- Format: - YYYY-MM-DD — [Feature|Content] Kurzbeschreibung -->

- 2026-09-07 — [Feature] Saison-Ampel: neues `app/lib/season.ts` (`seasonStatus()`) leitet aus dem längst vorhandenen `bestSeason`-Text (z. B. "Mai–Oktober", "Ganzjährig", "Dezember–März & Juni–September") ab, ob der aktuelle Monat 🟢 ideal, 🟡 Übergangszeit oder 🔴 eher ungünstig ist – Rückgabe `undefined` statt einer falschen Einschätzung, wenn der Text nicht sicher parsbar ist. Kein neues `Post`-Feld nötig, da praktisch jeder Artikel schon eine geprüfte `bestSeason`-Angabe hat. Sichtbar als Emoji im Artikel-Kopfbereich-Badge + farbiges Label unter „Beste Zeit" in der Sidebar (`app/blog/[slug]/page.tsx`) sowie als kleiner Farbpunkt neben `bestSeason` auf den Regionsseiten-Karten (`app/regionen/[bundesland]/page.tsx`). Beim Durchgehen des Backlogs auch zwei erledigte Punkte entfernt, die schon existieren: „Ähnliche Touren" (bereits `relatedPosts()` in `blog-utils.ts`) und `/karte`-Filter-Chips (das Ebenen-Panel mit Wanderwege/Gipfel/Unterkünfte-Toggles gibt es schon in `map-client.tsx`).
- 2026-09-06 — [Content] 2 neue Artikel für die bis dahin dünnste Region (Niederösterreich, 8) und Wien (9): `schloss-grafenegg-kamptal` (Niederösterreich, Ausflug) – neugotisches Schloss im Kamptal mit dem Wolkenturm (Freiluft-Konzertbühne des Grafenegg Festivals) und frei zugänglichem Skulpturenpark, verlinkt mit `wachau-duernstein` und `stift-melk` (Krems liegt dazwischen); `hofburg-schatzkammer-wien` (Wien, Ausflug) – Kaiserappartements, Sisi Museum und die Schatzkammer mit der Reichskrone, verlinkt mit `schloss-belvedere-wien` und `museumsquartier-wien`, zusätzlich in die „Städte bei Regen"-Gruppe auf `/regentaugliche-ausfluege` aufgenommen (reines Innenprogramm). Damit ist Niederösterreich mit Wien gleichauf (je 9–10 Artikel), Oberösterreich und Vorarlberg sind jetzt die dünnsten Regionen (je 9).
- 2026-09-05 — [Feature] Neue Landingpage `/sonnenuntergang-spots`: 17 kuratierte Golden-Hour-Ziele in 3 Gruppen (Bergblick nach Westen, Seen mit Spiegelung, Türme/Straßen/Städte im Abendlicht), Daten in `app/lib/themen-picks.ts` (`SONNENUNTERGANG_GROUPS`) nach bestehendem Muster. Inklusive genereller Rückweg-Hinweisbox (letzte Bahn/Bus prüfen, Sonnenuntergangszeit, Stirnlampe als Reserve) statt Einzel-Fakten je Ziel, um keine erfundenen Betriebszeiten zu riskieren. In den Rückwärts-Index (`themenseiten.ts`, neuer rank 13), `sitemap.ts`, Footer und den `/ausflugsplaner`-Hub eingebunden, plus Querverlinkung zu/von `/feierabend-ausfluege` und `/aussicht-ohne-anstrengung`.
- 2026-09-04 — [Content] 2 neue Artikel für die bis dahin dünnsten Regionen: `mondsee-baden-salzkammergut` (Oberösterreich, Baden) – der wärmere, flachere Nachbarsee von Attersee/Traunsee, samt „Sound of Music"-Basilika und Drachenwand-Kulisse, verlinkt mit `attersee-baden` und `traunsee-gmunden`; `lech-zuers-am-arlberg` (Vorarlberg, Ausflug) – der mondäne Winterort im ruhigeren Sommerbetrieb, Formarinsee, verlinkt mit `silvretta-hochalpenstrasse` und `bregenzerwald-wandern`. Damit sind Oberösterreich und Vorarlberg mit Wien gleichauf (je 9 Artikel), Niederösterreich ist jetzt die dünnste Region.
- 2026-09-03 — [Feature] „Mit Öffis erreichbar"-Badge auf die Übersichtskarten erweitert: neues `isOeffiErreichbar(slug)` in `app/lib/themenseiten.ts` (Set-Lookup über `BAHNHOF_GROUPS`, O(1) statt der vollen `oeffiAnreise()`-Textsuche) zeigt das 🚋-Badge jetzt auch im Magazin-Grid (`app/ui/blog-search.tsx`) und auf den Regionsseiten-Karten (`app/regionen/[bundesland]/page.tsx`), nicht mehr nur auf der Artikelseite selbst. Keine neuen Daten – nutzt dieselbe kuratierte Liste wie bisher.
- 2026-08-26 — [Content] 2 neue Artikel in den bis dahin dünnsten Regionen: `karren-dornbirn` (Vorarlberg, Wandern) – Dornbirns Hausberg mit Seilbahn und Rheintal-/Bodensee-Blick, verlinkt mit `rappenlochschlucht-dornbirn` und neu in die Gruppe „Seilbahn hoch, Aussicht sofort" auf `/aussicht-ohne-anstrengung` aufgenommen; `stausee-ottenstein-waldviertel` (Niederösterreich, Baden) – größter der drei Kamp-Stauseen, Baden/Segeln/Paddeln, verlinkt mit `lunzer-see-baden` und neu als Eintrag in `app/lib/badeplaetze.ts`. Damit sind Vorarlberg und Niederösterreich mit Oberösterreich gleichauf (je 8 Artikel), Wien bleibt jetzt die dünnste Region.
- 2026-08-25 — [Feature] „Route in Google Maps öffnen"-Button für Wander-Artikel: die externe Google-Maps-Navigation (bestehendes `api=1&destination=`-Muster, bisher nur in der „Startpunkt & Parken"-Karte für die 12 Artikel mit `startPoint`) gibt es jetzt auch im Wandern-CTA-Block direkt unter dem Artikeltext — für alle ~35 Wandern-Artikel mit `startCoords`/Tour-Koordinaten, nicht nur die mit ausführlicher Parken-Karte. Bei Artikeln mit `startPoint` wird der Button nicht doppelt angezeigt (dort steht er schon in der Sidebar). Komoot-Deeplink bewusst weggelassen, da das URL-Schema beim Testen nicht zuverlässig verifizierbar war.
- 2026-08-24 — [Content] 6 weitere dünne Burgenland-/Tirol-Artikel ausgebaut: `podersdorf-am-see` (Geschichte des Leuchtturms, Beste Reisezeit), `burg-lockenhaus` (Geschichte des Kultraums, Beste Reisezeit), `schloss-halbturn` (Baugeschichte/Hildebrandt, Beste Reisezeit), `steppentierpark-pamhagen` (Naturschutzgedanke bei Przewalski-Pferden, Beste Reisezeit), `stubaital-stubaier-gletscher` (Erschließungsgeschichte, Beste Reisezeit), `pitztaler-gletscher` (Erschließungsgeschichte, Beste Reisezeit). Damit sind jetzt alle 12 Kandidaten aus dem 2026-08-23-Backlog-Eintrag durch.
- 2026-08-23 — [Feature] „Mit Öffis erreichbar"-Badge auf der Artikelseite: neue `oeffiAnreise(slug)` in `app/lib/themenseiten.ts` liest die bereits kuratierte Anreise-Info aus `BAHNHOF_GROUPS` (`/bahnhofsausfluege`) aus. Zeigt sich als Badge im Kopfbereich + als Sidebar-Karte mit dem konkreten Öffi-Tipp (z. B. „Bahnhof Zell am See liegt direkt am See") und einem Link zurück zur Übersichtsseite. Betrifft die ~20 dort bereits gelisteten Artikel, keine neuen Fakten erfunden – nur bestehende, schon geprüfte Daten sichtbarer gemacht.
- 2026-08-23 — [Content] 6 dünne Burgenland-/Tirol-Artikel ausgebaut: `kittsee-schloss` (Geschichte, Beste Reisezeit), `naturpark-rosalia-kogelberg` (Rosalienkapelle, Beste Reisezeit), `seefeld-tirol` (Olympia-Geschichte, Beste Reisezeit), `hintertuxer-gletscher` (Zillertal drumherum, Beste Reisezeit), `st-anton-am-arlberg` (Skigeschichte/Hannes Schneider, Beste Reisezeit), `walchsee-kaiserwinkl` (Kaiserwinkl-Region, Beste Reisezeit). Das waren laut Zeichenzahl-Check die 6 kürzesten Artikel der beiden bislang ungeprüften Regionen (nach Wien/Vorarlberg/NÖ/OÖ am 2026-08-18/19).
- 2026-08-21 — [Feature] Newsletter funktionsfähig gemacht: neue Route `app/api/newsletter/route.ts` meldet Adressen per Double-Opt-in bei Brevo an (Brevo verschickt die Bestätigungsmail, wir selbst versenden nichts), Formular mit Lade-/Fehler-/Erfolgszustand, Bestätigungsseite `/newsletter/bestaetigt` (noindex), Datenschutz §7 um Double-Opt-in + Auftragsverarbeiter ergänzt. Vorher landete die Adresse nur im `localStorage` — es kam nirgends etwas an. **Offen:** die drei Brevo-Env-Vars müssen noch in Vercel gesetzt werden.
- 2026-08-21 — [Feature] Rückwärts-Index vervollständigt: `/wandern-baden`, `/wochenendtrip/[stadt]` (nächstgelegene Startstadt zuerst) und der `/seen-vergleich`-Hub speisen jetzt ebenfalls `themenFor()`. Damit 12 Quellen, Limit von 4 auf 6 Links erhöht.
- 2026-08-21 — [Feature] Themenseiten-Rückverlinkung: neuer Rückwärts-Index `app/lib/themenseiten.ts` (`themenFor(slug)`) zeigt in jedem Artikel den Block „Dieses Ziel steht auch auf diesen Listen" — max. 4 Links, höchstens 2 je Quelle. Speist sich aus den kuratierten Listen der Themenseiten, `monatstipps.ts`, `seen.ts` und `badeplaetze.ts`; 118 der 165 Artikel bekommen dadurch Rückwege. Voraussetzung dafür war, die Inline-Daten der sechs Themenseiten (Hitze, Regen, Aussicht, Dauer, Bahnhof, Feierabend) nach `app/lib/themen-picks.ts` zu ziehen — reiner Verschiebe-Diff, die Seiten importieren sie jetzt.
- 2026-08-20 — [Content] 3 neue Unterkunfts-Einträge (`app/lib/unterkuenfte.ts`): Montafon (Vorarlberg), Ötscher/Lackenhof (NÖ), Steyr (OÖ) — passend zu den heute neu hinzugefügten Artikeln, schließt Lücken auf der Karte in den drei zuvor dünnsten Regionen.
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
