import styles from "./Footer.module.scss";
import PageData from "../../pageData";
import React from "react";
import NoScrollLink from "../NoScrollLink/NoScrollLink";

const Footer = () => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.copyright}>©2022, Thomas Bieniek</div>
        <div className={styles.links}>
          {PageData.navigation.map(
            (nav) =>
              nav.displayInFooter && (
                <NoScrollLink
                  url={nav.url}
                  key={nav.url}
                  cursor="big"
                  blendMode
                >
                  {nav.navigationTitle}
                </NoScrollLink>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
