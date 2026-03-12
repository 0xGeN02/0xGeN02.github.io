"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

export default function Education({ lang }: { lang: Lang }) {
  const edu = data[lang].education;

  return (
    <div className="font-mono text-sm my-1">
      {edu.map((e, i) => (
        <div key={i} className="mb-3 pl-2" style={{ borderLeft: "2px solid #89b4fa" }}>
          <div style={{ color: "#89b4fa" }} className="font-bold">
            {e.institution}
          </div>
          <div style={{ color: "#cdd6f4" }}>{e.degree}</div>
          <div style={{ color: "#585b70" }} className="text-xs">{e.period}</div>
        </div>
      ))}
    </div>
  );
}
