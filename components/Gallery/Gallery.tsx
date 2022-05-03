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
import { useCursorContext } from "../Cursor/CursorManager";
import { Section, zeroPad } from "../Section/Section";
import Text from "../Text/Text";

interface IGallery {
  data: IPhotoGallery;
}

interface IGalleryModal {
  photos: Asset[];
  windowWidth?: number;
  onClose: () => void;
  title?: string;
}

const GalleryModal = ({
  photos,
  windowWidth,
  onClose,
  title,
}: IGalleryModal) => {
  const galleryRef = useRef(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const renderPhotos = () => {
    if (!photos) {
      return null;
    }

    return (
      <AnimateSharedLayout type="crossfade">
        {/* <motion.div layout> */}
        {photos.map((image, index) => {
          const imageName = image.fields.file.fileName;
          return (
            <motion.div
              id={index.toString()}
              key={imageName}
              className={styles.image}
              initial={{ opacity: 0, y: 30, filter: "grayscale(100%)" }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter:
                  index === photoIndex ? "grayscale(0%)" : "grayscale(100%)",
                scale: index === photoIndex ? 1 : 0.85,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <ContentfulImage data={image} windowWidth={700} />
            </motion.div>
          );
        })}
        {/* </motion.div> */}
      </AnimateSharedLayout>
    );
  };

  const onIncrement = () => {
    setPhotoIndex((index) => index + 1);
  };

  const onDecrement = () => {
    setPhotoIndex((index) => index - 1);
  };

  return (
    <Modal title={title}>
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
        <div className={styles.next} onClick={() => onIncrement()}>
          <Icon iconName="arrow_forward" hoverAnimation />
        </div>
        <div className={styles.prev} onClick={() => onDecrement()}>
          <Icon iconName="arrow_backward" hoverAnimation />
        </div>
        <Section
          number={photoIndex + 1}
          headline={`${zeroPad(photos.length, 2)} pictures`}
          subHeadline={title}
        />
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
  const { setSize } = useCursorContext();
  const { title, description, photos, coverImage, slug } = data.fields;

  useEffect(() => {
    setWindowWidth(width);
  }, [width]);

  useEffect(() => {
    const body = document?.getElementById("main-container");
    if (!open && body) {
      enableBodyScroll(body);
    }
    if (open) {
      setSize("drag");
    }
  }, [open, setSize]);

  return (
    <div className={styles.outerWrapper} id={slug} data-scroll-section>
      <motion.div
        className={styles.innerWrapper}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className={styles.left}>
          <NoScrollLink
            onClick={() => setOpen((open) => !open)}
            noStyling
            cursor="withText"
            cursorText="open gallery"
          >
            <h3 className={styles.headline}>{title}</h3>
          </NoScrollLink>
          <div className={styles.descriptionWrapper}>
            <>
              <div></div>
              {description && (
                <div className={styles.description}>
                  {Text({ text: description })}
                </div>
              )}
            </>
          </div>
        </div>
        <div className={styles.right}>
          {coverImage && (
            <NoScrollLink
              onClick={() => setOpen((open) => !open)}
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
                title={title}
                onClose={() => setOpen(false)}
              />
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default Gallery;
