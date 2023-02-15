import { Asset } from "contentful";
import { useCallback, useLayoutEffect, useState } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Gallery.module.scss";
import Modal from "../Modal/Modal";
import { motion } from "framer-motion";
import { framer_default_variants } from "../../lib/framer";
import ContentfulImage from "../Image/Image";
import { useLayoutManagerContext } from "../_Layout/LayoutManager";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { AnimatedText } from "../AnimatedText/AnimatedText";

interface GalleryHeaderProps {
  onClose: () => void;
  title: string | undefined;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  onClose,
  title,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.galleryTitle}>
        {title && <AnimatedText text={title} />}
      </div>
      <div className={styles.closeWrapper}>
        <div className={styles.close} onClick={onClose}>
          <Icon iconName="close" cursorText="close gallery" hoverAnimation />
        </div>
      </div>
    </div>
  );
};

interface ExtendedAsset extends Asset {
  imageWidth: number;
  ratio: number;
}
interface IGalleryModal {
  photos: Asset[];
  onClose: () => void;
  title?: string;
}

export const GalleryModal = ({ photos, onClose, title }: IGalleryModal) => {
  useSmoothScroll();
  const windowContext = useLayoutManagerContext();
  const windowHeight = windowContext.height;
  const windowWidth = windowContext.width;
  const galleryHeight = windowHeight - 160;

  const [galleryImages, setGalleryImages] = useState<ExtendedAsset[]>();

  const extendPhotos = useCallback(
    (photos: Asset[]) => {
      const newPhotos = photos.map((image, _) => {
        const sizes = image.fields.file.details.image;
        const width = sizes?.width;
        const height = sizes?.height;
        let ratio = 1;
        if (width && height) {
          ratio = height / width;
        }

        const imageWidth = galleryHeight / ratio;

        return {
          ...image,
          ratio,
          imageWidth,
        };
      });
      return newPhotos;
    },
    [galleryHeight]
  );

  useLayoutEffect(() => {
    const newPhotos = extendPhotos(photos);
    setGalleryImages(newPhotos);
  }, [extendPhotos, photos, windowHeight, windowWidth]);

  const renderPhotos = () => {
    if (!galleryImages) {
      return null;
    }

    return galleryImages.map((image, index) => {
      const imageName = image.fields.file.fileName;
      return (
        <div
          id={index.toString()}
          key={imageName}
          className={`${styles.image}`}
          style={{
            width: image.imageWidth,
          }}
        >
          <ContentfulImage data={image} />
        </div>
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
        <GalleryHeader onClose={onClose} title={title} />
        {renderPhotos()}
      </motion.div>
    </Modal>
  );
};

// export const GalleryModal = ({ photos, onClose, title }: IGalleryModal) => {
//   const windowContext = useLayoutManagerContext();
//   const windowHeight = windowContext.height;
//   const windowWidth = windowContext.width;

//   const photoAmount = photos.length;
//   const galleryRef = useRef(null);
//   const photoWrapperRef = useRef(null);
//   const [photoIndex, setPhotoIndex] = useState(0);
//   const galleryHeight = windowHeight - 160;
//   const [galleryImages, setGalleryImages] = useState<ExtendedAsset[]>();

//   const onIncrement = () => {
//     if (photoIndex + 1 < photoAmount) {
//       setPhotoIndex((index) => index + 1);
//     }
//   };

//   const onDecrement = () => {
//     if (photoIndex > 0) {
//       setPhotoIndex((index) => index - 1);
//     }
//   };

//   const addLeftCenter = useCallback(
//     (photos: Asset[]) => {
//       let spaceLeft = 0;
//       const newPhotos = photos.map((image, index) => {
//         const sizes = image.fields.file.details.image;
//         const width = sizes?.width;
//         const height = sizes?.height;
//         let ratio = 1;
//         if (width && height) {
//           ratio = height / width;
//         }
//         const ImageWidth = galleryHeight / ratio + 100;

//         const currentSpaceLeft =
//           index === 0 ? ImageWidth / 2 : spaceLeft + ImageWidth / 2;
//         spaceLeft = currentSpaceLeft + ImageWidth / 2;

//         let marginLeft = 0;
//         let marginRight = 0;
//         if (index === 0) {
//           marginLeft = windowWidth / 2;
//         }
//         if (index + 1 === photoAmount) {
//           marginRight = windowWidth / 2 - ImageWidth / 2;
//         }
//         return {
//           ...image,
//           marginLeft: marginLeft,
//           marginRight: marginRight,
//           spaceLeft: spaceLeft,
//           imageWidth: ImageWidth,
//           leftCenter: currentSpaceLeft,
//           ratio: ratio,
//         };
//       });
//       return newPhotos;
//     },
//     [galleryHeight, photoAmount, windowWidth]
//   );

//   useLayoutEffect(() => {
//     const newPhotos = addLeftCenter(photos);
//     setGalleryImages(newPhotos);
//   }, [addLeftCenter, photos, windowHeight, windowWidth]);

//   const onDragEnd = (_event: any, info: any) => {
//     if (info.offset.x > 250) {
//       onDecrement();
//     } else if (info.offset.x < -250) {
//       onIncrement();
//     }
//   };

//   const renderPhotos = () => {
//     if (!galleryImages) {
//       return null;
//     }

//     return galleryImages.map((image, index) => {
//       const imageName = image.fields.file.fileName;
//       return (
//         <motion.div
//           id={index.toString()}
//           key={imageName}
//           className={`${styles.image} ${
//             image.ratio > 1 ? styles.portrait : ""
//           } galleryImage`}
//           initial={{
//             opacity: 0,
//           }}
//           style={{
//             width: image.imageWidth,
//             marginLeft: image.marginLeft,
//             marginRight: image.marginRight,
//           }}
//           animate={{
//             opacity: photoIndex - 2 > index || photoIndex + 2 < index ? 0 : 100,
//           }}
//           layout="size"
//         >
//           <ContentfulImage data={image} windowWidth={image.imageWidth} />
//         </motion.div>
//       );
//     });
//   };

//   return (
//     <Modal title={title}>
//       <motion.div
//         initial="hidden"
//         animate="enter"
//         exit="exit"
//         variants={framer_default_variants}
//       >
//         <GalleryHeader
//           photoIndex={photoIndex}
//           photoAmount={photoAmount}
//           onIncrement={onIncrement}
//           onDecrement={onDecrement}
//           onClose={onClose}
//           title={title}
//         />
//         <div ref={galleryRef}>
//           <motion.div
//             className={styles.photosWrapperOuter}
//             onDragEnd={onDragEnd}
//             drag="x"
//             dragConstraints={galleryRef}
//             initial={false}
//             ref={photoWrapperRef}
//             dragElastic={0.2}
//             whileDrag={{
//               scale: 0.98,
//             }}
//             layout
//           >
//             {galleryImages && (
//               <motion.div
//                 layout
//                 className={styles.photosWrapper}
//                 transition={{ type: "linear", duration: 0.35 }}
//                 initial={false}
//                 animate={{
//                   x: -galleryImages?.[photoIndex]?.leftCenter ?? 0,
//                 }}
//               >
//                 {renderPhotos()}
//               </motion.div>
//             )}
//           </motion.div>
//         </div>
//       </motion.div>
//     </Modal>
//   );
// };
