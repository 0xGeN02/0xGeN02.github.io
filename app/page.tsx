"use client";
import { useState } from "react";
import BootSequence from "@/app/components/BootSequence";
import Terminal from "@/app/components/Terminal";

export default function Home() {
  const [booting, setBooting] = useState(true);

  return booting ? (
    <BootSequence lang="en" onDone={() => setBooting(false)} />
  ) : (
    <Terminal />
  );
}
