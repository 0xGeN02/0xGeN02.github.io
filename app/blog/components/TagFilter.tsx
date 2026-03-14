"use client";

import "@/app/globals.css";

const TAG_COLORS: Record<string, string> = {
  blockchain: "var(--ctp-blue)",
  algorithms: "var(--ctp-green)",
  data:       "var(--ctp-mauve)",
  robotics:   "var(--ctp-peach)",
  blog:       "var(--ctp-yellow)",
  ml:         "var(--ctp-sky)",
  devops:    "var(--ctp-red)",

  rust:       "var(--ctp-red)",
  python:     "var(--ctp-yellow)",
  solidity:   "var(--ctp-blue)",
  cpp:        "var(--ctp-peach)",
};

function getTagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] ?? "#a6adc8";
}

interface TagFilterProps {
  tags: string[];
  selected: string | null;
  onChange: (tag: string | null) => void;
}

export default function TagFilter({ tags, selected, onChange }: TagFilterProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
        marginBottom: "1rem",
      }}
    >
      <span style={{ fontSize: "11px", color: "#585b70", fontFamily: "inherit" }}>
        filter:
      </span>

      <button
        onClick={() => onChange(null)}
        style={{
          fontSize: "11px",
          padding: "3px 10px",
          borderRadius: "4px",
          border: `1px solid ${selected === null ? "#cba6f7" : "#313244"}`,
          background: selected === null ? "#1e1e2e" : "#11111b",
          color: selected === null ? "#cba6f7" : "#585b70",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.12s",
        }}
      >
        all
      </button>

      {tags.map((tag) => {
        const active = selected === tag;
        const color = getTagColor(tag);
        return (
          <button
            key={tag}
            onClick={() => onChange(active ? null : tag)}
            style={{
              fontSize: "11px",
              padding: "3px 10px",
              borderRadius: "4px",
              border: `1px solid ${active ? color : "#313244"}`,
              background: "#11111b",
              color: active ? color : "#585b70",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.12s",
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.color = color;
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLElement).style.color = "#585b70";
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}