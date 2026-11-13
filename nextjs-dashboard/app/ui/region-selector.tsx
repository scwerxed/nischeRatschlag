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
    <div className="max-w-sm">
      <select
        defaultValue=""
        onChange={handleChange}
        className="w-full sm:flex-1 border border-hairline rounded-sm px-4 py-3 text-ink-muted bg-canvas outline-none transition-colors focus:border-ink focus-visible:ring-2 focus-visible:ring-ink text-body"
      >
        <option value="" disabled>Bundesland wählen…</option>
        {regionen.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.name}{!r.aktiv ? ' (demnächst)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
}
