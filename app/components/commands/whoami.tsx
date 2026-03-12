"use client";
import type { ReactNode } from "react";
import { data } from "@/app/lib/data";
import { withBasePath } from "@/app/lib/site";
import { Lang } from "@/app/lib/types";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiDiscord, SiX } from "react-icons/si";

const iconMap: Record<string, ReactNode> = {
  Email: <FiMail size={16} />,
  GitHub: <FiGithub size={16} />,
  LinkedIn: <FiLinkedin size={16} />,
  Discord: <SiDiscord size={16} />,
  Twitter: <SiX size={16} />,
  X: <SiX size={16} />,
};

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
  const trailing = Math.max(0, 80 - label.length);

  return (
    <div className="flex items-center gap-1 my-3 select-none overflow-hidden">
      <span style={{ color: C.surface }}>──</span>
      <span style={{ color: C.mauve }} className="whitespace-pre">{label}</span>
      <span style={{ color: C.surface }} className="overflow-hidden whitespace-nowrap">{"─".repeat(trailing)}</span>
    </div>
  );
}

function Row({
  label,
  value,
  accent = C.mauve,
  icon,
}: {
  label: string;
  value: ReactNode;
  accent?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 leading-6">
      {icon ? (
        <span style={{ color: accent, display: "flex", alignItems: "center" }}>{icon}</span>
      ) : (
        <span style={{ color: accent }} className="min-w-[12ch] shrink-0">{label}</span>
      )}
      <span style={{ color: C.overlay }}>│</span>
      <span style={{ color: C.text }}>{value}</span>
    </div>
  );
}

function TimelineEntry({
  period,
  title,
  subtitle,
  details,
}: {
  period: string;
  title: ReactNode;
  subtitle?: ReactNode;
  details?: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        style={{ color: C.overlay, fontVariantNumeric: "tabular-nums" }}
        className="w-28 text-right shrink-0"
      >
        {period}
      </span>
      <span style={{ color: C.overlay }}>│</span>
      <div className="flex-1">
        <div className="leading-6">
          {title}
          {subtitle && (
            <>
              <span style={{ color: C.overlay }}>{"  @  "}</span>
              <span style={{ color: C.blue }}>{subtitle}</span>
            </>
          )}
        </div>
        {details && (
          <div style={{ color: C.subtext }} className="text-xs leading-5 mt-0.5">
            {details}
          </div>
        )}
      </div>
    </div>
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
      <Row label={isEn ? "name" : "nombre"} value={d.status.name} accent={C.green}   />
      <Row label={isEn ? "location"  : "ciudad"}      value={d.location}                 accent={C.sky}    />
      <Row label={isEn ? "learning"  : "aprendiendo"} value={d.learning}                 accent={C.yellow} />
      <Row label={isEn ? "interests" : "intereses"}   value={d.interests}                accent={C.peach}  />

      {/* ── Status ── */}
      <Divider label={isEn ? " status " : " estado "} />
      <Row label={isEn ? "role"      : "rol"}         value={`${d.role} @ ${d.company}`} accent={C.green}  />
      <Row label={isEn ? "type"         : "tipo"}           value={d.status.type}         accent={C.sky}     />
      <Row label="focus"                                    value={d.status.focus}        accent={C.mauve}   />
      <Row label={isEn ? "location"     : "ubicación"}      value={d.status.location}     accent={C.yellow}  />

      {/* ── Experience ── */}
      <Divider label={isEn ? " experience " : " experiencia "} />
      <div className="space-y-2">
        {d.experience.map((exp, i) => (
          <TimelineEntry
            key={i}
            period={exp.period}
            title={<span style={{ color: C.pink }}>{exp.role}</span>}
            subtitle={exp.company}
            details={exp.desc}
          />
        ))}
      </div>

      {/* ── Education ── */}
      <Divider label={isEn ? " education " : " formación "} />
      <div className="space-y-2">
        {d.education.map((edu, i) => (
          <TimelineEntry
            key={i}
            period={edu.period}
            title={<span style={{ color: C.yellow }}>{edu.degree}</span>}
            details={edu.institution}
          />
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
          icon={iconMap[c.label]}
          accent={C.lavender}
        />
      ))}

      <div className="mt-2 select-none overflow-hidden" style={{ color: C.surface }}>
        {"─".repeat(80)}
      </div>

      {/* ── CV link ── */}
      {d.cvUrl && (
        <div className="mt-2">
          <a
            href={withBasePath(d.cvUrl)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: C.green, borderColor: C.green, borderWidth: 1, borderStyle: "solid" }}
            className="rounded px-2 py-0.5 text-xs hover:opacity-80"
          >
            {isEn ? "↓ download CV" : "↓ descargar CV"}
          </a>
        </div>
      )}
    </div>
  );
}
