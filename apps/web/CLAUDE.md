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

`apps/web` is a Next.js App Router site (Next 16, React 19) for "Aura", a bilingual (`en`/`es`) real-estate marketing site built with **next-intl**.

- **i18n** (`i18n/`, `messages/`, `proxy.ts`): every route lives under `app/[locale]/` and every URL carries its locale (`localePrefix: "always"`), so `/` redirects to `/en`. `i18n/routing.ts` is the single place that defines locales and the **default locale `en`** (plus `HTML_LANG`/`OG_LOCALE` tag maps); `i18n/navigation.ts` re-exports locale-aware `Link`/`usePathname`/`useRouter`/`getPathname` — **import those, never `next/link` or `next/navigation`**, or links lose their prefix. `i18n/request.ts` loads `messages/<locale>.json`, `i18n/metadata.ts` builds canonical + hreflang (`alternatesFor`), and `i18n/params.ts` (`toLocale`) narrows the raw `params.locale` string and 404s on anything unknown. `proxy.ts` (Next 16's rename of `middleware.ts`) runs `createMiddleware(routing)`. Server components read copy with `await getTranslations(ns)`, client components with `useTranslations(ns)`; every page calls `setRequestLocale(locale)` so it stays statically rendered. UI copy belongs in `messages/{en,es}.json` — never inline in JSX.
- **Data layer**: `app/data.ts` is the single source of truth for content — no database or CMS is wired up yet (the `cms` app/Postgres in the monorepo are separate and not currently consumed by `web`). Locale-independent fields (id, price, beds, baths, sqm, agent, name, email) live once per record; translated fields sit under `content: { en, es }`, and `getProperties(locale)` / `getTeam(locale)` / `getPropertyById(id, locale)` / `getAgent(property, locale)` flatten a record into the `Property`/`TeamMember` shape the components consume. `PROPERTY_IDS` feeds `generateStaticParams`; `fmtPrice` (USD/MXN) and `bucketOf` (price bucketing for filters) are locale-independent. When adding a translated field, add it to the `content` objects of **both** locales.
- **GraphQL client** (`graphql/`): scaffolding for consuming the `cms` app, **not wired into any page yet** — `app/data.ts` is still what the routes read. `graphql/index.ts` exports the `graphql()` tagged template (gql.tada — query result/variable types are inferred from `graphql/schema.graphql` at typecheck time, so there are no per-query generated files); `graphql/client.ts` exports `strapi(document, variables?, cache?)`, a server-only `fetch` wrapper (`next.revalidate` defaults to 1h, every request tagged `strapi`). `graphql/schema.graphql` + `graphql/env.d.ts` are generated and committed so `tsc` works without the CMS running — refresh both with `pnpm graphql:schema` after changing content types in `apps/cms` (needs the CMS up on `STRAPI_URL`, default `http://localhost:1337`). Both files are excluded from Biome. Config lives in `tsconfig.json` under the `@0no-co/graphqlsp` plugin, which also powers autocompletion inside `graphql(...)`. Env: `STRAPI_URL`, plus `STRAPI_TOKEN` only if the collections stop being publicly readable. Note Strapi 5 identifies entries by `documentId` (string), not the numeric `id`, and every localized query takes a `locale: I18NLocaleCode` argument.
- **Routes** (`app/[locale]/`): `/` (page.tsx), `/propiedades` (server page + `PropertiesBrowser.tsx`, the client component holding the city/type/price/beds filters), `/propiedades/[id]` (detail page, statically generated for every locale × property), `/equipo` (team), `/contacto` (contact). Route segments stay in Spanish for both locales — there is no `pathnames` translation config. `app/robots.ts`, `app/sitemap.ts`, `app/data.ts` and `app/site-config.ts` stay outside `[locale]`.
- **SEO/metadata**: `app/site-config.ts` exports `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, defaults to `https://www.aura.mx`) and `SITE_NAME`. Titles/descriptions come from the `Metadata.*` namespaces in the message files via `generateMetadata`; `app/[locale]/layout.tsx` sets `metadataBase` and the OG/Twitter defaults, `app/[locale]/propiedades/[id]/page.tsx` builds a ~157-char description from specs + truncated property description, and `app/sitemap.ts` emits one entry per locale × route with `alternates.languages`. Add `alternatesFor(pathname, locale)` to every new page's metadata so canonical and hreflang stay correct.
- **Images**: All property/agent imagery currently points at the single `public/placeholder.svg` — there's no real image pipeline yet.
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), no `tailwind.config` — theme tokens live in `app/globals.css`. Styling is done with inline hex/arbitrary-value utility classes (e.g. `bg-[#f6f2ea]`, `text-[#a9834f]`) rather than a design-token/theme layer — match this convention rather than introducing new named colors. Two font families are loaded via `next/font/google` and exposed as CSS vars: `--font-cormorant` (Cormorant Garamond, used for headings) and `--font-manrope` (Manrope, body/default).
- **Linting/formatting**: Biome (not ESLint/Prettier) — config in `biome.json`, 2-space indent, import organization on save/check, `next`/`react` rule domains enabled.
- **Path alias**: `@/*` maps to `apps/web/*` (see `tsconfig.json`).

## Commits
Follow the repo-wide `commit` skill (`.claude/skills/commit/SKILL.md` at the monorepo root) when creating commits.

## Skills

`.claude/skills/` and `.agents/skills/` contain installed skill packs (tracked in `skills-lock.json`): `seo-audit` (technical SEO diagnostics), `vercel-composition-patterns` (React composition — avoid boolean-prop proliferation, prefer compound components/explicit variants), and `vercel-react-best-practices` (Next.js/React 19 performance and correctness rules covering async, bundling, rendering, and re-render optimization). Consult the relevant skill's `SKILL.md`/`rules/*.md` before large component refactors or SEO-related changes in this app.
