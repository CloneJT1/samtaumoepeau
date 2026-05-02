import Link from 'next/link';
import { getPlayers } from '@/lib/players';
import PlayerTable from '@/components/PlayerTable';
import FilterBar from '@/components/FilterBar';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SD Prospects — San Diego County Football Recruiting Database',
  description: "San Diego County's football recruiting database. Class of 2026 Top 50 prospects ranked by size, production, and film. Class of 2027 evaluations coming soon.",
  alternates: { canonical: 'https://sandiegoprospects.com' },
};

export default function HomePage() {
  const players = getPlayers();

  return (
    <>
      {/* Hero */}
      <section
        style={{ backgroundColor: '#002147' }}
        className="relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-white rounded-full"
              style={{
                width: `${(i + 1) * 150}px`,
                height: `${(i + 1) * 150}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
              style={{ backgroundColor: '#FFD700', color: '#002147' }}
            >
              🏈 San Diego County
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            San Diego County&apos;s{' '}
            <span style={{ color: '#FFD700' }}>#1</span>
            <br />
            Football Recruiting Database
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Track the top prospects across San Diego County. Real rankings, real film, real intel.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rankings"
              className="px-8 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#FFD700', color: '#002147' }}
            >
              View Full Rankings
            </Link>
            <Link
              href="/submit"
              className="px-8 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105 shadow-lg border-2"
              style={{ backgroundColor: '#FFD700', color: '#002147', borderColor: '#FFD700' }}
            >
              Submit a Player
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { label: 'Ranked Players', value: players.length },
              { label: 'Schools', value: new Set(players.map((p) => p.school)).size },
              { label: 'Class Years', value: new Set(players.map((p) => p.classYear)).size },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black" style={{ color: '#FFD700' }}>{value}</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2027 Coming Soon Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-2">
        <div
          className="rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: '#002147' }}
        >
          <div className="text-center sm:text-left">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
              style={{ backgroundColor: '#FFD700', color: '#002147' }}
            >
              🔴 LIVE NOW
            </span>
            <h2 className="text-xl font-black text-white mt-2">Class of 2027 Rankings</h2>
            <p className="text-gray-300 text-sm mt-1">
              Top {players.filter((p) => p.classYear === 2027).length} is out — follow <a href="https://x.com/SDProspectsFB" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>@SDProspectsFB</a> for updates.
            </p>
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ backgroundColor: '#FFD700', color: '#002147' }}
              >
                🆕 NEW
              </span>
              <h2 className="text-xl font-black text-white mt-2">Class of 2028 Rankings</h2>
              <p className="text-gray-300 text-sm mt-1">
                Top {players.filter((p) => p.classYear === 2028).length} is out — <a href="/rankings?classYear=2028" style={{ color: '#FFD700' }}>View 2028 Rankings →</a>
              </p>
            </div>
            <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                style={{ backgroundColor: '#FFD700', color: '#002147' }}
              >
                🔭 EARLY LOOK
              </span>
              <h2 className="text-xl font-black text-white mt-2">Class of 2029 Rankings</h2>
              <p className="text-gray-300 text-sm mt-1">
                {players.filter((p) => p.classYear === 2029).length} prospects ranked — <a href="/rankings?classYear=2029" style={{ color: '#FFD700' }}>View 2029 Rankings →</a>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Why SD Prospects */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
              style={{ backgroundColor: '#FFD700', color: '#002147' }}
            >
              Why SD Prospects?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4" style={{ color: '#002147' }}>
              Built for Everyone in the Game
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏈',
                title: 'For Players',
                subtitle: 'Get Discovered',
                body: "Your size, stats, and film — all in one place where college coaches are looking. Don't wait to be found. Get ranked.",
                cta: 'Submit Your Profile',
                href: '/submit',
              },
              {
                icon: '🎓',
                title: 'For College Coaches',
                subtitle: 'Find SD Talent Fast',
                body: 'Every top prospect in San Diego County — ranked by size, production, and film. No noise. No politics. Just players who can play.',
                cta: 'View Rankings',
                href: '/rankings',
              },
              {
                icon: '📋',
                title: 'For HS Coaches',
                subtitle: 'Elevate Your Program',
                body: "Put your players on the map. Submit them to our database and we'll evaluate and rank them alongside the best in the county.",
                cta: 'Submit a Player',
                href: '/submit',
              },
            ].map(({ icon, title, subtitle, body, cta, href }) => (
              <div
                key={title}
                className="rounded-2xl p-8 flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: '#FFD700', WebkitTextStroke: '0.5px #b8960c' }}
                >
                  {subtitle}
                </div>
                <h3 className="text-xl font-black mb-3" style={{ color: '#002147' }}>{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{body}</p>
                <Link
                  href={href}
                  className="mt-6 inline-block text-center px-5 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: '#002147', color: '#FFD700' }}
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{ backgroundColor: '#f8f9fa' }} className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-6" style={{ color: '#002147' }}>
            San Diego Football Is <span style={{ color: '#FFD700', WebkitTextStroke: '1px #b8960c' }}>Loaded.</span>
            <br />The Rest of the Country Just Doesn&apos;t Know It Yet.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Every year, San Diego County produces college-ready football talent — players who go on to compete at the FBS, FCS, and Division II level. But without a dedicated platform, too many of them go unnoticed by coaches outside the region.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto mt-4">
            SD Prospects exists to change that. We track every serious prospect in the county — rankings, film, offers, and commitments — so no talent gets left behind.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { stat: '70+', label: 'Schools Tracked' },
              { stat: '3,200+', label: 'Varsity Players' },
              { stat: '100%', label: 'San Diego' },
            ].map(({ stat, label }) => (
              <div key={label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-4xl font-black" style={{ color: '#002147' }}>{stat}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Rankings with Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-black" style={{ color: '#002147' }}>
            Full Rankings
          </h2>
          <p className="text-gray-500 text-sm mt-1">Filter by position, class year, or school</p>
        </div>

        <Suspense fallback={<div className="h-16 bg-gray-100 rounded-xl animate-pulse" />}>
          <FilterBar />
        </Suspense>

        <div className="mt-4">
          <Suspense fallback={<div className="h-64 bg-gray-100 rounded-xl animate-pulse mt-4" />}>
            <PlayerTable players={players} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
