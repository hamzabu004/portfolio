import React from 'react'

/** Home-page section: label in the left margin, content on a single reading edge. */
export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle?: string | null
  children: React.ReactNode
}) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="page-shell section-layout">
        <header className="section-heading">
          <h2 id={`${id}-title`}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </header>
        <div className="section-body">{children}</div>
      </div>
    </section>
  )
}

export function LinkPills({ links }: { links?: { label: string; url: string; id?: string | null }[] | null }) {
  if (!links?.length) return null
  return (
    <span className="pills">
      {links.map((l) => {
        const external = /^https?:\/\//.test(l.url)
        return (
          <a key={l.id ?? l.url} href={l.url} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
            {l.label}
            {external && <span aria-hidden> ↗</span>}
          </a>
        )
      })}
    </span>
  )
}
