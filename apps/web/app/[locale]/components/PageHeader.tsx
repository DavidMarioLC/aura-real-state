import type { CmsPageHeader } from "@/cms/types";

/**
 * The eyebrow/title/intro block that opens `/propiedades`, `/equipo` and
 * `/contacto`. Only `title` is required in Strapi, so the other two render
 * conditionally. `className` carries the bottom spacing, which depends on what
 * follows the header — the filter bar sits tighter than a plain grid.
 */
export default function PageHeader({
  header,
  className,
}: {
  header: CmsPageHeader;
  className: string;
}) {
  return (
    <div className={`mx-auto max-w-[1400px] px-8 pt-20 lg:px-16 ${className}`}>
      {header.eyebrow && (
        <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
          {header.eyebrow}
        </p>
      )}
      <h1 className="mb-3 font-[family-name:var(--font-cormorant)] text-[44px] font-medium">
        {header.title}
      </h1>
      {header.intro && (
        <p className="max-w-[620px] text-base text-[#4a473f]">{header.intro}</p>
      )}
    </div>
  );
}
