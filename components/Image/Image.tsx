import Image from "next/image";

import { FC } from "react";
import { Asset } from "contentful";
// import { motion } from "framer-motion";

import styles from "./Image.module.scss";
import { useLayoutManagerContext } from "../_Layout/LayoutManager";

interface IImageComponent {
  data: Asset;
  windowWidth: number;
  priority?: boolean;
}

const ContentfulImage: FC<IImageComponent> = ({
  data,
  windowWidth,
  priority = false,
}) => {
  const photo = data.fields.file;
  const size = useLayoutManagerContext();

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
  const quality = 80;
  const title = data.fields.title;

  let resultWidth = size.width;
  let resultHeight = size.height;

  if (ratio >= 1) {
    // landscape
    resultHeight = Math.floor(resultWidth / ratio);
  } else {
    // portrait
    resultWidth = Math.floor(resultHeight * ratio);
  }

  return (
    <div className={styles.imageWrapper}>
      <Image
        src={`https:${src}?w=${resultWidth}&h=${resultHeight}&q=80`}
        width={resultWidth}
        height={resultHeight}
        quality={quality}
        alt={title}
        priority={priority}
        objectFit="contain"
        placeholder="blur"
        blurDataURL={`https:${src}?fm=jpg&q=0&w=8&h=8`}
      />
    </div>
  );
};

export default ContentfulImage;
