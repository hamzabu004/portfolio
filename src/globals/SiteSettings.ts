import type { Field, GlobalConfig } from 'payload'

import { revalidateGlobal } from '../hooks/revalidate'

const section = (name: string, label: string, subtitle: string, show = true): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'show', type: 'checkbox', defaultValue: show, admin: { width: '20%' } },
        { name: 'title', type: 'text', defaultValue: label, admin: { width: '35%' } },
        { name: 'subtitle', type: 'text', defaultValue: subtitle, admin: { width: '45%' } },
      ],
    },
  ],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'headline',
              type: 'text',
              admin: { description: 'Short line under your name, also used in the browser tab.' },
            },
            { name: 'bio', type: 'richText' },
            { name: 'portrait', type: 'upload', relationTo: 'media' },
            { name: 'resume', type: 'upload', relationTo: 'media', label: 'Résumé (PDF)' },
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email' },
                { name: 'location', type: 'text' },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          description: 'Turn home-page sections on or off and rename them. Empty sections hide themselves.',
          fields: [
            section('projects', 'Projects', 'IoT, AI & systems'),
            section('experience', 'Experience', 'Work, research & teaching'),
            section('research', 'Research', 'Papers & manuscripts'),
            section('activities', 'Activities', 'Competitions & community'),
            section('writing', 'Writing', 'Notes & blog posts', false),
            section('photos', 'Photography', 'Places & observations', false),
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              admin: { description: 'Shown by Google and in link previews.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Link preview image',
              admin: { description: '1200 × 630 works best.' },
            },
          ],
        },
      ],
    },
  ],
}
