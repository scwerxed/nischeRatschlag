type Season = { key: string; label: string; greeting: string; cta: string; icon: string };

const SEASONS: Season[] = [
  { key: 'winter',   label: 'Winter',    greeting: 'Winterzauber in den Alpen',          cta: 'Winterwanderungen entdecken',  icon: '❄️' },
  { key: 'fruehling',label: 'Frühling',  greeting: 'Der Frühling erwacht in Österreich', cta: 'Frühlingsausflüge entdecken',  icon: '🌱' },
  { key: 'sommer',   label: 'Sommer',    greeting: 'Badesaison in Österreich',           cta: 'Die besten Badeseen finden',   icon: '☀️' },
  { key: 'herbst',   label: 'Herbst',    greeting: 'Goldener Herbst in den Bergen',      cta: 'Herbstwanderungen entdecken',  icon: '🍂' },
];

export function currentSeason(): Season {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return SEASONS[1];
  if (m >= 6 && m <= 8) return SEASONS[2];
  if (m >= 9 && m <= 11) return SEASONS[3];
  return SEASONS[0];
}
