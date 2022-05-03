import { useMotionValue, motion, useSpring } from "framer-motion";
import { useEffect } from "react";
import styles from "./Cursor.module.scss";
import { useCursorContext } from "./CursorManager";

const Cursor = () => {
  const { size, text } = useCursorContext();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

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

  const getClassName = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "big":
        return styles.big;
      case "image":
        return styles.image;
      case "withText":
        return styles.withText;
      case "drag":
        return styles.drag;
    }
  };

  return (
    <>
      <motion.div
        className={`${styles.fixed} ${styles.smallBall} ${getClassName()}`}
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
      >
        {/* <div className={styles.smallBall}></div> */}
      </motion.div>

      <motion.div
        className={`${styles.fixed} ${styles.bigBall} ${getClassName()}`}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      >
        {size === "withText" && (
          <span className={styles.text}>{text || "show me"}</span>
        )}
      </motion.div>
    </>
  );
};

Cursor.displayName = "Cursor";

export default Cursor;
