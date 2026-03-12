"use client";
import { Lang } from "@/app/lib/types";

export default function Blog({ lang }: { lang: Lang }) {
  return (
    <div className="font-mono text-sm my-1" style={{ color: "#6c7086" }}>
      <span style={{ color: "#cba6f7" }}>blog</span>{" "}
      {lang === "en"
        ? "— coming soon. Check back later."
        : "— próximamente. Vuelve más tarde."}
    </div>
  );
}
