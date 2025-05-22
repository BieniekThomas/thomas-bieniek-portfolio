import { FC } from "react";
import styles from "./Contact.module.scss";
import { motion } from "framer-motion";
import { AnimatedText } from "../AnimatedText/AnimatedText";
import NoScrollLink from "../NoScrollLink/NoScrollLink";

export const Contact: FC = () => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div></div>
        <motion.div className={styles.link}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <NoScrollLink
              url={"mailto:thomas.bieniek@gmail.com"}
              cursor="withText"
              blendMode
              targetBlank
              cursorText=":)"
            >
              <AnimatedText text={"thomas.bieniek@gmail.com"} />
            </NoScrollLink>
          </motion.div>
          <div></div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <NoScrollLink
              url={"https://www.instagram.com/thomas_bieniek/"}
              cursor="withText"
              blendMode
              targetBlank
              cursorText="B-)"
            >
              <AnimatedText text={"Instagram Fotografie"} />
            </NoScrollLink>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <NoScrollLink
              url={"https://www.instagram.com/thomas_bieniek_digital/"}
              cursor="withText"
              blendMode
              targetBlank
              cursorText="O_O"
            >
              <AnimatedText text={"Instagram VJ/Multi-Media"} />
            </NoScrollLink>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <NoScrollLink
              url={"https://soundcloud.com/thomasbieniek"}
              cursor="withText"
              blendMode
              targetBlank
              cursorText="\o/"
            >
              <AnimatedText text={"Producer/DJ"} />
            </NoScrollLink>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
