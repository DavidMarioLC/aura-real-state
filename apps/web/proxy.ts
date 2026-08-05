import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 renamed the `middleware` convention to `proxy`; next-intl's factory is
// unchanged. It resolves the locale and redirects unprefixed URLs (`/` → `/en`).
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and anything with a file extension
  // (`favicon.ico`, `robots.txt`, `sitemap.xml`, files under `public/`).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
