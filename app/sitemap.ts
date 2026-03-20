import { MetadataRoute } from 'next';
import { getPlayers } from '@/lib/players';

export default function sitemap(): MetadataRoute.Sitemap {
  const players = getPlayers();
  const baseUrl = 'https://sandiegoprospects.com';

  const playerPages = players.map((player) => ({
    url: `${baseUrl}/players/${player.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/rankings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...playerPages,
  ];
}
