export interface BlogPackage {
  tag: string;
  name: string;
  language: string;
  color: string;
  size: string;
}

export const BLOG_PACKAGES: BlogPackage[] = [
  {
    tag: "@blockchain",
    name: "setup-reth-client",
    language: "TypeScript",
    color: "var(--ctp-blue)",
    size: "142 KiB",
  },
  {
    tag: "@blockchain",
    name: "ECDSA",
    language: "JavaScript",
    color: "var(--ctp-blue)",
    size: "87 KiB",
  },
  {
    tag: "@data",
    name: "as400-dbzium-kafka",
    language: "Java",
    color: "var(--ctp-mauve)",
    size: "234 KiB",
  },
  {
    tag: "@algorithms",
    name: "timsort",
    language: "Python",
    color: "var(--ctp-teal)",
    size: "31 KiB",
  },
  {
    tag: "@data",
    name: "postgresVector",
    language: "SQL",
    color: "var(--ctp-mauve)",
    size: "19 KiB",
  },
  {
    tag: "@robotics",
    name: "ros2-arch",
    language: "C++",
    color: "var(--ctp-peach)",
    size: "188 KiB",
  },
  {
    tag: "@blog",
    name: "search",
    language: "TypeScript",
    color: "var(--ctp-yellow)",
    size: "96 KiB",
  },
  {
    tag: "@blog",
    name: "tags",
    language: "TypeScript",
    color: "var(--ctp-yellow)",
    size: "22 KiB",
  },
  {
    tag: "@blog",
    name: "comments",
    language: "TypeScript",
    color: "var(--ctp-yellow)",
    size: "54 KiB",
  },
  {
    tag: "@blog",
    name: "analytics",
    language: "TypeScript",
    color: "var(--ctp-yellow)",
    size: "41 KiB",
  },
];
