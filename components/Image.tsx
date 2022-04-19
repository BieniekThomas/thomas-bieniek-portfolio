import Image from 'next/image'
import { FC } from 'react';
import { IImage } from '../@types/generated/contentful';
import NoScrollLink from './NoScrollLink';

interface IImageComponent {
  data: IImage,
  windowWidth: number,
}

const ContentfulImage: FC<IImageComponent> = ({data, windowWidth}) => {
  const photo = data?.fields?.photo?.fields?.file;
  const id = data.sys.id;
  if (!photo || !photo.details.image) {
    return null;
  }

  // get them variables
  const src = photo.url;
  const width = photo.details.image.width;
  const height = photo.details.image.height;
  const ratio = width / height;
  const resultWidth = windowWidth || width;
  const quality = 75;
  const title = data.fields.title;

  return (
    <NoScrollLink url={`/photo/${id}`}>
      <Image src={`https:${src}`} width={resultWidth} height={resultWidth/ratio} quality={quality} alt={title} />
    </NoScrollLink>
  )
}

export default ContentfulImage