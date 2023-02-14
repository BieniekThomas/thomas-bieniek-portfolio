import { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { GalleryNavigation } from "./GalleryNavigation";
import Gallery from "./Gallery";
import { motion } from "framer-motion";

import { IPhotoGallery } from "../../@types/generated/contentful";

export interface IGallerySectionProps {
  galleries: IPhotoGallery[];
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
      <AnimatePresence>
        {galleries[galleryIndex] && (
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
        )}
      </AnimatePresence>
    </>
  );
}
