import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { GalleryNavigation } from "./GalleryNavigation";
import Gallery from "./Gallery";
import { motion } from "framer-motion";
import styles from "./GallerySection.module.scss";

import { IPhotoGalleryFields } from "../../@types/generated/contentful";

export interface IGallerySectionProps {
  galleries: {
    fields: IPhotoGalleryFields
  }[];
}

export function GallerySection({ galleries }: IGallerySectionProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  return (
    <>
      <GalleryNavigation
        galleries={galleries}
        index={galleryIndex}
        setIndex={(index: number) => setGalleryIndex(index)}
      />
      <div className={styles.outerWrapper}>
        <AnimatePresence mode="popLayout">
          {
            <motion.div
              key={galleries[galleryIndex].fields.slug}
              initial={{ y: 0, opacity: 0, }}
              animate={{ y: 0, opacity: 1, }}
              exit={{ y: 0, opacity: 0, }}
            >
              <Gallery
                key={galleries[galleryIndex].fields.slug}
                data={galleries[galleryIndex]}
              />
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </>
  );
}
