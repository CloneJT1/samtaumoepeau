import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'About SD Prospects — San Diego County\'s #1 high school football recruiting database.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#FFD700' }} />
          <h1 className="text-3xl font-black" style={{ color: '#002147' }}>
            About SD Prospects
          </h1>
        </div>
      </div>

      {/* Hero Card */}
      <div
        className="rounded-2xl p-8 text-white mb-8"
        style={{ backgroundColor: '#002147' }}
      >
        <h2 className="text-2xl font-black mb-4" style={{ color: '#FFD700' }}>
          Our Mission
        </h2>
        <p className="text-gray-200 leading-relaxed text-lg mb-4">
          San Diego County produces elite football talent every single year — players who go on to
          play at the highest levels of college and professional football. SD Prospects exists to shine a
          spotlight on those players, giving them the recognition they deserve.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Unlike other recruiting sites, our rankings are <span style={{ color: '#FFD700' }} className="font-bold">never influenced by offer sheets.</span> A player with zero offers but elite size, production, and film grades will rank above a player with offers who doesn&apos;t project as well. We evaluate potential at the next level — not popularity.
        </p>
      </div>

      {/* Mission Sections */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold mb-3" style={{ color: '#002147' }}>
            🏈 What We Do
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We track, rank, and profile the top football prospects from San Diego County. Our rankings are based on film evaluation, performance
            statistics, physical measurables, and overall athleticism — covering every program across the region.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold mb-3" style={{ color: '#002147' }}>
            📊 How We Rank Players
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our rankings are based on three factors — no hype, no politics, no offer chasing.
          </p>
          <ul className="text-gray-600 space-y-2 mb-6">
            {[
              'Size vs. College Standards — does this player physically project to the next level?',
              'On-Field Production — stats and performance against real competition',
              'Film & Athletic Grade — we watch the tape and evaluate the intangibles',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span style={{ color: '#FFD700' }} className="mt-0.5">★</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm font-bold" style={{ color: '#FFD700' }}>Ratings reflect projected ability — not current offer sheets.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#002147' }}>
            ⭐ Star Rating System
          </h3>
          <div className="space-y-3">
            {[
              { stars: '⭐⭐⭐⭐⭐', level: 'Top 15 Ability', desc: 'Elite prospect with the ability to compete at the highest level of college football.' },
              { stars: '⭐⭐⭐⭐', level: 'FBS / FCS', desc: 'Has the ability to play at any level, just below the Top 15. FBS and FCS caliber.' },
              { stars: '⭐⭐⭐', level: 'FCS / Top D2', desc: 'Has FCS ability and top D2 ability.' },
              { stars: '⭐⭐', level: 'D2 / D3 / JUCO', desc: 'D2, D3, or JUCO level talent.' },
              { stars: '⭐', level: 'NAIA', desc: 'NAIA level — still competes beyond high school.' },
            ].map(({ stars, level, desc }) => (
              <div key={level} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="text-lg leading-tight w-32 shrink-0">{stars}</div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#002147' }}>{level}</div>
                  <div className="text-gray-500 text-sm">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold mb-3" style={{ color: '#002147' }}>
            🌊 San Diego Football
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            San Diego County has a rich tradition of producing elite football talent. The region&apos;s
            competitive CIF San Diego Section features some of the top programs in California. Our goal is to ensure
            no San Diego prospect goes unnoticed.
          </p>
          <p className="text-gray-600 leading-relaxed">
            San Diego County has produced <span className="font-bold" style={{ color: '#002147' }}>4 Heisman Trophy winners</span> — Marcus Allen (Lincoln HS, 1981), Rashaan Salaam (La Jolla Country Day, 1994), Ricky Williams (Patrick Henry HS, 1998), and Reggie Bush (Helix HS, 2005). The talent has always been here.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xl font-bold mb-3" style={{ color: '#002147' }}>
            📬 Submit a Player
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            See a player who should be in our rankings? Coaches, parents, and fans can all submit players
            for consideration. We review every submission and will follow up if we need more information.
          </p>
          <Link
            href="/submit"
            className="inline-block px-6 py-2.5 rounded-lg font-bold text-sm transition-all hover:scale-105 shadow"
            style={{ backgroundColor: '#002147', color: '#FFD700' }}
          >
            Submit a Player →
          </Link>
        </div>
      </div>

      {/* Contact */}
      <div
        className="mt-8 rounded-2xl p-6 text-center border-2"
        style={{ borderColor: '#002147' }}
      >
        <h3 className="font-bold text-lg mb-2" style={{ color: '#002147' }}>
          Get in Touch
        </h3>
        <p className="text-gray-500 text-sm">
          Questions, corrections, or media inquiries? Reach us on X at{' '}
          <a
            href="https://x.com/SDProspectsFB"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
            style={{ color: '#002147' }}
          >
            @SDProspectsFB
          </a>
        </p>
      </div>
    </div>
  );
}
