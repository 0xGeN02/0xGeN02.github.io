export type Lang = "en" | "es";

export interface OutputLine {
  id: string;
  type: "command" | "output" | "error" | "system";
  content: React.ReactNode;
}

export interface CommandContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  clearHistory: () => void;
  openProjects: () => void;
  openContact: () => void;
}

export interface Command {
  name: string;
  description: { en: string; es: string };
  run: (args: string[], ctx: CommandContext) => React.ReactNode;
}
