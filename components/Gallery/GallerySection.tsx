import { AnimatePresence } from "framer-motion";
import { GalleryNavigation } from "./GalleryNavigation";
import Gallery from "./Gallery";
import { motion } from "framer-motion";
import styles from "./GallerySection.module.scss";

import {
  IMultiMediaGalleryFields,
  IPhotoGalleryFields,
} from "../../@types/generated/contentful";
import { framer_default_variants } from "../../lib/framer";
import { IGalleryNameKeys } from "../../pages";

export interface IGallerySectionProps {
  galleries: {
    fields: IPhotoGalleryFields | IMultiMediaGalleryFields;
  }[];
  nameKey: IGalleryNameKeys;
  readonly currentIndex?: number;
  readonly onIndexChange?: (index: number) => void;
}

export function GallerySection({
  galleries,
  nameKey,
  currentIndex,
  onIndexChange,
}: IGallerySectionProps) {
  // const [galleryIndex, setGalleryIndex] = useState(currentIndex ?? 0);
  return (
    <>
      <GalleryNavigation
        galleries={galleries}
        index={currentIndex}
        setIndex={(index: number) => {
          onIndexChange?.(index);
        }}
        nameKey={nameKey}
      />
      <motion.div
        className={styles.outerWrapper}
        initial="hidden"
        exit="exit"
        variants={framer_default_variants}
        whileInView={"enter"}
        viewport={{ once: true }}
        transition={{ type: "spring" }}
      >
        <AnimatePresence mode="popLayout">
          {
            <motion.div
              key={galleries[currentIndex].fields.slug}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ type: "spring" }}
            >
              <Gallery
                key={galleries[currentIndex].fields.slug}
                data={galleries[currentIndex]}
              />
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </>
  );
}
