import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPlayerById, getPlayers } from '@/lib/players';
import StarRating from '@/components/StarRating';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const players = getPlayers();
  return players.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const player = getPlayerById(id);
  if (!player) return { title: 'Player Not Found' };
  return {
    title: `${player.firstName} ${player.lastName} — ${player.position} | ${player.school}`,
    description: `${player.stars}-star ${player.position} from ${player.school}. Class of ${player.classYear}. ${player.stats || ''}`,
  };
}

export default async function PlayerProfilePage({ params }: Props) {
  const { id } = await params;
  const player = getPlayerById(id);

  if (!player) notFound();

  const statItems = [
    { label: 'Position', value: player.position },
    { label: 'Class', value: `${player.classYear}` },
    { label: 'Height', value: player.height },
    { label: 'Weight', value: `${player.weight} lbs` },
    ...(player.gpa ? [{ label: 'GPA', value: `${player.gpa}` }] : []),
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/rankings" className="hover:underline" style={{ color: '#002147' }}>
          ← Back to Rankings
        </Link>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column — Player Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            {/* Banner */}
            <div
              style={{ backgroundColor: '#002147' }}
              className="px-6 py-5 text-center"
            >
              {/* Jersey Number Style */}
              <div className="text-6xl font-black text-white/20 leading-none select-none">
                #{player.rank}
              </div>
              <div className="mt-1">
                <StarRating stars={player.stars} size="lg" />
              </div>
            </div>

            {/* Info */}
            <div className="p-6 text-center">
              <h1 className="text-2xl font-black" style={{ color: '#002147' }}>
                {player.firstName} {player.lastName}
              </h1>
              <p className="text-gray-500 mt-1">{player.school}</p>

              <div className="flex items-center justify-center gap-2 mt-4">
                <span
                  className="font-bold text-sm px-3 py-1.5 rounded uppercase tracking-wide"
                  style={{ backgroundColor: '#002147', color: '#FFD700' }}
                >
                  {player.position}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  Class of {player.classYear}
                </span>
              </div>

              {player.committed && (
                <div
                  className="mt-4 px-4 py-2 rounded-xl font-bold text-sm"
                  style={{ backgroundColor: '#FFD700', color: '#002147' }}
                >
                  🎓 Committed to {player.committed}
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="grid grid-cols-2 gap-3">
                {statItems.map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
                    <div className="font-bold text-gray-800 mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hudl Link */}
            {player.hudlLink && (
              <div className="border-t border-gray-100 px-6 py-4">
                <a
                  href={player.hudlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#FF6B00' }}
                >
                  <span>▶</span>
                  Watch on Hudl
                </a>
              </div>
            )}

            {/* X Handle */}
            {player.xHandle && (
              <div className="border-t border-gray-100 px-6 py-4">
                <a
                  href={`https://x.com/${player.xHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#000000' }}
                >
                  <span>𝕏</span>
                  {player.xHandle.startsWith('@') ? player.xHandle : `@${player.xHandle}`}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column — Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Stats */}
          {player.stats && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: '#002147' }}>
                📊 Performance Stats
              </h2>
              <p className="text-gray-700 leading-relaxed">{player.stats}</p>
            </div>
          )}

          {/* Film Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: '#002147' }}>
              🎬 Film
            </h2>
            {player.hudlLink ? (
              <div>
                <p className="text-gray-500 text-sm mb-4">
                  Watch {player.firstName}&apos;s film on Hudl to see highlights and full game footage.
                </p>
                <a
                  href={player.hudlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#FF6B00' }}
                >
                  <span>▶</span>
                  View Hudl Profile
                </a>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No film link available for this player yet.</p>
            )}
          </div>

          {/* Recruiting Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: '#002147' }}>
              🏫 Recruiting Status
            </h2>
            {player.committed ? (
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#22c55e' }}
                />
                <span className="font-semibold text-gray-800">
                  Committed to <strong>{player.committed}</strong>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-gray-600">Uncommitted — Available for offers</span>
              </div>
            )}
          </div>

          {/* Rankings Context */}
          <div
            className="rounded-2xl p-6 text-white"
            style={{ backgroundColor: '#002147' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">SD Prospects Rank</div>
                <div className="text-4xl font-black mt-1" style={{ color: '#FFD700' }}>
                  #{player.rank}
                </div>
                <div className="mt-1 text-sm text-gray-300">
                  in San Diego County
                </div>
              </div>
              <div className="text-right">
                <StarRating stars={player.stars} size="lg" />
                <div className="text-xs text-gray-400 mt-1">{player.stars}-Star Prospect</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
