"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

/**
 * The contact form and its thank-you state — the only interactive part of
 * `/contacto`, so it is the only part that ships to the client. Its labels are
 * interface strings, not editorial copy, so they stay in the message files.
 */
export default function ContactForm() {
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

  if (submitted) {
    return (
      <div className="flex min-h-[400px] flex-col justify-center bg-[#efe8db] p-14">
        <h2 className="mb-3.5 font-[family-name:var(--font-cormorant)] text-[30px] font-medium">
          {t("successTitle", { name })}
        </h2>
        <p className="text-base leading-loose text-[#4a473f]">
          {t("successText")}
        </p>
      </div>
    );
  }

  return (
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
  );
}
