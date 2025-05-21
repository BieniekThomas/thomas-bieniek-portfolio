import { FC, ReactNode } from "react";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import styles from "./Layout.module.scss";
import { Stairs } from "./PageTransitions/Stairs/Stairs";

interface ILayout {
  children: ReactNode | ReactNode[];
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navigation />
      <Stairs>
        <div className={styles.spacer}></div>
        <div>{children}</div>
        <Footer />
      </Stairs>
    </>
  );
};

export default Layout;
