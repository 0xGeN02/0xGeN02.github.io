"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

export default function Contact({ lang }: { lang: Lang }) {
  const contacts = data[lang].contact;

  return (
    <div className="font-mono text-sm my-1">
      {contacts.map((c) => (
        <div key={c.label} className="flex items-center gap-3 mb-2">
          <span style={{ color: "#cba6f7" }} className="min-w-[8ch]">
            {c.label}
          </span>
          <span style={{ color: "#6c7086" }}>▸</span>
          {c.url ? (
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "#89b4fa" }}
            >
              {c.value}
            </a>
          ) : (
            <span style={{ color: "#cdd6f4" }}>{c.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
