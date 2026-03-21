import Link from 'next/link';
import StarRating from './StarRating';
import type { Player } from '@/lib/players';

interface PlayerCardProps {
  player: Player;
  featured?: boolean;
}

export default function PlayerCard({ player, featured = false }: PlayerCardProps) {
  return (
    <Link href={`/players/${player.id}`}>
      <div
        className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100 hover:-translate-y-1 cursor-pointer ${featured ? 'flex' : ''}`}
      >
        {/* Header Banner */}
        <div
          style={{ backgroundColor: '#002147' }}
          className={`flex items-center justify-between px-5 ${featured ? 'flex-col py-8 w-40 shrink-0 justify-center gap-3' : 'py-2'}`}
        >
          {featured && (
            <span className="text-gold text-xs font-bold uppercase tracking-widest" style={{ color: '#FFD700' }}>5 ★ Prospect</span>
          )}
          <StarRating stars={player.stars} size={featured ? 'md' : 'sm'} />
          {featured && (
            <span className="text-white text-xs font-semibold opacity-70">Class of {player.classYear}</span>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 ${featured ? 'flex-1' : 'p-4'}`}>
          <h3 className={`font-bold text-gray-900 leading-tight ${featured ? 'text-2xl' : 'text-lg'}`}>
            {player.firstName} {player.lastName}
          </h3>
          <p className="text-gray-500 text-sm mt-0.5">{player.school}</p>

          <div className="flex items-center gap-2 mt-3">
            <span
              style={{ backgroundColor: '#002147', color: '#FFD700' }}
              className={`font-bold px-2 py-1 rounded uppercase tracking-wide ${featured ? 'text-sm' : 'text-xs'}`}
            >
              {player.position}
            </span>
            {!featured && <span className="text-xs text-gray-500 font-medium">Class of {player.classYear}</span>}
          </div>

          <div className={`flex gap-4 mt-3 text-gray-600 ${featured ? 'text-base' : 'text-sm'}`}>
            {player.height && <span>{player.height}</span>}
            {player.weight && <span>{player.weight} lbs</span>}
          </div>

          {player.committed && player.committedTo && (
            <div
              className={`mt-3 font-semibold px-3 py-1.5 rounded-full inline-block ${featured ? 'text-sm' : 'text-xs'}`}
              style={{ backgroundColor: '#FFD700', color: '#002147' }}
            >
              {player.firstName === 'Quentin' && player.lastName === 'Cesaire' ? '✍️ Committed to' : '🖊️ Signed with'} {player.committedTo}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
