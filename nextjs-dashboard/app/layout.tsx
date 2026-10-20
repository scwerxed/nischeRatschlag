import '@/app/ui/global.css';
import { inter, lusitana } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar';
import Footer from '@/app/ui/footer';
import ScrollToTop from '@/app/ui/scroll-to-top';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import type { Metadata } from 'next';
import { BASE, SITE_NAME, AUSTRIA_GEO, BASE_KEYWORDS, orgSchema, websiteSchema } from '@/app/lib/seo';

// Google AdSense Publisher-ID
const ADSENSE_CLIENT = 'ca-pub-4474617795810442';

// Google Consent Mode v2 – Standard auf "denied", bis die Google-CMP (im AdSense-
// Dashboard unter "Datenschutz & Meldungen" zu aktivieren) den Consent per
// gtag('consent','update',...) freigibt. In der EU/EEA werden bis dahin nur
// nicht-personalisierte Ads ausgeliefert. Muss VOR adsbygoogle.js laufen.
const CONSENT_DEFAULT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
`;

// PostHog (EU-Cloud, Frankfurt) – Reichweitenmessung und Heatmaps, bewusst COOKIELOS:
// `cookieless_mode: 'always'` setzt weder Cookies noch Local/Session Storage, die Besucher-ID
// bildet PostHog serverseitig aus einem täglich wechselnden Hash (im Projekt muss dafür
// „Cookieless server hash mode“ aktiv sein – ist seit 2026-10-20 eingeschaltet). Keine
// Session-Aufzeichnung, keine Umfragen. Lädt nur auf der Produktionsdomain, damit Vercel-
// Previews und lokale Tests die Zahlen nicht verfälschen. Der Projekt-Key ist öffentlich
// (nur zum Senden von Events). Loader-Code 1:1 aus der PostHog-Doku (docs/libraries/js).
const POSTHOG_KEY = 'phc_sZagM3TYW4idYJo5p5xLu8phTmJzd89t63tTM9Ew4ueM';
const POSTHOG_SNIPPET = `
if (location.hostname === 'www.bergseen-guide.com') {
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],Object.defineProperty(u,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e}}),Object.defineProperty(u.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return u.toString(1)+".people (stub)"}}),o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${POSTHOG_KEY}', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2026-05-30',
  cookieless_mode: 'always',
  respect_dnt: true,
  disable_session_recording: true,
  disable_surveys: true,
});
}
`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME} – Seen, Berge & Ausflüge in Österreich`,
  },
  description:
    'Insider-Tipps für alle neun Bundesländer Österreichs: Wanderwege, Badeseen, Ausflugsziele und Unterkünfte – ehrlich recherchiert, mit konkreten Routen und Gratis-Alternativen.',
  keywords: BASE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: BASE }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'travel',
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    siteName: SITE_NAME,
    url: BASE,
  },
  twitter: { card: 'summary_large_image', site: '@bergseenguide' },
  // Rich-Result-Direktiven: große Bildvorschauen & volle Snippets erlauben
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    // AdSense Site-Verifizierung
    'google-adsense-account': ADSENSE_CLIENT,
    // Local SEO: abgedeckte Region(en) in Österreich
    'geo.region': 'AT',
    'geo.placename': 'Österreich',
    'geo.position': `${AUSTRIA_GEO.lat};${AUSTRIA_GEO.lng}`,
    'ICBM': `${AUSTRIA_GEO.lat}, ${AUSTRIA_GEO.lng}`,
    'language': 'de-AT',
  },
};

export const viewport = {
  themeColor: '#255744',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${lusitana.variable}`}>
      <head>
        {/* Schnellere Verbindung zu Drittanbietern (spart Handshake-Zeit → besseres LCP/INP). */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://widget.getyourguide.com" />
        {/* Consent Mode v2 – MUSS vor adsbygoogle.js stehen (inline = läuft synchron zuerst). */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT }} />
        {/* Google AdSense – im Head, damit Ads/Auto-Ads zuverlässig laden.
            Einwilligung wird über Consent Mode v2 (oben) + Googles zertifizierte CMP verwaltet. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-white text-ink">
        {/* Globales Schema: Organization + WebSite (Sitelinks Searchbox) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema(), websiteSchema()]) }}
        />
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[2000] focus:bg-green-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Zum Inhalt springen
        </a>
        <Navbar />
        <main id="inhalt">{children}</main>
        <Footer />
        <ScrollToTop />
        {/* Vercel Web Analytics (Besucherstatistik) + Speed Insights (Ladezeiten/SEO) */}
        <Analytics />
        <SpeedInsights />
        {/* PostHog cookielos (siehe POSTHOG_SNIPPET oben) – nach der Hydrierung, blockiert nichts. */}
        <Script id="posthog-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: POSTHOG_SNIPPET }} />
        {/* GetYourGuide Conversion-Tracking – unkritisch, daher erst nach allem anderen laden. */}
        <Script
          src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
          strategy="lazyOnload"
          data-gyg-partner-id="CTZDZJB"
        />
      </body>
    </html>
  );
}
