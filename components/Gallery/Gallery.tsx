import { motion } from "framer-motion";
import React, { FC } from "react";
import { IPhotoGalleryFields } from "../../@types/generated/contentful";
import ContentfulImage from "../Image/Image";
import NoScrollLink from "../NoScrollLink/NoScrollLink";
import styles from "./Gallery.module.scss";
import Text from "../Text/Text";

interface IGallery {
  data: {
    fields: IPhotoGalleryFields
  };
}

export const Gallery: FC<IGallery> = ({ data }) => {
  const { title, description, coverImage, slug } = data.fields;

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
            noStyling
            cursor="withText"
            cursorText="open gallery"
            url={`/gallery/${slug}`}
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
              noStyling
              cursor="withText"
              cursorText="open gallery"
              url={`/gallery/${slug}`}
            >
              <ContentfulImage data={coverImage} />
            </NoScrollLink>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
