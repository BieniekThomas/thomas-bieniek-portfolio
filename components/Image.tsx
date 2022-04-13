import Image from 'next/image'

const contentfulLoader = (src: string, width: number, height: number, quality: number): string => {
  return `${src}?w=${width}&h=${height}&q=${quality}`
}

const ContentfulImage = ({data}) => {
  const photo = data.fields.photo.fields.file;
  console.log("🚀 ~ file: Image.tsx ~ line 10 ~ ContentfulImage ~ photo", photo)
  const src = photo.url;
  const width = photo.details.image.width;
  const height = photo.details.image.height;
  const quality = 75;

  return src && <Image src={`https:${src}`} width={width} height={height} quality={quality} />
}

export default ContentfulImage