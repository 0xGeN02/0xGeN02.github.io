"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

export default function Experience({ lang }: { lang: Lang }) {
  const exp = data[lang].experience;

  return (
    <div className="font-mono text-sm my-1">
      {exp.map((e, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-baseline gap-2">
            <span style={{ color: "#cba6f7" }} className="font-bold">
              {e.company}
            </span>
            <span style={{ color: "#6c7086" }}>─</span>
            <span style={{ color: "#a6e3a1" }}>{e.role}</span>
          </div>
          <div style={{ color: "#585b70" }} className="text-xs mb-1">
            {e.period}
          </div>
          <div style={{ color: "#a6adc8" }} className="pl-2">
            {e.desc}
          </div>
          {i < exp.length - 1 && (
            <div style={{ color: "#313244" }} className="mt-3">
              {"─".repeat(52)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
