"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

const C = {
  mauve:   "#cba6f7",
  blue:    "#89b4fa",
  green:   "#a6e3a1",
  yellow:  "#f9e2af",
  subtext: "#a6adc8",
  overlay: "#6c7086",
  surface: "#313244",
  muted:   "#585b70",
  text:    "#cdd6f4",
};

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span style={{ color: C.mauve }} className="font-bold text-xs tracking-widest uppercase">
        {label}
      </span>
      <div className="flex-1 overflow-hidden">
        <span style={{ color: C.surface }} className="whitespace-nowrap">
          {"─".repeat(80)}
        </span>
      </div>
    </div>
  );
}

export default function Experience({ lang }: { lang: Lang }) {
  const exp = data[lang].experience;
  const edu = data[lang].education;
  const isEn = lang === "en";

  return (
    <div className="font-mono text-sm my-1 space-y-5">

      {/* ── Experience ── */}
      <div>
        <SectionLabel label={isEn ? "experience" : "experiencia"} />
        <div className="space-y-4">
          {exp.map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span style={{ color: C.mauve }} className="font-bold">{e.company}</span>
                <span style={{ color: C.overlay }}>─</span>
                <span style={{ color: C.green }}>{e.role}</span>
                <span style={{ color: C.muted }} className="text-xs ml-auto">{e.period}</span>
              </div>
              <div style={{ color: C.subtext }} className="pl-2 mt-0.5 text-xs leading-5">
                {e.desc}
              </div>
              {e.bullets && e.bullets.length > 0 && (
                <div className="pl-2 mt-1 space-y-0.5">
                  {e.bullets.map((b, j) => (
                    <div key={j} className="flex gap-2 leading-5">
                      <span style={{ color: C.green }} className="shrink-0">·</span>
                      <span style={{ color: C.subtext }} className="text-xs">{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Education ── */}
      <div>
        <SectionLabel label={isEn ? "education" : "formación"} />
        <div className="space-y-4">
          {edu.map((e, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span style={{ color: C.blue }} className="font-bold">{e.institution}</span>
                <span style={{ color: C.muted }} className="text-xs ml-auto">{e.period}</span>
              </div>
              <div style={{ color: C.text }} className="pl-2 text-xs mt-0.5">{e.degree}</div>
              {e.bullets && e.bullets.length > 0 && (
                <div className="pl-2 mt-1 space-y-0.5">
                  {e.bullets.map((b, j) => (
                    <div key={j} className="flex gap-2 leading-5">
                      <span style={{ color: C.yellow }} className="shrink-0">·</span>
                      <span style={{ color: C.subtext }} className="text-xs">{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
