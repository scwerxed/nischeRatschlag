'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Startseiten-Hero: berühmte Sehenswürdigkeiten Österreichs als Hintergrund.
 *
 * Alle Fotos stammen von Wikimedia Commons, sind dort als „Featured picture“ bzw.
 * „Quality image“ ausgezeichnet und frei für kommerzielle Nutzung (CC BY / CC BY-SA).
 * Quelle ist jeweils die 3840-px-Vorschau von upload.wikimedia.org (in next.config.ts
 * als remotePattern freigegeben); next/image rechnet sie auf die Bildschirmbreite herunter.
 * Die Namensnennung (Urheber, Lizenz, Link zur Datei) steht unten für das gerade
 * sichtbare Foto – Pflicht bei CC BY und CC BY-SA.
 *
 * `pos` = object-position, damit das Motiv beim breiten Desktop-Zuschnitt (~3:1) und
 * beim Hochformat auf dem Handy im Bild bleibt.
 */
const SLIDES = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Salzburg_Altstadt_Panorama_20240728_Gold_P.jpg/3840px-Salzburg_Altstadt_Panorama_20240728_Gold_P.jpg',
    alt: 'Salzburger Altstadt mit Festung Hohensalzburg und Dom über der Salzach im Abendlicht',
    ort: 'Salzburger Altstadt',
    region: 'Salzburg',
    slug: 'salzburg-stadt-altstadt',
    autor: 'Uoaei1',
    lizenz: 'CC BY-SA 4.0',
    quelle: 'https://commons.wikimedia.org/wiki/File:Salzburg_Altstadt_Panorama_20240728_Gold_P.jpg',
    pos: '45% 45%',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Hallstatt_2021.jpg/3840px-Hallstatt_2021.jpg',
    alt: 'Hallstatt mit seiner Pfarrkirche am Ufer des Hallstätter Sees',
    ort: 'Hallstatt',
    region: 'Oberösterreich',
    slug: 'hallstatt-salzkammergut',
    autor: 'Marco Almbauer',
    lizenz: 'CC BY-SA 4.0',
    quelle: 'https://commons.wikimedia.org/wiki/File:Hallstatt_2021.jpg',
    pos: '42% 50%',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sch%C3%B6nbrunn_September_2023_1.jpg/3840px-Sch%C3%B6nbrunn_September_2023_1.jpg',
    alt: 'Schloss Schönbrunn im Abendlicht, vom Ehrenhof aus gesehen',
    ort: 'Schloss Schönbrunn',
    region: 'Wien',
    slug: 'wien-schoenbrunn',
    autor: 'Conny Duck',
    lizenz: 'CC BY-SA 4.0',
    quelle: 'https://commons.wikimedia.org/wiki/File:Sch%C3%B6nbrunn_September_2023_1.jpg',
    pos: '50% 58%',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gro%C3%9Fglockner_vom_Parkplatz_des_Lucknerhauses_fotografiert-1.jpg/3840px-Gro%C3%9Fglockner_vom_Parkplatz_des_Lucknerhauses_fotografiert-1.jpg',
    alt: 'Der Großglockner, Österreichs höchster Berg, vom Lucknerhaus aus gesehen',
    ort: 'Großglockner',
    region: 'Osttirol',
    slug: 'grossglockner-tagesausflug',
    autor: 'Florian Fuchs',
    lizenz: 'CC BY 3.0',
    quelle: 'https://commons.wikimedia.org/wiki/File:Gro%C3%9Fglockner_vom_Parkplatz_des_Lucknerhauses_fotografiert-1.jpg',
    pos: '48% 40%',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Stift_Melk_Westseite_01.jpg/3840px-Stift_Melk_Westseite_01.jpg',
    alt: 'Westfassade von Stift Melk mit den beiden Türmen im Abendlicht',
    ort: 'Stift Melk',
    region: 'Niederösterreich',
    slug: 'stift-melk',
    autor: 'Uoaei1',
    lizenz: 'CC BY-SA 4.0',
    quelle: 'https://commons.wikimedia.org/wiki/File:Stift_Melk_Westseite_01.jpg',
    pos: '52% 32%',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Burg_Hochosterwitz_Westseite_02a.jpg/3840px-Burg_Hochosterwitz_Westseite_02a.jpg',
    alt: 'Burg Hochosterwitz auf ihrem bewaldeten Kalkfelsen',
    ort: 'Burg Hochosterwitz',
    region: 'Kärnten',
    slug: 'burg-hochosterwitz-ausflug',
    autor: 'Uoaei1',
    lizenz: 'CC BY-SA 4.0',
    quelle: 'https://commons.wikimedia.org/wiki/File:Burg_Hochosterwitz_Westseite_02a.jpg',
    pos: '54% 35%',
  },
];

const KB_TRANSFORMS = [
  'scale(1.10) translate(-1%, -1%)',
  'scale(1.12) translate(1%, -1.5%)',
  'scale(1.10) translate(-1.5%, 1%)',
];

export default function HeroSlideshow({ children }: { children: React.ReactNode }) {
  const last = SLIDES.length - 1;
  // `target` = gewünschtes Bild, `shown` = tatsächlich sichtbares. Übergeblendet wird erst, wenn
  // das Zielbild geladen ist – sonst stünde beim ersten Abruf eines Motivs (Vercel rechnet das
  // 3840-px-Original dann noch herunter) kurz nur die grüne Fläche da.
  const [target, setTarget] = useState(0);
  const [shown, setShown] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => SLIDES.map((_, i) => i === 0));
  // Bilder werden erst kurz vor ihrem Auftritt eingehängt (sichtbares + nächstes), statt beim
  // ersten Laden alle sechs großen Fotos auf einmal zu ziehen – spart vor allem mobil Datenvolumen.
  const [mountedUpTo, setMountedUpTo] = useState(1);

  const goTo = (i: number) => {
    setTarget(i);
    setMountedUpTo((m) => Math.max(m, Math.min(i + 1, last)));
  };

  // Ziel geladen → zeigen
  useEffect(() => {
    if (loaded[target]) setShown(target);
  }, [target, loaded]);

  // Nächstes Bild 6,5 s nachdem das aktuelle wirklich sichtbar wurde
  useEffect(() => {
    const t = setTimeout(() => goTo((shown + 1) % SLIDES.length), 6500);
    return () => clearTimeout(t);
    // goTo ist stabil genug (nur Setter); bewusst nur an `shown` gekoppelt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const markLoaded = (i: number) =>
    setLoaded((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));

  const slide = SLIDES[shown];

  return (
    // min-h statt fester Höhe: Auf schmalen Handys ist der Text höher als 560px und
    // wurde oben unter der Navigation abgeschnitten (Audit 2026-10-20).
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-end overflow-hidden bg-green-900">
      {SLIDES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === shown ? 1 : 0, zIndex: i === shown ? 1 : 0 }}
          aria-hidden={i !== shown}
        >
          {(i <= mountedUpTo || i === target) && (
            <div
              className="absolute inset-0"
              style={{
                transform: i === shown ? KB_TRANSFORMS[i % KB_TRANSFORMS.length] : 'scale(1.04)',
                transition: i === shown ? 'transform 8s cubic-bezier(.25,.1,.25,1)' : 'none',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: img.pos }}
                priority={i === 0}
                onLoad={() => markLoaded(i)}
                // Lädt ein Foto gar nicht (Quelle weg), nicht stehen bleiben, sondern weiterspringen
                onError={() => { if (i === target) goTo((i + 1) % SLIDES.length); }}
              />
            </div>
          )}
        </div>
      ))}

      {/* Lesbarkeit: von unten dunkel (Text), auf breiten Schirmen zusätzlich von links */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(15,30,24,.88) 0%, rgba(15,30,24,.45) 42%, rgba(15,30,24,.12) 100%)' }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{ zIndex: 2, background: 'linear-gradient(to right, rgba(15,30,24,.55) 0%, rgba(15,30,24,.15) 45%, rgba(15,30,24,0) 65%)' }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 pt-20 pb-16 md:pb-20" style={{ zIndex: 3 }}>
        <div className="max-w-2xl text-white">{children}</div>
      </div>

      {/* Ort + Bildnachweis des sichtbaren Fotos, daneben die Punkte */}
      <div className="absolute inset-x-0 bottom-0" style={{ zIndex: 3 }}>
        <div className="max-w-6xl mx-auto px-6 pb-4 flex items-end justify-between gap-4">
          {/* Kein truncate: die Namensnennung muss auch auf dem Handy vollständig lesbar sein */}
          <p className="min-w-0 text-fine leading-snug text-white/70">
            <span aria-hidden>📍 </span>
            <Link href={`/blog/${slide.slug}`} className="font-semibold text-white/90 hover:text-white hover:underline">
              {slide.ort}
            </Link>
            , {slide.region}
            <span className="mx-1.5">·</span>
            Foto:{' '}
            <a href={slide.quelle} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              {slide.autor}
            </a>
            , {slide.lizenz}
          </p>
          <div className="flex shrink-0 gap-2 pb-1">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition duration-500 ${i === shown ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'}`}
                aria-label={`Bild ${i + 1}: ${s.ort}`}
                aria-current={i === shown}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
