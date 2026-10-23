import Link from 'next/link'

import { MediaImage } from '@/components/MediaImage'
import type { Media, Project } from '@/payload-types'
import { asMedia, categoryLabels } from '@/lib/utils'

/** The slice of a project a card needs; small enough to pass to client components. */
export type ProjectCardData = {
  id: number
  slug: string
  title: string
  summary: string
  categories: string[]
  context: string | null
  period: string | null
  inProgress: boolean
  cover: Media | null
  highlights: { value: string; label: string }[]
}

export function toCardData(p: Project): ProjectCardData {
  return {
    id: p.id,
    slug: p.slug ?? String(p.id),
    title: p.title,
    summary: p.summary,
    categories: p.categories ?? [],
    context: p.context ?? null,
    period: p.period ?? null,
    inProgress: p.stage === 'in-progress',
    cover: asMedia(p.cover),
    highlights: (p.highlights ?? []).map(({ value, label }) => ({ value, label })),
  }
}

/** Drawn cover for projects without an image: a quiet circuit-like grid with the initials. */
export function CoverPlaceholder({ title, seed }: { title: string; seed: number }) {
  const initials = title
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  const nodes = Array.from({ length: 7 }, (_, i) => {
    const n = (seed * 9301 + i * 49297) % 233280
    return { x: 20 + ((n * 7) % 360), y: 20 + ((n * 13) % 210) }
  })
  return (
    <svg className="cover-placeholder" viewBox="0 0 400 250" aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`grid-${seed}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" className="ph-grid" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill={`url(#grid-${seed})`} />
      {nodes.slice(1).map((n, i) => (
        <path
          key={i}
          d={`M${nodes[i].x} ${nodes[i].y}H${n.x}V${n.y}`}
          className="ph-trace"
          fill="none"
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="3.5" className="ph-node" />
      ))}
      <text x="200" y="125" dy="0.35em" textAnchor="middle" className="ph-initials">
        {initials}
      </text>
    </svg>
  )
}

export function ProjectCard({ project, priority = false }: { project: ProjectCardData; priority?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <span className="project-cover">
        {project.cover ? (
          <MediaImage media={project.cover} maxSize="card" sizes="(max-width: 760px) 100vw, 440px" priority={priority} />
        ) : (
          <CoverPlaceholder title={project.title} seed={project.id} />
        )}
        {project.inProgress && <span className="badge-progress">In progress</span>}
      </span>
      <span className="project-meta">
        {[project.categories.map((c) => categoryLabels[c] ?? c).join(' · '), project.period]
          .filter(Boolean)
          .join(' — ')}
      </span>
      <strong className="project-title">{project.title}</strong>
      <span className="project-summary">{project.summary}</span>
      {project.highlights.length > 0 && (
        <span className="chips">
          {project.highlights.map((h) => (
            <span key={h.label} className="chip">
              <b>{h.value}</b> {h.label}
            </span>
          ))}
        </span>
      )}
    </Link>
  )
}
