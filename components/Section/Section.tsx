import styles from "./Section.module.scss";

export interface ISectionProps {
  number: number;
  headline?: string;
  subHeadline?: string;
}

export function Section({ number, headline, subHeadline }: ISectionProps) {
  const zeroPad = (num: number, places: number) =>
    String(num).padStart(places, "0");

  // Idee: query anhängen

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.number}>{zeroPad(number, 2)}</div>
        <div className={styles.headline}>{headline ?? headline}</div>
        <div className={styles.subHeadline}>{subHeadline ?? subHeadline}</div>
      </div>
    </div>
  );
}
