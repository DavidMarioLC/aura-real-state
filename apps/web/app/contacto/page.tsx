"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submittedName = (formData.get("name") as string) || "gracias";
    setName(submittedName);
    setSubmitted(true);
  }

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-20 pb-15 lg:px-16">
        <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
          Escríbenos
        </p>
        <h1 className="mb-3 font-[family-name:var(--font-cormorant)] text-[44px] font-medium">
          Contáctanos
        </h1>
        <p className="max-w-[620px] text-base text-[#4a473f]">
          Cuéntanos qué estás buscando y un asesor de Aura te contactará en
          menos de 24 horas.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-8 pb-30 lg:grid-cols-[1.2fr_1fr] lg:px-16">
        {submitted ? (
          <div className="flex min-h-[400px] flex-col justify-center bg-[#efe8db] p-14">
            <h2 className="mb-3.5 font-[family-name:var(--font-cormorant)] text-[30px] font-medium">
              Gracias, {name}.
            </h2>
            <p className="text-base leading-loose text-[#4a473f]">
              Hemos recibido tu mensaje. Un asesor de Aura se pondrá en contacto
              contigo muy pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <div className="mb-2 text-xs font-bold tracking-[1px] text-[#4a473f] uppercase">
                Nombre completo
              </div>
              <input
                name="name"
                required
                type="text"
                className="w-full border border-[#201f1c]/20 bg-white px-4 py-3.5 text-[15px]"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-2 text-xs font-bold tracking-[1px] text-[#4a473f] uppercase">
                  Correo
                </div>
                <input
                  name="email"
                  required
                  type="email"
                  className="w-full border border-[#201f1c]/20 bg-white px-4 py-3.5 text-[15px]"
                />
              </div>
              <div>
                <div className="mb-2 text-xs font-bold tracking-[1px] text-[#4a473f] uppercase">
                  Teléfono
                </div>
                <input
                  name="phone"
                  type="tel"
                  className="w-full border border-[#201f1c]/20 bg-white px-4 py-3.5 text-[15px]"
                />
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-bold tracking-[1px] text-[#4a473f] uppercase">
                Mensaje
              </div>
              <textarea
                name="message"
                rows={5}
                className="w-full resize-y border border-[#201f1c]/20 bg-white px-4 py-3.5 text-[15px]"
              />
            </div>
            <button
              type="submit"
              className="mt-2 cursor-pointer bg-[#201f1c] py-4 text-sm font-bold tracking-[0.5px] text-[#f6f2ea]"
            >
              Enviar mensaje
            </button>
          </form>
        )}

        <div className="flex flex-col gap-8">
          <div className="relative h-[260px] w-full">
            <Image
              src="/placeholder.svg"
              alt="Mapa de ubicación de la oficina de Aura en Polanco, Ciudad de México"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="mb-2.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              Oficina
            </div>
            <div className="text-base leading-relaxed">
              Av. Presidente Masaryk 111
              <br />
              Polanco, Ciudad de México
            </div>
          </div>
          <div>
            <div className="mb-2.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              Contacto directo
            </div>
            <div className="text-base leading-relaxed">
              +52 55 4321 0000
              <br />
              hola@aura.mx
            </div>
          </div>
          <div>
            <div className="mb-2.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              Horario de atención
            </div>
            <div className="text-[15px] leading-loose text-[#4a473f]">
              Lunes a viernes · 9:00 – 19:00
              <br />
              Sábado · 10:00 – 14:00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
