import styles from "./Footer.module.scss";
const Footer = () => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.copyright}>©2022, Thomas Bieniek</div>
      </div>
    </div>
  );
};

export default Footer;
