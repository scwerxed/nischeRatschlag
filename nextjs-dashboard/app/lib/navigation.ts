// Gemeinsame Seitenstruktur für Navigation (Navbar) und Footer.
// Eine Quelle statt zwei handgepflegter Linklisten: Neue Themenseiten werden
// hier einmal eingetragen und erscheinen dann in Menü und Footer.

export type NavLink = { href: string; label: string; note?: string };
export type NavGroup = { label: string; href: string; links: NavLink[] };

export const NAV_REGIONEN: NavLink[] = [
  { href: '/regionen/kaernten', label: 'Kärnten' },
  { href: '/regionen/salzburg', label: 'Salzburg' },
  { href: '/regionen/tirol', label: 'Tirol' },
  { href: '/regionen/steiermark', label: 'Steiermark' },
  { href: '/regionen/oberoesterreich', label: 'Oberösterreich' },
  { href: '/regionen/niederoesterreich', label: 'Niederösterreich' },
  { href: '/regionen/burgenland', label: 'Burgenland' },
  { href: '/regionen/vorarlberg', label: 'Vorarlberg' },
  { href: '/regionen/wien', label: 'Wien' },
];

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Regionen',
    href: '/#regionen',
    links: NAV_REGIONEN,
  },
  {
    label: 'Ausflugsideen',
    href: '/ausflugsplaner',
    links: [
      { href: '/ausflugsplaner', label: 'Ausflugsplaner', note: 'Alle Themen auf einen Blick' },
      { href: '/beste-ausfluege', label: 'Beste Ausflüge nach Monat' },
      { href: '/regentaugliche-ausfluege', label: 'Ausflüge bei Regen' },
      { href: '/hitzefreundliche-ausfluege', label: 'Kühle Ziele für Hitzetage' },
      { href: '/familienausfluege', label: 'Ausflüge mit Kindern' },
      { href: '/bahnhofsausfluege', label: 'Mit Bahn & Bus' },
      { href: '/ausfluege-nach-dauer', label: 'Ausflüge nach Dauer' },
      { href: '/feierabend-ausfluege', label: 'Feierabend-Ausflüge' },
      { href: '/zwei-ausfluege-an-einem-tag', label: 'Zwei Ausflüge an einem Tag' },
      { href: '/wochenendtrip', label: 'Wochenendtrips ab der Stadt' },
      { href: '/aussicht-ohne-anstrengung', label: 'Aussicht ohne Anstrengung' },
      { href: '/sonnenuntergang-spots', label: 'Sonnenuntergang-Spots' },
    ],
  },
  {
    label: 'Seen & Baden',
    href: '/seen-vergleich',
    links: [
      { href: '/wassertemperatur', label: 'Wassertemperatur live', note: 'Offizielle Messstellen' },
      { href: '/badeplaetze', label: 'Badeplatz-Check', note: 'Mit Badewasser-Qualität' },
      { href: '/seen-vergleich', label: 'Seen-Vergleich' },
      { href: '/wandern-baden', label: 'Wandern + Baden' },
      { href: '/unterkuenfte/am-see', label: 'Unterkünfte am See' },
    ],
  },
  {
    label: 'Karte',
    href: '/karte',
    links: [
      { href: '/karte', label: 'Wanderkarte', note: 'Alle Ziele als Pins' },
      { href: '/routenplaner', label: 'Routenplaner' },
      { href: '/unterkuenfte/basislager', label: 'Basislager für mehrere Tage' },
    ],
  },
];

/** Einzelne Hauptlinks ohne Untermenü (rechts neben den Gruppen). */
export const NAV_SINGLE: NavLink[] = [{ href: '/blog', label: 'Magazin' }];

export const NAV_SERVICE: NavLink[] = [
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/merkliste', label: 'Merkliste' },
  { href: '/reiseinfos', label: 'Reiseinfos' },
  { href: '/kontakt', label: 'Kontakt' },
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];
