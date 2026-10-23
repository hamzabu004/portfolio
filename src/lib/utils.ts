import type { Media } from '@/payload-types'

export const siteURL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

/** Relationship fields are either a populated document or just its id. */
export function asDoc<T extends object>(value: T | number | string | null | undefined): T | null {
  return value && typeof value === 'object' ? value : null
}

export const asMedia = (value: Media | number | null | undefined) => asDoc<Media>(value)

export const isExternal = (url: string) => /^https?:\/\//.test(url)

export const categoryLabels: Record<string, string> = {
  iot: 'IoT / Embedded',
  ai: 'AI / ML',
  cv: 'Computer Vision',
  web: 'Web',
  hpc: 'HPC / Systems',
  automation: 'Automation',
  research: 'Research',
}

export function formatDate(value: string | null | undefined) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
