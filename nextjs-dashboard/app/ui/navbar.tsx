import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-green-700">
          Wörthersee Guide
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/blog" className="hover:text-green-700">Blog</Link>
          <Link href="/ueber-uns" className="hover:text-green-700">Über uns</Link>
          <Link href="/kontakt" className="hover:text-green-700">Kontakt</Link>
        </div>
      </div>
    </nav>
  );
}
