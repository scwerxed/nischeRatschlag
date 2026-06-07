import '@/app/ui/global.css';
import { inter, lusitana } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar';
import Footer from '@/app/ui/footer';
import ScrollToTop from '@/app/ui/scroll-to-top';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { BASE, SITE_NAME, KAERNTEN_GEO, BASE_KEYWORDS, orgSchema, websiteSchema } from '@/app/lib/seo';

// Google AdSense Publisher-ID
const ADSENSE_CLIENT = 'ca-pub-4474617795810442';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} – Wandern, Baden & Ausflüge in Kärnten`,
  },
  description:
    'Insider-Tipps für Kärnten & Wörthersee: Wanderwege, Badestellen, Ausflugsziele und Unterkünfte – ehrlich recherchiert mit echten Preisen.',
  keywords: BASE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: BASE }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'travel',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    siteName: SITE_NAME,
    url: BASE,
  },
  twitter: { card: 'summary_large_image', site: '@bergseenguide' },
  other: {
    // AdSense Site-Verifizierung
    'google-adsense-account': ADSENSE_CLIENT,
    // Local SEO: Suchmaschinen wissen, dass wir Kärnten/Österreich abdecken
    'geo.region': 'AT-2',                         // ISO 3166-2 Kärnten
    'geo.placename': 'Kärnten, Österreich',
    'geo.position': `${KAERNTEN_GEO.lat};${KAERNTEN_GEO.lng}`,
    'ICBM': `${KAERNTEN_GEO.lat}, ${KAERNTEN_GEO.lng}`,
    'language': 'de-AT',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${lusitana.variable}`}>
      <head>
        {/* Google AdSense – echtes <script>-Tag im Head.
            Einwilligung (Consent Mode v2) wird von Googles zertifizierter CMP verwaltet. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        {/* GetYourGuide Analytics – Conversion-Tracking für Ausflugs-Links */}
        <script
          async
          defer
          src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
          data-gyg-partner-id="CTZDZJB"
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* Globales Schema: Organization + WebSite (Sitelinks Searchbox) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema(), websiteSchema()]) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        {/* Vercel Web Analytics (Besucherstatistik) + Speed Insights (Ladezeiten/SEO) */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
