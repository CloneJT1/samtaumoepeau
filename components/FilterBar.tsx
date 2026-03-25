'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const POSITIONS = ['All Positions', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K/P', 'ATH'];
const CLASS_YEARS = ['All Classes', '2026', '2027', '2028', '2029'];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const position = searchParams.get('position') || '';
  const classYear = searchParams.get('classYear') || '2027';
  const school = searchParams.get('school') || '';

  // Set default classYear in URL on mount so PlayerTable always has an explicit param
  useEffect(() => {
    if (!searchParams.get('classYear')) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('classYear', '2027');
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'All Positions' && value !== 'All Classes') {
        params.set(key, value);
      } else if (key === 'classYear') {
        params.delete(key);
      } else {
        params.delete(key);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Position */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Position
          </label>
          <select
            value={position || 'All Positions'}
            onChange={(e) => updateFilter('position', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
            style={{ '--tw-ring-color': '#002147' } as React.CSSProperties}
          >
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Class Year */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Class Year
          </label>
          <select
            value={classYear || 'All Classes'}
            onChange={(e) => updateFilter('classYear', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 bg-white"
          >
            {CLASS_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* School Search */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            School
          </label>
          <input
            type="text"
            placeholder="Search school..."
            value={school}
            onChange={(e) => updateFilter('school', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 bg-white"
          />
        </div>

        {/* Clear */}
        {(position || classYear || school) && (
          <div className="flex items-end">
            <button
              onClick={() => router.replace('?', { scroll: false })}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
