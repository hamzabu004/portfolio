import type { CollectionConfig } from 'payload'

import { linksField, orderField } from '../fields/shared'
import { revalidateHooks } from '../hooks/revalidate'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'venue', 'status', 'year'],
  },
  defaultSort: 'order',
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'authors',
      type: 'text',
      admin: { description: 'Comma-separated. Your own name is highlighted automatically.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'venue', type: 'text' },
        { name: 'year', type: 'text' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'published',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Accepted', value: 'accepted' },
            { label: 'Under review', value: 'submitted' },
            { label: 'Preprint', value: 'preprint' },
          ],
        },
      ],
    },
    { name: 'tldr', type: 'textarea', label: 'TL;DR' },
    linksField(),
    orderField,
  ],
}
