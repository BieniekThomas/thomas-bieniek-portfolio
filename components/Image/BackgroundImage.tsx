import * as contentful from 'contentful'
import Image from 'next/legacy/image';
import { FC } from 'react';
import { useLayoutManagerContext } from '../_Layout/LayoutManager';

interface IImage {
    data: contentful.Asset
    priority?: boolean;
    maxDimensionInPx?: number;
}
const QUALITY = 70;
export const BackgroundImage: FC<IImage> = ({
    data,
}) => {
    const photo = data.fields.file as contentful.AssetFile;
    const size = useLayoutManagerContext();
    const src = photo?.url;

    const width = photo?.details?.image?.width ?? size.width;
    const height = photo?.details?.image?.height ?? size.height;
    const title = data.fields.title;

    const ratio = width / height;

    const resultWidth = size.width;
    const resultHeight = size.width / ratio;

    if (!src) {
        console.error('photo not found')
        return
    }

    return (
        <Image
            src={`https:${src}?w=${size.width}&h=${size.height}`}
            width={resultWidth}
            height={resultHeight}
            quality={QUALITY}
            alt={title as string}
            priority={false}
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`https:${src}?fm=jpg&q=0&w=8&h=8`}
            style={{ objectFit: 'cover' }}
        />
    )
}