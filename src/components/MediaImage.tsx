import type { Media } from '@/payload-types'

type Size = 'thumb' | 'card' | 'large'

const widths: Record<Size, number> = { thumb: 480, card: 960, large: 1800 }

/**
 * Renders an uploaded image with a srcset built from the sizes Payload generated
 * on upload. Plain <img> on purpose: the files are already optimised, so there is
 * no need for (metered) on-the-fly image optimisation.
 */
export function MediaImage({
  media,
  sizes = '100vw',
  className,
  priority = false,
  maxSize = 'large',
}: {
  media: Media
  sizes?: string
  className?: string
  priority?: boolean
  maxSize?: Size
}) {
  if (!media.url) return null

  const order: Size[] = ['thumb', 'card', 'large']
  const candidates = order
    .slice(0, order.indexOf(maxSize) + 1)
    .map((size) => media.sizes?.[size])
    .filter((s): s is NonNullable<typeof s> => Boolean(s?.url && s.width))
  const srcSet = candidates.map((s) => `${s.url} ${s.width}w`).join(', ')
  const fallback = candidates.at(-1)?.url ?? media.url

  const focal =
    media.focalX != null && media.focalY != null ? `${media.focalX}% ${media.focalY}%` : undefined

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fallback}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      width={media.width ?? widths[maxSize]}
      height={media.height ?? undefined}
      alt={media.alt ?? ''}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={focal ? { objectPosition: focal } : undefined}
    />
  )
}
