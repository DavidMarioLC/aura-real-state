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

`apps/cms` is a [Strapi 5](https://docs.strapi.io) headless CMS instance. It is currently a fresh, unconfigured install — `src/api/` and `src/extensions/` are empty scaffolds with no content-types defined yet. It is **not** wired up as a data source for `apps/web` yet; `web` currently sources content from its own static `app/data.ts`.

- **Config** (`config/*.ts`), each exporting a function of `({ env }) => ...`:
  - `database.ts` — client selected via `DATABASE_CLIENT` env var (`postgres`, `mysql`, or `sqlite`, defaults to `sqlite`); connection details for each client are read from `DATABASE_*` env vars. Postgres uses `DATABASE_URL` as a connection string with individual `DATABASE_HOST`/`PORT`/etc. as fallbacks.
  - `server.ts` — host/port and `APP_KEYS`; the Strapi MCP server is enabled here (`mcp.enabled: true`), which is what powers the `strapi-docs` MCP entry in `.mcp.json`.
  - `admin.ts` — admin panel secrets (JWT, API token salt, transfer token salt, encryption key), all required env vars (non-null asserted).
  - `api.ts` — REST defaults: `defaultLimit: 25`, `maxLimit: 100`, `withCount: true`, `strictParams: true` on both REST and Documents API.
  - `plugins.ts` — `users-permissions` plugin config (refresh-token JWT management, httpOnly sessions) and `upload` plugin media-type allow/deny lists (denies executables like `.exe`/`.sh`/Mach-O binaries).
  - `middlewares.ts` — the standard Strapi middleware chain (logger, errors, security, cors, body, session, etc.); no custom middleware added yet.
- **Content-types**: created via `pnpm strapi generate` or the admin UI; land under `src/api/<name>/`. Generated TypeScript types for content-types/components are written to `types/generated/contentTypes.d.ts` / `types/generated/components.d.ts` — regenerate these (via `strapi develop`) after schema changes rather than hand-editing.
- **`src/index.ts`** — the app's `register`/`bootstrap` lifecycle hooks, currently both no-ops; this is where custom bootstrap logic (seeding, cron jobs, extending core services) would go.
- **`src/admin/`** — customization entry points for the admin panel UI (`app.example.tsx`, `vite.config.example.ts`); rename/uncomment to activate.
- **Env**: copy `.env.example` to `.env` and replace all `tobeModified`/`toBeModified` placeholders (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`) with real secrets before running.
- **TypeScript**: `tsconfig.json` compiles to CommonJS/ES2019, `strict: true`, output to `dist/`; excludes `src/admin/` and `src/plugins/` from the server compilation.

## Commits
Always delegate commit creation to the `committer` subagent — do not write commit messages directly in the main session.
