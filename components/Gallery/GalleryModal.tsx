import { Icon } from "../Icon/Icon";
import styles from "./Gallery.module.scss";
import { AnimatedText } from "../AnimatedText/AnimatedText";
import { zeroPad } from "../Section/Section";

interface GalleryHeaderProps {
  onClose: () => void;
  title: string | undefined;
  photoAmount?: number;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  onClose,
  photoAmount,
  title,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.galleryTitle}>
        <div>{title && <AnimatedText text={title} />}</div>
        <div className={styles.photoCount}>
          {photoAmount && (
            <AnimatedText text={`${zeroPad(photoAmount, 2)} Fotos`} />
          )}
        </div>
      </div>
      <div className={styles.closeWrapper}>
        <div className={styles.close} onClick={onClose}>
          <Icon iconName="close" cursorText="close gallery" hoverAnimation />
        </div>
      </div>
    </div>
  );
};
