import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaImage } from '@/components/MediaImage'
import { getAlbums, getSettings } from '@/lib/data'
import { asMedia } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return { title: settings.photos?.title || 'Photography' }
}

export default async function PhotosPage() {
  const [settings, albums] = await Promise.all([getSettings(), getAlbums()])
  if (!settings.photos?.show) notFound()

  return (
    <div className="page-shell page">
      <header className="page-header">
        <h1>{settings.photos?.title || 'Photography'}</h1>
        {settings.photos?.subtitle && <p className="lede">{settings.photos.subtitle}</p>}
      </header>
      {albums.length === 0 ? (
        <p className="muted">Nothing here yet.</p>
      ) : (
        <div className="album-grid">
          {albums.map((album) => {
            const cover = asMedia(album.cover) ?? asMedia(album.photos?.[0]?.image)
            return (
              <Link key={album.id} href={`/photos/${album.slug}`} className="album-card">
                {cover && <MediaImage media={cover} maxSize="card" sizes="(max-width: 760px) 50vw, 340px" />}
                <span>{album.title}</span>
                {album.location && <small>{album.location}</small>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
