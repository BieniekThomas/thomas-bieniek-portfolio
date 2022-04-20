import { useMotionValue, motion, useSpring } from "framer-motion";
import { forwardRef, useEffect } from "react";
import styles from './Cursor.module.scss';


const Cursor = forwardRef<HTMLInputElement>(() => {
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

  return (
    <>
      <motion.div className={styles.fixed} style={{
        translateX: cursorX,
        translateY: cursorY
      }}>
        <div className={styles.smallBall} />
      </motion.div>
      
      <motion.div className={styles.fixed} style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}>
        <div className={styles.bigBall} />
      </motion.div>
    </>
  )
})

Cursor.displayName = "Cursor";

export default Cursor;