'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export type NavItem = { label: string; href: string; show?: boolean | null }

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    const stored = document.documentElement.dataset.theme as 'light' | 'dark' | undefined
    setTheme(stored ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title="Toggle theme"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <path
          d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export function Header({ name, nav }: { name: string; nav: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="site-header">
      <div className="page-shell nav-layout">
        <Link href="/" className="nav-name">
          {name}
        </Link>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>
        <nav className={`site-nav ${open ? 'is-open' : ''}`} id="primary-navigation" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
