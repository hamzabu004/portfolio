import type { SiteSetting } from '@/payload-types'
import { asMedia } from '@/lib/utils'

export function ProfileLinks({ settings }: { settings: SiteSetting }) {
  const resume = asMedia(settings.resume)
  return (
    <div className="profile-links">
      {(settings.socials ?? []).map((s) => (
        <a key={s.id ?? s.url} href={s.url} target="_blank" rel="noopener">
          {s.label}
        </a>
      ))}
      {resume?.url && (
        <a href={resume.url} target="_blank" rel="noopener">
          Résumé
        </a>
      )}
    </div>
  )
}

export function Footer({ settings }: { settings: SiteSetting }) {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-layout">
        <div>
          {settings.email && (
            <a className="footer-email" href={`mailto:${settings.email}`}>
              {settings.email}
            </a>
          )}
          {settings.location && <p className="muted">{settings.location}</p>}
        </div>
        <ProfileLinks settings={settings} />
        <p className="muted footer-copy">
          © {settings.name} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
