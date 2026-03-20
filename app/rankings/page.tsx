import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Class of 2026 Rankings',
  description: 'San Diego County Class of 2026 football prospect rankings. Top 30 players ranked by position, measurables, and on-field production. No offer bias — pure talent evaluation.',
  openGraph: {
    title: 'Class of 2026 Rankings | SD Prospects',
    description: 'Top 30 San Diego County football prospects for the Class of 2026. Rankings based on size, production, and film — not offer sheets.',
    url: 'https://sandiegoprospects.com/rankings',
  },
};
import { getPlayers } from '@/lib/players';
import FilterBar from '@/components/FilterBar';
import PlayerTable from '@/components/PlayerTable';

export const metadata: Metadata = {
  title: 'Rankings',
  description: 'Full San Diego County high school football prospect rankings. Filter by position, class year, and school.',
};

export default function RankingsPage() {
  const players = getPlayers();

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
          {players.length} ranked prospects from San Diego County high schools
        </p>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-16 bg-gray-100 rounded-xl animate-pulse" />}>
        <FilterBar />
      </Suspense>

      {/* Table */}
      <div className="mt-4">
        <Suspense fallback={<div className="h-64 bg-gray-100 rounded-xl animate-pulse" />}>
          <PlayerTable players={players} />
        </Suspense>
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
