import Image from 'next/image'
import { FC } from 'react';
import { ISingleImage } from '../@types/image';

export interface IImageComponent {
  data: ISingleImage,
  windowWidth: number,
}

const ContentfulImage: FC<IImageComponent> = ({data, windowWidth}) => {
  const photo = data.fields.photo.fields.file;
  const src = photo.url;
  const width = photo.details.image.width;
  const height = photo.details.image.height;
  const ratio = width / height;
  const resultWidth = windowWidth || width;
  const quality = 75;

  if (!src) {
    console.error("no src for image found", photo);
    return null;
  }

  return <Image src={`https:${src}`} width={resultWidth} height={resultWidth/ratio} quality={quality} alt={data.fields.title} />
}

export default ContentfulImage