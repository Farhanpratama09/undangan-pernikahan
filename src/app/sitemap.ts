import type { MetadataRoute } from 'next';
import { getSafeSiteUrl } from '@/lib/validation';

export default function sitemap(): MetadataRoute.Sitemap {
  const { origin } = getSafeSiteUrl();

  return [
    {
      url: origin,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
