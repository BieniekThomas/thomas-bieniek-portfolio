import { FC, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { ISingleImage } from "../@types/image";
import ContentfulImage from "./Image";

interface IGallery {
  imageArray: ISingleImage[];
}

const Gallery: FC<IGallery> = ({imageArray}) => {
  const [windowWidth, setWindowWidth] = useState(1920);
  const width = useWindowSize().width;
  
  useEffect(() => {
    setWindowWidth(width)
  }, [width])

  return (
    imageArray?.map(image => {
      return (<ContentfulImage key={image.fields.title} data={image} windowWidth={windowWidth} />)
    })
  )
}

export default Gallery;