# DAILY.md — Playbook für die tägliche Weiterentwicklung

Dieses Dokument steuert den **automatischen Tageslauf** (scheduled task `daily-site-improvement`).
Jeder Lauf startet **ohne Gedächtnis** an frühere Sessions — dieses File + `git log` sind der Kontext.

**Ziel:** Pro Tag genau **eine** sinnvolle, fertige Verbesserung der Website — entweder ein
**Feature** oder **Content**. Lieber eine Sache richtig als drei halbe.

---

## Ablauf je Lauf

1. **Orientieren:** dieses File lesen, dazu `git log --oneline -10` — was kam zuletzt? (Siehe „Sparsam arbeiten“.)
2. **Auswählen:** genau *eine* Aufgabe aus dem Backlog unten (oder eine bessere eigene Idee).
   - **Abwechseln:** War der letzte Lauf ein Feature, nimm heute Content — und umgekehrt.
   - Nichts nehmen, was im Log unten schon steht.
3. **Umsetzen:** sorgfältig, nach den Regeln unten.
4. **Doku:** `CLAUDE.md` aktualisieren, wenn sich Architektur/Routen ändern.
5. **Log:** unten einen Eintrag ergänzen (Datum, was, warum).
6. **Backlog pflegen:** erledigten Punkt entfernen, neue Ideen ergänzen.
7. **Commit + Push** auf `main` (aussagekräftige Message, Co-Authored-By-Zeile).

---

## Sparsam arbeiten (Token-Budget)

- **Nur lesen, was die Aufgabe braucht.** Dieses File + `git log --oneline -10` reichen zur Orientierung. `CLAUDE.md` wird automatisch geladen – nicht nochmal mit Read öffnen. `DAILY-ARCHIV.md` nie komplett lesen, höchstens per grep nach einem Stichwort (z. B. „wurde X schon gemacht?“).
- **Code über den Wissensgraphen finden:** erst `graphify update .` (lokal, ohne LLM, wenige Sekunden), dann `graphify query "<Frage>"`, `graphify explain "<Symbol>"` oder `graphify path "<A>" "<B>"`. Danach nur die genannten Dateien/Zeilenbereiche lesen (Read mit offset/limit), nicht ganze Dateien.
- **`app/lib/posts.ts` (~200 Artikel, über 10.000 Zeilen) nie komplett lesen.** Slugs per `grep -n "slug: '…'"` prüfen, einzelne Artikel per Zeilenbereich lesen, Massenänderungen per Skript.
- **Log-Einträge kurz halten:** 3–6 Sätze (was, warum, was prüfen). Details gehören in Commit-Message und Code-Kommentare, nicht in dieses File. Nach jedem Lauf: Bleiben mehr als 5 Einträge im Log, die ältesten nach `DAILY-ARCHIV.md` verschieben (oben anfügen).
- **Websuche gezielt** (nur für Fakten, die in den Text kommen), Ergebnisse nicht doppelt abrufen.

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
  in `app/lib/navigation.ts` eintragen (speist seit 2026-10-20 Menü **und** Footer), untereinander querverlinken.
- **Affiliate-Links** immer über `cloak()` aus `app/lib/affiliate.ts`.
- Bei neuen Orts-Artikeln nach Möglichkeit `startCoords` (+ `startPoint`) setzen.

---

## Backlog (eine Sache pro Tag herausnehmen)

### Features / neue Seiten
- `/mit-hund` — hundefreundliche Seen & Wanderungen (`dogFriendly`-Feld am Post)
- `/kinderwagen-ausfluege` — eigene Seite nur für kinderwagentaugliche Wege. `/familienausfluege` ist seit 2026-09-23 live; für eine reine Kinderwagen-Seite fehlen aber noch genug geprüfte Daten (aktuell nur ~3 `routeVariants` mit `kinderwagentauglich`-Note). Erst nachziehen, wenn mehr Touren das strukturiert ausweisen.
- `/familienausfluege` erweitern: weitere Familien-Ziele aufnehmen, sobald passende Artikel entstehen (z. B. Tierwelt Herberstein, Wildparks in NÖ/OÖ, Sommerrodelbahnen – aktuell ohne eigenen Artikel).
- `/fotospots` — Aussichtspunkte & Foto-Stellen je Bundesland
- `/einkehr` — Hütten/Gasthäuser nach der Wanderung (neues `app/lib/einkehr.ts`)
- `/unterkuenfte/romantisch` — kommerzielle Intent-Seite (Affiliate); `/unterkuenfte/am-see` ist seit 2026-09-16 live. Für „romantisch" fehlt noch ein geeignetes Kriterium in den Daten (kein `typ`/Tag dafür) — erst umsetzen, wenn eine sinnvolle, nicht erfundene Abgrenzung existiert (z. B. Glamping + kleine Ferienwohnungen ohne Camping).
- `/unterkuenfte/basislager` ausbauen: seit 2026-09-26 live, aber nur so gut wie `unterkuenfte.ts` – z. B. Südsteiermark (Leutschach, 1 Ziel), Steyr, Gmunden und Krems fallen unter die 3-Ziele-Schwelle. Neue Unterkunft-Standorte in dichten Artikel-Clustern (z. B. Mariazell, Kitzbühel, Bad Aussee, Mühlviertel) würden mehr Basislager freischalten. (Artikel-Sidebar-Karte + Link aus „Weite Anfahrt“ seit 2026-09-28 erledigt.)
- Weitere Startstädte in `app/lib/wochenendtrip.ts` — Villach/Bregenz/St. Pölten bewusst **nicht**:
  Villach & St. Pölten überschneiden sich zu stark mit Klagenfurt bzw. Wien (Duplicate Content),
  Bregenz hat im 220-km-Radius nur ~25 Ziele. Erst nachziehen, wenn mehr Vorarlberg-Posts da sind.
- Weitere Seen-Themen in `app/lib/seen.ts` — alle 5 `LakeTag`s haben jetzt eine Seite.
  Für ein neues Thema braucht es zuerst einen neuen Tag im `LakeTag`-Typ (z. B. `hund`, `gratis`).
- „Mit Öffis erreichbar"-Badge existiert seit 2026-08-23 auf der Artikelseite und seit
  2026-09-03 auch auf Magazin-Grid + Regionsseiten-Karten (`isOeffiErreichbar()`). Am
  2026-09-11 von ~20 auf 29 kuratierte Artikel in `BAHNHOF_GROUPS` erweitert. **Offen:**
  bei Bedarf weitere klare Bahn-Ziele nachziehen (z. B. Wörgl, Villach, Bad Ischl –
  sofern dafür eigene Artikel entstehen).
- Post-Feld `kosten` → Budget-Karte (Parken, Bahn, Eintritt, Bergbahn, Essen) — ⚠️ kollidiert
  mit der „keine exakten Preise"-Regel; falls umgesetzt, nur grobe Kategorien
  ("günstig/mittel/teuer"), keine Beträge.
- Region-Seiten: Vergleichstabelle der Touren (Dauer, Schwierigkeit, Höhenmeter) — Datenlage
  aktuell dünn: nur noch 1 Post hat `trails` (der Weissensee-Track war ein erfundener 22-km-Rundweg und ist seit 2026-10-17 entfernt, die zwei Dobratsch-Tracks mit geschätzten Wegpunkten seit 2026-10-21), 7 `routeVariants`, die meisten Wandern-Artikel
  liefern nur `difficulty`. Erst sinnvoll, wenn mehr Touren strukturierte Länge/Dauer/Höhenmeter-
  Daten haben (`routeVariants`-Backlog-Punkt unten nachziehen).
- Artikel: „1 Nacht reicht?"-Block für Tagesziele mit langer Anfahrt
- `/karte` weiter ausbauen (Artikel-Layer seit 2026-10-19, Gipfel ganz Österreich seit 2026-11-14, Startansicht Österreich + `?region=` seit 2026-11-19): **offen** (a) Kategorie-Filter innerhalb der Ebene „Ausflugsziele“ (nur Wandern/Baden/Ausflug); (e) bei `?region=` die Pins anderer Bundesländer abschwächen oder einen Umriss zeigen (heute nur Ausschnitt per Rechteck); (f) gewähltes Bundesland in die URL schreiben (`history.replaceState`), damit man den Ausschnitt teilen kann.
- „Weitere Ziele im Umkreis“ (seit 2026-10-14) ist nur so gut wie die Koordinaten. Siehe Content-Punkt „grobe `startCoords` präzisieren“.
- ⚠️ `/karte` **Gipfel-Ebene (Overpass 406):** Beim Live-Test am 2026-10-19 schlug der Overpass-Abruf im Browser mit CORS-Fehler fehl, die Anzeige „Gipfel laden…“ blieb dann dauerhaft stehen (der `catch` in `map-client.tsx` setzt nichts). Per curl antwortet overpass-api.de ohne User-Agent mit **406**, mit Browser-UA mit 200 – evtl. nur vorübergehend überlastet (Fehlerantworten ohne CORS-Header), evtl. eine neue Zugriffsregel. Am 2026-11-04 per curl erneut **406**, diesmal auch mit Browser-UA (der Spiegel overpass.kumi.systems antwortete gar nicht) – spricht eher für eine dauerhafte Zugriffsregel. Fehleranzeige statt Endlos-Ladeanzeige seit 2026-11-12 erledigt. **Offen:** falls der Fehler dauerhaft ist, Abfrage über eine eigene Route (Muster `/api/brouter`, mit Cache) und passendem User-Agent.
- Technisch: `any`-Typen in den Leaflet-Dateien durch `@types/leaflet` ersetzen
- **Ideen aus der Konkurrenzanalyse 2026-10-20** (wanderland.at, bergfex, wassertemperatur.at): (a) **Webcams** je See/Region – nur offizielle Einbettungen (Tourismusverband/Gemeinde), Lizenz prüfen; (b) **„Tour der Woche“** auf der Startseite (rotierend aus kuratierter Liste, wie „Tipp des Tages“); (c) **GPX-Download** für die wenigen Artikel mit echten `trails` (erst wenn mehr belegte Tracks da sind – keine erfundenen Wegverläufe); (d) **Verlauf/Trend** (gestern vs. heute) – wassertemperatur.at zeigt Pfeile, die Hydro-Feeds liefern Zeitreihen; passt seit 2026-11-02 am besten auf die Seen-Steckbriefe `/wassertemperatur/[see]` (vorher prüfen, welche der drei Quellen überhaupt Zeitreihen ohne Zusatzabruf liefert); (e) Seen-Steckbriefe: für die 28 Live-Seen seit 2026-11-02 und für 18 Seen nur mit AGES-Proben seit 2026-11-05 erledigt. **Offen:** weitere Proben-Seen bei Bedarf in `PROBEN_SEEN` (`app/lib/seen-messstellen.ts`) nachtragen, z. B. Hechtsee, Schwarzsee (Kitzbühel), Piburger See, Haldensee, Seefelder See, Erlaufsee, Hintersee (Salzburg – im Text klar vom bayerischen Hintersee abgrenzen) – je eigene AGES-Badestelle, aber noch ohne Artikel. `match` immer so wählen, dass er genau die Badestellen dieses Sees trifft (vorher gegen den AGES-Feed prüfen). Ein neuer Bade-Artikel an diesen Seen bekommt automatisch den Link „Alle Badestellen & Proben am See“.
- **PostHog auswerten** (ab ~2 Wochen Daten): Heatmaps der Startseite (werden die Anlass-Chips genutzt?), Scrolltiefe der Artikel, Absprünge im Menü. Erst dann weitere Layout-Entscheidungen.

### Content
- ⚠️ **Newsletter scharfschalten:** Code steht, es fehlen nur die drei Brevo-Env-Vars in
  Vercel (`BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_DOI_TEMPLATE_ID`). Solange sie fehlen,
  antwortet `/api/newsletter` mit 503 und das Formular sagt das ehrlich. Das muss der
  Betreiber selbst im Brevo-Konto anlegen — nicht im Tageslauf machbar.
- **Neue Artikel** (Slug vorher prüfen!) — dünn besetzte Regionen zuerst.
  Stand 2026-10-12 je Region: Kärnten 44, Burgenland 26, Steiermark 26, Salzburg 19, Tirol 18,
  Oberösterreich 18, Niederösterreich 16, Vorarlberg 16, Wien 15 (Wien alleine zuerst – nächster Content-Lauf am besten Wien).
  OÖ (Innviertel/Schärding, Ried/Antiesental, Bad Ischl, Schlögener Schlinge), NÖ (Pielachtal/Dirndlweg,
  Carnuntum, Klosterneuburg, Donau-Auen), Vorarlberg (Hohenems, Bludenz, Großes Walsertal) und Wien
  (Hundertwasserhaus, Naschmarkt, Zentralfriedhof, Kirche am Steinhof) sowie Vorarlberg-Kleinwalsertal aus dem Backlog sind erledigt.
  Freistadt/Mühlviertel und Almsee/Grünau (OÖ) seit 2026-09-29 erledigt.
  Ideen für die nächsten Läufe: OÖ – Cumberland Wildpark Grünau (dann auch für `/familienausfluege`); Wien – Tiergarten Schönbrunn als eigener Artikel prüfen (Überschneidung mit `wien-schoenbrunn`), Augarten/Porzellanmanufaktur; NÖ – Tierwelt/Wildpark (z. B. Wildpark Ernstbrunn), Krems-Altstadt (UNESCO-Welterbe, bisher ohne eigenen Artikel, wird von `wachau-duernstein`/`stift-goettweig` nur erwähnt); Wien – Kahlenberger Dorf/Weinwandern (Überschneidung mit `wienerwald-wandern` prüfen),
  Vorarlberg – inatura Dornbirn (Regen-Ziel, würde `/regentaugliche-ausfluege` in Vorarlberg stärken). (Schloss Hof/Marchfeld und Brandnertal seit 2026-10-02, Haus des Meeres/Wien und Stift St. Florian/OÖ seit 2026-10-07, Stift Göttweig/NÖ und Rheindelta/Vorarlberg seit 2026-10-10 erledigt.)
  Rheindelta/Rohrspitz evtl. später auf `/sonnenuntergang-spots` – bewusst noch nicht, weil der Abendblick bisher nur durch einen Seitentitel belegt ist.
  Neue Fotos: die Artikel ab 2026-10-02 haben noch keinen Eintrag in der generierten `app/lib/post-bilder.ts` und zeigen das Markenmotiv – beim nächsten Neu-Erzeugen der Bilderliste mitnehmen.
  Wolfgangsee-Ostufer/St. Wolfgang bewusst **nicht** genommen — überschneidet sich zu
  stark mit dem bestehenden Artikel `wolfgangsee-st-gilgen` (Salzburg-Seite desselben Sees,
  inkl. Schafbergbahn). Kahlenberg/Leopoldsberg für Wien ebenfalls bewusst übersprungen — bereits
  vollständig als Tour in `wienerwald-wandern` (inkl. `routeVariants`) abgedeckt.
- **Dünne Artikel ausbauen** — der Durchgang durch Wien, Vorarlberg, NÖ, OÖ sowie die
  12 kürzesten Burgenland-/Tirol-Artikel ist abgeschlossen (2026-08-23/24: kittsee-schloss,
  naturpark-rosalia-kogelberg, seefeld-tirol, hintertuxer-gletscher, st-anton-am-arlberg,
  walchsee-kaiserwinkl, podersdorf-am-see, burg-lockenhaus, schloss-halbturn,
  steppentierpark-pamhagen, stubaital-stubaier-gletscher, pitztaler-gletscher). Als Nächstes
  bei Bedarf die übrigen Regionen (Salzburg, Steiermark) auf besonders kurze Artikel prüfen.
  Zusätzliche `##`-Abschnitte mit echtem Inhalt (Geschichte, Aktivitäten, beste Zeit, Anreise),
  keine Floskeln, kein Duplicate Content.
- `startCoords` / `startPoint` für weitere Orts-Artikel nachziehen (16 Artikel haben noch gar keinen Startpunkt und fehlen deshalb im Umkreis-Block, in Wochenendtrips und Basislagern).
- **Grobe `startCoords` präzisieren:** Einige Artikel teilen sich identische Sammel-Koordinaten, z. B. `[46.62, 14.14]` für 4 Wörthersee-Artikel (Wanderwege, Badestellen, mit Kindern, Radweg – die Schifffahrt startet seit 2026-11-20 an der Klagenfurter Anlegestelle laut OSM), dazu 2× Weissensee, 2× Neusiedler See, Nockberge/Nockalmstraße und Thermen-Überblick/Lutzmannsburg. Im Umkreis-Block erscheinen sie als „gleiche Gegend“, der Karten-Deep-Link landet auf der Seemitte, und auf `/karte` teilen sie sich seit 2026-10-19 einen dunklen Sammel-Pin (aktuell 5 Stück: Wörthersee ×4, Weissensee ×2, Neusiedler See ×2, Thermen/Lutzmannsburg, Familypark/Römersteinbruch St. Margarethen). Je Artikel einen echten Startpunkt setzen (z. B. Schiffsanlegestelle, Radweg-Start), aber nur mit belegter Quelle (OSM/offizielle Seite). (Nockberge/Nockalmstraße seit 2026-10-17 getrennt: Nockberge-Artikel startet jetzt am Falkertsee.)
- `planningMistakes` („Schlecht geplant, wenn …") für weitere Top-Artikel
- `routeVariants` (Kurz/Lang) für weitere Touren-Artikel
- `/badeplaetze`: neue Badeplätze immer gleich mit passender `agesId` anlegen (Liste der IDs: `ages.at/typo3temp/badegewaesser_db.json`, Feld `BADEGEWAESSERID`). Idee: Filter-Chip „Baden erlaubt laut Behörde"/Sperr-Status, sobald es mehr als ~40 Badeplätze gibt.
- Hochwasser-/Pegel-Hinweis für Klammen-/Rafting-Artikel: BMLUK-OGC-API „Pegel Aktuell“ ist geprüft, aber `gesamtcode` (130/230/930) ist undokumentiert – erst mit offizieller Code-Beschreibung umsetzen.
- Weitere Badeplätze in `app/lib/badeplaetze.ts` – Kandidat: **bikebeach St. Andrä** am Westende des Ossiacher Sees (laut Stadt Villach Eintritt frei, Parken in der Saison kostenpflichtig, Liegewiese mit Schatten, zwei Stege, Strandbuffet). Vorher klären, welche AGES-Badestelle passt (nächste ist vermutlich „Ossiacher See, Heiligengestade“ – Abstand prüfen, sonst ohne Qualitätszeile).
- **Neue Bade-Artikel für Seen, die auf `/wassertemperatur` schon stehen, aber keinen Artikel haben** (seit 2026-10-11 unter den Live-Tabellen): Gleinkersee und Offensee seit 2026-10-12 erledigt. Offen z. B. Hintersee und Seewaldsee (Salzburg), Prebersee (Lungau), Ritzensee (Saalfelden), Goldegger See, Pichlinger See (Linz). Stärkt nebenbei Salzburg; ein `Baden`-Artikel mit `startCoords` ≤ 2,5 km von der Badestelle bekommt automatisch die AGES-Karte **und** den Link in der Tabelle – am sichersten die AGES-Koordinaten der Badestelle als `startCoords` nehmen. Hinweise: Der Hintersee (eigene Gemeinde im Flachgau) wird leicht mit dem bekannteren Hintersee bei Ramsau (Bayern) verwechselt – im Titel klar „Salzburg“ dazuschreiben. Der Pleschinger See war bei der AGES 2024 und 2025 nur „mangelhaft“ – falls je ein Artikel, das ehrlich nennen. Titel/Excerpt neuer See-Artikel nicht mit dem Namen eines **anderen** Live-Messstellen-Sees bestücken (z. B. „Traunsee“ beim Offensee), sonst greift `seeMessstellenFuer()` evtl. den falschen See (Grenze 8 km).
- Weitere Kärnten-Seen mit **Live-Messstelle, aber ohne eigenen Artikel**: **Pressegger See** (Gailtal bei Hermagor, 55 ha, Schilf; laut Kärnten Werbung Hundebadezone am Schluga-Strand; bei den AGES-Proben 2026 bis knapp 28 °C) und **Turnersee** (bei St. Kanzian, 13 m tief, am Sablatnigmoor; Hunde dürfen dort laut Kärnten Werbung nicht ins Wasser). Beide stehen jetzt schon in `gailtaler-alpen-wandern-geheimtipp` bzw. `klopeiner-see-badeurlaub` im Text und haben seit 2026-11-02 einen Steckbrief (`/wassertemperatur/pressegger-see`, `/wassertemperatur/turnersee`) – ein Artikel würde dort automatisch unter „Artikel zum See“ erscheinen. Gleiches gilt für Afritzer See, Brennsee, Längsee, Rauschelesee, Grabensee, Obertrumer See, Wallersee und Irrsee (Steckbrief ohne eigenen Artikel). Titel/Excerpt nicht mit dem Namen des Nachbarsees bestücken (siehe Hinweis oben zu `seeMessstellenFuer()`).
- `/mit-hund` (Feature-Backlog): Die Seite [„Baden mit Hund an Kärntner Seen“ der Kärnten Werbung](https://www.kaernten.at/urlaub-mit-hund/baden-mit-hund-an-kaerntner-seen) nennt rund 20 Hundebadeplätze mit Regeln (u. a. Hundewiese beim Strandbad Klagenfurt, Hundebucht beim Strandcamping Süd am Keutschacher See, Silbersee Villach, Forstsee, Saissersee) und ausdrückliche Verbote (Faaker See, Klopeiner See, Turnersee) – gute, belegte Grundlage für Kärnten. Im Badeplatz-Check tragen seit 2026-10-20 nur Strandbad Klagenfurt und Keutschach den Filter „Hundestrand nahe“ (der Klopeiner-Eintrag hatte einen erfundenen Hundestrand). Am Ossiacher See nennt die Kärnten Werbung den Hundebadestrand beim ZIS Lauritsch und den freien Uferabschnitt am Seeabfluss (Slatinweg) – seit 2026-10-21 im Ossiacher-See-Artikel, die genaue Lage des ZIS Lauritsch ist aber noch offen.
- Gleinkersee/Offensee könnten später noch auf `/hitzefreundliche-ausfluege` (Gruppe Wasser) oder in `/beste-ausfluege/juli`/`august` – bewusst noch nicht, um die kuratierten Listen nicht mit zwei Seen derselben Region zu fluten.
- ⚠️⚠️ **Faktencheck der frühen Artikel (höchste Content-Priorität):** 154 der 198 Artikel stammen aus Mai/Juni 2026, also aus der Zeit vor der Regel „per Websuche faktengeprüft“. Beim Site-Audit am 2026-10-13 hatten zwei Kärnten-Artikel grobe Fehler (Rauschelesee als „Bergsee auf 1.027 m auf der Villacher Alpe“, Gösselsdorfer See im Keutschacher Tal, Silbersee in Spittal, Brennsee am Ossiacher See, nicht existierende „Lärchach-Teiche“, unbelegter „Almsee Flattnitz“) – beide sind korrigiert. Die übrigen frühen Kärnten-Artikel (44, am wenigsten nachgeprüft) systematisch durchgehen, je Lauf 3–4 Artikel: Orte/Höhen/Seegrößen gegen Wikipedia bzw. AGES/Messstellen-Koordinaten, Zahlen ohne Quelle entfernen oder vorsichtig formulieren. **Erledigt 2026-10-17:** `nockberge-biosphaerenpark-wandern`, `weissensee-kaernten-geheimtipp`, `millstaetter-see-wandern-und-schwimmen` und der Badeplatz Keutschacher See. **Erledigt 2026-10-20:** `gailtaler-alpen-wandern-geheimtipp`, `klopeiner-see-badeurlaub`, `faaker-see-badestellen` (siehe Log). **Erledigt 2026-10-21:** `ossiacher-see-badeurlaub`, `villacher-alpe-dobratsch-wanderung`, `nassfeld-skigebiet-hermagor` (siehe Log). **Erledigt 2026-11-04:** `weissensee-winter-schlittschuhlaufen`, `bad-kleinkirchheim-therme-ski`, `kaernten-top-10-sehenswuerdigkeiten` samt Kärnten-FAQ, Monatstipps und Regionstext (siehe Log). **Erledigt 2026-11-07:** `burg-hochosterwitz-ausflug`, `gurker-dom-romanik-kaernten`, `velden-am-woerthersee-urlaub`. **Erledigt 2026-11-13:** `drauradweg-klagenfurt-villach`, `klagenfurt-stadtfuehrung`, `karawanken-grenzwanderung-oesterreich-slowenien` (die Top-10-Liste könnte den Karawanken-Artikel jetzt wieder verlinken). **Erledigt 2026-11-15:** `die-10-besten-wanderwege-am-woerthersee`, `kaernten-kulinarik-kaesknodel-reindling`, `schloss-rosegg-tierpark-ausflug` samt Anfänger-FAQ. **Erledigt 2026-11-20:** `heiligenblut-grossglockner-dorf`, `woerthersee-schifffahrt`, `pyramidenkogel-woerthersee` samt zwei Tipps in `themen-picks.ts` (siehe Log). Nächste Verdachtsfälle: die übrigen 3 Wörthersee-Artikel (`beste-badestellen-woerthersee`, `woerthersee-mit-kindern`, `woerthersee-radweg-komplett` – der Radweg wird jetzt aus der Schifffahrt verlinkt; die alte Schifffahrt-Angabe „17 km Radweg am Nordufer, flach und gut ausgebaut“ war unbelegt, also den Radweg-Artikel genau darauf prüfen), `grossglockner-tagesausflug` (nennt „rund 40 € pro PKW“ Maut – Preisregel), `woerthersee-hotels-alle-budgets`, `glamping-kaernten-tipps` und in `faqs.ts` die Kärnten-Antwort „Freistrand Maria Wörth / Badebucht Reifnitz“. Muster der frühen Artikel: frei erfundene Tourennamen („Innernock“, „Wasserwanderweg“), Ziele aus anderen Regionen (Lendspitz-Maiernigg stand beim Millstätter See, liegt aber am Wörthersee; Dobratsch „von der Nockalmstraße aus“) und „gratis“-Behauptungen ohne Beleg – genau darauf achten.
- Weitere Unterkünfte in `app/lib/unterkuenfte.ts` (mehr Affiliate-Fläche)

---

## Log (neueste zuerst)

<!-- Format: - YYYY-MM-DD — [Feature|Content] Kurzbeschreibung -->

- 2026-11-20 — [Content] **Faktencheck Heiligenblut, Wörthersee-Schifffahrt und Pyramidenkogel** (nächste Verdachtsfälle aus dem Backlog), gegen Wikipedia, Betreiberseiten (woertherseeschifffahrt.at, pyramidenkogel.info), Kärntens TOP-10, Nationalpark Hohe Tauern, Alpenverein und Hüttenseiten geprüft. Fehler: Heiligenblut – „Kaisertörl auf 2.600 m“ gibt es nicht, Erzherzog-Johann-Hütte liegt auf 3.454 m (2.802 m ist die Stüdlhütte in Osttirol), „isländischer Ritter“ war der dänische Prinz Briccius; jetzt Kirche, Jungfernsprung, Gamsgrubenweg, „Weg der Erstbesteiger“ als Hochtour, `difficulty` schwer → leicht, `planningMistakes`. Schifffahrt – 10 statt 11 Anlegestellen, Klagenfurt–Velden 1 Std. 45 statt 2,5 Std., „Nordufer weniger besiedelt“ falsch, Preise/„8 Uhr“/„Kinder unter 6 gratis“ raus, ergänzt: kein Kärnten-Card-Partner, Rad nur auf zwei Schiffen, Thalia von 1909; `startCoords` von der Seemitte an die Anlegestelle Klagenfurt (OSM), dazu `startPoint`. Pyramidenkogel – Rutsche 120 m lang (nicht 52 m), keine „Sunset-Tickets“, Kärnten Card gilt für den Turm. Nach dem Deploy prüfen: die drei Artikel, `/familienausfluege` und `/sonnenuntergang-spots` (Pyramidenkogel-Tipps), Schifffahrt-Pin auf `/karte` in Klagenfurt.

- 2026-11-19 — [Feature] **Karte: Start auf ganz Österreich, Bundesländer per Auswahl und `?region=`-Link** (Backlog `/karte` (c)+(d)). Bisher öffnete `/karte` immer auf Kärnten, obwohl Pins und Gipfel längst ganz Österreich abdecken – Besucher aus Wien oder Tirol sahen zuerst das falsche Land. Jetzt: Startansicht Österreich, im Bedienfeld „Ganz Österreich“ + Bundesland-Auswahl (statt „Österreich/Kärnten“), Ausschnitte in `app/lib/karte-regionen.ts`. Die Regionsseiten verlinken auf `/karte?region={land}`, ebenso Artikel ohne genauen Startpunkt (die bekamen vorher einen irreführenden „Startpunkt“-Pin in der Landesmitte). Beim Live-Test fiel ein Fehler auf (Seite in verborgenem Fenster → Container 0 px → ganze Welt), in zwei Folge-Commits behoben und live nachgeprüft: Wien Zoom 11, Vorarlberg 9, Österreich 7, Deep-Link 14, Handy ohne Überlauf. Nach dem Deploy prüfen: `/karte` (ganz Österreich), Auswahl „Tirol“ (Osttirol mit im Bild), `/karte?region=wien`, Karten-Button auf `/regionen/vorarlberg`, ein Artikel mit Startpunkt (Deep-Link unverändert).

- 2026-11-15 — [Content] **Faktencheck Wörthersee-Wanderwege, Kärntner Küche und Schloss Rosegg** (nächste Verdachtsfälle aus dem Backlog), gegen Region Wörthersee, Kärnten Werbung, rosegg.at, Wikipedia und Tourenportale geprüft und neu aufgesetzt. Fehler: Wanderwege – „Seepromenade Klagenfurt–Pörtschach, flach“ (die 18,7-km-Etappe läuft über die Hügel), Forstsee „oberhalb von Pörtschach“ (Techelsberg, Zufahrt ab Saag), nicht belegbare Touren „Reinzackel“ und „Kompolan“, Ulrichsberg und Dobratsch als Wörthersee-Touren, drei `trails` mit erfundener Linienführung (Pyramidenkogel lag an der falschen Stelle) entfernt; jetzt 10 belegte Touren rund um den Rundwanderweg (58 km, 4 Etappen) mit `planningMistakes`. Küche – „Käsknödel als Nationalgericht“ (gemeint sind Kasnudeln), „einziges Bundesland mit eigener Regionalküche“, Gerichtspreise und zwei nicht prüfbare Lokaltipps entfernt; Titel nennt jetzt Kasnudeln (Slug unverändert). Rosegg – Besitzer ist die Familie Liechtenstein (nicht Auersperg), Schloss von 1772, Lage zwischen Wörthersee und Faaker See, Tierarten laut Betreiber statt „Damwild und Waschbären“, Labyrinth ergänzt, Preise/Öffnungszeiten/„Schlosswirtshaus“ raus, `startCoords` auf den Ort korrigiert; dazu Familien-Tipp in `themen-picks.ts` und die Anfänger-FAQ in `faqs.ts` angepasst. Nach dem Deploy prüfen: die drei Artikel, `/familienausfluege` (Rosegg-Tipp), Kärnten-FAQ auf `/regionen/kaernten`, Rosegg-Pin auf `/karte`.

- 2026-11-14 — [Feature] **Karte: Gipfel-Ebene repariert und auf ganz Österreich erweitert.** Overpass war überlastet (502/504 auf allen Spiegeln), eine eigene Proxy-Route hätte das Problem nur geerbt. Stattdessen liegen jetzt 15.913 benannte Gipfel mit Höhe als feste Datei `public/daten/gipfel.json` bei (einmaliger OSM-Abzug vom 2026-11-14, Abfrage steht in CLAUDE.md), die Karte lädt sie von dort. Damit gibt es Gipfel in allen Bundesländern statt nur in Kärnten. Nach dem Deploy prüfen: `/karte` hineinzoomen (ab Zoom 11) – grüne Punkte mit Name und Höhe, z. B. am Großglockner. Erledigt damit auch Backlog-Punkt „Gipfel-Abfrage über eigene Route“ und Teil (b) von „`/karte` weiter ausbauen“.

- 2026-11-13 — [Feature] **Funktions- und Handy-Check der bestehenden Features** (live in 375 px Breite geprüft). In Ordnung: mobiles Menü, Suche, Badeplatz-Filter, Merkliste, FAQ, Live-Wassertemperaturen (33 Messstellen), Routenberechnung, Partner-Weiterleitung, 404; kein seitliches Überlaufen auf 15 geprüften Seiten. Behoben: Karten-Bedienfeld verdeckte am Handy die halbe Karte (jetzt einklappbar, am Handy zu), „Gipfel laden…“ blieb dauerhaft stehen (Overpass-Abfrage ohne Zeitlimit, jetzt 15 s), Tippflächen unter 44 px (neue Klasse `.tap` für Filter, Kategorien, Teilen, Karten-Ebenen), Eingabefelder unter 16 px (iOS-Zoom). Offen: Gipfel-Ebene liefert weiterhin keine Daten (Overpass-Zugriff, siehe Backlog), Newsletter wartet auf die Brevo-Variablen.




Ältere Einträge: `DAILY-ARCHIV.md` (nur per grep durchsuchen).
