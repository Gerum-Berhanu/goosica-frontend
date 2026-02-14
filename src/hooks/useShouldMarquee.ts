import { useLayoutEffect, useRef, useState } from "react";

/**
 * Returns whether the text overflows its container and should use marquee.
 * Uses requestAnimationFrame and guards setState after unmount.
 */
export function useShouldMarquee(
  containerRef: React.RefObject<HTMLDivElement | null>,
  textRef: React.RefObject<HTMLSpanElement | null>,
  dependency: string
): boolean {
  const [shouldMarquee, setShouldMarquee] = useState(false);
  const isMountedRef = useRef(true);

  useLayoutEffect(() => {
    isMountedRef.current = true;
    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;
      if (!isMountedRef.current) return;
      setShouldMarquee(text.scrollWidth > container.clientWidth);
    });
    return () => {
      isMountedRef.current = false;
      cancelAnimationFrame(raf);
    };
  }, [containerRef, textRef, dependency]);

  return shouldMarquee;
}
