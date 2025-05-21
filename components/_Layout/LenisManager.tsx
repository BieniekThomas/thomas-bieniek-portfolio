import Lenis from "@studio-freight/lenis";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

interface ILenis {
  lenis: Lenis | undefined;
}
export const LenisContext = createContext<ILenis>({
  lenis: undefined,
});

export const useLenisManagerContext = () => useContext(LenisContext);
export interface IChildren {
  children: ReactNode[] | ReactNode;
}

export const LenisManager = ({ children }: IChildren) => {
  const [ready, setReady] = useState(false);
  const lenis = useRef<Lenis>(null);

  useIsomorphicLayoutEffect(() => {
    if (ready && lenis.current) return;
    lenis.current = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 0.6,
    });

    function raf(time: number) {
      lenis?.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // for re-rendering?
    setReady(true);

    return () => {
      lenis.current?.destroy();
      setReady(false);
    };
  }, []);

  if (!lenis.current) {
    return <>{children}</>
  }

  return (
    <LenisContext.Provider value={{ lenis: lenis.current }}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisManager;
