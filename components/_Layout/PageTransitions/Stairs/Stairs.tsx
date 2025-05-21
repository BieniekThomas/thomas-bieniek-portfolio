import { motion, Variants } from "framer-motion";
import { FC, ReactNode } from "react";
import styles from "./Stairs.module.scss";

interface IStairs {
  children: ReactNode | ReactNode[];
}

const NUMBER_OF_COLUMNS = 5;
export const Stairs: FC<IStairs> = ({ children }) => {
  const anim = (variants: Variants, custom: number) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
      custom,
    };
  };

  const expand = {
    initial: {
      top: 0,
    },
    enter: (i: number) => ({
      top: "100%",
      transition: {
        duration: 0.4,
        delay: 0.05 * (NUMBER_OF_COLUMNS - i),
      },
      transitionEnd: {
        height: 0,
        top: 0,
      },
    }),
    exit: (i: number) => ({
      height: "100%",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
      },
    }),
  };

  return (
    <>
      <div className={styles.stairs}>
        <div className={styles.transitionContainer}>
          {[...Array(NUMBER_OF_COLUMNS)].map((_, i) => {
            return <motion.div {...anim(expand, i)} key={`stairs-${i}`} />;
          })}
        </div>
      </div>
      {children}
    </>
  );
};
