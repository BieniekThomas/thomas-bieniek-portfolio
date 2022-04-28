import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { FC, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { IPhotoGallery } from "../../@types/generated/contentful";
import { framer_default_variants } from "../../lib/framer";
import ContentfulImage from "../Image/Image";
import NoScrollLink from "../NoScrollLink/NoScrollLink";
import styles from "./Gallery.module.scss";
import { Asset } from "contentful";
import Modal from "../Modal/Modal";
import { Icon } from "../Icon/Icon";
import { enableBodyScroll } from "body-scroll-lock";

interface IGallery {
  data: IPhotoGallery;
}

interface IGalleryModal {
  photos: Asset[];
  windowWidth: number;
  onClose: () => void;
}

const GalleryModal = ({ photos, windowWidth, onClose }: IGalleryModal) => {
  const galleryRef = useRef(null);

  const renderPhotos = () => {
    if (!photos) {
      return null;
    }

    return (
      <AnimateSharedLayout type="crossfade">
        {/* <motion.div layout> */}
        {photos.map((image) => {
          const title = image.fields.file.fileName;
          return (
            <motion.div
              key={title}
              className={styles.image}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <ContentfulImage data={image} windowWidth={700} />
            </motion.div>
          );
        })}
        {/* </motion.div> */}
      </AnimateSharedLayout>
    );
  };

  return (
    <Modal>
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={framer_default_variants}
        transition={{
          type: "linear",
          staggerChildren: 0.2,
          delayChildren: 0.5,
        }}
      >
        <div className={styles.close} onClick={onClose}>
          <Icon iconName="close" cursorText="close gallery" hoverAnimation />
        </div>
        <div ref={galleryRef}>
          <motion.div
            className={styles.photosWrapper}
            drag="x"
            dragConstraints={galleryRef}
          >
            {renderPhotos()}
          </motion.div>
        </div>
      </motion.div>
    </Modal>
  );
};

const Gallery: FC<IGallery> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1920);
  const width = useWindowSize().width;
  const { title, description, photos, coverImage } = data.fields;

  useEffect(() => {
    setWindowWidth(width);
  }, [width]);

  useEffect(() => {
    const body = document?.getElementById("main-container");
    if (!open && body) {
      enableBodyScroll(body);
    }
  }, [open]);

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.left}>
          <h3 className={styles.headline}>{title}</h3>
          <div className={styles.descriptionWrapper}>
            <div></div>
            {description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
          </div>
        </div>
        <div className={styles.right}>
          {coverImage && (
            <NoScrollLink
              onClick={() => setOpen(!open)}
              noStyling
              cursor="withText"
              cursorText="open gallery"
            >
              <ContentfulImage
                data={coverImage}
                windowWidth={windowWidth}
                priority
              />
            </NoScrollLink>
          )}
        </div>
        {photos && (
          <AnimatePresence exitBeforeEnter>
            {open && (
              <GalleryModal
                photos={photos}
                windowWidth={windowWidth}
                onClose={() => setOpen(false)}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Gallery;
