import type { Metadata } from 'next'

import { toCardData } from '@/components/ProjectCard'
import { ProjectGrid } from '@/components/ProjectGrid'
import { getProjects, getSettings } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return { title: settings.projects?.title || 'Projects' }
}

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()])
  return (
    <div className="page-shell page">
      <header className="page-header">
        <h1>{settings.projects?.title || 'Projects'}</h1>
        {settings.projects?.subtitle && <p className="lede">{settings.projects.subtitle}</p>}
      </header>
      <ProjectGrid projects={projects.map(toCardData)} />
    </div>
  )
}
