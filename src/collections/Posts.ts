import type { CollectionConfig } from 'payload'

import { projectBlocks } from '../blocks'
import { slugField } from '../fields/shared'
import { revalidateHooks } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'publishedAt', '_status'],
    description: 'Blog posts and notes. Turn on "Writing" in Site settings to show them.',
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true },
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Shown in lists and link previews.' } },
    { name: 'cover', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    {
      name: 'extras',
      type: 'blocks',
      blocks: projectBlocks,
      admin: { description: 'Optional galleries, charts, code or embeds shown after the text.' },
    },
    slugField(),
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'blog',
      options: [
        { label: 'Blog post', value: 'blog' },
        { label: 'Note', value: 'note' },
        { label: 'Photo essay', value: 'photo-essay' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'tags', type: 'text', hasMany: true, admin: { position: 'sidebar' } },
  ],
}
