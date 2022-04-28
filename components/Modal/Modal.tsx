import * as ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { framer_overlay_variants } from "../../lib/framer";
import styles from "./Modal.module.scss";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface IModal {
  children: ReactElement | ReactElement[];
}

const Modal = ({ children }: IModal) => {
  const [main, setMain] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const body = document.getElementById("main-container");
    setMain(body);
    body && disableBodyScroll(body);
    return () => {
      body && enableBodyScroll(body);
    };
  }, []);

  return main
    ? ReactDOM.createPortal(
        <div className={styles.modalWrapper}>
          <motion.div
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={framer_overlay_variants}
            transition={{
              type: "spring",
              bounce: 0,
              staggerChildren: 0.5,
              when: "beforeChildren",
            }}
            className={styles.overlayOne}
          >
            <motion.div
              initial="hidden"
              animate="enter"
              exit="exit"
              variants={framer_overlay_variants}
              transition={{
                type: "spring",
                bounce: 0.25,
                staggerChildren: 0.5,
                delay: 1,
              }}
              className={styles.overlayTwo}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>,
        main
      )
    : null;
};

export default Modal;
