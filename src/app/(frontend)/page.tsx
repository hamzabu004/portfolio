import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

import { ProfileLinks } from '@/components/Footer'
import { MediaImage } from '@/components/MediaImage'
import { ProjectCard, toCardData } from '@/components/ProjectCard'
import { LinkPills, Section } from '@/components/Section'
import {
  getActivities,
  getAlbums,
  getExperience,
  getPosts,
  getProjects,
  getPublications,
  getSettings,
} from '@/lib/data'
import { asDoc, asMedia, formatDate } from '@/lib/utils'
import type { Experience, Project, Publication } from '@/payload-types'

const statusLabels: Record<string, string> = {
  accepted: 'Accepted',
  submitted: 'Under review',
  preprint: 'Preprint',
}

function Authors({ authors, me }: { authors: string; me: string }) {
  return (
    <p className="authors">
      {authors.split(',').map((a, i, all) => {
        const name = a.trim()
        return (
          <span key={i}>
            {name === me ? <strong>{name}</strong> : name}
            {i < all.length - 1 && ', '}
          </span>
        )
      })}
    </p>
  )
}

function ExperienceEntry({ entry }: { entry: Experience }) {
  const projects = (entry.projects ?? []).map((p) => asDoc<Project>(p)).filter((p): p is Project => Boolean(p))
  return (
    <article className="timeline-entry">
      <p className="entry-date">{entry.period}</p>
      <div>
        <h3>
          {entry.role}
          <span className="entry-org">
            {' · '}
            {entry.url ? (
              <a href={entry.url} target="_blank" rel="noopener">
                {entry.organization}
              </a>
            ) : (
              entry.organization
            )}
          </span>
        </h3>
        {!!entry.bullets?.length && (
          <ul className="entry-bullets">
            {entry.bullets.map((b) => (
              <li key={b.id}>{b.text}</li>
            ))}
          </ul>
        )}
        {projects.length > 0 && (
          <p className="entry-projects">
            Projects:{' '}
            {projects.map((p, i) => (
              <span key={p.id}>
                <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                {i < projects.length - 1 && ' · '}
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  )
}

function PublicationEntry({ pub, me }: { pub: Publication; me: string }) {
  return (
    <article className="publication">
      <p className="entry-date">
        {[pub.venue, pub.year].filter(Boolean).join(' · ')}
        {pub.status && statusLabels[pub.status] && <span className="tag">{statusLabels[pub.status]}</span>}
      </p>
      <h3>{pub.title}</h3>
      {pub.authors && <Authors authors={pub.authors} me={me} />}
      {pub.tldr && (
        <p className="tldr">
          <b>TL;DR</b> {pub.tldr}
        </p>
      )}
      <LinkPills links={pub.links} />
    </article>
  )
}

export default async function HomePage() {
  const [settings, projects, experience, publications, activities, posts, albums] = await Promise.all([
    getSettings(),
    getProjects(),
    getExperience(),
    getPublications(),
    getActivities(),
    getPosts(),
    getAlbums(),
  ])

  const portrait = asMedia(settings.portrait)
  const featured = projects.filter((p) => p.featured)
  const more = projects.filter((p) => !p.featured)
  const work = experience.filter((e) => e.kind !== 'education')
  const education = experience.filter((e) => e.kind === 'education')
  const showWriting = settings.writing?.show && posts.length > 0
  const showPhotos = settings.photos?.show && albums.length > 0
  const initials = settings.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <h1 id="hero-title">{settings.name}</h1>
            {settings.headline && <p className="hero-headline">{settings.headline}</p>}
            {settings.bio && <RichText data={settings.bio} className="hero-bio" />}
            <ProfileLinks settings={settings} />
          </div>
          <div className="hero-portrait">
            {portrait ? (
              <MediaImage media={portrait} maxSize="thumb" sizes="200px" priority />
            ) : (
              <span className="portrait-placeholder" aria-hidden>
                {initials}
              </span>
            )}
          </div>
        </div>
      </section>

      {settings.projects?.show !== false && projects.length > 0 && (
        <Section id="projects" title={settings.projects?.title || 'Projects'} subtitle={settings.projects?.subtitle}>
          <div className="project-grid">
            {(featured.length ? featured : projects.slice(0, 4)).map((p, i) => (
              <ProjectCard key={p.id} project={toCardData(p)} priority={i < 2} />
            ))}
          </div>
          {featured.length > 0 && more.length > 0 && (
            <details className="more">
              <summary>
                More projects <span className="muted">({more.length})</span>
              </summary>
              <ul className="compact-list">
                {more.map((p) => (
                  <li key={p.id}>
                    <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                    {p.context && <span className="muted"> · {p.context}</span>}
                    <p>{p.summary}</p>
                  </li>
                ))}
              </ul>
            </details>
          )}
          <p className="section-more">
            <Link href="/projects">All projects, filterable by area →</Link>
          </p>
        </Section>
      )}

      {settings.experience?.show !== false && experience.length > 0 && (
        <Section
          id="experience"
          title={settings.experience?.title || 'Experience'}
          subtitle={settings.experience?.subtitle}
        >
          <div className="timeline">
            {work.map((e) => (
              <ExperienceEntry key={e.id} entry={e} />
            ))}
          </div>
          {education.length > 0 && (
            <>
              <h3 className="subheading">Education</h3>
              <div className="timeline">
                {education.map((e) => (
                  <ExperienceEntry key={e.id} entry={e} />
                ))}
              </div>
            </>
          )}
        </Section>
      )}

      {settings.research?.show !== false && publications.length > 0 && (
        <Section id="research" title={settings.research?.title || 'Research'} subtitle={settings.research?.subtitle}>
          <div className="publications">
            {publications.map((p) => (
              <PublicationEntry key={p.id} pub={p} me={settings.name} />
            ))}
          </div>
        </Section>
      )}

      {showWriting && (
        <Section id="writing" title={settings.writing?.title || 'Writing'} subtitle={settings.writing?.subtitle}>
          <ul className="post-list">
            {posts.slice(0, 4).map((post) => (
              <li key={post.id}>
                <span className="entry-date">{formatDate(post.publishedAt)}</span>
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
          <p className="section-more">
            <Link href="/writing">All writing →</Link>
          </p>
        </Section>
      )}

      {showPhotos && (
        <Section id="photos" title={settings.photos?.title || 'Photography'} subtitle={settings.photos?.subtitle}>
          <div className="album-grid">
            {albums.slice(0, 6).map((album) => {
              const cover = asMedia(album.cover) ?? asMedia(album.photos?.[0]?.image)
              return (
                <Link key={album.id} href={`/photos/${album.slug}`} className="album-card">
                  {cover && <MediaImage media={cover} maxSize="card" sizes="(max-width: 760px) 50vw, 280px" />}
                  <span>{album.title}</span>
                </Link>
              )
            })}
          </div>
        </Section>
      )}

      {settings.activities?.show !== false && activities.length > 0 && (
        <Section
          id="activities"
          title={settings.activities?.title || 'Activities'}
          subtitle={settings.activities?.subtitle}
        >
          <ul className="activity-list">
            {activities.map((a) => (
              <li key={a.id}>
                <span className="entry-date">{a.year}</span>
                <div>
                  {a.url ? (
                    <a href={a.url} target="_blank" rel="noopener">
                      {a.title} ↗
                    </a>
                  ) : (
                    <span className="activity-title">{a.title}</span>
                  )}
                  {a.description && <p>{a.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}
