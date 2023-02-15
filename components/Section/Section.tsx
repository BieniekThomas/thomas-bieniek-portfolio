import styles from "./Section.module.scss";
import { motion } from "framer-motion";
import { AnimatedText } from "../AnimatedText/AnimatedText";

export interface ISectionProps {
  number?: number;
  headline?: string;
  subHeadline?: string;
}

export const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

export function Section({ number, headline, subHeadline }: ISectionProps) {
  // Idee: query anhängen

  return (
    <div className={styles.outerWrapper} id={headline}>
      <div className={styles.innerWrapper}>
        <div className={styles.number}>
          {number && <AnimatedText text={zeroPad(number, 2)} />}
        </div>
        <div className={styles.headline}>
          {headline && <AnimatedText text={headline} />}
        </div>
        <div className={styles.subHeadline}>
          {subHeadline && <AnimatedText text={subHeadline} />}
        </div>
      </div>
    </div>
  );
}
