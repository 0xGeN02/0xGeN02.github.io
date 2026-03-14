import Link from "next/link";

import { TAG_COLORS, type Post } from "@/app/blog/types";
import LanguageChips from "./LanguageChips";

function getTagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] ?? "#a6adc8";
}



// Derives the @tag/name format shown in the card header.
// Uses the first tag as the namespace.
function getPackageName(post: Post): { ns: string; name: string; color: string } {
  const ns = post.tags[0] ?? "blog";
  return {
    ns: `@${ns}`,
    name: post.slug,
    color: getTagColor(ns),
  };
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const pkg = getPackageName(post);
  const isDraft = post.draft ?? false;
  const languages = Array.isArray(post.language)
    ? post.language
    : post.language
    ? [post.language]
    : [];

  const card = (
    <article
      style={{
        background: "#181825",
        border: `1px solid ${isDraft ? "#313244" : "#313244"}`,
        borderRadius: "8px",
        overflow: "hidden",
        opacity: isDraft ? 0.5 : 1,
        cursor: isDraft ? "default" : "pointer",
        transition: "border-color 0.15s, background 0.15s",
      }}
      onMouseEnter={(e) => {
        if (isDraft) return;
        (e.currentTarget as HTMLElement).style.borderColor = "#45475a";
        (e.currentTarget as HTMLElement).style.background = "#1e1e2e";
      }}
      onMouseLeave={(e) => {
        if (isDraft) return;
        (e.currentTarget as HTMLElement).style.borderColor = "#313244";
        (e.currentTarget as HTMLElement).style.background = "#181825";
      }}
    >
      {/* Top section */}
      <div
        style={{
          padding: "14px 16px 10px",
          borderBottom: "1px solid #313244",
        }}
      >
        {/* Meta row: prompt + package path + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
            fontSize: "11px",
            color: "#585b70",
            fontFamily: "inherit",
          }}
        >
          <span style={{ color: isDraft ? "#585b70" : "#cba6f7" }}>❯</span>
          <span>cat</span>
          <span style={{ color: pkg.color }}>
            {pkg.ns}/{pkg.name}
          </span>
          <span style={{ marginLeft: "auto", color: "#45475a" }}>
            {isDraft ? "coming soon" : post.date}
          </span>
        </div>

        {/* Title */}
        <p
          style={{
            fontSize: "14px",
            color: isDraft ? "#585b70" : "#cdd6f4",
            fontWeight: 500,
            marginBottom: "4px",
            lineHeight: 1.4,
            fontFamily: "inherit",
          }}
        >
          {post.title}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "12px",
            color: isDraft ? "#45475a" : "#a6adc8",
            lineHeight: 1.5,
            fontFamily: "inherit",
          }}
        >
          {isDraft ? "Pending..." : post.description}
        </p>
      </div>

      {/* Bottom section: tags + lang + reading time */}
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        {/* Tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "4px",
                border: "1px solid #313244",
                background: "#11111b",
                color: getTagColor(tag),
                fontFamily: "inherit",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Languages + reading time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            color: "#585b70",
            flexShrink: 0,
          }}
        >
          <LanguageChips languages={languages} isDraft={isDraft} />
          <span style={{ whiteSpace: "nowrap" }}>
            {isDraft ? "—" : `${post.readingTime} min read`}
          </span>
        </div>
      </div>
    </article>
  );

  if (isDraft) return card;

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      {card}
    </Link>
  );
}