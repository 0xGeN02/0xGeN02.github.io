import BlogIndex from "@/app/blog/BlogIndex";
import BlogPageBootGate from "@/app/blog/components/BlogPageBootGate";

export default function BlogPage() {
  return (
    <BlogPageBootGate>
      <BlogIndex />
    </BlogPageBootGate>
  );
}