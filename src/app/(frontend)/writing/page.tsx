import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPosts, getSettings } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return { title: settings.writing?.title || 'Writing' }
}

export default async function WritingPage() {
  const [settings, posts] = await Promise.all([getSettings(), getPosts()])
  if (!settings.writing?.show) notFound()

  return (
    <div className="page-shell page narrow">
      <header className="page-header">
        <h1>{settings.writing?.title || 'Writing'}</h1>
        {settings.writing?.subtitle && <p className="lede">{settings.writing.subtitle}</p>}
      </header>
      {posts.length === 0 ? (
        <p className="muted">Nothing here yet.</p>
      ) : (
        <ul className="post-list large">
          {posts.map((post) => (
            <li key={post.id}>
              <span className="entry-date">{formatDate(post.publishedAt)}</span>
              <div>
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                {post.excerpt && <p>{post.excerpt}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
