"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

export default function Projects({ lang }: { lang: Lang }) {
  const projects = data[lang].projects;
  const headers =
    lang === "en"
      ? { name: "Project", desc: "Description", lang: "Lang" }
      : { name: "Proyecto", desc: "Descripción", lang: "Lang" };

  return (
    <div className="font-mono text-sm my-1">
      {projects.map((p) => (
        <div
          key={p.name}
          className="mb-3 pl-2"
          style={{ borderLeft: "2px solid #cba6f7" }}
        >
          <div className="flex items-baseline gap-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
              style={{ color: "#89b4fa" }}
            >
              {p.name}
            </a>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: "#313244", color: "#cba6f7" }}
            >
              {p.lang}
            </span>
          </div>
          <div style={{ color: "#a6adc8" }}>{p.desc}</div>
        </div>
      ))}
    </div>
  );
}
