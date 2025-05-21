import styles from "./Footer.module.scss";
import PageData from "../../pageData";
import React from "react";
import NoScrollLink from "../NoScrollLink/NoScrollLink";

const Footer = () => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.copyright}>©2025, Thomas Bieniek</div>
        <div>
          <NoScrollLink
              url={"https://github.com/BieniekThomas"}
              cursor="big"
              blendMode
            >
              GitHub
            </NoScrollLink>
        </div>
        <div>
          <NoScrollLink
              url={"https://www.instagram.com/thomas_bieniek_digital"}
              cursor="big"
              blendMode
            >
              Instagram
            </NoScrollLink>
        </div>
        <div>
          <NoScrollLink
              url={"https://soundcloud.com/thomasbieniek"}
              cursor="big"
              blendMode
            >
              SoundCloud
            </NoScrollLink>
        </div>
        
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
