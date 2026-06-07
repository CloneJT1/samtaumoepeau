'use client';

import Link from 'next/link';
import { useState } from 'react';

type SchoolData = { school: string; count: number; totalStars: number; totalPts: number; players: { id: string; firstName: string; lastName: string; stars: number; position: string; classYear: number }[] }[];

export default function SchoolRankingsClient({ data2026, data2027 }: { data2026: SchoolData; data2027: SchoolData }) {
  const [selectedYear, setSelectedYear] = useState<2026 | 2027>(2027);
  const schools = selectedYear === 2026 ? data2026 : data2027;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold hover:underline mb-4 inline-block" style={{ color: '#FFD700' }}>
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#FFD700' }} />
          <h1 className="text-3xl font-black" style={{ color: '#002147' }}>School Rankings</h1>
        </div>
        <p className="text-gray-500 ml-4 pl-3">Which colleges are landing the most SD County talent?</p>
      </div>

      {/* Year Selector */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-sm font-semibold text-gray-600">Class Year:</span>
        <div className="flex rounded-xl overflow-hidden border border-gray-200">
          {([2026, 2027] as const).map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2.5 text-sm font-black uppercase tracking-widest transition-all ${
                selectedYear === year ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
              style={selectedYear === year ? { backgroundColor: '#002147' } : {}}
            >
              {year}
              {year === 2027 && <span className="ml-1 text-xs" style={{ color: selectedYear === 2027 ? '#FFD700' : '#CC0000' }}>● LIVE</span>}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400">
          {schools.length} school{schools.length !== 1 ? 's' : ''} · {schools.reduce((s, x) => s + x.count, 0)} commits
        </span>
      </div>

      {/* Top 3 */}
      {schools.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {schools.slice(0, 3).map((s, i) => (
            <div key={s.school} className="rounded-2xl p-6 text-white" style={{ backgroundColor: '#002147' }}>
              <div className="text-4xl font-black mb-1" style={{ color: '#FFD700' }}>#{i + 1}</div>
              <div className="font-black text-xl mb-1">{s.school}</div>
              <div className="text-blue-200 text-sm mb-3">{s.count} player{s.count !== 1 ? 's' : ''} · {s.totalStars}★</div>
              <div className="space-y-1">
                {s.players.map(p => (
                  <div key={p.id} className="text-xs text-blue-200 flex items-center gap-2">
                    <span className="font-bold text-yellow-400">{'★'.repeat(p.stars)}</span>
                    <Link href={`/players/${p.id}`} className="hover:text-white transition-colors">
                      {p.firstName} {p.lastName}
                    </Link>
                    <span className="text-blue-400 text-xs">{p.position}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full table */}
      {schools.length > 0 ? (
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#002147' }} className="text-white">
                <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide w-12">#</th>
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">School</th>
                <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide">Players</th>
                <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide">Stars</th>
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide hidden md:table-cell">Commits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {schools.map((s, idx) => (
                <tr key={s.school} className={`hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="px-4 py-3 text-center"><span className="font-bold text-sm" style={{ color: '#002147' }}>#{idx + 1}</span></td>
                  <td className="px-4 py-3">
                    <div className="font-bold" style={{ color: '#002147' }}>{s.school}</div>
                    {s.totalPts > 0 && <div className="text-xs text-gray-400">{s.totalPts} combined pts</div>}
                  </td>
                  <td className="px-4 py-3 text-center"><span className="font-black text-lg" style={{ color: '#002147' }}>{s.count}</span></td>
                  <td className="px-4 py-3 text-center"><span className="font-bold" style={{ color: '#FFD700', WebkitTextStroke: '0.3px #b8960c' }}>{s.totalStars}★</span></td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {s.players.map(p => (
                        <Link key={p.id} href={`/players/${p.id}`}
                          className="text-xs px-2 py-0.5 rounded-full border hover:bg-blue-50 transition-colors"
                          style={{ borderColor: '#002147', color: '#002147' }}>
                          {'★'.repeat(p.stars)} {p.firstName} {p.lastName}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-4">🏈</div>
          <p className="text-lg font-medium">No commits yet for {selectedYear}.</p>
        </div>
      )}
    </div>
  );
}
