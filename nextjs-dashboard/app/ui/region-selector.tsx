'use client';

import { useRouter } from 'next/navigation';
import { regionen } from '@/app/lib/regionen';

export default function RegionSelector() {
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const slug = e.target.value;
    if (slug) router.push(`/regionen/${slug}`);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
      <select
        defaultValue=""
        onChange={handleChange}
        className="w-full sm:flex-1 border border-hairline rounded-lg px-4 py-3 text-ink-muted bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base"
      >
        <option value="" disabled>Bundesland wählen…</option>
        {regionen.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.name}{!r.aktiv ? ' (demnächst)' : ''}
          </option>
        ))}
      </select>
      <span className="text-sm text-ink-soft whitespace-nowrap">→ Tipps & Hotels</span>
    </div>
  );
}
