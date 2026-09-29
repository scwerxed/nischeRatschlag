import Image from 'next/image';
import { bildFuer } from '@/app/lib/post-bilder';
import PostArtwork from '@/app/ui/post-artwork';

/**
 * Bildfläche eines Artikels.
 *
 * Wo ein geprüftes Ortsfoto vorliegt (siehe `post-bilder.ts`), wird es
 * gezeigt; sonst bleibt das generierte Markenmotiv stehen. Beide füllen die
 * Fläche identisch, sodass die Aufrufstellen nichts über die Herkunft wissen
 * müssen.
 *
 * Bewusst ohne `fill`: das würde einen relativ positionierten Container
 * verlangen, den nicht alle 15 Aufrufstellen haben. Mit fester Breite und
 * `h-full w-full object-cover` verhält sich die Komponente exakt wie das
 * bisherige PostArtwork.
 */
export default function PostBild({
  slug,
  category,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: {
  slug: string;
  category?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const bild = bildFuer(slug);

  if (!bild) {
    return <PostArtwork seed={slug} category={category} className={className} />;
  }

  return (
    <Image
      src={bild.url}
      alt={bild.alt}
      width={1600}
      height={Math.round(1600 / bild.verhaeltnis)}
      sizes={sizes}
      priority={priority}
      className={`block h-full w-full object-cover ${className ?? ''}`}
    />
  );
}

/**
 * Sichtbare Namensnennung – Pflicht bei CC-BY- und CC-BY-SA-Fotos.
 * Wird am Artikelkopf ausgegeben.
 */
 */
export function Bildnachweis({ slug, hell = false }: { slug: string; hell?: boolean }) {
  const bild = bildFuer(slug);
  if (!bild) return null;

  return (
    <p className={`text-fine ${hell ? 'text-white/55' : 'text-ink-soft'}`}>
      Foto: {bild.autor} ·{' '}
      <a
        href={bild.quelle}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="underline underline-offset-2 hover:opacity-80"
      >
        {bild.lizenz}
      </a>
    </p>
  );
}
