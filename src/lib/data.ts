import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type {
  Activity,
  Album,
  Experience,
  Post,
  Project,
  Publication,
  SiteSetting,
} from '@/payload-types'

const payload = cache(async () => getPayload({ config }))

const published = { _status: { equals: 'published' } } as const

export const getSettings = cache(async (): Promise<SiteSetting> => {
  const p = await payload()
  const settings = await p.findGlobal({ slug: 'site-settings', depth: 1 })
  // Before Site settings is first saved, the global comes back empty.
  return { ...settings, name: settings.name || 'Portfolio' }
})

export const getProjects = cache(async (): Promise<Project[]> => {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'projects',
    where: published,
    sort: 'order',
    depth: 1,
    limit: 200,
  })
  return docs
})

export const getProject = cache(async (slug: string): Promise<Project | null> => {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'projects',
    where: { and: [published, { slug: { equals: slug } }] },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getExperience = cache(async (): Promise<Experience[]> => {
  const p = await payload()
  const { docs } = await p.find({ collection: 'experience', sort: 'order', depth: 1, limit: 100 })
  return docs
})

export const getPublications = cache(async (): Promise<Publication[]> => {
  const p = await payload()
  const { docs } = await p.find({ collection: 'publications', sort: 'order', limit: 100 })
  return docs
})

export const getActivities = cache(async (): Promise<Activity[]> => {
  const p = await payload()
  const { docs } = await p.find({ collection: 'activities', sort: 'order', limit: 100 })
  return docs
})

export const getPosts = cache(async (): Promise<Post[]> => {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'posts',
    where: published,
    sort: '-publishedAt',
    depth: 1,
    limit: 200,
  })
  return docs
})

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'posts',
    where: { and: [published, { slug: { equals: slug } }] },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getAlbums = cache(async (): Promise<Album[]> => {
  const p = await payload()
  const { docs } = await p.find({ collection: 'albums', sort: 'order', depth: 1, limit: 100 })
  return docs
})

export const getAlbum = cache(async (slug: string): Promise<Album | null> => {
  const p = await payload()
  const { docs } = await p.find({
    collection: 'albums',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
})
