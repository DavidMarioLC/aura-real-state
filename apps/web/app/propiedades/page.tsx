"use client";

import { useMemo, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { bucketOf, PROPERTIES } from "../data";

const PRICE_BUCKETS = [
  { value: "all", label: "Precio: cualquiera" },
  { value: "b1", label: "Hasta $900,000" },
  { value: "b2", label: "$900,000 – $1.5M" },
  { value: "b3", label: "$1.5M – $2.5M" },
  { value: "b4", label: "Más de $2.5M" },
];

const BED_OPTIONS = [
  { value: "all", label: "Habitaciones: todas" },
  { value: "2", label: "2+ habitaciones" },
  { value: "3", label: "3+ habitaciones" },
  { value: "4", label: "4+ habitaciones" },
  { value: "5", label: "5+ habitaciones" },
];

const DEFAULT_FILTERS = {
  city: "all",
  type: "all",
  priceBucket: "all",
  beds: "all",
};

export default function PropertiesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const cities = useMemo(() => [...new Set(PROPERTIES.map((p) => p.city))], []);
  const types = useMemo(() => [...new Set(PROPERTIES.map((p) => p.type))], []);

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
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
  }, [filters]);

  const resultsLabel =
    filtered.length +
    (filtered.length === 1
      ? " propiedad encontrada"
      : " propiedades encontradas");

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-20 pb-10 lg:px-16">
        <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
          Portafolio
        </p>
        <h1 className="mb-3 font-[family-name:var(--font-cormorant)] text-[44px] font-medium">
          Propiedades
        </h1>
        <p className="max-w-[600px] text-base text-[#4a473f]">
          Explora nuestra selección vigente, filtrada por ubicación, tipo,
          precio y habitaciones.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-[81px] z-50 flex flex-wrap items-center gap-4 border-t border-b border-[#201f1c]/10 bg-[#efe8db] px-8 py-5 lg:px-16">
        <select
          value={filters.city}
          onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
          className="min-w-[170px] border border-[#201f1c]/20 bg-white px-4 py-3 font-inherit text-sm text-[#201f1c]"
        >
          <option value="all">Ubicación: todas</option>
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
          <option value="all">Tipo: todos</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
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
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <select
          value={filters.beds}
          onChange={(e) => setFilters((f) => ({ ...f, beds: e.target.value }))}
          className="min-w-[150px] border border-[#201f1c]/20 bg-white px-4 py-3 font-inherit text-sm text-[#201f1c]"
        >
          {BED_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <div className="ml-auto text-sm text-[#4a473f]">{resultsLabel}</div>
        <button
          type="button"
          onClick={() => setFilters(DEFAULT_FILTERS)}
          className="cursor-pointer border-b-2 border-[#a9834f] pb-0.5 text-[13px] font-bold text-[#201f1c]"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="mx-auto max-w-[1400px] px-8 pt-14 pb-30 lg:px-16">
        <h2 className="sr-only">Resultados de propiedades</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              imageHeight={260}
              titleSize="text-[23px]"
              showSpecs
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-20 text-center text-base text-[#4a473f]">
            Ninguna propiedad coincide con estos filtros. Prueba ajustando la
            búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
