import { Suspense } from 'react';
export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Rankings | SD Prospects',
  description: 'Full San Diego County high school football prospect rankings. Filter by position, class year, and school.',
  openGraph: {
    title: 'Rankings | SD Prospects',
    description: 'Top San Diego County football prospects from San Diego County. Rankings based on size, production, and film — not offer sheets.',
    url: 'https://sandiegoprospects.com/rankings',
  },
};
import { getPlayers } from '@/lib/players';
import FilterBar from '@/components/FilterBar';
import PlayerTable from '@/components/PlayerTable';

interface SearchParams {
  position?: string;
  classYear?: string;
  school?: string;
}

export default async function RankingsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  // Default to 2026 if no classYear specified
  if (!params.classYear) {
    redirect('/rankings?classYear=2026');
  }

  const allPlayers = getPlayers();
  const classYear = parseInt(params.classYear || '2026');
  const position = params.position || '';
  const school = params.school || '';

  // Filter server-side
  let filtered = allPlayers.filter((p) => {
    if (p.classYear !== classYear) return false;
    if (position && position !== 'All Positions' && p.position !== position) return false;
    if (school && !p.school.toLowerCase().includes(school.toLowerCase())) return false;
    return true;
  });

  // Sort server-side
  if (classYear === 2026) {
    filtered = filtered.sort((a, b) => a.lastName.localeCompare(b.lastName));
  } else {
    filtered = filtered.sort((a, b) => {
      if (a.rank && b.rank) return a.rank - b.rank;
      if ((b.stars ?? 0) !== (a.stars ?? 0)) return (b.stars ?? 0) - (a.stars ?? 0);
      return 0;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-1 h-8 rounded-full"
            style={{ backgroundColor: '#FFD700' }}
          />
          <h1 className="text-3xl font-black" style={{ color: '#002147' }}>
            Player Rankings
          </h1>
        </div>
        <p className="text-gray-500 ml-4 pl-3">
          {filtered.length} ranked prospects from San Diego County high schools
        </p>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-16 bg-gray-100 rounded-xl animate-pulse" />}>
        <FilterBar />
      </Suspense>

      {/* Table */}
      <div className="mt-4">
        <PlayerTable players={filtered} />
      </div>

      {/* Submit CTA */}
      <div
        className="mt-10 rounded-xl p-6 text-center"
        style={{ backgroundColor: '#002147' }}
      >
        <h3 className="text-white font-bold text-lg">Know a player who should be ranked?</h3>
        <p className="text-gray-400 text-sm mt-1 mb-4">
          Submit their info and film link — we review every submission.
        </p>
        <a
          href="/submit"
          className="inline-block px-6 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105"
          style={{ backgroundColor: '#FFD700', color: '#002147' }}
        >
          Submit a Player
        </a>
      </div>
    </div>
  );
}
