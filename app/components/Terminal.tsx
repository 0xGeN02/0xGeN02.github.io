"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiGitBranch } from "react-icons/fi";
import { OutputLine, Lang } from "@/app/lib/types";
import { runCommand, Banner } from "@/app/lib/commands";
import Projects from "@/app/components/commands/projects";
import Contact from "@/app/components/commands/contact";

const PROMPT_HOST = "0xGeN02@arch";
const PROMPT_DIR  = "~/portfolio";

function Prompt({ host, dir }: { host: string; dir: string }) {
  return (
    <span className="select-none">
      <span style={{ color: "#a6e3a1" }}>{host}</span>
      <span style={{ color: "#6c7086" }}> </span>
      <span style={{ color: "#89b4fa" }}>{dir}</span>
      <span style={{ color: "#cba6f7" }}> ❯ </span>
    </span>
  );
}

export default function Terminal() {
  const [lang, setLang] = useState<Lang>("en");
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [history, setHistory] = useState<OutputLine[]>(() => [
    {
      id: crypto.randomUUID(),
      type: "output",
      content: <Banner />,
    },
  ]);
  const [, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [input, setInput] = useState("");

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  // Close projects modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setProjectsOpen(false); setContactOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Keep focus on input when clicking anywhere in the terminal (not when a modal is open)
  const handleTerminalClick = useCallback(() => {
    if (!projectsOpen && !contactOpen) inputRef.current?.focus();
  }, [projectsOpen, contactOpen]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const openProjects = useCallback(() => {
    setProjectsOpen(true);
  }, []);

  const openContact = useCallback(() => {
    setContactOpen(true);
  }, []);

  const openCv = useCallback((url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = url.split("/").pop() ?? "CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const appendLine = useCallback((line: OutputLine) => {
    setHistory((prev) => [...prev, line]);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    // Echo the command typed
    appendLine({
      id: crypto.randomUUID(),
      type: "command",
      content: (
        <div>
          <Prompt host={PROMPT_HOST} dir={PROMPT_DIR} />
          <span style={{ color: "#cdd6f4" }}>{raw}</span>
        </div>
      ),
    });

    // Run
    const ctx = { lang, setLang, clearHistory, openProjects, openContact, openCv };
    const result = runCommand(raw, ctx);

    if (result !== null && result !== undefined) {
      appendLine({
        id: crypto.randomUUID(),
        type: "output",
        content: result,
      });
    }

    // Save to cmd history (deduplicate at top)
    setCmdHistory((prev) => [raw, ...prev.filter((c) => c !== raw)].slice(0, 100));
    setHistoryIndex(-1);
    setInput("");
  }, [input, lang, appendLine, clearHistory, openProjects, openContact, openCv]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCmdHistory((hist) => {
          const nextIdx = Math.min(historyIndex + 1, hist.length - 1);
          setHistoryIndex(nextIdx);
          setInput(hist[nextIdx] ?? "");
          return hist;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = historyIndex - 1;
        if (nextIdx < 0) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIdx);
          setCmdHistory((hist) => {
            setInput(hist[nextIdx] ?? "");
            return hist;
          });
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        // Autocomplete: find first matching command
        if (input.length === 0) return;
        const NAMES = ["help", "whoami", "skills", "projects", "experience", "contact", "curlo", "cv", "blog", "banner", "lang", "clear", "sudo"];
        const match = NAMES.find((n) => n.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        clearHistory();
      }
    },
    [historyIndex, input, clearHistory]
  );

  return (
    <div
      className="min-h-screen w-full px-0 py-0 sm:px-3 sm:py-3 font-mono text-sm"
      style={{
        background: "radial-gradient(circle at top, #313244 0%, #1e1e2e 30%, #181825 100%)",
      }}
      onClick={handleTerminalClick}
    >
      {/* ── Contact overlay ── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: "rgba(17,17,27,0.97)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="sticky top-0 flex items-center justify-between px-6 py-3 z-10"
            style={{ background: "#181825", borderBottom: "1px solid #313244" }}
          >
            <span className="font-mono text-sm" style={{ color: "#89b4fa" }}>
              {lang === "en" ? "~/contact" : "~/contacto"}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setContactOpen(false); }}
              className="font-mono text-xs px-3 py-1 rounded hover:opacity-80 transition-opacity"
              style={{ background: "#313244", color: "#f38ba8", border: "1px solid #45475a" }}
            >
              [esc] close
            </button>
          </div>
          <div className="max-w-2xl mx-auto px-6 py-8">
            <Contact lang={lang} />
          </div>
        </div>
      )}

      {/* ── Projects overlay ── */}
      {projectsOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: "rgba(17,17,27,0.97)", backdropFilter: "blur(4px)" }}
        >
          {/* Header bar */}
          <div
            className="sticky top-0 flex items-center justify-between px-6 py-3 z-10"
            style={{ background: "#181825", borderBottom: "1px solid #313244" }}
          >
            <span className="font-mono text-sm" style={{ color: "#cba6f7" }}>
              {lang === "en" ? "~/projects" : "~/proyectos"}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setProjectsOpen(false); }}
              className="font-mono text-xs px-3 py-1 rounded hover:opacity-80 transition-opacity"
              style={{ background: "#313244", color: "#f38ba8", border: "1px solid #45475a" }}
            >
              [esc] close
            </button>
          </div>
          {/* Grid */}
          <div className="max-w-5xl mx-auto px-6 py-6">
            <Projects lang={lang} />
          </div>
        </div>
      )}
      <div
        className="mx-auto flex min-h-screen w-full flex-col overflow-hidden border sm:min-h-[calc(100vh-1.5rem)] sm:rounded-lg"
        style={{
          background: "linear-gradient(180deg, rgba(30,30,46,0.96) 0%, rgba(24,24,37,0.98) 100%)",
          borderColor: "#313244",
          boxShadow: "0 24px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(69,71,90,0.35)",
        }}
      >
        {/* Terminal window chrome */}
        <div
          className="sticky top-0 z-10 flex items-center gap-3 px-4 py-2.5 select-none"
          style={{ background: "rgba(24,24,37,0.94)", borderBottom: "1px solid #313244", backdropFilter: "blur(8px)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#f38ba8" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#f9e2af" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#a6e3a1" }} />
          </div>
          <span
            className="rounded px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#89dceb", background: "rgba(137,220,235,0.08)", border: "1px solid #313244" }}
          >
            zsh
          </span>
          <span className="text-xs" style={{ color: "#585b70" }}>
            {PROMPT_HOST}:{PROMPT_DIR}
          </span>
          <span className="ml-auto hidden items-center gap-1 text-xs sm:inline-flex" style={{ color: "#fab387" }}>
            <FiGitBranch size={12} />
            <span>main</span>
          </span>
          <span className="text-xs" style={{ color: "#585b70" }}>
            [{lang.toUpperCase()}]
          </span>
        </div>

        {/* Output history */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 terminal-scroll sm:px-5"
          style={{ minHeight: 0 }}
        >
          {history.map((line) => (
            <div key={line.id} className="mb-0.5 leading-6">
              {line.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input line */}
        <div style={{ background: "rgba(24,24,37,0.96)", borderTop: "1px solid #313244" }}>
          <div className="px-4 pt-2 text-[11px] sm:px-5" style={{ color: "#6c7086" }}>
            try: help · whoami · projects · contact
          </div>
          <form
            onSubmit={handleSubmit}
            className="sticky bottom-0 px-4 py-3 sm:px-5"
          >
            <div
              className="flex items-center gap-2 rounded-md px-3 py-2"
              style={{ background: "#11111b", border: "1px solid #313244" }}
            >
              <Prompt host={PROMPT_HOST} dir={PROMPT_DIR} />
              <input
                ref={inputRef}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                className="flex-1 bg-transparent outline-none caret-[#a6e3a1] text-[#cdd6f4]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="terminal input"
                placeholder={lang === "en" ? "type a command..." : "escribe un comando..."}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
