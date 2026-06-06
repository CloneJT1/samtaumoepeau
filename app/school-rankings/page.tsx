import Link from 'next/link';
import { getPlayers } from '@/lib/players';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Rankings | SD Prospects',
  description: 'Which colleges are signing the most San Diego County football prospects? Full team rankings by commits.',
};

function getSchoolRankings(players: ReturnType<typeof getPlayers>) {
  const committed = players.filter(p => p.committedTo && [2026, 2027].includes(p.classYear));
  const schools: Record<string, typeof players> = {};
  for (const p of committed) {
    if (!schools[p.committedTo!]) schools[p.committedTo!] = [];
    schools[p.committedTo!].push(p);
  }
  return Object.entries(schools)
    .map(([school, plist]) => ({
      school,
      count: plist.length,
      totalStars: plist.reduce((s, p) => s + (p.stars || 0), 0),
      totalPts: plist.reduce((s, p) => s + ((p as any).totalScore || 0), 0),
      players: [...plist].sort((a, b) => ((b as any).totalScore || 0) - ((a as any).totalScore || 0)),
    }))
    .sort((a, b) => b.count - a.count || b.totalStars - a.totalStars || b.totalPts - a.totalPts);
}

export default function SchoolRankingsPage() {
  const players = getPlayers();
  const schools = getSchoolRankings(players);

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
        <p className="text-gray-500 ml-4 pl-3">
          {schools.length} colleges signing SD County talent · Classes of 2026 & 2027
        </p>
      </div>

      {/* Top 3 callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {schools.slice(0, 3).map((s, i) => (
          <div key={s.school} className="rounded-2xl p-6 text-white" style={{ backgroundColor: '#002147' }}>
            <div className="text-4xl font-black mb-1" style={{ color: '#FFD700' }}>#{i + 1}</div>
            <div className="font-black text-xl mb-1">{s.school}</div>
            <div className="text-blue-200 text-sm mb-3">{s.count} players · {s.totalStars}★ combined</div>
            <div className="space-y-1">
              {s.players.map(p => (
                <div key={p.id} className="text-xs text-blue-200 flex items-center gap-2">
                  <span className="font-bold text-yellow-400">{'★'.repeat(p.stars || 0)}</span>
                  <Link href={`/players/${p.id}`} className="hover:text-white transition-colors">
                    {p.firstName} {p.lastName}
                  </Link>
                  <span className="text-blue-400">· {p.classYear}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full table */}
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
                <td className="px-4 py-3 text-center">
                  <span className="font-bold text-sm" style={{ color: '#002147' }}>#{idx + 1}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold" style={{ color: '#002147' }}>{s.school}</div>
                  <div className="text-xs text-gray-400">{s.totalPts > 0 ? `${s.totalPts} combined pts` : ''}</div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-black text-lg" style={{ color: '#002147' }}>{s.count}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="font-bold" style={{ color: '#FFD700', WebkitTextStroke: '0.3px #b8960c' }}>
                    {s.totalStars}★
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {s.players.map(p => (
                      <Link
                        key={p.id}
                        href={`/players/${p.id}`}
                        className="text-xs px-2 py-0.5 rounded-full border hover:bg-blue-50 transition-colors"
                        style={{ borderColor: '#002147', color: '#002147' }}
                      >
                        {'★'.repeat(p.stars || 0)} {p.firstName} {p.lastName} &apos;{String(p.classYear).slice(2)}
                      </Link>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">Rankings based on San Diego County prospects in our database · Classes of 2026 & 2027</p>
      </div>
    </div>
  );
}
