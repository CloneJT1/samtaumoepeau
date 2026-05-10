'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const POSITIONS = ['All Positions', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'EDGE', 'LB', 'CB', 'S', 'K/P', 'KR', 'ATH'];
const CLASS_YEARS = ["All Classes (No '26)", '2026', '2027', '2028', '2029'];

const SCHOOLS = [
  'All Schools',
  "Army Navy Academy",
  "Bishop's",
  'Carlsbad',
  'Cathedral Catholic',
  'Christian',
  'Del Norte',
  'El Capitan',
  'El Camino',
  'Granite Hills',
  'Helix',
  'Hoover',
  'Kearney',
  'La Costa Canyon',
  'La Jolla Country Day',
  'La Jolla High',
  'Lincoln',
  'Madison',
  'Mira Mesa',
  'Mission Bay',
  'Mission Hills',
  'Mt. Carmel',
  'Mount Miguel',
  'Oceanside',
  'Olympian',
  'Point Loma',
  'Poway',
  'Ramona',
  'Rancho Bernardo',
  'Rancho Buena Vista',
  'San Diego',
  'San Marcos',
  'San Pasqual',
  'Santa Fe Christian',
  'Santana',
  'St. Augustine',
  'Steele Canyon',
  'Torrey Pines',
  'University City',
  'Valhalla',
  'Westview',
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const position = searchParams.get('position') || '';
  const classYear = searchParams.get('classYear') || '';
  const school = searchParams.get('school') || '';

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'All Positions' && value !== "All Classes (No '26)") {
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

        {/* School Dropdown */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            School
          </label>
          <select
            value={school || 'All Schools'}
            onChange={(e) => updateFilter('school', e.target.value === 'All Schools' ? '' : e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 bg-white"
          >
            {SCHOOLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
