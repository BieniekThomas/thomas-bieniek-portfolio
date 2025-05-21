import React, { FunctionComponent } from "react";
import PageData from "../../pageData";
import NoScrollLink from "../NoScrollLink/NoScrollLink";
import styles from "./Navigation.module.scss";

// const Professions = () => {
//   return (
//     <div className={styles.profession}>
//       {PageData.profession.map((prof) => {
//         return (
//           <>
//             <span key={prof}>{prof}</span>
//             <span className={styles.spacer} />
//           </>
//         );
//       })}
//     </div>
//   );
// };

const Links = () => {
  return (
    <div className={styles.links}>
      {PageData.navigation.map(
        (nav) =>
          nav.displayInNavigation && (
            <React.Fragment key={nav.name}>
              <NoScrollLink url={nav.url} cursor="big" blendMode>
                {nav.navigationTitle}
              </NoScrollLink>
              <span className={styles.spacer}></span>
            </React.Fragment>
          )
      )}
    </div>
  );
};

const Navigation: FunctionComponent = () => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.name}>
          <NoScrollLink url="/" cursor="big" blendMode>
            {PageData.name}
          </NoScrollLink>
        </div>
        <Links />
      </div>
    </div>
  );
};

export default Navigation;
