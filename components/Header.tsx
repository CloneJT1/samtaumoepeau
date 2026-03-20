'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/rankings', label: 'Rankings' },
    { href: '/submit', label: 'Submit a Player' },
    { href: '/about', label: 'About' },
  ];

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
              SD <span style={{ color: '#FFD700' }}>Prospects</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
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
          </nav>

          {/* Mobile menu button (simple toggle) */}
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
