"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

const CAT_COLORS: Record<string, string> = {
  Languages:          "#89b4fa",
  "AI / ML":         "#cba6f7",
  Data:               "#89dceb",
  Backend:            "#fab387",
  Blockchain:         "#f9e2af",
  "Embedded / Systems": "#a6e3a1",
  Cloud:              "#89dceb",
};

const FALLBACK_COLOR = "#cba6f7";
const PANEL_BORDER = "#45475a";
const SUBTEXT = "#a6adc8";

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace("#", "");
  if (sanitized.length !== 6) {
    return `rgba(203, 166, 247, ${alpha})`;
  }
  const bigint = parseInt(sanitized, 16);
  if (Number.isNaN(bigint)) {
    return `rgba(203, 166, 247, ${alpha})`;
  }
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Skills({ lang }: { lang: Lang }) {
  const d = data[lang];

  return (
    <div className="font-mono text-sm my-1">
      {d.skills.map((cat) => {
        const color = CAT_COLORS[cat.category] ?? FALLBACK_COLOR;
        return (
          <div
            key={cat.category}
            className="mb-3 rounded border px-3 py-2"
            style={{
              borderColor: hexToRgba(color, 0.4) || PANEL_BORDER,
              background: hexToRgba(color, 0.08),
            }}
          >
            <div className="flex justify-between items-center text-xs uppercase tracking-wide mb-2">
              <span style={{ color }}>{cat.category}</span>
              <span style={{ color: SUBTEXT }}>{cat.items.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    color,
                    background: hexToRgba(color, 0.15),
                    border: `1px solid ${hexToRgba(color, 0.35)}`,
                    boxShadow: `0 0 0 1px ${hexToRgba(color, 0.12)} inset`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
