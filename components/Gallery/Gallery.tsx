import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { FC, useRef } from "react";
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
  const imageRef = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-13.5deg", "13.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-13.5deg", "13.5deg"])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const { width, height, left, top } = imageRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0)
  }

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
        <motion.div className={styles.right}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          //@ts-ignore
          ref={imageRef}
          onMouseMove={e => handleMouseMove(e)}
          onMouseLeave={handleMouseLeave}
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gallery;
