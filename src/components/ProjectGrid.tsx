'use client'

import { useState } from 'react'

import { categoryLabels } from '@/lib/utils'

import { ProjectCard, type ProjectCardData } from './ProjectCard'

/** Project cards with category filter tabs (tabs only appear when there is something to filter). */
export function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  const [active, setActive] = useState<string | null>(null)

  const counts = new Map<string, number>()
  for (const p of projects) for (const c of p.categories) counts.set(c, (counts.get(c) ?? 0) + 1)
  const categories = Object.keys(categoryLabels).filter((c) => counts.has(c))
  const visible = active ? projects.filter((p) => p.categories.includes(active)) : projects

  return (
    <>
      {categories.length > 1 && (
        <div className="filter-tabs" role="toolbar" aria-label="Filter projects by category">
          <button type="button" aria-pressed={active === null} onClick={() => setActive(null)}>
            All <span>{projects.length}</span>
          </button>
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)}>
              {categoryLabels[c]} <span>{counts.get(c)}</span>
            </button>
          ))}
        </div>
      )}
      <div className="project-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} project={p} priority={i < 2} />
        ))}
      </div>
    </>
  )
}
