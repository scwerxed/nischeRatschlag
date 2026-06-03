import { NextRequest, NextResponse } from 'next/server';

async function snapToTrail(lat: number, lng: number): Promise<{ lat: number; lng: number }> {
  // Find nodes on foot-accessible ways within 500 m
  const q = `[out:json][timeout:8];way(around:500,${lat.toFixed(6)},${lng.toFixed(6)})[highway~"^(path|footway|track|bridleway)$"][foot!="no"];node(w);out skel;`;
  try {
    const res = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(q)}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return { lat, lng };
    const data = await res.json();

    const nodes: any[] = (data.elements ?? []).filter((e: any) => e.type === 'node');
    if (!nodes.length) return { lat, lng };

    let best = { lat, lng };
    let minD = Infinity;
    for (const n of nodes) {
      const d = (n.lat - lat) ** 2 + (n.lon - lng) ** 2;
      if (d < minD) { minD = d; best = { lat: n.lat, lng: n.lon }; }
    }
    return best;
  } catch {
    return { lat, lng };
  }
}

export async function GET(request: NextRequest) {
  const lonlats = request.nextUrl.searchParams.get('lonlats');
  if (!lonlats) return NextResponse.json({ error: 'lonlats required' }, { status: 400 });

  const parsed = lonlats.split('|').map((pt) => {
    const [lng, lat] = pt.split(',').map(Number);
    return { lat, lng };
  });
  if (parsed.length < 2) return NextResponse.json({ error: 'Need at least 2 points' }, { status: 400 });

  // Snap all waypoints to nearest hiking trail in parallel
  const snapped = await Promise.all(parsed.map((p) => snapToTrail(p.lat, p.lng)));
  const snappedLonlats = snapped.map((p) => `${p.lng.toFixed(6)},${p.lat.toFixed(6)}`).join('|');

  try {
    const res = await fetch(
      `https://brouter.de/brouter?lonlats=${snappedLonlats}&profile=trekking&format=geojson&alternativeidx=0`,
      { headers: { 'User-Agent': 'NischeRatschlag/1.0' }, signal: AbortSignal.timeout(20000) }
    );
    if (!res.ok) return NextResponse.json({ error: `BRouter ${res.status}` }, { status: 502 });

    const data = await res.json();
    // Attach snapped positions so the client can move markers to trail
    return NextResponse.json({ ...data, snappedWaypoints: snapped });
  } catch {
    return NextResponse.json({ error: 'BRouter nicht erreichbar' }, { status: 504 });
  }
}
