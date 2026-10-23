import type { MetadataRoute } from 'next'

import { getAlbums, getPosts, getProjects, getSettings } from '@/lib/data'
import { siteURL } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, projects, posts, albums] = await Promise.all([
    getSettings(),
    getProjects(),
    getPosts(),
    getAlbums(),
  ])
  const entry = (path: string, lastModified?: string) => ({ url: `${siteURL}${path}`, lastModified })

  return [
    entry('/'),
    entry('/projects'),
    ...projects.map((p) => entry(`/projects/${p.slug}`, p.updatedAt)),
    ...(settings.writing?.show
      ? [entry('/writing'), ...posts.map((p) => entry(`/writing/${p.slug}`, p.updatedAt))]
      : []),
    ...(settings.photos?.show
      ? [entry('/photos'), ...albums.map((a) => entry(`/photos/${a.slug}`, a.updatedAt))]
      : []),
  ]
}
