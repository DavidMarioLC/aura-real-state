import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./env";

/**
 * Tagged template for every Strapi query. Types are inferred from
 * `schema.graphql` at typecheck time — there is nothing to generate per query.
 */
export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    ID: string;
    DateTime: string;
    JSON: unknown;
    I18NLocaleCode: string;
  };
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
