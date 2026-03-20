import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#002147' }} className="border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: '#FFD700' }}
              className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs"
            >
              <span style={{ color: '#002147' }}>SD</span>
            </div>
            <span className="text-white font-bold">
              SD <span style={{ color: '#FFD700' }}>Prospects</span>
            </span>
          </div>

          <nav className="flex gap-6 text-sm text-gray-400">
            <Link href="/rankings" className="hover:text-white transition-colors">Rankings</Link>
            <Link href="/submit" className="hover:text-white transition-colors">Submit a Player</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </nav>

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SD Prospects. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
