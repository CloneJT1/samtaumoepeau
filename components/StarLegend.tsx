'use client';
import { useState } from 'react';

const STARS = [
  { stars: 5, label: 'Top 15 School Ability', desc: 'Elite prospect with the ability to compete at the highest level of college football.' },
  { stars: 4, label: 'FBS / Top FCS', desc: 'Has the ability to play at any level, just below the Top 15. FBS and Top FCS caliber.' },
  { stars: 3, label: 'FCS / Top D2', desc: 'Has FCS ability and top D2 ability.' },
  { stars: 2, label: 'D2 / Top NAIA', desc: 'D2 and Top NAIA level talent.' },
  { stars: 1, label: 'NAIA / D3 / JUCO', desc: 'NAIA, D3, or JUCO level talent — still competes beyond high school.' },
];

export default function StarLegend() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        style={{ color: open ? '#002147' : undefined }}
      >
        <span>⭐ What do stars mean?</span>
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-xs font-bold uppercase tracking-wide text-gray-500">Star Rating System</div>
          </div>
          <div className="divide-y divide-gray-100">
            {STARS.map(s => (
              <div key={s.stars} className="flex items-start gap-3 px-4 py-3">
                <div className="shrink-0 pt-0.5">
                  {'⭐'.repeat(s.stars)}
                </div>
                <div>
                  <div className="text-sm font-black" style={{ color: '#002147' }}>{s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
