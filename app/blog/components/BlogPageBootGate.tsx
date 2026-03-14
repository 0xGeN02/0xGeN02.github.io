"use client";

import { useEffect, useState, type ReactNode } from "react";
import BlogBootSequence from "@/app/blog/components/DownloadSequence";

interface BlogPageBootGateProps {
  children: ReactNode;
}

function getBootingStateFromSession(): boolean {
  const forceBoot = sessionStorage.getItem("forceBlogBoot") === "1";
  if (forceBoot) {
    sessionStorage.removeItem("forceBlogBoot");
    return true;
  }

  const previousPath = sessionStorage.getItem("previousPath") ?? "";
  const fromBlogPost =
    previousPath.startsWith("/blog/") && previousPath !== "/blog";

  return !fromBlogPost;
}

export default function BlogPageBootGate({ children }: BlogPageBootGateProps) {
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    setBooting(getBootingStateFromSession());
  }, []);

  return booting ? (
    <BlogBootSequence onDone={() => setBooting(false)} />
  ) : (
    <>{children}</>
  );
}