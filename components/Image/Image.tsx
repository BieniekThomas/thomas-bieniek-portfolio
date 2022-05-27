import Image from "next/image";

import { FC, useState } from "react";
import { Asset } from "contentful";
// import { motion } from "framer-motion";

import styles from "./Image.module.scss";

interface IImageComponent {
  data: Asset;
  windowWidth: number;
  priority?: boolean;
}

const PREVIEW_SIZE = 8;

const ContentfulImage: FC<IImageComponent> = ({
  data,
  windowWidth,
  priority = false,
}) => {
  const photo = data.fields.file;
  const [loading, setLoading] = useState(true);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  if (!photo.details.image) {
    return null;
  }

  if (!windowWidth) {
    console.error("no windowwidth");
  }

  // get them variables
  const src = photo.url;
  const width = photo.details.image.width;
  const height = photo.details.image.height;
  const ratio = width / height;
  const resultWidth = windowWidth || width;
  const quality = 90;
  const title = data.fields.title;

  return (
    <div className={styles.imageWrapper}>
      <div className={`${styles.blurWrapper} ${!loading && styles.unblur}`}>
        <Image
          src={`https:${src}`}
          width={PREVIEW_SIZE}
          height={PREVIEW_SIZE / ratio}
          quality={0}
          alt={title}
          priority={priority}
          objectFit="contain"
          className={styles.blur}
          onLoadingComplete={() => setThumbnailLoading(false)}
        />
      </div>
      <Image
        src={`https:${src}`}
        width={resultWidth}
        height={resultWidth / ratio}
        quality={quality}
        alt={title}
        priority={priority}
        objectFit="contain"
        onLoadingComplete={() => setLoading(false)}
      />
      {thumbnailLoading && loading && (
        <div className={styles.loading}>Image loading...</div>
      )}
    </div>
  );
};

export default ContentfulImage;
