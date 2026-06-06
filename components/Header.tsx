'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [rankingsOpen, setRankingsOpen] = useState(false);

  const navLinks = [
    { href: '/submit', label: 'Submit a Player' },
    { href: '/about', label: 'About' },
  ];

  const followUrl = 'https://x.com/SDProspectsFB';

  const rankingsLinks = [
    { href: '/rankings?classYear=2026', label: 'Class of 2026' },
    { href: '/rankings?classYear=2027', label: 'Class of 2027' },
    { href: '/rankings?classYear=2028', label: 'Class of 2028' },
    { href: '/rankings?classYear=2029', label: 'Class of 2029' },
    { href: '/school-rankings', label: '🏫 School Rankings' },
  ];

  const isRankingsActive = pathname === '/rankings' || pathname.startsWith('/rankings/');

  return (
    <header style={{ backgroundColor: '#002147' }} className="shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              style={{ backgroundColor: '#FFD700' }}
              className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
              aria-hidden="true"
            >
              <span style={{ color: '#002147' }}>SD</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              San Diego <span style={{ color: '#FFD700' }}>Prospects</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Rankings dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setRankingsOpen(true)}
              onMouseLeave={() => setRankingsOpen(false)}
            >
              <Link
                href="/rankings"
                className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1 ${
                  isRankingsActive ? '' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={isRankingsActive ? { color: '#FFD700' } : {}}
              >
                Rankings
                <svg className="w-3 h-3 mt-0.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {rankingsOpen && (
                <div
                  style={{ backgroundColor: '#002147' }}
                  className="absolute top-full left-0 mt-0 w-44 rounded-b shadow-xl border border-white/10 z-50"
                >
                  {rankingsLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block px-4 py-2.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  style={isActive ? { color: '#FFD700' } : {}}
                >
                  {label}
                </Link>
              );
            })}
            {/* Follow Us button */}
            <a
              href={followUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-1.5 rounded-lg font-bold text-sm transition-all hover:scale-105 flex items-center gap-1.5"
              style={{ backgroundColor: '#FFD700', color: '#002147' }}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow Us
            </a>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer text-white p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>
              <div
                style={{ backgroundColor: '#002147' }}
                className="absolute right-0 top-full mt-1 w-48 rounded shadow-xl border border-white/10 z-50"
              >
                <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-widest font-semibold">Rankings</div>
                {rankingsLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-6 py-2.5 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <div className="border-t border-white/10 mt-1" />
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
