import type { MetadataRoute } from 'next'

import { siteURL } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
    sitemap: `${siteURL}/sitemap.xml`,
  }
}
