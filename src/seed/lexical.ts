// Minimal builders for Lexical rich-text JSON, so seed content can be written as plain strings.

const text = (value: string) => ({
  type: 'text',
  text: value,
  format: 0,
  mode: 'normal',
  style: '',
  detail: 0,
  version: 1,
})

const base = { format: '' as const, indent: 0, version: 1, direction: 'ltr' as const }

export const p = (value: string) => ({ ...base, type: 'paragraph', textFormat: 0, children: [text(value)] })

export const h = (tag: 'h2' | 'h3', value: string) => ({ ...base, type: 'heading', tag, children: [text(value)] })

export const ul = (items: string[]) => ({
  ...base,
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((item, i) => ({ ...base, type: 'listitem', value: i + 1, children: [text(item)] })),
})

type Node = ReturnType<typeof p> | ReturnType<typeof h> | ReturnType<typeof ul>

export const doc = (...children: Node[]) => ({
  root: { ...base, type: 'root', children },
})

/** A project-page text block. */
export const textBlock = (...children: Node[]) => ({ blockType: 'text' as const, content: doc(...children) })
