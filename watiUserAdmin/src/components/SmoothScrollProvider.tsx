// SmoothScrollProvider.tsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      //@ts-expect-error Lenis type error
      smooth: true,
      lerp: 0.09, // lower = smoother
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div data-lenis-scroll>{children}</div>;
};

export default SmoothScrollProvider;
