import NoScrollLink from "../NoScrollLink/NoScrollLink";
import styles from "./GalleryNavigation.module.scss";
import { IGallerySectionProps } from "./GallerySection";
import {AnimatePresence, motion} from 'framer-motion'

export interface IGalleryNavigationProps {
  galleries: IGallerySectionProps["galleries"];
  index: number;
  setIndex: (i: number) => void;
}

export function GalleryNavigation({
  galleries,
  index,
  setIndex,
}: IGalleryNavigationProps) {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.headline}>Galleries</div>
      <div className={styles.innerWrapper}>
        <AnimatePresence mode="wait">
        {galleries.map((gallery, i) => {
          return (<div style={{position: 'relative'}}>
            <NoScrollLink
              noLink
              key={gallery.fields.title}
              onClick={() => setIndex(i)}
            >
              {gallery.fields.title}
            </NoScrollLink>
            {i === index && <motion.div className={styles.underline} layoutId="underline" id="underline"/>}
            </div>
          );
        })}
        </AnimatePresence>
      </div>
    </div>
  );
}
