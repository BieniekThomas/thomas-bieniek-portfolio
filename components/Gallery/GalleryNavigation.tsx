import NoScrollLink from "../NoScrollLink/NoScrollLink";
import styles from "./GalleryNavigation.module.scss";
import { IGallerySectionProps } from "./GallerySection";
import { AnimatePresence, motion } from "framer-motion";

export interface IGalleryNavigationProps {
  galleries: IGallerySectionProps["galleries"];
  index: number;
  setIndex: (i: number) => void;
  nameKey: string;
}

export function GalleryNavigation({
  galleries,
  index,
  setIndex,
  nameKey,
}: IGalleryNavigationProps) {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.headline}>Galleries</div>
      <div className={styles.innerWrapper}>
        <AnimatePresence mode="popLayout">
          {galleries.map((gallery, i) => {
            return (
              <div
                style={{ position: "relative", cursor: "pointer" }}
                key={gallery.fields.title}
              >
                <NoScrollLink
                  noLink
                  key={gallery.fields.title}
                  onClick={() => setIndex(i)}
                >
                  {gallery.fields.title}
                </NoScrollLink>
                {i === index && (
                  <motion.div
                    className={styles.underline}
                    layoutId={`${nameKey}-underline`}
                    id={`${nameKey}-underline`}
                  />
                )}
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
