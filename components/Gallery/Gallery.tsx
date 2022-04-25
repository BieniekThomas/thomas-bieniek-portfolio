import { Asset } from "contentful";
import { FC, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import ContentfulImage from "../Image/Image";
import styling from "./Gallery.module.scss";

interface IGallery {
  imageArray: Asset[];
}

const Gallery: FC<IGallery> = ({ imageArray }) => {
  const [windowWidth, setWindowWidth] = useState(1920);
  const width = useWindowSize().width;

  useEffect(() => {
    setWindowWidth(width);
  }, [width]);

  return (
    <div className={styling.outerWrapper}>
      <div className={styling.innerWrapper}>
        {imageArray.map((image) => {
          const title = image.fields.file.fileName;
          return (
            <div key={`galleryImage-${title}`}>
              <ContentfulImage data={image} windowWidth={windowWidth} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
