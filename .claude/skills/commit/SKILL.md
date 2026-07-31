---
name: commit
description: Create a git commit in this repo following its conventions. Use whenever the user asks to commit work — "haz commit", "commitea esto", "commit these changes", "guarda los cambios en git", "make a commit" — or asks to commit as part of a larger task. Covers choosing the conventional-commit type and scope, deciding what to stage, and which files are noise that must stay out.
metadata:
  version: 1.0.0
---

# Commit

Create commits that match this repo's history. Read `git log --oneline -15` first — the log is the source of truth for style; this file explains the parts the log alone doesn't show.

## Message format

```
type(scope): subject

optional body explaining why

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

**Type** — `feat`, `fix`, `docs`, `refactor`, `chore`, `test`, `build`, `ci`.

**Scope** — the app the change lives in:

| Change touches | Scope |
|---|---|
| `apps/cms/**` | `cms` |
| `apps/web/**` | `web` |
| `packages/**` | the package name |
| Root config, tooling, docker, turbo, MCP | none — `feat: add strapi-docs MCP server config` |
| More than one app | prefer splitting into separate commits; if truly inseparable, drop the scope |

**Subject** — English, imperative mood, lowercase after the colon, no trailing period, ≤72 chars. Say what the change does, not what you did: `add property and agent content-types`, not `added` or `I added`.

**Body** — only when the *why* isn't obvious from the diff. Explain the reasoning or the tradeoff, wrapped at 72 columns. Skip it for self-evident changes. Never narrate the process ("first I tried…").

The `Co-Authored-By` trailer goes on every commit you create.

## Choosing what to stage

Never `git add -A` or `git add .` — this repo accumulates churn that must not be committed.

1. `git status --short` and `git diff` to see everything in flight.
2. Separate *your* change from unrelated modifications that were already dirty when you started. Commit only what belongs to the task at hand, and tell the user what you left behind.
3. Stage explicit paths: `git add apps/cms/src/api/home-page apps/cms/src/index.ts`.
4. `git diff --staged --stat` to confirm before committing.

### Files that stay out

- **`apps/cms/.strapi-updater.json`** — the Strapi updater rewrites it on its own. Never commit it unless updating Strapi *is* the change.
- **`.env`**, any real secrets. `.env.example` is fine.
- **`.DS_Store`**, editor scratch files.

### Files that go in

- **`apps/cms/types/generated/*.d.ts`** — Strapi regenerates these when the dev server reloads a schema. They are tracked, and they belong in the *same* commit as the schema change that produced them. If a single generated file mixes two logical changes, one combined commit beats contorting the split.

## Scope of one commit

One logical change per commit. A new content-type plus the bootstrap permission that exposes it is one change. A new content-type plus an unrelated CSS fix is two.

When the work genuinely splits, make several commits rather than one omnibus — but don't split so finely that a commit leaves the repo broken.

## Branch and push

This repo commits directly to `main`; that is the working branch, not a protected one. Do not create a branch unless the user asks.

**Never push.** Only commit. Push only when the user explicitly asks for it in that turn.

## Reporting back

State the short hash and the subject line. Mention anything you deliberately left unstaged and why. Don't paste the full diff back.
