import type { CollectionConfig } from 'payload'

import { revalidateHooks } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: revalidateHooks,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for screen readers and search engines.' },
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    // Resized copies are generated on upload and served directly, so the site
    // never needs Vercel's (metered) image optimisation.
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumb', width: 480, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'card', width: 960, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'large', width: 1800, formatOptions: { format: 'webp', options: { quality: 82 } } },
    ],
    adminThumbnail: 'thumb',
    focalPoint: true,
  },
}
