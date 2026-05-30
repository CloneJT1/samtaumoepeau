'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import type { Player } from '@/lib/players';

interface PlayerTableProps {
  players: Player[];
}

export default function PlayerTable({ players }: PlayerTableProps) {
  const searchParams = useSearchParams();
  const position = searchParams.get('position') || '';
  const classYear = searchParams.get('classYear') || '';
  const school = searchParams.get('school') || '';

  // Track confirmed params to prevent flash during filter switches
  const [confirmedParams, setConfirmedParams] = useState<{classYear: string; position: string; school: string} | null>(null);

  useEffect(() => {
    setConfirmedParams({ classYear, position, school });
  }, [searchParams]);

  const paramsReady = confirmedParams !== null &&
    confirmedParams.classYear === classYear &&
    confirmedParams.position === position &&
    confirmedParams.school === school;

  if (!paramsReady) return <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />;

  const filtered = players
    .filter((p) => {
      if (!classYear && p.classYear === 2026) return false; // All Classes excludes 2026
      if (classYear && String(p.classYear) !== classYear) return false;
      if (position && position !== 'All Positions' && !p.position?.split('/').some((pos: string) => pos.trim() === position)) return false;
      if (school && p.school.toLowerCase() !== school.toLowerCase()) return false;
      return true;
    })
    .sort((a, b) => {
      if (classYear === '2026') {
        return a.lastName.localeCompare(b.lastName);
      }
      if (!classYear) {
        // All Classes: sort by totalScore desc, then stars desc
        const aScore = (a as any).totalScore ?? 0;
        const bScore = (b as any).totalScore ?? 0;
        if (bScore !== aScore) return bScore - aScore;
        return (b.stars ?? 0) - (a.stars ?? 0);
      }
      if (a.rank && b.rank) return a.rank - b.rank;
      if ((b.stars ?? 0) !== (a.stars ?? 0)) return (b.stars ?? 0) - (a.stars ?? 0);
      return 0;
    });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">🏈</div>
        <p className="text-lg font-medium">No players match your filters.</p>
        <p className="text-sm mt-1">Try adjusting or clearing your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: '#002147' }} className="text-white">
            <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide w-10">#</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Rating</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Pos</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide hidden md:table-cell">School</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Class</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide hidden lg:table-cell">Ht</th>
            <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide hidden lg:table-cell">Wt</th>
            <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide hidden md:table-cell">Film</th>
            <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide hidden md:table-cell">X</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {filtered.map((player, idx) => (
            <tr
              key={player.id}
              className={`hover:bg-blue-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <td className="px-4 py-3 text-center">
                <Link href={`/players/${player.id}`} className="block">
                  <span className="font-bold text-sm" style={{ color: '#002147' }}>
                    {`#${idx + 1}`}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3">
                <Link href={`/players/${player.id}`} className="block">
                  <StarRating stars={player.stars} size="sm" />
                </Link>
              </td>
              <td className="px-4 py-3">
                <Link href={`/players/${player.id}`} className="block">
                  <span className="font-bold hover:underline" style={{ color: '#002147' }}>
                    {player.firstName} {player.lastName}
                  </span>
                  {player.committed && player.committedTo && (
                    <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#FFD700', color: '#002147' }}>
                      {player.classYear === 2027 || (player.firstName === 'Quentin' && player.lastName === 'Cesaire') ? '✍️ Committed' : '🖊️ Signed'} — {player.committedTo}
                    </span>
                  )}
                </Link>
              </td>
              <td className="px-4 py-3">
                <Link href={`/players/${player.id}`} className="block">
                  <span className="font-bold text-xs px-2 py-1 rounded uppercase" style={{ backgroundColor: '#002147', color: '#FFD700' }}>
                    {player.position}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                <Link href={`/players/${player.id}`} className="block">{player.school}</Link>
              </td>
              <td className="px-4 py-3 text-gray-600">
                <Link href={`/players/${player.id}`} className="block">{player.classYear}</Link>
              </td>
              <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                <Link href={`/players/${player.id}`} className="block">{player.height}</Link>
              </td>
              <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                <Link href={`/players/${player.id}`} className="block">{player.weight} lbs</Link>
              </td>
              <td className="px-4 py-3 text-center hidden md:table-cell">
                {player.hudlLink ? (
                  <a href={player.hudlLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#FF6B00' }} title="Watch on Hudl">▶</a>
                ) : <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-3 text-center hidden md:table-cell">
                {player.xHandle ? (
                  <a href={`https://x.com/${player.xHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#000000' }} title={player.xHandle}>𝕏</a>
                ) : <span className="text-gray-300">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
