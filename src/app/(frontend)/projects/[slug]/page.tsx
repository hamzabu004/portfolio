import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { MediaImage } from '@/components/MediaImage'
import { LinkPills } from '@/components/Section'
import { getProject, getProjects } from '@/lib/data'
import { asMedia, categoryLabels } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.filter((p) => p.slug).map((p) => ({ slug: p.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug)
  if (!project) return {}
  const cover = asMedia(project.cover)
  return {
    title: project.title,
    description: project.summary,
    openGraph: cover?.url ? { images: [{ url: cover.url }] } : undefined,
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).slug)
  if (!project) notFound()

  const cover = asMedia(project.cover)
  const facts = [
    { label: 'Area', value: project.categories.map((c) => categoryLabels[c] ?? c).join(', ') },
    { label: 'Context', value: project.context },
    { label: 'When', value: project.period },
    { label: 'Status', value: project.stage === 'in-progress' ? 'In progress' : null },
  ].filter((f) => f.value)

  return (
    <article className="page-shell page project-page">
      <p className="breadcrumb">
        <Link href="/projects">← All projects</Link>
      </p>
      <header className="project-header">
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        <LinkPills links={project.links} />
      </header>

      {cover && (
        <div className="project-hero">
          <MediaImage media={cover} sizes="(max-width: 1100px) 100vw, 1080px" priority />
        </div>
      )}

      <div className="project-body">
        <aside className="project-facts">
          <dl>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            {!!project.tech?.length && (
              <div>
                <dt>Built with</dt>
                <dd className="tech-list">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
          {!!project.highlights?.length && (
            <dl className="facts-highlights">
              {project.highlights.map((h) => (
                <div key={h.id ?? h.label}>
                  <dd>{h.value}</dd>
                  <dt>{h.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </aside>
        <div className="project-content">
          <RenderBlocks blocks={project.layout} />
        </div>
      </div>
    </article>
  )
}
