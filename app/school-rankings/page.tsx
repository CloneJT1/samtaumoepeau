import SchoolRankingsClient from './SchoolRankingsClient';
import { getPlayers } from '@/lib/players';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Rankings | SD Prospects',
  description: 'Which colleges are signing the most San Diego County football prospects?',
};

export default function SchoolRankingsPage() {
  const players = getPlayers();

  const getData = (year: number) => {
    const committed = players.filter(p => p.committedTo && p.classYear === year);
    const schools: Record<string, typeof players> = {};
    for (const p of committed) {
      if (!schools[p.committedTo!]) schools[p.committedTo!] = [];
      schools[p.committedTo!].push(p);
    }
    return Object.entries(schools)
      .map(([school, plist]) => ({
        school,
        count: plist.length,
        totalStars: plist.reduce((s, p) => s + (p.stars || 0), 0),
        totalPts: plist.reduce((s, p) => s + ((p as any).totalScore || 0), 0),
        players: [...plist]
          .sort((a, b) => ((b as any).totalScore || 0) - ((a as any).totalScore || 0))
          .map(p => ({ id: p.id, firstName: p.firstName, lastName: p.lastName, stars: p.stars || 0, position: p.position || '', classYear: p.classYear })),
      }))
      .sort((a, b) => b.count - a.count || b.totalStars - a.totalStars || b.totalPts - a.totalPts);
  };

  return <SchoolRankingsClient data2026={getData(2026)} data2027={getData(2027)} />;
}
