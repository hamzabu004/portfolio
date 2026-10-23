import { RichText } from '@payloadcms/richtext-lexical/react'

import { MediaImage } from '@/components/MediaImage'
import type { Project } from '@/payload-types'
import { asMedia } from '@/lib/utils'

import { Chart } from './Chart'

export type LayoutBlock = NonNullable<Project['layout']>[number]

function videoEmbedURL(url: string) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return null
}

function Block({ block }: { block: LayoutBlock }) {
  switch (block.blockType) {
    case 'text':
      return <RichText data={block.content} className="block prose" />

    case 'gallery': {
      const images = (block.images ?? []).flatMap((item) => {
        const media = asMedia(item.image)
        return media ? [{ media, caption: item.caption, id: item.id }] : []
      })
      const cols = Number(block.columns ?? 1)
      return (
        <div className={`block gallery cols-${cols}`}>
          {images.map(({ media, caption, id }) => (
            <figure key={id ?? media.id}>
              <MediaImage
                media={media}
                sizes={cols === 1 ? '(max-width: 900px) 100vw, 860px' : `(max-width: 760px) 100vw, ${Math.round(860 / cols)}px`}
              />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>
          ))}
        </div>
      )
    }

    case 'video': {
      const file = asMedia(block.file)
      const embed = block.url ? videoEmbedURL(block.url) : null
      const src = file?.url ?? (!embed ? block.url : null)
      return (
        <figure className="block video">
          {embed ? (
            <iframe
              src={embed}
              title={block.caption ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : src ? (
            <video src={src} controls playsInline preload="metadata" />
          ) : null}
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )
    }

    case 'stats':
      return (
        <section className="block stats">
          {block.title && <h3 className="block-title">{block.title}</h3>}
          <dl>
            {(block.items ?? []).map((item) => (
              <div key={item.id ?? item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
                {item.note && <dd className="stat-note">{item.note}</dd>}
              </div>
            ))}
          </dl>
        </section>
      )

    case 'table':
      return (
        <figure className="block results-table">
          {block.title && <h3 className="block-title">{block.title}</h3>}
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(block.rows ?? []).map((row) => (
                  <tr key={row.id} className={row.highlight ? 'is-highlight' : undefined}>
                    {row.cells.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )

    case 'chart':
      return <Chart {...block} />

    case 'code':
      return (
        <figure className="block code">
          <pre data-language={block.language ?? undefined}>
            <code>{block.code}</code>
          </pre>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )

    case 'hardware':
      return (
        <section className="block hardware">
          {block.title && <h3 className="block-title">{block.title}</h3>}
          <ul>
            {(block.items ?? []).map((item) => (
              <li key={item.id ?? item.name}>
                <span className="hw-name">
                  {item.name}
                  {item.quantity && item.quantity > 1 ? <span className="hw-qty"> × {item.quantity}</span> : null}
                </span>
                {item.role && <span className="hw-role">{item.role}</span>}
              </li>
            ))}
          </ul>
        </section>
      )

    case 'embed':
      return (
        <figure className="block embed">
          <iframe
            src={block.url}
            title={block.caption ?? 'Live demo'}
            style={{ height: block.height ?? 520 }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          <figcaption>
            {block.caption}{' '}
            <a href={block.url} target="_blank" rel="noopener">
              Open in a new tab ↗
            </a>
          </figcaption>
        </figure>
      )

    default:
      return null
  }
}

export function RenderBlocks({ blocks }: { blocks: LayoutBlock[] | null | undefined }) {
  if (!blocks?.length) return null
  return (
    <div className="blocks">
      {blocks.map((block, i) => (
        <Block key={block.id ?? i} block={block} />
      ))}
    </div>
  )
}
