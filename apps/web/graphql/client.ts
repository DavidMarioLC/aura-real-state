import type { TadaDocumentNode } from "gql.tada";
import { type DocumentNode, print } from "graphql";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

/** Next's fetch cache options — pass `{ revalidate: 0 }` to opt a query out. */
type CacheOptions = { revalidate?: number | false; tags?: string[] };

const printed = new WeakMap<object, string>();

function toQuery(document: DocumentNode): string {
  const cached = printed.get(document);
  if (cached) return cached;
  const query = print(document);
  printed.set(document, query);
  return query;
}

/**
 * Runs a `graphql(...)` document against the Strapi GraphQL endpoint.
 * Server-only: the token must never reach the client bundle.
 */
export async function strapi<Result, Variables>(
  document: TadaDocumentNode<Result, Variables>,
  variables?: Variables,
  cache: CacheOptions = {},
): Promise<Result> {
  const res = await fetch(`${STRAPI_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    body: JSON.stringify({ query: toQuery(document), variables }),
    next: {
      revalidate: cache.revalidate ?? 3600,
      tags: ["strapi", ...(cache.tags ?? [])],
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi GraphQL responded ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as {
    data?: Result;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Strapi GraphQL returned no data");
  }

  return json.data;
}
