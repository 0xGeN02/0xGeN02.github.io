import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/app/blog/lib/posts";
import PostBody from "@/app/blog/components/PostBody";
import { TAG_COLORS } from "@/app/blog/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} — 0xGeN02`,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const ns = meta.tags[0] ?? "blog";
  const nsColor = TAG_COLORS[ns.toLowerCase()] ?? "#a6adc8";

  return (
    <div
      className="min-h-screen w-full font-mono"
      style={{ background: "#1e1e2e", color: "#cdd6f4" }}
    >
      <div
        className="max-w-2xl mx-auto w-full"
        style={{ padding: "3rem 1.5rem" }}
      >
        {/* Back link */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#585b70] hover:text-[#cba6f7] no-underline transition-colors duration-150"
            style={{ fontFamily: "inherit" }}
          >
            ← cd ../blog
          </Link>
        </div>

        {/* Post header */}
        <div
          style={{
            background: "#181825",
            border: "1px solid #313244",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "2rem",
          }}
        >
          {/* Prompt line */}
          <div
            style={{
              fontSize: "11px",
              color: "#585b70",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#cba6f7" }}>❯</span>
            <span>cat</span>
            <span style={{ color: nsColor }}>
              @{ns}/{slug}
            </span>
            <span style={{ marginLeft: "auto" }}>{meta.date}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#cdd6f4",
              margin: "0 0 8px",
              lineHeight: 1.3,
              fontFamily: "inherit",
            }}
          >
            {meta.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "12px",
              color: "#a6adc8",
              margin: "0 0 12px",
              lineHeight: 1.5,
              fontFamily: "inherit",
            }}
          >
            {meta.description}
          </p>

          {/* Tags + meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    border: "1px solid #313244",
                    background: "#11111b",
                    color: TAG_COLORS[tag.toLowerCase()] ?? "#a6adc8",
                    fontFamily: "inherit",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#585b70",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {meta.language}
              <span style={{ margin: "0 6px", color: "#313244" }}>·</span>
              {meta.readingTime} min read
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ color: "#313244", marginBottom: "1.5rem", fontSize: "12px" }}>
          ──────────────────────────────────
        </div>

        {/* Post content */}
        <PostBody content={content} />

        {/* Footer */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #313244",
            fontSize: "11px",
            color: "#585b70",
          }}
        >
          <Link
            href="/blog"
            className="text-[11px] text-[#585b70] hover:text-[#cba6f7] no-underline transition-colors duration-150"
            style={{ fontFamily: "inherit" }}
          >
            ← back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}