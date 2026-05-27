import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar';
import Footer from '@/app/ui/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Wörthersee Guide',
    default: 'Wörthersee Guide – Kärnten entdecken',
  },
  description: 'Dein Reiseführer für den Wörthersee und Kärnten: Wanderwege, Tipps, Hotels und mehr.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
