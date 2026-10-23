import type { CollectionConfig } from 'payload'

import { projectBlocks } from '../blocks'
import { categoryOptions, linksField, orderField, slugField } from '../fields/shared'
import { revalidateHooks } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'featured', 'stage', 'order', '_status'],
    description: 'Everything you have built. Featured projects appear as cards on the home page.',
  },
  defaultSort: 'order',
  versions: { drafts: true },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences (the TL;DR) shown on cards and at the top of the page.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Card image, ideally 16:10. Without one a placeholder is drawn.' },
            },
            {
              name: 'highlights',
              type: 'array',
              maxRows: 3,
              admin: { description: 'Headline results shown as chips on the card, e.g. "2×" + "GPU speedup".' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
                    { name: 'label', type: 'text', required: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
            linksField(),
          ],
        },
        {
          label: 'Page',
          description: 'The project page, built from blocks: text, images, video, results, charts, code, hardware, live demos.',
          fields: [{ name: 'layout', type: 'blocks', blocks: projectBlocks }],
        },
      ],
    },
    slugField(),
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      required: true,
      options: categoryOptions,
      admin: { position: 'sidebar' },
    },
    {
      name: 'tech',
      type: 'text',
      hasMany: true,
      admin: { position: 'sidebar', description: 'Tools & technologies (press Enter after each).' },
    },
    {
      name: 'context',
      type: 'text',
      admin: { position: 'sidebar', placeholder: 'Final Year Project · Freelance · HPC course' },
    },
    { name: 'period', type: 'text', admin: { position: 'sidebar', placeholder: '2026 – Present' } },
    {
      name: 'stage',
      type: 'select',
      defaultValue: 'complete',
      options: [
        { label: 'In progress', value: 'in-progress' },
        { label: 'Complete', value: 'complete' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show as a card on the home page.' },
    },
    orderField,
  ],
}
