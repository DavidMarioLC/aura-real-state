"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/equipo", label: "Equipo" },
  { href: "/contacto", label: "Contáctanos" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-[100] flex items-center justify-between border-b border-[#201f1c]/10 bg-[#f6f2ea] px-12 py-5">
      <Link
        href="/"
        className="font-[family-name:var(--font-cormorant)] text-[30px] font-semibold tracking-[4px] text-[#201f1c]"
      >
        AURA
      </Link>
      <div className="hidden items-center gap-10 md:flex">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`border-b-2 pb-1 text-sm font-semibold tracking-[0.5px] ${
              isActive(pathname, link.href)
                ? "border-[#a9834f] text-[#201f1c]"
                : "border-transparent text-[#4a473f]"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contacto"
          className="bg-[#201f1c] px-6 py-3 text-[13px] font-semibold tracking-[0.5px] text-[#f6f2ea]"
        >
          Agenda una visita
        </Link>
      </div>
    </div>
  );
}
