import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { GalleryNavigation } from "./GalleryNavigation";
import Gallery from "./Gallery";
import { motion } from "framer-motion";
import styles from "./GallerySection.module.scss";
import Link from "next/link";

import { IPhotoGallery, IPhotoGalleryFields } from "../../@types/generated/contentful";
// import { framer_default_variants } from "../../lib/framer";

export interface IGallerySectionProps {
  galleries: {
    fields: IPhotoGalleryFields
  }[];
}

export function GallerySection({ galleries }: IGallerySectionProps) {
  console.log("🚀 ~ GallerySection ~ galleries:", galleries)
  const [galleryIndex, setGalleryIndex] = useState(0);
  return (
    <>
      <GalleryNavigation
        galleries={galleries}
        index={galleryIndex}
        setIndex={(index: number) => setGalleryIndex(index)}
      />
      <div className={styles.outerWrapper}>
        <AnimatePresence>
          {
            // galleries[galleryIndex] && (
            //   <Link href={`/gallery/${galleries[galleryIndex].fields.slug}`}>
            //     {galleries[galleryIndex].fields.slug}
            //   </Link>
            // )
            <motion.div
              key={galleries[galleryIndex].fields.slug}
              initial={{ x: 300, opacity: 0, position: "absolute" }}
              animate={{ x: 0, opacity: 1, position: "relative" }}
              exit={{ x: -300, opacity: 0, position: "absolute" }}
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
