import { AnimatePresence, motion } from "framer-motion";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import { zeroPad } from "../Section/Section";
import Text from "../Text/Text";

interface IGallery {
  data: IPhotoGallery;
}

interface IGalleryModal {
  photos: Asset[];
  windowWidth: number;
  windowHeight: number;
  onClose: () => void;
  title?: string;
}

interface ExtendedAsset extends Asset {
  marginLeft: number;
  marginRight: number;
  spaceLeft: number;
  imageWidth: number;
  leftCenter: number;
  ratio: number;
}

const GalleryModal = ({
  photos,
  windowWidth,
  windowHeight,
  onClose,
  title,
}: IGalleryModal) => {
  const photoAmount = photos.length;
  const galleryRef = useRef(null);
  const photoWrapperRef = useRef(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const galleryHeight = windowHeight - 160;
  const [galleryImages, setGalleryImages] = useState<ExtendedAsset[]>();

  const addLeftCenter = useCallback(
    (photos: Asset[]) => {
      let spaceLeft = 0;
      const newPhotos = photos.map((image, index) => {
        const sizes = image.fields.file.details.image;
        const width = sizes?.width;
        const height = sizes?.height;
        let ratio = 1;
        if (width && height) {
          ratio = height / width;
        }
        const ImageWidth = galleryHeight / ratio + 100;

        const currentSpaceLeft =
          index === 0 ? ImageWidth / 2 : spaceLeft + ImageWidth / 2;
        spaceLeft = currentSpaceLeft + ImageWidth / 2;

        let marginLeft = 0;
        let marginRight = 0;
        if (index === 0) {
          marginLeft = windowWidth / 2;
        }
        if (index + 1 === photoAmount) {
          marginRight = windowWidth / 2 - ImageWidth / 2;
        }
        return {
          ...image,
          marginLeft: marginLeft,
          marginRight: marginRight,
          spaceLeft: spaceLeft,
          imageWidth: ImageWidth,
          leftCenter: currentSpaceLeft,
          ratio: ratio,
        };
      });
      return newPhotos;
    },
    [galleryHeight, photoAmount, windowWidth]
  );

  useLayoutEffect(() => {
    const newPhotos = addLeftCenter(photos);
    setGalleryImages(newPhotos);
  }, [addLeftCenter, photos, windowHeight, windowWidth]);

  const onDragEnd = (_event: any, info: any) => {
    if (info.offset.x > 250) {
      onDecrement();
    } else if (info.offset.x < -250) {
      onIncrement();
    }
  };

  const onIncrement = () => {
    if (photoIndex + 1 < photoAmount) {
      setPhotoIndex((index) => index + 1);
    }
  };

  const onDecrement = () => {
    if (photoIndex > 0) {
      setPhotoIndex((index) => index - 1);
    }
  };

  const GalleryHeader = () => {
    return (
      <>
        <div className={styles.next} onClick={() => onIncrement()}>
          <Icon iconName="arrow_forward" hoverAnimation />
        </div>
        <div className={styles.prev} onClick={() => onDecrement()}>
          <Icon iconName="arrow_back" hoverAnimation />
        </div>
        <div className={styles.header}>
          <div className={styles.galleryTitle}>{title}</div>
          <div className={styles.count}>
            <span className={styles.number}>{zeroPad(photoIndex + 1, 2)}</span>
            <span className={styles.spacer}></span>
            <span className={styles.number}>{zeroPad(photos.length, 2)}</span>
          </div>
          <div className={styles.closeWrapper}>
            <div className={styles.close} onClick={onClose}>
              <Icon
                iconName="close"
                cursorText="close gallery"
                hoverAnimation
                fallBackCursor="drag"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderPhotos = () => {
    if (!galleryImages) {
      return null;
    }

    return galleryImages.map((image, index) => {
      const imageName = image.fields.file.fileName;
      return (
        <motion.div
          id={index.toString()}
          key={imageName}
          className={`${styles.image} ${
            image.ratio > 1 ? styles.portrait : ""
          } galleryImage`}
          initial={{
            opacity: 0,
          }}
          style={{
            width: image.imageWidth,
            marginLeft: image.marginLeft,
            marginRight: image.marginRight,
          }}
          animate={{
            opacity: photoIndex - 2 > index || photoIndex + 2 < index ? 0 : 100,
          }}
        >
          <ContentfulImage data={image} windowWidth={image.imageWidth} />
        </motion.div>
      );
    });
  };

  return (
    <Modal title={title}>
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={framer_default_variants}
      >
        <GalleryHeader />
        <div ref={galleryRef}>
          <motion.div
            className={styles.photosWrapperOuter}
            onDragEnd={onDragEnd}
            drag="x"
            dragConstraints={galleryRef}
            initial={false}
            ref={photoWrapperRef}
            dragElastic={0.2}
            whileDrag={{
              scale: 0.98,
            }}
            layout
          >
            {galleryImages && (
              <motion.div
                layout
                className={styles.photosWrapper}
                transition={{ type: "linear", duration: 0.35 }}
                initial={false}
                animate={{
                  x: -galleryImages?.[photoIndex]?.leftCenter ?? 0,
                }}
              >
                {renderPhotos()}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Modal>
  );
};

const Gallery: FC<IGallery> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { width, height } = useWindowSize();
  const { setSize } = useCursorContext();
  const { title, description, photos, coverImage, slug } = data.fields;

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
              <ContentfulImage data={coverImage} windowWidth={700} />
            </NoScrollLink>
          )}
        </div>
        {photos && (
          <AnimatePresence exitBeforeEnter>
            {open && (
              <GalleryModal
                photos={photos}
                windowWidth={width}
                windowHeight={height}
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
