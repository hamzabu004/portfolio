import type { CollectionConfig } from 'payload'

import { orderField } from '../fields/shared'
import { revalidateHooks } from '../hooks/revalidate'

export const Activities: CollectionConfig = {
  slug: 'activities',
  labels: { singular: 'Activity', plural: 'Activities' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'year', 'order'],
    description: 'Awards, competitions, volunteering, talks.',
  },
  defaultSort: 'order',
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          defaultValue: 'competition',
          options: [
            { label: 'Award', value: 'award' },
            { label: 'Competition', value: 'competition' },
            { label: 'Volunteering', value: 'volunteering' },
            { label: 'Talk', value: 'talk' },
            { label: 'Other', value: 'other' },
          ],
        },
        { name: 'year', type: 'text' },
        { name: 'url', type: 'text', label: 'Link' },
      ],
    },
    { name: 'description', type: 'textarea' },
    orderField,
  ],
}
