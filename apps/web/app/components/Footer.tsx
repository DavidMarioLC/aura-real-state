import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#201f1c] px-12 pt-16 pb-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3.5 font-[family-name:var(--font-cormorant)] text-[26px] tracking-[3px] text-[#f6f2ea]">
            AURA
          </div>
          <div className="max-w-[280px] text-sm leading-relaxed text-[#a89f8c]">
            Bienes raíces de autor. Selección curada de residencias, villas y
            penthouses.
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
            Navegación
          </div>
          <div className="flex flex-col gap-2.5 text-sm text-[#e8dfce]">
            <Link href="/">Inicio</Link>
            <Link href="/propiedades">Propiedades</Link>
            <Link href="/equipo">Equipo</Link>
            <Link href="/contacto">Contáctanos</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
            Contacto
          </div>
          <div className="flex flex-col gap-2.5 text-sm text-[#e8dfce]">
            <div>hola@aura.mx</div>
            <div>+52 55 4321 0000</div>
          </div>
        </div>
        <div>
          <div className="mb-4 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
            Oficina
          </div>
          <div className="text-sm leading-relaxed text-[#e8dfce]">
            Av. Presidente Masaryk 111
            <br />
            Polanco, CDMX
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-[1400px] border-t border-[#f6f2ea]/12 pt-6 text-xs text-[#a89f8c]">
        © 2026 Aura Bienes Raíces. Todos los derechos reservados.
      </div>
    </div>
  );
}
