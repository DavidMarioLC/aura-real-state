import Image from "next/image";
import Link from "next/link";
import { fmtPrice, type Property } from "../data";

export default function PropertyCard({
  property,
  imageHeight = 280,
  titleSize = "text-2xl",
  showSpecs = false,
}: {
  property: Property;
  imageHeight?: number;
  titleSize?: string;
  showSpecs?: boolean;
}) {
  return (
    <Link href={`/propiedades/${property.id}`} className="flex flex-col">
      <div
        className="relative w-full overflow-hidden bg-[#e8dfce]"
        style={{ height: imageHeight }}
      >
        <Image
          src="/placeholder.svg"
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="pt-5 pr-1 pb-0 pl-1">
        <p className="mb-2 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
          {property.type} · {property.city}
        </p>
        <h3
          className={`mb-2 font-[family-name:var(--font-cormorant)] font-medium ${titleSize}`}
        >
          {property.title}
        </h3>
        {showSpecs && (
          <p className="mb-2 text-sm text-[#4a473f]">
            {property.beds} hab · {property.baths} baños · {property.sqm} m²
          </p>
        )}
        <p className="text-base font-bold">{fmtPrice(property.price)}</p>
      </div>
    </Link>
  );
}
