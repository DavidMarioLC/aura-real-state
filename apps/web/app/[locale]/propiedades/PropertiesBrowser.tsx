"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { PropertySummary } from "@/cms/properties";
import { bucketOf } from "../../data";
import PropertyCard from "../components/PropertyCard";

const PRICE_BUCKETS = ["all", "b1", "b2", "b3", "b4"] as const;
const BED_OPTIONS = ["all", "2", "3", "4", "5"] as const;

const PRICE_LABEL_KEYS = {
  all: "priceAll",
  b1: "priceB1",
  b2: "priceB2",
  b3: "priceB3",
  b4: "priceB4",
} as const;

const DEFAULT_FILTERS = {
  city: "all",
  type: "all",
  priceBucket: "all",
  beds: "all",
};

export default function PropertiesBrowser({
  properties,
}: {
  properties: PropertySummary[];
}) {
  const t = useTranslations("Properties");
  const tType = useTranslations("PropertyType");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const cities = useMemo(
    () => [...new Set(properties.map((p) => p.city))],
    [properties],
  );
  const types = useMemo(
    () => [...new Set(properties.map((p) => p.type))],
    [properties],
  );

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city !== "all" && p.city !== filters.city) return false;
      if (filters.type !== "all" && p.type !== filters.type) return false;
      if (
        filters.priceBucket !== "all" &&
        bucketOf(p.price) !== filters.priceBucket
      )
        return false;
      if (filters.beds !== "all" && p.beds < Number.parseInt(filters.beds, 10))
        return false;
      return true;
    });
  }, [filters, properties]);

  return (
    <>
      {/* FILTER BAR */}
      <div className="sticky top-[81px] z-50 flex flex-wrap items-center gap-4 border-t border-b border-[#201f1c]/10 bg-[#efe8db] px-8 py-5 lg:px-16">
        <select
          value={filters.city}
          onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
          className="min-w-[170px] border border-[#201f1c]/20 bg-white px-4 py-3 font-inherit text-sm text-[#201f1c]"
        >
          <option value="all">{t("cityAll")}</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          className="min-w-[150px] border border-[#201f1c]/20 bg-white px-4 py-3 font-inherit text-sm text-[#201f1c]"
        >
          <option value="all">{t("typeAll")}</option>
          {types.map((ty) => (
            <option key={ty} value={ty}>
              {tType(ty)}
            </option>
          ))}
        </select>
        <select
          value={filters.priceBucket}
          onChange={(e) =>
            setFilters((f) => ({ ...f, priceBucket: e.target.value }))
          }
          className="min-w-[170px] border border-[#201f1c]/20 bg-white px-4 py-3 font-inherit text-sm text-[#201f1c]"
        >
          {PRICE_BUCKETS.map((b) => (
            <option key={b} value={b}>
              {t(PRICE_LABEL_KEYS[b])}
            </option>
          ))}
        </select>
        <select
          value={filters.beds}
          onChange={(e) => setFilters((f) => ({ ...f, beds: e.target.value }))}
          className="min-w-[150px] border border-[#201f1c]/20 bg-white px-4 py-3 font-inherit text-sm text-[#201f1c]"
        >
          {BED_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b === "all"
                ? t("bedsAll")
                : t("bedsMin", { count: Number.parseInt(b, 10) })}
            </option>
          ))}
        </select>
        <div className="ml-auto text-sm text-[#4a473f]">
          {t("results", { count: filtered.length })}
        </div>
        <button
          type="button"
          onClick={() => setFilters(DEFAULT_FILTERS)}
          className="cursor-pointer border-b-2 border-[#a9834f] pb-0.5 text-[13px] font-bold text-[#201f1c]"
        >
          {t("clearFilters")}
        </button>
      </div>

      <div className="mx-auto max-w-[1400px] px-8 pt-14 pb-30 lg:px-16">
        <h2 className="sr-only">{t("resultsHeading")}</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard
              key={p.slug}
              property={p}
              imageHeight={260}
              titleSize="text-[23px]"
              showSpecs
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-20 text-center text-base text-[#4a473f]">
            {t("empty")}
          </div>
        )}
      </div>
    </>
  );
}
