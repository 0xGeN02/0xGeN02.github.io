"use client";
import React, { useRef, useState, useCallback } from "react";
import { Prompt } from "@/app/components/Terminal";
import { runCommand } from "@/app/lib/commands";

const PROMPT_HOST = "0xGeN02@arch";
const PROMPT_DIR = "~/blog";

export default function TerminalPromptOnly() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<React.ReactNode | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const raw = input.trim();
      if (!raw) return;
      if (raw === "exit") {
        setOutput(
          <div style={{ color: "#a6e3a1", fontFamily: "monospace", fontSize: "0.95rem" }}>
            Exiting to landing...
          </div>
        );
        runCommand("exit", {
          lang: "en",
          setLang: () => {},
          clearHistory: () => {},
          openProjects: () => {},
          openContact: () => {},
          openCv: () => {},
          openBlog: () => {},
        });
      } else {
        setOutput(
          <span style={{ color: "#f38ba8" }}>Only <b>exit</b> is allowed here.</span>
        );
      }
      setInput("");
    },
    [input]
  );

  return (
    <div style={{ maxWidth: 600, maxHeight: 40, margin: "0 auto", marginBottom: "2.5rem" }}>
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center gap-2 rounded-md px-3 py-2"
          style={{ background: "#11111b", border: "1px solid #313244", height: 33 }}
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
            aria-label="terminal input"
            placeholder="exit"
          />
        </div>
      </form>
      {output && <div className="mt-2">{output}</div>}
    </div>
  );
}
