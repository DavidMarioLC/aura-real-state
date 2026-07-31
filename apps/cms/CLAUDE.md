# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run from `apps/cms/` (or via `pnpm --filter cms <script>` / `turbo run <script>` from the repo root):

- `pnpm dev` / `pnpm develop` — start Strapi with autoReload (admin panel at `http://localhost:1337/admin`)
- `pnpm start` — run Strapi with autoReload disabled (production mode)
- `pnpm build` — build the admin panel
- `pnpm console` — open the Strapi console (REPL with app context)
- `pnpm strapi <command>` — run any Strapi CLI command (e.g. `pnpm strapi generate` to scaffold a content-type/API/controller)
- `pnpm upgrade`, `pnpm upgrade:dry` — upgrade Strapi to latest (dry-run first)

There is no lint or test script configured in this app (unlike `apps/web`).

From the monorepo root: `pnpm db:up` / `pnpm db:down` start/stop the local Postgres container this app uses (`docker compose up -d db`). Start it before running `pnpm dev` against Postgres.

## Architecture

`apps/cms` is a [Strapi 5](https://docs.strapi.io) headless CMS instance holding the content model for the Aura site: `property`, `agent` and `home-page`. It is **not** wired up as a data source for `apps/web` yet — `web` still sources content from its own static `app/data.ts`, and has no i18n routing. Connecting the two is the open work.

- **Config** (`config/*.ts`), each exporting a function of `({ env }) => ...`:
  - `database.ts` — client selected via `DATABASE_CLIENT` env var (`postgres`, `mysql`, or `sqlite`, defaults to `sqlite`); connection details for each client are read from `DATABASE_*` env vars. Postgres uses `DATABASE_URL` as a connection string with individual `DATABASE_HOST`/`PORT`/etc. as fallbacks.
  - `server.ts` — host/port and `APP_KEYS`; the Strapi MCP server is enabled here (`mcp.enabled: true`), which is what powers the `strapi-docs` MCP entry in `.mcp.json`.
  - `admin.ts` — admin panel secrets (JWT, API token salt, transfer token salt, encryption key), all required env vars (non-null asserted).
  - `api.ts` — REST defaults: `defaultLimit: 25`, `maxLimit: 100`, `withCount: true`, `strictParams: true` on both REST and Documents API.
  - `plugins.ts` — `users-permissions` config (refresh-token JWT management, httpOnly sessions) and `upload` configured with the **Cloudinary** provider (`CLOUDINARY_NAME`/`KEY`/`SECRET`, folder from `CLOUDINARY_FOLDER`, defaults to `projects/aura-real-state`) plus media-type allow/deny lists (denies executables like `.exe`/`.sh`/Mach-O binaries). GraphQL is installed (`@strapi/plugin-graphql`) and exposed at `/graphql`.
  - `middlewares.ts` — the standard Strapi middleware chain (logger, errors, security, cors, body, session, etc.); no custom middleware added yet.
- **Content-types**: created via `pnpm strapi generate` or the admin UI; land under `src/api/<name>/`. Generated TypeScript types for content-types/components are written to `types/generated/contentTypes.d.ts` / `types/generated/components.d.ts` — regenerate these (via `strapi develop`) after schema changes rather than hand-editing. They are tracked in git and belong in the same commit as the schema change that produced them.
- **`src/index.ts`** — `register` is a no-op; `bootstrap` seeds **configuration that lives in the DB rather than the repo**, so every environment boots identically: the `en`/`es` locales (with `en` as default) and the public-role permissions listed in `PUBLIC_ACTIONS`. Add a new content-type's `find`/`findOne` here when `apps/web` needs to read it anonymously. Both loops are idempotent — they skip what already exists.
- **`src/admin/`** — customization entry points for the admin panel UI (`app.example.tsx`, `vite.config.example.ts`); rename/uncomment to activate.
- **Env**: copy `.env.example` to `.env` and replace all `tobeModified`/`toBeModified` placeholders (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`) with real secrets before running.
- **TypeScript**: `tsconfig.json` compiles to CommonJS/ES2019, `strict: true`, output to `dist/`; excludes `src/admin/` and `src/plugins/` from the server compilation.

## Content model

All three content-types use `draftAndPublish` and are i18n-localized, with locales `en` and `es`. Per-field localization is set via `pluginOptions.i18n.localized`.

- **`property`** (collection) — explicitly localized: `title`, `slug` (uid from title), `description`, and the repeatable `shared.amenity` component. `agent` is a `manyToOne` relation. The remaining fields (`city`, `type` — enum house/villa/apartment/penthouse —, `price`, `beds`, `baths`, `sqm`, `images`) carry **no explicit i18n config**; their `en`/`es` values happen to match today, but the intent isn't recorded in the schema. Set `localized` explicitly on them when you next touch this type.
- **`agent`** (collection) — explicitly localized: `role`, `bio`. `name`, `email` and `photo` have no explicit config (same caveat). `properties` is the `oneToMany` inverse of `property.agent`.

Be explicit on every new field rather than relying on defaults — it's the difference between a decision and an accident.
- **`home-page`** (single type) — the site home, modeled as **fixed component fields, not a dynamic zone**: `hero`, `philosophy`, `stats` (repeatable), `featuredHeading`, `cta`. The home has a fixed section order and each section has its own layout, so fixed fields keep the generated types exact and let the front render without switching on `__component`. Use a dynamic zone only if the sections ever need to be reordered by an editor.

Components live in `src/components/`: `shared.link` (label + href, reused by hero/philosophy/cta), `shared.amenity`, and the `sections.*` components above.

### Featured properties

`home-page.featuredProperties` is a **many-way relation** (`oneToMany` with no `mappedBy`) to `property`, deliberately **not localized**:

- Many-way means no inverse field appears on `Property`, so the editor's property form stays clean.
- Non-localized means the curation is done once; Strapi 5 relations point to documents, so populating under `?locale=es` returns the Spanish version of the same entries.
- It replaced a `featured` boolean that used to live on `property`. **Do not reintroduce that boolean** — a flag can't express *order*, and the home renders an ordered, fixed number of cards. The relation does both, and keeps the decision in the page that renders it.

### i18n

Locales are `en` (default) and `es`, seeded in `bootstrap`. Note the open decision: **the default locale is `en` while all site copy is Spanish**, so once `apps/web` has locale routing, `/` would serve English. Revisit `DEFAULT_LOCALE_CODE` in `src/index.ts` before building those routes.

### Seeding

`bootstrap` seeds *configuration* (locales, permissions) only. **Editorial content is created by hand in the admin**, not seeded — the client edits it, and a bootstrap seed running on every boot would overwrite their changes. The existing properties and agents were entered manually; follow that.

## Commits
Follow the repo-wide `commit` skill (`.claude/skills/commit/SKILL.md` at the monorepo root) when creating commits.
