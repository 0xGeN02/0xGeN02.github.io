export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  language: string[]; // cambiado de string a string[]
  readingTime: number;
  draft?: boolean;
}

export const TAG_COLORS: Record<string, string> = {
  blockchain: "var(--ctp-blue)",
  algorithms: "var(--ctp-green)",
  data: "var(--ctp-mauve)",
  robotics: "var(--ctp-peach)",
  blog: "var(--ctp-yellow)",
  ml: "var(--ctp-sky)",
  "dev-ops": "var(--ctp-red)",
};

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "var(--ctp-blue)",
  JavaScript: "var(--ctp-yellow)",
  Python: "var(--ctp-sapphire)",
  Rust: "var(--ctp-peach)",
  Java: "var(--ctp-red)",
  "C++": "var(--ctp-lavender)",
  C: "var(--ctp-pink)",
  Solidity: "var(--ctp-mauve)",
  SQL: "var(--ctp-teal)",
  Go: "var(--ctp-sky)",
  Bash: "var(--ctp-green)",
  Docker: "var(--ctp-teal)",
};
