"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submittedName = (formData.get("name") as string) || t("fallbackName");
    setName(submittedName);
    setSubmitted(true);
  }

  return (
    <div>
      <div className="mx-auto max-w-[1400px] px-8 pt-20 pb-15 lg:px-16">
        <p className="mb-4 text-[13px] font-bold tracking-[2px] text-[#a9834f] uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="mb-3 font-[family-name:var(--font-cormorant)] text-[44px] font-medium">
          {t("title")}
        </h1>
        <p className="max-w-[620px] text-base text-[#4a473f]">{t("intro")}</p>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-8 pb-30 lg:grid-cols-[1.2fr_1fr] lg:px-16">
        {submitted ? (
          <div className="flex min-h-[400px] flex-col justify-center bg-[#efe8db] p-14">
            <h2 className="mb-3.5 font-[family-name:var(--font-cormorant)] text-[30px] font-medium">
              {t("successTitle", { name })}
            </h2>
            <p className="text-base leading-loose text-[#4a473f]">
              {t("successText")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <div className="mb-2 text-xs font-bold tracking-[1px] text-[#4a473f] uppercase">
                {t("fieldName")}
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
                  {t("fieldEmail")}
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
                  {t("fieldPhone")}
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
                {t("fieldMessage")}
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
              {t("submit")}
            </button>
          </form>
        )}

        <div className="flex flex-col gap-8">
          <div className="relative h-[260px] w-full">
            <Image
              src="/placeholder.svg"
              alt={t("mapAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="mb-2.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              {t("office")}
            </div>
            <div className="text-base leading-relaxed">
              {t("officeAddress")}
              <br />
              {t("officeCity")}
            </div>
          </div>
          <div>
            <div className="mb-2.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              {t("directContact")}
            </div>
            <div className="text-base leading-relaxed">
              +52 55 4321 0000
              <br />
              hola@aura.mx
            </div>
          </div>
          <div>
            <div className="mb-2.5 text-xs font-bold tracking-[1px] text-[#a9834f] uppercase">
              {t("hours")}
            </div>
            <div className="text-[15px] leading-loose text-[#4a473f]">
              {t("hoursWeekdays")}
              <br />
              {t("hoursSaturday")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
