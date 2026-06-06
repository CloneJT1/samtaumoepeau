'use client';

import Link from 'next/link';
import { useState } from 'react';

const DATA: Record<number, { school: string; count: number; stars: number; pts: number; players: string }[]> = {
  2026: [
    { school: 'UC Davis', count: 4, stars: 16, pts: 0, players: 'Coby Herman, Parker Johnson, Trevor Taumoepeau, Lucas Winkler' },
    { school: 'Boise State', count: 4, stars: 14, pts: 0, players: 'Cash Herrera, AJ Logan, Romeo Carter, Iosua Faleagafua' },
    { school: 'San Diego State', count: 3, stars: 10, pts: 0, players: 'Cammeron Purnell, Carson Diehl, Tyler Prasuhn' },
    { school: 'Northern Arizona', count: 2, stars: 9, pts: 82, players: 'Ryan Banse (5★), Kingston Filo' },
    { school: 'Army', count: 2, stars: 8, pts: 0, players: 'Keoki Becerra, Kymani Nua' },
  ],
  2027: [
    { school: 'San Diego State', count: 3, stars: 12, pts: 251, players: 'Diego Botron, Isaac Cook, Kye Cooper' },
    { school: 'USC', count: 1, stars: 5, pts: 100, players: "Honor Fa'alave-Johnson (5★)" },
    { school: 'Hawaii', count: 1, stars: 4, pts: 83, players: 'Asofa Lauifi' },
    { school: 'Cornell', count: 1, stars: 3, pts: 76, players: 'Dax Labrum' },
    { school: 'Minnesota', count: 1, stars: 3, pts: 65, players: 'Furian Inferrera' },
  ],
};

export default function SchoolSigningTracker() {
  const [year, setYear] = useState<2026 | 2027>(2027);
  const schools = DATA[year];

  return (
    <div>
      {/* Year toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="text-sm font-semibold text-gray-600">Class:</span>
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          {([2026, 2027] as const).map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-6 py-2.5 text-sm font-black uppercase tracking-widest transition-all ${
                year === y ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
              style={year === y ? { backgroundColor: '#002147' } : {}}
            >
              {y}
              {y === 2027 && <span className="ml-1 text-xs" style={{ color: year === 2027 ? '#FFD700' : '#CC0000' }}>●</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Rankings */}
      <div className="space-y-3 max-w-2xl mx-auto">
        {schools.map((s, i) => (
          <div key={s.school} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-yellow-300 transition-colors">
            <span className="text-sm font-black w-7 text-center shrink-0 mt-0.5" style={{ color: '#002147' }}>#{i+1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-base" style={{ color: '#002147' }}>{s.school}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFD700', color: '#002147' }}>
                  {s.count} player{s.count !== 1 ? 's' : ''}
                </span>
                <span className="text-xs text-gray-400">{s.stars}★ combined</span>
                {s.pts > 0 && <span className="text-xs text-gray-400">{s.pts}pts</span>}
              </div>
              <p className="text-xs text-gray-500 mt-1">{s.players}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link href="/school-rankings" className="inline-block text-xs font-bold px-5 py-2.5 rounded-full border-2 transition-all hover:scale-105" style={{ borderColor: '#002147', color: '#002147' }}>
          View Full School Rankings →
        </Link>
      </div>
    </div>
  );
}
