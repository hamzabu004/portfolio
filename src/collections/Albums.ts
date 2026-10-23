import type { CollectionConfig } from 'payload'

import { orderField, slugField } from '../fields/shared'
import { revalidateHooks } from '../hooks/revalidate'

export const Albums: CollectionConfig = {
  slug: 'albums',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'date'],
    description: 'Photography. Turn on "Photography" in Site settings to show albums.',
  },
  defaultSort: 'order',
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text' },
        { name: 'date', type: 'text', admin: { placeholder: 'Spring 2026' } },
      ],
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Defaults to the first photo.' },
    },
    {
      name: 'photos',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    slugField(),
    orderField,
  ],
}
