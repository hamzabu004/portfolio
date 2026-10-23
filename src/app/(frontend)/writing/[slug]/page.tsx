import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { MediaImage } from '@/components/MediaImage'
import { getPost, getPosts, getSettings } from '@/lib/data'
import { asMedia, formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  if (!post) return {}
  const cover = asMedia(post.cover)
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: { type: 'article', images: cover?.url ? [{ url: cover.url }] : undefined },
  }
}

export default async function PostPage({ params }: Props) {
  const [settings, post] = await Promise.all([getSettings(), getPost((await params).slug)])
  if (!settings.writing?.show || !post) notFound()
  const cover = asMedia(post.cover)

  return (
    <article className="page-shell page narrow post">
      <p className="breadcrumb">
        <Link href="/writing">← {settings.writing?.title || 'Writing'}</Link>
      </p>
      <header className="page-header">
        <p className="entry-date">{formatDate(post.publishedAt)}</p>
        <h1>{post.title}</h1>
        {post.excerpt && <p className="lede">{post.excerpt}</p>}
      </header>
      {cover && (
        <div className="post-cover">
          <MediaImage media={cover} sizes="(max-width: 760px) 100vw, 720px" priority />
        </div>
      )}
      {post.content && <RichText data={post.content} className="prose" />}
      <RenderBlocks blocks={post.extras} />
    </article>
  )
}
