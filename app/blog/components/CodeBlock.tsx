"use client";

import React, { useRef, useState } from "react";

// ── Language registry ─────────────────────────────────────────────────────────
const LANG_META: Record<string, { label: string; color: string }> = {
  typescript:  { label: "TypeScript",  color: "var(--ctp-blue)" },
  javascript:  { label: "JavaScript",  color: "var(--ctp-yellow)" },
  python:      { label: "Python",      color: "var(--ctp-sapphire, #74c7ec)" },
  rust:        { label: "Rust",        color: "var(--ctp-peach)" },
  java:        { label: "Java",        color: "var(--ctp-red)" },
  cpp:         { label: "C++",         color: "var(--ctp-lavender)" },
  c:           { label: "C",           color: "var(--ctp-pink)" },
  solidity:    { label: "Solidity",    color: "var(--ctp-mauve)" },
  sql:         { label: "SQL",         color: "var(--ctp-teal)" },
  go:          { label: "Go",          color: "var(--ctp-sky)" },
  bash:        { label: "Bash",        color: "var(--ctp-green)" },
  sh:          { label: "Bash",        color: "var(--ctp-green)" },
  shell:       { label: "Bash",        color: "var(--ctp-green)" },
  dockerfile:  { label: "Docker",      color: "var(--ctp-teal)" },
  docker:      { label: "Docker",      color: "var(--ctp-teal)" },
  yaml:        { label: "YAML",        color: "var(--ctp-peach)" },
  toml:        { label: "TOML",        color: "var(--ctp-flamingo, #f2cdcd)" },
  json:        { label: "JSON",        color: "var(--ctp-yellow)" },
  css:         { label: "CSS",         color: "var(--ctp-lavender)" },
  html:        { label: "HTML",        color: "var(--ctp-red)" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function getLangFromChildren(children: React.ReactNode): string | null {
  const child = React.Children.toArray(children)[0];
  if (!React.isValidElement(child)) return null;
  const className: string =
    (child.props as { className?: string }).className ?? "";
  const match = className.match(/language-(\w+)/);
  return match ? match[1].toLowerCase() : null;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function IconCopy() {
  return (
    <svg
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="13" height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── CodeBlock ─────────────────────────────────────────────────────────────────
export default function CodeBlock(
  props: React.HTMLAttributes<HTMLPreElement>
) {
  const lang = getLangFromChildren(props.children);
  const meta = lang ? LANG_META[lang] : null;
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = preRef.current?.innerText ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      style={{
        position: "relative",
        margin: "1.5rem 0",
        borderRadius: "8px",
        // subtle glow on the border using the lang color when available
        boxShadow: meta
          ? `0 0 0 1px #313244, 0 4px 24px -4px rgba(0,0,0,0.4)`
          : "0 0 0 1px #313244",
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          height: "36px",
          background: "#1e1e2e",
          borderRadius: "8px 8px 0 0",
          borderBottom: "1px solid #313244",
        }}
      >
        {/* terminal dots */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span style={{
            width: "10px", height: "10px", borderRadius: "50%",
            background: "#f38ba8", opacity: 0.7,
          }} />
          <span style={{
            width: "10px", height: "10px", borderRadius: "50%",
            background: "#f9e2af", opacity: 0.7,
          }} />
          <span style={{
            width: "10px", height: "10px", borderRadius: "50%",
            background: "#a6e3a1", opacity: 0.7,
          }} />
        </div>

        {/* copy button */}
        <button
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy code"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "transparent",
            border: "none",
            color: copied ? "var(--ctp-green)" : "#585b70",
            fontSize: "11px",
            fontFamily: "inherit",
            cursor: "pointer",
            padding: "3px 6px",
            borderRadius: "4px",
            transition: "color 0.15s",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={e => {
            if (!copied)
              (e.currentTarget as HTMLButtonElement).style.color = "#a6adc8";
          }}
          onMouseLeave={e => {
            if (!copied)
              (e.currentTarget as HTMLButtonElement).style.color = "#585b70";
          }}
        >
          {copied ? <IconCheck /> : <IconCopy />}
          <span>{copied ? "copied" : "copy"}</span>
        </button>
      </div>

      {/* ── Code area ───────────────────────────────────────────────────── */}
      <pre
        {...props}
        ref={preRef}
        style={{
          background: "#181825",
          borderRadius: "0 0 8px 8px",
          // extra bottom padding for the lang badge
          padding: meta ? "1.1rem 1.25rem 2.2rem" : "1.1rem 1.25rem",
          overflowX: "auto",
          fontSize: "13px",
          lineHeight: 1.75,
          margin: 0,
          fontFamily: "inherit",
          scrollbarWidth: "thin" as React.CSSProperties["scrollbarWidth"],
          scrollbarColor: "#313244 transparent",
        }}
      />

      {/* ── Language badge · bottom-right ───────────────────────────────── */}
      {meta && (
        <span
          style={{
            position: "absolute",
            bottom: "9px",
            right: "14px",
            fontSize: "10px",
            fontFamily: "inherit",
            fontWeight: 600,
            color: meta.color,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            userSelect: "none",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        >
          {meta.label}
        </span>
      )}
    </div>
  );
}