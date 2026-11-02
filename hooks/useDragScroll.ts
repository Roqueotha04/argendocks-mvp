"use client";

import { useEffect, useRef } from "react";

const DRAG_THRESHOLD_PX = 6;

export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isPointerDown = false;
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
      isPointerDown = true;
      isDragging = false;
      cancelMomentum();
      startX = event.clientX;
      startScrollLeft = element.scrollLeft;
      lastX = event.clientX;
      lastTimestamp = event.timeStamp;
      velocity = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isPointerDown) return;
      if (!isDragging) {
        if (Math.abs(event.clientX - startX) < DRAG_THRESHOLD_PX) return;
        isDragging = true;
        element.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
      element.scrollLeft = startScrollLeft - (event.clientX - startX);
      const elapsed = event.timeStamp - lastTimestamp;
      if (elapsed > 0) velocity = ((event.clientX - lastX) / elapsed) * 16;
      lastX = event.clientX;
      lastTimestamp = event.timeStamp;
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      if (!isDragging) return;
      element.releasePointerCapture(event.pointerId);
      frame = requestAnimationFrame(runMomentum);
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      event.stopPropagation();
      isDragging = false;
    };

    const onDragStart = (event: DragEvent) => event.preventDefault();

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointercancel", onPointerUp);
    element.addEventListener("click", onClickCapture, true);
    element.addEventListener("dragstart", onDragStart);

    return () => {
      cancelMomentum();
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointercancel", onPointerUp);
      element.removeEventListener("click", onClickCapture, true);
      element.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return ref;
}
