import React from "react";
import { LANG_COLORS } from "@/app/blog/types";

interface LanguageChipsProps {
  languages: string[];
  isDraft?: boolean;
}

function getLangColor(lang: string): string {
  return LANG_COLORS[lang] ?? "#a6adc8";
}

export default function LanguageChips({ languages, isDraft = false }: LanguageChipsProps) {
  if (!languages || languages.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
      {languages.map((lang) => (
        <span
          key={lang}
          style={{
            fontSize: "10px",
            padding: "2px 8px",
            borderRadius: "4px",
            border: `1px solid ${isDraft ? "#313244" : getLangColor(lang)}`,
            background: "#11111b",
            color: isDraft ? "#585b70" : getLangColor(lang),
            fontFamily: "inherit",
          }}
        >
          {lang}
        </span>
      ))}
    </div>
  );
}
