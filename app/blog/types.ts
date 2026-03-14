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
  devops: "var(--ctp-red)",

  rust: "var(--ctp-red)",
  python: "var(--ctp-yellow)",
  solidity: "var(--ctp-blue)",
  cpp: "var(--ctp-peach)",
};

export const LANG_COLORS: Record<string, string> = {
  TypeScript: "var(--ctp-blue)",
  JavaScript: "var(--ctp-yellow)",
  Python: "var(--ctp-yellow)",
  Rust: "var(--ctp-red)",
  Java: "var(--ctp-peach)",
  "C++": "var(--ctp-peach)",
  C: "var(--ctp-red)",
  Solidity: "var(--ctp-blue)",
  SQL: "var(--ctp-teal)",
  Go: "var(--ctp-sky)",
  Bash: "var(--ctp-green)",
};
