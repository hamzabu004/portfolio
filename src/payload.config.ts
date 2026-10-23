import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Activities } from './collections/Activities'
import { Albums } from './collections/Albums'
import { Experience } from './collections/Experience'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Publications } from './collections/Publications'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Media goes to Cloudflare R2 (S3-compatible) when its credentials are present;
// otherwise uploads are written to ./media on local disk for development.
const useR2 = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID)
const mediaPublicURL = process.env.MEDIA_PUBLIC_URL?.replace(/\/$/, '')

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Portfolio admin',
    },
  },
  collections: [Projects, Experience, Publications, Activities, Posts, Albums, Media, Users],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Schema changes are pushed automatically in development; production uses migrations.
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: useR2,
      collections: {
        media: mediaPublicURL
          ? {
              // Serve files straight from the bucket's public URL instead of proxying through Vercel.
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) =>
                [mediaPublicURL, prefix, filename].filter(Boolean).join('/'),
            }
          : true,
      },
      bucket: process.env.S3_BUCKET || '',
      // Uploads go from the browser straight to R2, bypassing Vercel's 4.5 MB request limit.
      clientUploads: true,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
