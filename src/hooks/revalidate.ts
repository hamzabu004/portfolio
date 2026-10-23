import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

// Public pages are pre-rendered. Any content edit re-renders the whole site, which is
// cheap for a portfolio and avoids tracking which pages reference which documents.
function revalidateSite(context: Record<string, unknown>) {
  if (context.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Outside a Next.js request (e.g. the seed script) there is nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req.context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context)
  return doc
}

export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
}
