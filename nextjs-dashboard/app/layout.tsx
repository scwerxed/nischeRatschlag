import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar';
import Footer from '@/app/ui/footer';
import ScrollToTop from '@/app/ui/scroll-to-top';
import type { Metadata } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nische-ratschlag.at';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    template: '%s | Wörthersee Guide',
    default: 'Wörthersee Guide – Kärnten entdecken',
  },
  description: 'Dein Reiseführer für den Wörthersee und Kärnten: Wanderwege, Tipps, Hotels und mehr.',
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    siteName: 'Wörthersee Guide',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
