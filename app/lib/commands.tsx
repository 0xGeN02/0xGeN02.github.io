"use client";
import React from "react";
import { Command, CommandContext, Lang } from "./types";
import { data } from "@/app/lib/data";
import { withBasePath } from "@/app/lib/site";
import Whoami from "@/app/components/commands/whoami";
import Skills from "@/app/components/commands/skills";
import Experience from "@/app/components/commands/experience";
import Blog from "@/app/components/commands/blog";

const BANNER_EN = `
  
  █  █████╗ ██╗  ██╗ ██████╗ ███████╗███╗   ██╗ ██████╗ ██████╗ 
 ██╔═████╗╚██╗██╔╝██╔════╝ ██╔════╝████╗ ██║ ██╔═████╗╚════██╗
 ██║██╔██║ ╚███╔╝ ██║  ███╗█████╗  ██╔██╗ ██║██║██╔██║ █████╔╝
 ████╔╝██║ ██╔██╗ ██║   ██║██╔══╝  ██║╚██╗██║████╔╝██║██╔═══╝ 
 ╚██████╔╝██╔╝ ██╗╚██████╔╝███████╗██║ ╚████║╚██████╔╝███████╗
  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
`.trim();

function Banner() {
  return (
    <div className="my-2">
      <pre
        className="leading-tight select-none overflow-x-auto"
        style={{ color: "#cba6f7", fontSize: "clamp(0.45rem, 1.1vw, 0.75rem)" }}
      >
        {BANNER_EN}
      </pre>
      <div className="mt-1 pl-6 mr-8 text-xs" style={{ color: "#6c7086" }}>
        USD & EUR are ShitCoins · Epistula ad Romanos 8:31 · I use Arch BTW
      </div>
    </div>
  );
}

function HelpOutput({ lang }: { lang: Lang }) {
  const labels = {
    en: { cmd: "command", desc: "description", usage: "usage: <command> [args]" },
    es: { cmd: "comando", desc: "descripción", usage: "uso: <comando> [args]" },
  };
  const t = labels[lang];

  const cmds = [
    { name: "help",       en: "list available commands",         es: "listar comandos disponibles" },
    { name: "whoami",     en: "fastfetch-style system info",     es: "info del sistema estilo fastfetch" },
    { name: "skills",     en: "tech stack / skills",             es: "stack técnico / habilidades" },
    { name: "projects",   en: "GitHub projects",                 es: "proyectos de GitHub" },
    { name: "experience", en: "work experience & education",     es: "experiencia y formación" },
    { name: "contact",    en: "contact info & social links",     es: "contacto y redes sociales" },
    { name: "curl",      en: "download curriculum / resume",     es: "descargar currículum / CV" },
    { name: "blog",       en: "blog posts",                      es: "artículos del blog" },
    { name: "banner",     en: "show ASCII banner",               es: "mostrar banner ASCII" },
    { name: "loadkeys [en|es]", en: "switch language",              es: "cambiar idioma" },
    { name: "clear",      en: "clear terminal",                  es: "limpiar terminal" },
  ];

  return (
    <div className="font-mono text-sm my-1">
      <div style={{ color: "#6c7086" }} className="mb-2">{t.usage}</div>
      {cmds.map((c) => (
        <div key={c.name} className="flex gap-2 mb-0.5">
          <span style={{ color: "#89b4fa" }} className="min-w-[20ch]">
            {c.name}
          </span>
          <span style={{ color: "#a6adc8" }}>{lang === "en" ? c.en : c.es}</span>
        </div>
      ))}
    </div>
  );
}

export const COMMANDS: Command[] = [
  {
    name: "help",
    description: { en: "list available commands", es: "listar comandos" },
    run: (_args, ctx) => <HelpOutput lang={ctx.lang} />,
  },
  {
    name: "whoami",
    description: { en: "fastfetch-style system info", es: "info del sistema" },
    run: (_args, ctx) => <Whoami lang={ctx.lang} />,
  },
  {
    name: "skills",
    description: { en: "tech stack", es: "stack técnico" },
    run: (_args, ctx) => <Skills lang={ctx.lang} />,
  },
  {
    name: "projects",
    description: { en: "GitHub projects", es: "proyectos" },
    run: (_args, ctx) => {
      ctx.openProjects();
      return (
        <span style={{ color: "#a6adc8", fontFamily: "monospace", fontSize: "0.875rem" }}>
          {ctx.lang === "en" ? "opening projects…" : "abriendo proyectos…"}
        </span>
      );
    },
  },
  {
    name: "experience",
    description: { en: "work experience & education", es: "experiencia y formación" },
    run: (_args, ctx) => <Experience lang={ctx.lang} />,
  },
  {
    name: "contact",
    description: { en: "contact & socials", es: "contacto" },
    run: (_args, ctx) => {
      ctx.openContact();
      return (
        <span style={{ color: "#a6adc8", fontFamily: "monospace", fontSize: "0.875rem" }}>
          {ctx.lang === "en" ? "opening contact…" : "abriendo contacto…"}
        </span>
      );
    },
  },
  {
    name: "curl",
    description: { en: "download curriculum / resume", es: "descargar currículum / CV" },
    run: (_args, ctx) => {
      const cvUrl = data[ctx.lang].cvUrl ?? "/pdf/CV_March_2026_EN.pdf";
      ctx.openCv(withBasePath(cvUrl));
      return (
        <span style={{ color: "#a6e3a1", fontFamily: "monospace", fontSize: "0.875rem" }}>
          {ctx.lang === "en" ? "downloading CV…" : "descargando CV…"}
        </span>
      );
    },
  },
  {
    name: "blog",
    description: { en: "blog posts", es: "artículos" },
    run: (_args, ctx) => <Blog lang={ctx.lang} />,
  },
  {
    name: "banner",
    description: { en: "show ASCII banner", es: "mostrar banner" },
    run: () => <Banner />,
  },
  {
    name: "loadkeys",
    description: { en: "switch language: loadkeys [en|es]", es: "cambiar idioma: loadkeys [en|es]" },
    run: (args, ctx) => {
      const target = args[0];
      if (target === "en" || target === "es") {
        ctx.setLang(target);
        return (
          <span style={{ color: "#a6e3a1" }}>
            {target === "en" ? "Language set to English." : "Idioma cambiado a español."}
          </span>
        );
      }
      return (
        <span style={{ color: "#f38ba8" }}>
          Usage: lang [en|es]
        </span>
      );
    },
  },
  {
    name: "clear",
    description: { en: "clear terminal", es: "limpiar terminal" },
    run: (_args, ctx) => {
      ctx.clearHistory();
      return null;
    },
  },
  {
    name: "sudo",
    description: { en: "", es: "" },
    run: () => (
      <span style={{ color: "#f38ba8" }}>
        Nice try. You are not in the sudoers file. This incident will be reported.
      </span>
    ),
  },
];

export const COMMAND_MAP = Object.fromEntries(COMMANDS.map((c) => [c.name, c]));

export function runCommand(
  input: string,
  ctx: CommandContext
): React.ReactNode {
  const parts = input.trim().split(/\s+/);
  const name = parts[0].toLowerCase();
  const args = parts.slice(1);

  const cmd = COMMAND_MAP[name];
  if (!cmd) {
    return (
      <span>
        <span style={{ color: "#f38ba8" }}>bash: {name}: </span>
        <span style={{ color: "#6c7086" }}>command not found. Type </span>
        <span style={{ color: "#89b4fa" }}>help</span>
        <span style={{ color: "#6c7086" }}> for available commands.</span>
      </span>
    );
  }

  return cmd.run(args, ctx);
}

export { Banner };
