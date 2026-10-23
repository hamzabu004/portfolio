import type { Block } from 'payload'

// Building blocks for project and post pages. Each block has a matching
// renderer in src/components/blocks.

export const TextBlock: Block = {
  slug: 'text',
  labels: { singular: 'Text', plural: 'Text' },
  fields: [{ name: 'content', type: 'richText', required: true }],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Image / Gallery', plural: 'Images / Galleries' },
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: '1',
      options: [
        { label: 'One wide image per row', value: '1' },
        { label: 'Two per row', value: '2' },
        { label: 'Three per row', value: '3' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    {
      name: 'url',
      type: 'text',
      admin: { description: 'YouTube / Vimeo link, or a direct .mp4 URL. Leave empty to upload a file.' },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Short clips only; long videos belong on YouTube (unlisted is fine).' },
    },
    { name: 'caption', type: 'text' },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Key results', plural: 'Key results' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '30%', placeholder: '2×' } },
            { name: 'label', type: 'text', required: true, admin: { width: '70%', placeholder: 'GPU speedup' } },
          ],
        },
        { name: 'note', type: 'text', admin: { placeholder: 'vs. single-threaded CPU baseline' } },
      ],
    },
  ],
}

export const TableBlock: Block = {
  slug: 'table',
  labels: { singular: 'Results table', plural: 'Results tables' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'headers',
      type: 'text',
      hasMany: true,
      required: true,
      admin: { description: 'Column headings, e.g. Model · Accuracy · F1' },
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'cells', type: 'text', hasMany: true, required: true },
        {
          name: 'highlight',
          type: 'checkbox',
          admin: { description: 'Emphasise this row (e.g. your method).' },
        },
      ],
    },
    { name: 'caption', type: 'text' },
  ],
}

export const ChartBlock: Block = {
  slug: 'chart',
  labels: { singular: 'Chart', plural: 'Charts' },
  fields: [
    { name: 'title', type: 'text' },
    {
      type: 'row',
      fields: [
        {
          name: 'kind',
          type: 'select',
          defaultValue: 'bar',
          options: [
            { label: 'Bar', value: 'bar' },
            { label: 'Line', value: 'line' },
          ],
        },
        { name: 'xLabel', type: 'text', label: 'X axis label' },
        { name: 'yLabel', type: 'text', label: 'Y axis label' },
        { name: 'unit', type: 'text', admin: { placeholder: '%, ms, ×' } },
      ],
    },
    {
      name: 'series',
      type: 'text',
      hasMany: true,
      required: true,
      maxRows: 3,
      admin: {
        description:
          'One name per data series, e.g. Baseline · Attention SNN (max 3, so colours stay distinguishable).',
      },
    },
    {
      name: 'points',
      type: 'array',
      minRows: 1,
      admin: { description: 'One row per category / x value, with one number per series.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'x', type: 'text', required: true, admin: { width: '30%' } },
            { name: 'values', type: 'number', hasMany: true, required: true, admin: { width: '70%' } },
          ],
        },
      ],
    },
    { name: 'caption', type: 'text' },
  ],
}

export const CodeBlock: Block = {
  slug: 'code',
  labels: { singular: 'Code', plural: 'Code' },
  fields: [
    { name: 'language', type: 'text', defaultValue: 'python' },
    { name: 'code', type: 'code', required: true },
    { name: 'caption', type: 'text' },
  ],
}

export const HardwareBlock: Block = {
  slug: 'hardware',
  labels: { singular: 'Hardware / parts list', plural: 'Hardware / parts lists' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Hardware' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'quantity', type: 'number', admin: { width: '15%' } },
            { name: 'role', type: 'text', admin: { width: '45%', placeholder: 'What it does in the system' } },
          ],
        },
      ],
    },
  ],
}

export const EmbedBlock: Block = {
  slug: 'embed',
  labels: { singular: 'Live embed', plural: 'Live embeds' },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'A page to show inline, e.g. a hosted demo, dashboard or Hugging Face Space.' },
    },
    { name: 'height', type: 'number', defaultValue: 520 },
    { name: 'caption', type: 'text' },
  ],
}

export const projectBlocks = [
  TextBlock,
  GalleryBlock,
  VideoBlock,
  StatsBlock,
  TableBlock,
  ChartBlock,
  CodeBlock,
  HardwareBlock,
  EmbedBlock,
]
