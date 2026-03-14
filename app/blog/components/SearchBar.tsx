"use client";
import { useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim().toLowerCase() === "exit") {
      window.location.href = "/";
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#181825",
          border: "1px solid #313244",
          borderRadius: "6px",
          padding: "8px 12px",
          marginBottom: "0.3rem",
          transition: "border-color 0.12s",
        }}
        onFocus={() => {
          const el = inputRef.current?.parentElement as HTMLElement;
          if (el) el.style.borderColor = "#cba6f7";
        }}
        onBlur={() => {
          const el = inputRef.current?.parentElement as HTMLElement;
          if (el) el.style.borderColor = "#313244";
        }}
      >
        <span style={{ color: "#cba6f7", fontSize: "12px", fontFamily: "inherit" }}>❯</span>
        <span style={{ color: "#585b70", fontSize: "12px", fontFamily: "inherit" }}>grep</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="search posts..."
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#cdd6f4",
            fontSize: "13px",
            fontFamily: "inherit",
            caretColor: "#cba6f7",
          }}
          spellCheck={false}
          autoComplete="off"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            style={{
              background: "none",
              border: "none",
              color: "#585b70",
              cursor: "pointer",
              fontSize: "13px",
              padding: 0,
              fontFamily: "inherit",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>
      <div style={{ color: "#6c7086", fontSize: "11px", fontFamily: "monospace", paddingLeft: 2 }}>
        <span style={{ color: "#cba6f7" }}>$</span> Tip: type <span style={{ color: "#a6e3a1" }}>&apos;exit&apos;</span> to return to the landing page
      </div>
    </div>
  );
}