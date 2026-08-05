import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware replacements for `next/link` and `next/navigation`. Import these
// instead of the Next.js originals so hrefs keep their locale prefix.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
