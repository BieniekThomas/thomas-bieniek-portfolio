import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { framer_default_variants } from "../../lib/framer";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import styles from "./Layout.module.scss";

interface ILayout {
  children: ReactNode | ReactNode[];
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navigation />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={framer_default_variants}
        transition={{ type: "linear" }}
        className={styles.outer}
      >
        <div className={styles.spacer}></div>
        <div>{children}</div>
      </motion.main>
      <Footer />
    </>
  );
};

export default Layout;
