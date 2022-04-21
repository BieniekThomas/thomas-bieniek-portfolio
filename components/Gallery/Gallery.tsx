import { FC, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { IImage } from "../../@types/generated/contentful";
import ContentfulImage from "../Image/Image";

interface IGallery {
  imageArray: IImage[];
}

const Gallery: FC<IGallery> = ({ imageArray }) => {
  const [windowWidth, setWindowWidth] = useState(1920);
  const width = useWindowSize().width;

  useEffect(() => {
    setWindowWidth(width);
  }, [width]);

  return imageArray.map((image) => {
    const title = image.fields.title;
    return (
      <ContentfulImage key={title} data={image} windowWidth={windowWidth} />
    );
  });
};

export default Gallery;
