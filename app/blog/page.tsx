import BlogIndex from "@/app/blog/BlogIndex";
import BlogPageBootGate from "@/app/blog/components/BlogPageBootGate";
import TerminalPromptOnly from "@/app/blog/components/TerminalPromptOnly";

export default function BlogPage() {
  return (
    <BlogPageBootGate>
      <BlogIndex />
      <TerminalPromptOnly />
    </BlogPageBootGate>
  );
}