# Portfolio

Hamza Tariq's portfolio: **Next.js 16 + Payload CMS 3**, with an admin panel at `/admin` for editing
everything (projects, experience, research, activities, blog posts, photo albums, site settings) without
touching code.

| Piece | Where it runs (free tier) |
|---|---|
| Code | GitHub |
| Site + admin | Vercel (Hobby) |
| Database | Neon Postgres |
| Images / files | Cloudflare R2 |

## Local development

Requires Node 22+, pnpm and Docker.

```bash
pnpm install
cp .env.example .env      # then set PAYLOAD_SECRET (openssl rand -hex 32)
pnpm db:up                # local Postgres in Docker
pnpm seed                 # load content from the knowledge base (only into an empty DB)
pnpm dev                  # http://localhost:3000, admin at /admin
```

Without R2 credentials in `.env`, uploads are stored in `./media` on disk.

## Editing content

Open `/admin` and sign in. On first visit Payload asks you to create the admin account.

- **Projects**: card info on the *Card* tab (cover image, headline results, links), and the project page on
  the *Page* tab, built from blocks: Text, Image/Gallery, Video, Key results, Results table, Chart, Code,
  Hardware list and Live embed. Tick **Featured** to show a project as a card on the home page; **Order**
  controls position (lower first). Projects have drafts: nothing is public until you press **Publish**.
- **Site settings**: bio, portrait, résumé PDF, social links, and the **Sections** tab, which turns
  home-page sections on/off. *Writing* and *Photography* are off until you have content.
- **Posts** / **Albums**: blog and photography. Enable them in Site settings → Sections.

Saving anything re-renders the public pages within seconds; no redeploy needed.

### Linking to your hosted projects

A project's **Links** can point anywhere: a demo you host on Vercel (`fast-papers.vercel.app`), a
Hugging Face Space for an AI demo, a GitHub repo, or a YouTube video. The **Live embed** block shows a
hosted demo inline on the project page.

## Changing the schema

Collections live in `src/collections`, blocks in `src/blocks`. In development the database schema
updates automatically. Before deploying a schema change, create a migration and commit it:

```bash
pnpm migrate:create <name>
```

Vercel runs `payload migrate` before every build (`pnpm run build:prod`).

## Production environment variables (Vercel)

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon pooled connection string |
| `PAYLOAD_SECRET` | random 32+ byte hex string |
| `NEXT_PUBLIC_SERVER_URL` | `https://<your-domain>` |
| `S3_BUCKET` | R2 bucket name |
| `S3_ENDPOINT` | `https://<account-id>.r2.cloudflarestorage.com` |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | R2 API token (Object Read & Write) |
| `MEDIA_PUBLIC_URL` | the bucket's public URL (r2.dev or a custom domain) |

The R2 bucket needs a CORS rule allowing `PUT` from the site origin, because uploads go from the
browser straight to R2 (this avoids Vercel's 4.5 MB request limit).
