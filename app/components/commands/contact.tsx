"use client";
import { useState } from "react";
import { data } from "@/app/lib/data";
import { Lang } from "@/app/lib/types";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { SiDiscord, SiX } from "react-icons/si";

const C = {
  base:    "#1e1e2e",
  mantle:  "#181825",
  surface: "#313244",
  overlay: "#6c7086",
  subtext: "#a6adc8",
  text:    "#cdd6f4",
  blue:    "#89b4fa",
  mauve:   "#cba6f7",
  green:   "#a6e3a1",
  red:     "#f38ba8",
  yellow:  "#f9e2af",
  border:  "#45475a",
};

const LABEL_ICONS: Record<string, React.ReactNode> = {
  Email: <FiMail size={18} />,
  GitHub: <FiGithub size={18} />,
  LinkedIn: <FiLinkedin size={18} />,
  Discord: <SiDiscord size={18} />,
  Twitter: <SiX size={18} />,
  X: <SiX size={18} />,
};

export default function Contact({ lang }: { lang: Lang }) {
  const contacts = data[lang].contact;
  const isEn = lang === "en";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const email = contacts.find((c) => c.label === "Email")?.value ?? "manuelmateodgl02@gmail.com";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    // mailto fallback — opens client’s mail app pre-filled
    const subject = encodeURIComponent(`[portfolio] message from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  }

  const inputBase: React.CSSProperties = {
    background: C.surface,
    border: `1px solid ${C.border}`,
    color: C.text,
    borderRadius: 4,
    padding: "6px 10px",
    fontSize: "0.8rem",
    fontFamily: "monospace",
    outline: "none",
    width: "100%",
  };

  return (
    <div className="font-mono text-sm space-y-8">

      {/* ── Social links ── */}
      <div>
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: C.overlay }}>
          {isEn ? "find me" : "encúéntrame"}
        </div>
        <div className="space-y-2">
          {contacts.map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <span className="flex items-center justify-center" style={{ color: C.blue }}>
                {LABEL_ICONS[c.label] ?? "▸"}
              </span>
              <span className="min-w-[10ch]" style={{ color: C.subtext }}>{c.label}</span>
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: C.blue }}
                >
                  {c.value}
                </a>
              ) : (
                <span style={{ color: C.text }}>{c.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: `1px solid ${C.border}` }} />

      {/* ── Contact form ── */}
      <div>
        <div className="text-xs tracking-widest uppercase mb-4" style={{ color: C.overlay }}>
          {isEn ? "send a message" : "enviar mensaje"}
        </div>

        {status === "sent" ? (
          <div
            className="rounded px-4 py-3 text-sm"
            style={{ background: C.surface, border: `1px solid ${C.green}`, color: C.green }}
          >
            {isEn
              ? "✓ Your mail client should have opened. Looking forward to reading you!"
              : "✓ Tu cliente de correo se ha abierto. ¡Con ganas de leerte!"}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: C.subtext }}>
                  {isEn ? "name" : "nombre"}
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={isEn ? "Satoshi Nakamoto" : "Satoshi Nakamoto"}
                  style={inputBase}
                  className="focus:border-blue-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs" style={{ color: C.subtext }}>
                  email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="satoshi@bitcoin.org"
                  style={inputBase}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs" style={{ color: C.subtext }}>
                {isEn ? "message" : "mensaje"}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={isEn ? "Hey, I'd love to send you money... <3" : "Hola, me gustaría darte dinero... <3"}
                style={{ ...inputBase, resize: "vertical" }}
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded px-3 py-2 text-xs transition-colors hover:opacity-90 disabled:opacity-50"
              style={{
                background: C.mantle,
                color: C.green,
                border: `1px solid ${C.green}`,
                fontFamily: "monospace",
              }}
            >
              <span className="flex items-center gap-2">
                {status === "sending" ? <FiMail size={14} /> : <FiSend size={14} />}
                <span>
                  {status === "sending"
                    ? (isEn ? "opening mail" : "abriendo mail")
                    : (isEn ? "send_message" : "enviar_mensaje")}
                </span>
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

