import type { MetadataRoute } from 'next';
import { getSafeSiteUrl } from '@/lib/validation';

export default function robots(): MetadataRoute.Robots {
  const { origin } = getSafeSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${origin}/sitemap.xml`,
  };
}
