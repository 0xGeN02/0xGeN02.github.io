"use client";

import { useState, type ReactNode } from "react";
import BlogBootSequence from "@/app/blog/components/DownloadSequence";

interface BlogPageBootGateProps {
  children: ReactNode;
}

export default function BlogPageBootGate({ children }: BlogPageBootGateProps) {
  const [booting, setBooting] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const forceBoot = sessionStorage.getItem("forceBlogBoot") === "1";
    if (forceBoot) {
      sessionStorage.removeItem("forceBlogBoot");
      return true;
    }

    const previousPath = sessionStorage.getItem("previousPath") ?? "";
    const fromBlogPost =
      previousPath.startsWith("/blog/") && previousPath !== "/blog";

    return !fromBlogPost;
  });

  return booting ? (
    <BlogBootSequence onDone={() => setBooting(false)} />
  ) : (
    <>{children}</>
  );
}
