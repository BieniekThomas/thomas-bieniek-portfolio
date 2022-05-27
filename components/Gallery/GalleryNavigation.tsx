import { IPhotoGallery } from "../../@types/generated/contentful";
import NoScrollLink from "../NoScrollLink/NoScrollLink";
import styles from "./GalleryNavigation.module.scss";

export interface IGalleryNavigationProps {
  galleries: IPhotoGallery[];
  index: number;
  setIndex: (i: number) => void;
}

export function GalleryNavigation({
  galleries,
  index,
  setIndex,
}: IGalleryNavigationProps) {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        {galleries.map((gallery, i) => {
          return (
            <NoScrollLink
              noLink
              key={gallery.fields.title}
              onClick={() => setIndex(i)}
              active={i === index}
            >
              {gallery.fields.title}
            </NoScrollLink>
          );
        })}
      </div>
    </div>
  );
}
