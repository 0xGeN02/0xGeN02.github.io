"use client";

import { useState, type ReactNode } from "react";
import BlogBootSequence from "@/app/blog/components/DownloadSequence";

interface BlogPageBootGateProps {
  children: ReactNode;
}

export default function BlogPageBootGate({ children }: BlogPageBootGateProps) {
  const [booting, setBooting] = useState(true);

  return booting ? (
    <BlogBootSequence onDone={() => setBooting(false)} />
  ) : (
    <>{children}</>
  );
}
