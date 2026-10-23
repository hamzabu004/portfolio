import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header, type NavItem } from '@/components/Header'
import { getSettings } from '@/lib/data'
import { asMedia, siteURL } from '@/lib/utils'

import './styles.css'

const serif = Newsreader({ subsets: ['latin'], variable: '--font-serif', style: ['normal', 'italic'] })
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const title = settings.headline ? `${settings.name} · ${settings.headline}` : settings.name
  const og = asMedia(settings.ogImage) ?? asMedia(settings.portrait)
  return {
    metadataBase: new URL(siteURL),
    title: { default: title, template: `%s · ${settings.name}` },
    description: settings.description ?? undefined,
    openGraph: {
      type: 'website',
      siteName: settings.name,
      title,
      description: settings.description ?? undefined,
      images: og?.url ? [{ url: og.url }] : undefined,
    },
    twitter: { card: og ? 'summary_large_image' : 'summary' },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8f6' },
    { media: '(prefers-color-scheme: dark)', color: '#141c1b' },
  ],
}

// Applies the saved theme before first paint so there is no light/dark flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  const nav: NavItem[] = [
    { show: settings.projects?.show, label: settings.projects?.title || 'Projects', href: '/projects' },
    { show: settings.experience?.show, label: settings.experience?.title || 'Experience', href: '/#experience' },
    { show: settings.research?.show, label: settings.research?.title || 'Research', href: '/#research' },
    { show: settings.writing?.show, label: settings.writing?.title || 'Writing', href: '/writing' },
    { show: settings.photos?.show, label: settings.photos?.title || 'Photography', href: '/photos' },
  ].filter((item) => item.show !== false)

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header name={settings.name} nav={nav} />
        <main id="main">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
