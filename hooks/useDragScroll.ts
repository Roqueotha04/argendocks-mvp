"use client";

import { useEffect, useRef } from "react";

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTimestamp = 0;
    let frame = 0;

    const cancelMomentum = () => cancelAnimationFrame(frame);

    const runMomentum = () => {
      velocity *= 0.92;
      element.scrollLeft -= velocity;
      if (Math.abs(velocity) > 0.4) {
        frame = requestAnimationFrame(runMomentum);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      isDragging = true;
      cancelMomentum();
      startX = event.clientX;
      startScrollLeft = element.scrollLeft;
      lastX = event.clientX;
      lastTimestamp = event.timeStamp;
      velocity = 0;
      element.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      element.scrollLeft = startScrollLeft - (event.clientX - startX);
      const elapsed = event.timeStamp - lastTimestamp;
      if (elapsed > 0) velocity = ((event.clientX - lastX) / elapsed) * 16;
      lastX = event.clientX;
      lastTimestamp = event.timeStamp;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      element.releasePointerCapture(event.pointerId);
      frame = requestAnimationFrame(runMomentum);
    };

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelMomentum();
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return ref;
}
