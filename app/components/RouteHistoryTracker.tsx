"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteHistoryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = sessionStorage.getItem("currentPath");

    if (currentPath) {
      sessionStorage.setItem("previousPath", currentPath);
    }

    sessionStorage.setItem("currentPath", pathname);
  }, [pathname]);

  return null;
}
