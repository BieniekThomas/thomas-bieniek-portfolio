import { AnimatePresence, motion } from "framer-motion";
import React, { FC, useState } from "react";
import { IPhotoGallery } from "../../@types/generated/contentful";
import ContentfulImage from "../Image/Image";
import NoScrollLink from "../NoScrollLink/NoScrollLink";
import styles from "./Gallery.module.scss";
// import { enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
// import { useCursorContext } from "../Cursor/CursorManager";
import Text from "../Text/Text";
import { GalleryModal } from "./GalleryModal";

interface IGallery {
  data: IPhotoGallery;
}

export const Gallery: FC<IGallery> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { title, description, photos, coverImage, slug } = data.fields;

  return (
    <div className={styles.outerWrapper} id={slug}>
      <motion.div
        className={styles.innerWrapper}
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
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
              <ContentfulImage data={coverImage} />
            </NoScrollLink>
          )}
        </div>
        {photos && (
          <AnimatePresence exitBeforeEnter>
            {open && (
              <GalleryModal
                photos={photos}
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
