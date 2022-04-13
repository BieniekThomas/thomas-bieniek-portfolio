import { FC } from "react";
import ContentfulImage from "./Image";


const Gallery: FC<[]> = ({imageArray}) => {
  console.log(imageArray);

  return (
    imageArray?.map(image => {
      console.log(image);
      return (<ContentfulImage key={image.fields.title} data={image} />)
    })
  )
}

export default Gallery;