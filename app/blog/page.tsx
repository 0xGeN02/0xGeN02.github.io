"use client";
import { useState } from "react";
import BlogBootSequence from "@/app/blog/DownloadSequence";
//import BlogContent from "@/app/components/BlogContent";

export default function BlogPage() {
  const [booting, setBooting] = useState(true);
  return booting
    ? <BlogBootSequence onDone={() => setBooting(false)} />
    : <h1>Hi</h1>;
}