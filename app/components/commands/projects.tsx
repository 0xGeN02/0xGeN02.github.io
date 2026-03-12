"use client";
import Image from "next/image";
import { data } from "@/app/lib/data";
import { withBasePath } from "@/app/lib/site";
import { Lang } from "@/app/lib/types";

const C = {
  mauve:   "#cba6f7",
  blue:    "#89b4fa",
  green:   "#a6e3a1",
  surface: "#313244",
  mantle:  "#181825",
  overlay: "#6c7086",
  subtext: "#a6adc8",
  text:    "#cdd6f4",
  border:  "#45475a",
};

export default function Projects({ lang }: { lang: Lang }) {
  const projects = data[lang].projects;

  return (
    <div className="grid grid-cols-1 gap-4">
      {projects.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col md:flex-row rounded-2xl overflow-hidden transition-transform hover:-translate-y-0.5"
          style={{ background: C.mantle, border: `1px solid ${C.border}` }}
        >
          {/* Image or accent bar */}
          {p.image ? (
            <div className="relative w-full h-48 md:h-auto md:w-64 md:min-h-[220px] overflow-hidden">
              <Image
                src={withBasePath(p.image)}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, transparent 50%, ${C.mantle} 100%)` }}
              />
            </div>
          ) : (
            <div className="h-1 w-full" style={{ background: C.mauve }} />
          )}

          {/* Body */}
          <div className="flex flex-col flex-1 px-5 py-4 gap-3 md:py-6">
            {/* Title row */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm group-hover:underline" style={{ color: C.blue }}>
                {p.name}
              </span>
              <span style={{ color: C.overlay }} className="text-xs shrink-0">↗</span>
            </div>

            {/* Lang badge */}
            <span
              className="self-start text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ background: C.surface, color: C.mauve, border: `1px solid ${C.mauve}33` }}
            >
              {p.lang}
            </span>

            {/* Description */}
            <p className="text-sm leading-6 flex-1" style={{ color: C.subtext }}>
              {p.desc}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
