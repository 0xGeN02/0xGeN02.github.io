"use client";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";

// Catppuccin Mocha
const C = {
  mauve:    "#cba6f7",
  blue:     "#89b4fa",
  sky:      "#89dceb",
  lavender: "#b4befe",
  green:    "#a6e3a1",
  yellow:   "#f9e2af",
  peach:    "#fab387",
  red:      "#f38ba8",
  pink:     "#f5c2e7",
  text:     "#cdd6f4",
  subtext:  "#a6adc8",
  overlay:  "#6c7086",
  surface:  "#45475a",
};

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 my-1 select-none">
      <span style={{ color: C.surface }}>──</span>
      <span style={{ color: C.mauve }}>{label}</span>
      <span style={{ color: C.surface }}>{"─".repeat(Math.max(0, 46 - label.length))}</span>
    </div>
  );
}

function Row({
  label,
  value,
  accent = C.mauve,
}: {
  label: string;
  value: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex gap-2 leading-6">
      <span style={{ color: accent }} className="min-w-[12ch] shrink-0">{label}</span>
      <span style={{ color: C.overlay }}>▸</span>
      <span style={{ color: C.text }}>{value}</span>
    </div>
  );
}

function Tag({ children, color = C.mauve }: { children: string; color?: string }) {
  return (
    <span
      style={{ color, borderColor: color, borderWidth: 1, borderStyle: "solid" }}
      className="rounded px-1 py-0 text-xs leading-5"
    >
      {children}
    </span>
  );
}

const STACK = ["TypeScript", "Next.js", "Solidity", "Python", "Rust", "Go"];

export default function Whoami({ lang }: { lang: Lang }) {
  const d = data[lang];
  const isEn = lang === "en";

  return (
    <div className="font-mono text-sm my-1">

      {/* ── Header ── */}
      <div className="leading-7 mb-1">
        <span style={{ color: C.green }} className="font-bold">0xGeN02</span>
        <span style={{ color: C.overlay }}> @ </span>
        <span style={{ color: C.blue }}>arch</span>
        <span style={{ color: C.overlay }}>  ·  </span>
        <span style={{ color: C.subtext }}>{d.role}</span>
      </div>

      {/* ── About ── */}
      <Divider label={isEn ? " about " : " sobre mí "} />
      <div
        style={{ color: C.text, borderLeftColor: C.surface, borderLeftWidth: 2, borderLeftStyle: "solid" }}
        className="pl-3 leading-6 mb-1"
      >
        {d.bio}
      </div>

      {/* ── Identity ── */}
      <Divider label={isEn ? " identity " : " identidad "} />
      <Row label={isEn ? "role"         : "rol"}          value={`${d.role} @ ${d.company}`} accent={C.green}   />
      <Row label={isEn ? "location"     : "ciudad"}       value={d.location}                 accent={C.sky}     />
      <Row label={isEn ? "learning"     : "aprendiendo"}  value={d.learning}                 accent={C.yellow}  />
      <Row label={isEn ? "interests"    : "intereses"}    value={d.interests}                accent={C.peach}   />

      {/* ── Experience ── */}
      <Divider label={isEn ? " experience " : " experiencia "} />
      <div className="space-y-1">
        {d.experience.map((exp, i) => (
          <div key={i}>
            <div className="leading-6">
              <span style={{ color: C.overlay }}>{exp.period}</span>
              <span style={{ color: C.overlay }}>{"  │  "}</span>
              <span style={{ color: C.text }}>{exp.role}</span>
              <span style={{ color: C.overlay }}>{"  @  "}</span>
              <span style={{ color: C.blue }}>{exp.company}</span>
            </div>
            <div style={{ color: C.subtext }} className="pl-4 text-xs leading-5">
              {exp.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── Education ── */}
      <Divider label={isEn ? " education " : " formación "} />
      <div className="space-y-1">
        {d.education.map((edu, i) => (
          <div key={i}>
            <div className="leading-6">
              <span style={{ color: C.overlay }}>{edu.period}</span>
              <span style={{ color: C.overlay }}>{"  │  "}</span>
              <span style={{ color: C.text }}>{edu.degree}</span>
            </div>
            <div style={{ color: C.subtext }} className="pl-4 text-xs leading-5">
              {edu.institution}
            </div>
          </div>
        ))}
      </div>

      {/* ── Stack ── */}
      <Divider label=" stack " />
      <div className="flex flex-wrap gap-1 pl-1 mb-1">
        {STACK.map((t) => (
          <Tag key={t} color={C.mauve}>{t}</Tag>
        ))}
      </div>

      {/* ── Find me ── */}
      <Divider label={isEn ? " find me " : " encuéntrame "} />
      {d.contact.map((c, i) => (
        <Row
          key={i}
          label={c.label.toLowerCase()}
          value={
            c.url ? (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.blue }}
                className="hover:underline"
              >
                {c.value}
              </a>
            ) : (
              c.value
            )
          }
          accent={C.lavender}
        />
      ))}

      <div className="mt-2 select-none" style={{ color: C.surface }}>
        {"─".repeat(52)}
      </div>
    </div>
  );
}
