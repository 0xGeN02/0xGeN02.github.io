import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post } from "@/app/blog/types";

const CONTENT_DIR = path.join(process.cwd(), "app/blog/content");

function slugify(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug: slugify(filename),
      title: data.title ?? filename,
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      language: data.language ?? "",
      readingTime: Math.ceil(stats.minutes),
      draft: data.draft ?? false,
    } satisfies Post;
  });

  return posts
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(
  slug: string,
): { meta: Post; content: string } | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      language: data.language ?? "",
      readingTime: Math.ceil(stats.minutes),
      draft: data.draft ?? false,
    },
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tagSet).sort();
}
