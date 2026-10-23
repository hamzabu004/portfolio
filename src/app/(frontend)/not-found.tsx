import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-shell page narrow">
      <header className="page-header">
        <h1>Page not found</h1>
        <p className="lede">That page doesn’t exist, or it hasn’t been published yet.</p>
      </header>
      <p>
        <Link href="/">← Back home</Link>
      </p>
    </div>
  )
}
