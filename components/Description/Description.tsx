import { FC } from "react";
import {
  IMultiMediaGalleryDescriptionFields,
  IPhotoGalleryDescriptionFields,
} from "../../@types/generated/contentful";
import styles from "./Description.module.scss";
import Text from "../Text/Text";
import { AnimatedTextBlock } from "../AnimatedText/AnimatedText";

interface IDescription {
  data: {
    fields:
      | IMultiMediaGalleryDescriptionFields
      | IPhotoGalleryDescriptionFields;
  };
}

export const Description: FC<IDescription> = ({ data }) => {
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <div></div>
        <AnimatedTextBlock>
          <div className={styles.textWrapper}>
            <Text text={data.fields.description} />
          </div>
        </AnimatedTextBlock>
      </div>
    </div>
  );
};
