"use client";

import { useEffect, useState } from "react";

export function useCycle(length: number, intervalMs: number, enabled: boolean): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [length, intervalMs, enabled]);

  return index;
}
