"use client";
import { useState, useMemo } from "react";
import type { Post } from "@/app/blog/types";
import PostCard from "@/app/blog/components/PostCard";
import TagFilter from "@/app/blog/components/TagFilter";
import SearchBar from "@/app/blog/components/SearchBar";

interface BlogListProps {
  posts: Post[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((p) => {
      const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />
      <TagFilter tags={tags} selected={activeTag} onChange={setActiveTag} />

      {filtered.length === 0 ? (
        <div
          style={{
            marginTop: "2rem",
            fontSize: "13px",
            color: "#585b70",
            fontFamily: "inherit",
          }}
        >
          <span style={{ color: "#f38ba8" }}>error: </span>
          no posts matching{" "}
          <span style={{ color: "#cba6f7" }}>
            &quot;{query || activeTag}&quot;
          </span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}