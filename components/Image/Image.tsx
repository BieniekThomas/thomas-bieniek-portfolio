import Image from "next/image";

import { FC, useState } from "react";
import { Asset } from "contentful";
import styles from "./Image.module.scss";

interface IImageComponent {
  data: Asset;
  windowWidth: number;
  priority?: boolean;
}

const ContentfulImage: FC<IImageComponent> = ({
  data,
  windowWidth,
  priority,
}) => {
  const photo = data.fields.file;
  const [loading, setLoading] = useState(true);

  if (!photo.details.image) {
    return null;
  }

  // get them variables
  const src = photo.url;
  const width = photo.details.image.width;
  const height = photo.details.image.height;
  const ratio = width / height;
  const resultWidth = windowWidth || width;
  const quality = 85;
  const title = data.fields.title;

  return (
    <div className={styles.imageWrapper}>
      <div className={`${styles.blurWrapper} ${!loading && styles.unblur}`}>
        <Image
          src={`https:${src}`}
          width={30}
          height={30 / ratio}
          quality={0}
          alt={title}
          priority={priority}
          objectFit="contain"
          className={styles.blur}
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
    </div>
  );
};

export default ContentfulImage;
