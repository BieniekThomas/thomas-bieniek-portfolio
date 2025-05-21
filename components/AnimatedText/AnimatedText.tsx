import { motion, useInView } from "framer-motion"
import { ReactNode, useRef } from "react";
import styles from "./AnimatedText.module.scss";

const variant = {
  hidden: {
    y: "200%",
    transition: {
      ease: [0.455, 0.03, 0.515, 0.955],
      duration: 0.85,
    },
  },
  visible: {
    y: 0,
    transition: {
      ease: [0.455, 0.03, 0.515, 0.955],
      duration: 0.75,
    },
  },
};

function getSplitWordsArray(text: string) {
  const splitWords = text.split(" "); // [Hallo, Welt]
  const letters: string[][] = [];

  splitWords.forEach((word) => {
    letters.push(word.split(""));
  });

  letters.map((word) => word?.push("\u00A0"));

  return letters;
}

interface IAnimatedText {
  text: string | number;
  noStagger?: boolean;
}
export const AnimatedText = ({ text, noStagger }: IAnimatedText) => {
  const words = getSplitWordsArray(text.toString());
  const inViewRef = useRef<HTMLElement>(null);
  const isInView = useInView(inViewRef, {
    margin: "0px",
    once: true
  });

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  return (
    <span ref={inViewRef}>
      {words.map((word, index) => {
        if (!word || !isInView) return <p key={index}></p>;
        return (
          <span key={index} className={styles.wordWrapper}>
            <motion.span
              variants={noStagger ? {} : containerVariant}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {word.map((letter, letterIndex) => {
                return (
                  <span
                    style={{
                      overflow: "hidden",
                      display: "inline-block",
                    }}
                    key={`letterIndex-${letterIndex}`}
                  >
                    <motion.span
                      variants={variant}
                      style={{ display: "inline-block" }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                );
              })}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

const TextBlockVariant = {
  hidden: {
    y: "20%",
    opacity: 0,
    transition: {
      ease: [0.455, 0.03, 0.515, 0.955],
      duration: 0.85,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.455, 0.03, 0.515, 0.955],
      duration: 0.5,
    },
  },
};

interface IAnimatedTextBlock {
  children: ReactNode[] | ReactNode;
}
export const AnimatedTextBlock = ({ children }: IAnimatedTextBlock) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, {
    margin: "0px",
  });

  return (
    <div ref={inViewRef}>
      <motion.div
        variants={TextBlockVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};
