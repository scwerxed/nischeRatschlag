import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 py-8 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Wörthersee Guide</p>
        <div className="flex gap-6">
          <Link href="/datenschutz" className="hover:text-gray-900">Datenschutz</Link>
          <Link href="/kontakt" className="hover:text-gray-900">Kontakt</Link>
          <Link href="/ueber-uns" className="hover:text-gray-900">Über uns</Link>
        </div>
      </div>
    </footer>
  );
}
