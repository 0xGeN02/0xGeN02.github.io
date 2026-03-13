import { getAllPosts, getAllTags } from "@/app/blog/lib/posts";
import BlogList from "@/app/blog/components/BlogList";

export default async function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div
      className="min-h-screen w-full font-mono"
      style={{ background: "#1e1e2e", color: "#cdd6f4" }}
    >
      <div
        className="max-w-2xl mx-auto w-full"
        style={{ padding: "3rem 1.5rem" }}
      >
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontSize: "11px", color: "#585b70", marginBottom: "8px" }}>
            <span style={{ color: "#cba6f7" }}>❯ </span>
            <span>ls -la ~/blog</span>
          </div>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#cdd6f4",
              margin: 0,
              fontFamily: "inherit",
            }}
          >
            0xGeN02
            <span style={{ color: "#585b70" }}>/</span>
            <span style={{ color: "#89b4fa" }}>blog</span>
          </h1>
          <p style={{ fontSize: "12px", color: "#585b70", marginTop: "4px" }}>
            {posts.length} post{posts.length !== 1 ? "s" : ""} indexed
            <span style={{ color: "#313244", margin: "0 8px" }}>·</span>
            <span style={{ color: "#a6adc8" }}>
              {tags.length} tag{tags.length !== 1 ? "s" : ""}
            </span>
          </p>
        </div>

        {/* Divider */}
        <div style={{ color: "#313244", marginBottom: "1.5rem", fontSize: "12px" }}>
          ──────────────────────────────────
        </div>

        <BlogList posts={posts} tags={tags} />
      </div>
    </div>
  );
}