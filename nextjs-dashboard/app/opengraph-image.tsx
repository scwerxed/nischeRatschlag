import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Bergseen Guide – Seen, Berge & Ausflüge in Österreich';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 90,
          background: 'linear-gradient(135deg, #2f6b54 0%, #1b3b2f 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 10, textTransform: 'uppercase', opacity: 0.8 }}>
          Bergseen Guide
        </div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, marginTop: 28, lineHeight: 1.1, maxWidth: 950 }}>
          Seen, Berge &amp; Ausflüge in Österreich
        </div>
        <div style={{ display: 'flex', fontSize: 28, marginTop: 28, opacity: 0.85 }}>
          Kärnten · Salzburg · Tirol · Steiermark · Burgenland
        </div>
      </div>
    ),
    { ...size },
  );
}
