import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

const useMousePosition = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return { cursorX, cursorY }
}

export default useMousePosition;