import type { Field } from 'payload'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** URL slug, filled from `sourceField` when left empty. */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: `Used in the URL. Leave empty to generate it from the ${sourceField}.`,
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const source = data?.[sourceField]
        return typeof source === 'string' ? slugify(source) : value
      },
    ],
  },
})

/** Manual sort position: lower numbers appear first. */
export const orderField: Field = {
  name: 'order',
  type: 'number',
  defaultValue: 100,
  admin: {
    position: 'sidebar',
    description: 'Lower numbers appear first.',
  },
}

export const linksField = (name = 'links'): Field => ({
  name,
  type: 'array',
  admin: { initCollapsed: true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { width: '30%' } },
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'other',
          admin: { width: '20%' },
          options: [
            { label: 'Live demo', value: 'demo' },
            { label: 'Code', value: 'code' },
            { label: 'Paper', value: 'paper' },
            { label: 'Video', value: 'video' },
            { label: 'Article', value: 'article' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'Full URL, or a path on this site like /projects/x' },
        },
      ],
    },
  ],
})

export const categoryOptions = [
  { label: 'IoT / Embedded', value: 'iot' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Computer Vision', value: 'cv' },
  { label: 'Web / Full-stack', value: 'web' },
  { label: 'HPC / Systems', value: 'hpc' },
  { label: 'Automation', value: 'automation' },
  { label: 'Research', value: 'research' },
]
