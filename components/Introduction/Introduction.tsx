import { FC, useRef } from "react";
import { IAuthorFields } from "../../@types/generated/contentful";
import styles from "./Introduction.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { BackgroundImage } from "../Image/BackgroundImage";
import { AnimatedText } from "../AnimatedText/AnimatedText";
import { framer_default_variants } from "../../lib/framer";

interface IIntroduction {
  data: {
    fields: IAuthorFields;
  };
}

export const Introduction: FC<IIntroduction> = ({ data }) => {
  const { biography, name, profilePhoto } = data.fields;
  const container = useRef(null);
  const { height } = useWindowDimensions();
  const h = height ?? 0;
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-h / 2, h / 3]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  return (
    <>
      <div className={styles.outerWrapper} ref={container}>
        <div>
          <h1>{name && <AnimatedText text={name} />}</h1>
        </div>
        {profilePhoto && (
          <motion.div
            className={styles.backgroundImage}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={framer_default_variants}
            transition={{ type: "spring" }}
          >
            <motion.div style={{ y, opacity: opacity }}>
              <BackgroundImage data={profilePhoto} />
            </motion.div>
          </motion.div>
        )}
        <div>
          <span className={styles.bigFont}>
            {biography && <AnimatedText text={biography} />}
          </span>
        </div>
      </div>
    </>
  );
};
