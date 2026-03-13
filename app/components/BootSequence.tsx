"use client";
import { useEffect, useState } from "react";
import { BOOT_LINES } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

interface Props {
  lang: Lang;
  onDone: () => void;
}

export default function BootSequence({ lang, onDone }: Props) {
  const lines = BOOT_LINES[lang];
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timerId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function showNext() {
      if (cancelled) return;
      if (i >= lines.length) {
        setDone(true);
        timerId = setTimeout(() => { if (!cancelled) onDone(); }, 400);
        return;
      }
      const line = lines[i];
      setVisibleLines((prev) => [...prev, line]);
      i++;
      const delay = line === "" ? 200 : 260 + Math.random() * 160;
      timerId = setTimeout(showNext, delay);
    }

    showNext();

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [lines, onDone]);

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center px-6 py-12 font-mono text-sm"
      style={{ background: "#1e1e2e", color: "#cdd6f4" }}
    >
      <div className="max-w-2xl mx-auto w-full">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className="leading-6"
            style={{
              color: (line ?? "").startsWith("::") ? "#a6e3a1" : "#cdd6f4",
              opacity: line === "" ? 0 : 1,
            }}
          >
            {line || "\u00a0"}
          </div>
        ))}
        {!done && <span className="cursor-blink" />}
      </div>
    </div>
  );
}
