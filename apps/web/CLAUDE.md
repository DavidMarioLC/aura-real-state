# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Run from `apps/web/` (or via `pnpm --filter web <script>` / `turbo run <script>` from the repo root):

- `pnpm dev` — start the Next.js dev server (turbopack, port 3000)
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — Biome check (lint + format check)
- `pnpm format` — Biome write (auto-fix formatting)

There is no test runner configured in this app.

From the monorepo root: `pnpm dev` / `pnpm build` / `pnpm lint` run the equivalent Turbo pipeline across all workspace packages. `pnpm db:up` / `pnpm db:down` start/stop the local Postgres (used by the `cms` app, not `web`).

## Architecture

`apps/web` is a Next.js App Router site (Next 16, React 19) for "Aura", a Spanish-language (`lang="es"`) real-estate marketing site. All UI copy is in Spanish.

- **Data layer**: `app/data.ts` is the single source of truth for content — no database or CMS is wired up yet (the `cms` app/Postgres in the monorepo are separate and not currently consumed by `web`). It defines the `Property` and `TeamMember` types, static `PROPERTIES`/`TEAM` arrays, and helpers used across pages: `fmtPrice` (USD/MXN formatting), `bucketOf` (price-range bucketing for filters), `getPropertyById`, `getAgent`. When adding property/team fields, update this file's types and every consumer (property list, detail page, cards).
- **Routes** (`app/`): `/` (page.tsx), `/propiedades` (listing with client-side filtering by city/type/price bucket/beds), `/propiedades/[id]` (detail page, statically generated via `generateStaticParams` from `PROPERTIES`), `/equipo` (team), `/contacto` (contact). Property detail and listing pages both render `PropertyCard`.
- **SEO/metadata**: `app/site-config.ts` exports `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, defaults to `https://www.aura.mx`) and `SITE_NAME`, used by `app/layout.tsx` (root metadata/OG/Twitter defaults), `app/propiedades/[id]/page.tsx` (`generateMetadata` builds a ~157-char description from specs + truncated property description), `app/robots.ts`, and `app/sitemap.ts` (enumerates static routes + one entry per property).
- **Images**: All property/agent imagery currently points at the single `public/placeholder.svg` — there's no real image pipeline yet.
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), no `tailwind.config` — theme tokens live in `app/globals.css`. Styling is done with inline hex/arbitrary-value utility classes (e.g. `bg-[#f6f2ea]`, `text-[#a9834f]`) rather than a design-token/theme layer — match this convention rather than introducing new named colors. Two font families are loaded via `next/font/google` and exposed as CSS vars: `--font-cormorant` (Cormorant Garamond, used for headings) and `--font-manrope` (Manrope, body/default).
- **Linting/formatting**: Biome (not ESLint/Prettier) — config in `biome.json`, 2-space indent, import organization on save/check, `next`/`react` rule domains enabled.
- **Path alias**: `@/*` maps to `apps/web/*` (see `tsconfig.json`).

## Commits
Always delegate commit creation to the `committer` subagent — do not write commit messages directly in the main session.

## Skills

`.claude/skills/` and `.agents/skills/` contain installed skill packs (tracked in `skills-lock.json`): `seo-audit` (technical SEO diagnostics), `vercel-composition-patterns` (React composition — avoid boolean-prop proliferation, prefer compound components/explicit variants), and `vercel-react-best-practices` (Next.js/React 19 performance and correctness rules covering async, bundling, rendering, and re-render optimization). Consult the relevant skill's `SKILL.md`/`rules/*.md` before large component refactors or SEO-related changes in this app.
