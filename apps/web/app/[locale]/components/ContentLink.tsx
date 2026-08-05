import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Props = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * Renders a CMS-authored href. Site paths go through the locale-aware `Link`
 * so they keep their prefix; `mailto:`, `tel:` and absolute URLs stay plain
 * anchors. Editors store paths without the locale (`/equipo`, not `/es/equipo`).
 */
export default function ContentLink({ href, ...props }: Props) {
  if (!href.startsWith("/")) return <a href={href} {...props} />;

  return <Link href={href} {...props} />;
}
