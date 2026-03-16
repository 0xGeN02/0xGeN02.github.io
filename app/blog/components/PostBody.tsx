import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import React from "react";
import CodeBlock from "./CodeBlock";

interface PostBodyProps {
  content: string;
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      {...props}
      style={{
        fontSize: "24px",
        fontWeight: 600,
        color: "#cdd6f4",
        marginTop: "2.3rem",
        marginBottom: "1rem",
        fontFamily: "inherit",
        letterSpacing: "-0.02em",
      }}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      style={{
        fontSize: "20px",
        fontWeight: 600,
        color: "#b4befe",
        marginTop: "2.2rem",
        marginBottom: "0.9rem",
        fontFamily: "inherit",
        letterSpacing: "-0.01em",
      }}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      {...props}
      style={{
        fontSize: "16px",
        fontWeight: 550,
        color: "#cba6f7",
        marginTop: "1.7rem",
        marginBottom: "0.5rem",
        fontFamily: "inherit",
        letterSpacing: "-0.01em",
      }}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      {...props}
      style={{
        fontSize: "14px",
        fontWeight: 550,
        color: "#f38ba8",
        marginTop: "1.5rem",
        marginBottom: "0.5rem",
        fontFamily: "inherit",
        letterSpacing: "-0.01em",
      }}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      style={{
        fontSize: "14px",
        color: "#a6adc8",
        fontWeight: 550,
        lineHeight: 1.8,
        margin: "0.75rem 0",
        fontFamily: "inherit",
        letterSpacing: "-0.005em",
      }}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="blog-post-link"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#89b4fa",
        textDecoration: "none",
        borderBottom: "1px solid #313244",
        transition: "border-color 0.12s",
      }}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div style={{ overflowX: "auto", margin: "1.25rem 0" }}>
      <table
        {...props}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
          fontFamily: "inherit",
          color: "#a6adc8",
        }}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props} style={{ borderBottom: "1px solid #45475a" }} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...props}
      style={{
        padding: "8px 14px",
        textAlign: "left",
        fontWeight: 500,
        color: "#cdd6f4",
        letterSpacing: "0.02em",
        fontSize: "12px",
        whiteSpace: "nowrap",
      }}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      {...props}
      style={{
        padding: "7px 14px",
        borderBottom: "1px solid #313244",
        verticalAlign: "top",
      }}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      {...props}
      style={{ transition: "background 0.1s" }}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // inline code — no className = not a highlighted block
    if (!props.className) {
      return (
        <code
          {...props}
          style={{
            background: "#181825",
            color: "#cba6f7",
            padding: "1px 6px",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "inherit",
          }}
        />
      );
    }
    // highlighted block — colors from globals.css
    return <code {...props} />;
  },
  pre: CodeBlock,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      style={{
        borderLeft: "2px solid #cba6f7",
        borderRadius: 0,
        paddingLeft: "1rem",
        margin: "1rem 0",
        color: "#585b70",
        fontStyle: "italic",
        fontSize: "13px",
        fontFamily: "inherit",
      }}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      style={{
        paddingLeft: "1.25rem",
        margin: "0.75rem 0",
        color: "#a6adc8",
        fontSize: "13px",
        lineHeight: 1.8,
        fontFamily: "inherit",
      }}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      style={{
        paddingLeft: "1.25rem",
        margin: "0.75rem 0",
        color: "#a6adc8",
        fontSize: "13px",
        lineHeight: 1.8,
        fontFamily: "inherit",
      }}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} style={{ marginBottom: "0.25rem", fontFamily: "inherit" }} />
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #313244",
        margin: "2rem 0",
      }}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} style={{ color: "#cdd6f4", fontWeight: 500 }} />
  ),
};

export default function PostBody({ content }: PostBodyProps) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypeHighlight, { detect: true }]],
          recmaPlugins: [remarkGfm],
        },
      }}
      components={mdxComponents}
    />
  );
}