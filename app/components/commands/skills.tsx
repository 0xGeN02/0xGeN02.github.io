"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

const CAT_COLORS: Record<string, string> = {
  "Languages":          "#89b4fa",
  "AI / ML":            "#cba6f7",
  "Data":               "#89dceb",
  "Backend":            "#fab387",
  "Blockchain":         "#f9e2af",
  "Embedded / Systems": "#a6e3a1",
  "Cloud":              "#89dceb",
};

export default function Skills({ lang }: { lang: Lang }) {
  const d = data[lang];

  return (
    <div className="font-mono text-sm my-1">
      {d.skills.map((cat) => (
        <div key={cat.category} className="mb-2">
          <div
            className="mb-1"
            style={{ color: CAT_COLORS[cat.category] ?? "#cba6f7" }}
          >
            [{cat.category}]
          </div>
          <div className="flex flex-wrap gap-2 pl-2">
            {cat.items.map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  background: "#313244",
                  color: CAT_COLORS[cat.category] ?? "#cdd6f4",
                  border: `1px solid ${CAT_COLORS[cat.category] ?? "#585b70"}44`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
