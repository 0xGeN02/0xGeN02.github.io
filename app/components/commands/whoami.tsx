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
    <div className="flex items-center gap-1 my-1 select-none overflow-hidden">
      <span style={{ color: C.surface }}>──</span>
      <span style={{ color: C.mauve }} className="whitespace-nowrap">{label}</span>
      <span style={{ color: C.surface }} className="flex-1 overflow-hidden whitespace-nowrap">{"─".repeat(80)}</span>
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
        {d.headline && (
          <>
            <span style={{ color: C.overlay }}>{"  ·  "}</span>
            <span style={{ color: C.subtext }}>{d.headline}</span>
          </>
        )}
      </div>

      {/* ── About ── */}
      <Divider label={isEn ? " about " : " sobre mí "} />
      <div
        style={{ borderLeftColor: C.surface, borderLeftWidth: 2, borderLeftStyle: "solid" }}
        className="pl-3 mb-1 space-y-0"
      >
        {(d.aboutBullets ?? [d.bio]).map((line, i) => (
          <div key={i} className="flex gap-2 leading-5">
            <span style={{ color: C.mauve }} className="shrink-0 select-none">·</span>
            <span style={{ color: C.text }} className="text-xs">
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* ── Identity ── */}
      <Divider label={isEn ? " identity " : " identidad "} />
      <Row label={isEn ? "role"      : "rol"}         value={`${d.role} @ ${d.company}`} accent={C.green}  />
      <Row label={isEn ? "location"  : "ciudad"}      value={d.location}                 accent={C.sky}    />
      <Row label={isEn ? "learning"  : "aprendiendo"} value={d.learning}                 accent={C.yellow} />
      <Row label={isEn ? "interests" : "intereses"}   value={d.interests}                accent={C.peach}  />

      {/* ── Status ── */}
      <Divider label={isEn ? " status " : " estado "} />
      <Row label={isEn ? "availability" : "disponibilidad"} value={d.status.availability} accent={C.green}   />
      <Row label={isEn ? "type"         : "tipo"}           value={d.status.type}         accent={C.sky}     />
      <Row label="focus"                                    value={d.status.focus}        accent={C.mauve}   />
      <Row label={isEn ? "location"     : "ubicación"}      value={d.status.location}     accent={C.yellow}  />

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

      {/* ── Achievements ── */}
      {d.achievements && d.achievements.length > 0 && (
        <>
          <Divider label={isEn ? " achievements " : " logros "} />
          <div className="space-y-0.5 pl-1">
            {d.achievements.map((a, i) => (
              <div key={i} className="flex gap-2 leading-5">
                <span style={{ color: C.mauve }} className="shrink-0">▸</span>
                <span style={{ color: C.subtext }} className="text-xs">{a}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Stack ── */}
      <Divider label={isEn ? " tools & frameworks " : " herramientas "} />
      <div className="flex flex-wrap gap-1 pl-1 mb-1">
        {(d.stack ?? []).map((t) => (
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
        {"─".repeat(45)}
      </div>

      {/* ── CV link ── */}
      {d.cvUrl && (
        <div className="mt-2">
          <a
            href={d.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.green, borderColor: C.green, borderWidth: 1, borderStyle: "solid" }}
            className="rounded px-2 py-0.5 text-xs hover:opacity-80"
          >
            {isEn ? "↓ download cv" : "↓ descargar cv"}
          </a>
        </div>
      )}
    </div>
  );
}
