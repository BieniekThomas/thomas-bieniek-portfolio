import Image from "next/legacy/image";

import { FC } from "react";
import { Asset } from "contentful";

import styles from "./Image.module.scss";
import { useLayoutManagerContext } from "../_Layout/LayoutManager";

interface IImageComponent {
  data: Asset;
  priority?: boolean;
  maxDimensionInPx?: number;
}

const ContentfulImage: FC<IImageComponent> = ({
  data,
  priority = false,
  maxDimensionInPx,
}) => {
  const photo = data.fields.file;
  const size = useLayoutManagerContext();

  // get them variables
  const src = photo?.url;
  if (!src) {
    console.error('photo not found')
    return
  }
  const width = photo?.details?.image?.width ?? size.width;
  const height = photo?.details?.image?.height ?? size.height;
  const quality = 80;
  const title = data.fields.title;

  const ratio = width / height;

  let resultWidth = maxDimensionInPx ?? size.width;
  let resultHeight = maxDimensionInPx ?? size.height;

  if (ratio >= 1) {
    // landscape
    resultHeight = Math.floor(resultWidth / ratio);
  } else {
    // portrait
    resultWidth = Math.floor(resultHeight * ratio);
  }

  return (
    <div className={styles.imageWrapper}>
      <div className={styles.aspectWrapper} style={{ aspectRatio: ratio }}>
        <Image
          src={`https:${src}?w=${resultWidth}&h=${resultHeight}`}
          width={resultWidth}
          height={resultHeight}
          quality={quality}
          alt={title as string}
          priority={priority}
          objectFit="contain"
          placeholder="blur"
          blurDataURL={`https:${src}?fm=jpg&q=0&w=8&h=8`}
        />
      </div>
    </div>
  );
};

export default ContentfulImage;
