import type { CollectionConfig } from 'payload'

import { orderField } from '../fields/shared'
import { revalidateHooks } from '../hooks/revalidate'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: { singular: 'Experience', plural: 'Experience' },
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['role', 'organization', 'kind', 'period', 'order'],
    description: 'Jobs, internships, research, teaching and education.',
  },
  defaultSort: 'order',
  hooks: revalidateHooks,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'role', type: 'text', required: true, admin: { placeholder: 'Research Intern' } },
        { name: 'organization', type: 'text', required: true, admin: { placeholder: 'KDD Lab, FAST NUCES' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'period', type: 'text', required: true, admin: { placeholder: 'Jul 2026 – Aug 2026' } },
        { name: 'location', type: 'text' },
        { name: 'url', type: 'text', label: 'Organization website' },
      ],
    },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { description: 'Projects you built in this role; they are linked from the entry.' },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'job',
      options: [
        { label: 'Job', value: 'job' },
        { label: 'Internship', value: 'internship' },
        { label: 'Research', value: 'research' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Teaching', value: 'teaching' },
        { label: 'Education', value: 'education' },
      ],
      admin: { position: 'sidebar', description: 'Education entries are listed separately.' },
    },
    { name: 'logo', type: 'upload', relationTo: 'media', admin: { position: 'sidebar' } },
    orderField,
  ],
}
