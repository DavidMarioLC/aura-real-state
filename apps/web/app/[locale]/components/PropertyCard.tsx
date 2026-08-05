import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PropertySummary } from "@/cms/properties";
import { Link } from "@/i18n/navigation";
import { fmtPrice } from "../../data";

export default function PropertyCard({
  property,
  imageHeight = 280,
  titleSize = "text-2xl",
  showSpecs = false,
}: {
  property: PropertySummary;
  imageHeight?: number;
  titleSize?: string;
  showSpecs?: boolean;
}) {
  const t = useTranslations("PropertyCard");
  const tType = useTranslations("PropertyType");

  return (
    <Link href={`/propiedades/${property.slug}`} className="flex flex-col">
      <div
        className="relative w-full overflow-hidden bg-[#e8dfce]"
        style={{ height: imageHeight }}
      >
        <Image
          src={property.image.url}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="pt-5 pr-1 pb-0 pl-1">
        <p className="mb-2 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
          {tType(property.type)} · {property.city}
        </p>
        <h3
          className={`mb-2 font-[family-name:var(--font-cormorant)] font-medium ${titleSize}`}
        >
          {property.title}
        </h3>
        {showSpecs && (
          <p className="mb-2 text-sm text-[#4a473f]">
            {t("specs", {
              beds: property.beds,
              baths: property.baths,
              sqm: property.sqm,
            })}
          </p>
        )}
        <p className="text-base font-bold">{fmtPrice(property.price)}</p>
      </div>
    </Link>
  );
}
