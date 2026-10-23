import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MediaImage } from '@/components/MediaImage'
import { getAlbum, getAlbums, getSettings } from '@/lib/data'
import { asMedia } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const albums = await getAlbums()
  return albums.filter((a) => a.slug).map((a) => ({ slug: a.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await getAlbum((await params).slug)
  return album ? { title: album.title, description: album.description ?? undefined } : {}
}

export default async function AlbumPage({ params }: Props) {
  const [settings, album] = await Promise.all([getSettings(), getAlbum((await params).slug)])
  if (!settings.photos?.show || !album) notFound()

  return (
    <div className="page-shell page">
      <p className="breadcrumb">
        <Link href="/photos">← {settings.photos?.title || 'Photography'}</Link>
      </p>
      <header className="page-header">
        <h1>{album.title}</h1>
        <p className="entry-date">{[album.location, album.date].filter(Boolean).join(' · ')}</p>
        {album.description && <p className="lede">{album.description}</p>}
      </header>
      <div className="photo-masonry">
        {(album.photos ?? []).map((photo) => {
          const media = asMedia(photo.image)
          if (!media) return null
          return (
            <figure key={photo.id}>
              <a href={media.url ?? '#'} target="_blank" rel="noopener">
                <MediaImage media={media} sizes="(max-width: 760px) 100vw, 360px" />
              </a>
              {photo.caption && <figcaption>{photo.caption}</figcaption>}
            </figure>
          )
        })}
      </div>
    </div>
  )
}
