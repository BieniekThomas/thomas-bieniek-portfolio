import type { GetStaticProps } from "next";
import { fetchEntries } from "../lib/api";
import Layout from "../components/_Layout/Layout";
import { PageHead } from "../components/PageHead/PageHead";
import { Section } from "../components/Section/Section";
import { GallerySection } from "../components/Gallery/GallerySection";
import { Introduction } from "../components/Introduction/Introduction";
import ParallaxGallery from "../components/ParallaxGallery/ParallaxGallery";
import { TextSlider } from "../components/TextSlider/TextSlider";
import { Description } from "../components/Description/Description";
import { FC } from "react";
import {
  IAuthorFields,
  IMultiMediaGalleryFields,
  IParallaxGalleryFields,
  IPhotoGalleryDescriptionFields,
  IPhotoGalleryFields,
} from "../@types/generated/contentful";
import styles from "../styles/Home.module.scss";

interface IHome {
  photoGallery: {
    fields: IPhotoGalleryFields;
  }[];
  photoDesc: {
    fields: IPhotoGalleryDescriptionFields;
  };
  author: {
    fields: IAuthorFields;
  };
  parallaxGallery: {
    fields: IParallaxGalleryFields;
  };
  multiMediaGallery: {
    fields: IMultiMediaGalleryFields;
  }[];
  multiMediaDesc: {
    fields: IMultiMediaGalleryFields;
  };
}

const Home: FC<IHome> = ({
  photoGallery,
  author,
  parallaxGallery,
  multiMediaGallery,
  photoDesc,
  multiMediaDesc,
}) => {
  return (
    <Layout>
      <PageHead site="home" />
      <div className={styles.wrapper}>
        <Section number={0} headline="Hi" subHeadline="" />
        <div className={styles.smallHeight}>
          <Introduction data={author} />
        </div>
        <div className={styles.smallestHeight}></div>
        <ParallaxGallery data={parallaxGallery} />
        <div className={styles.smallestHeight}></div>
        <Section
          number={1}
          headline="Photography"
          subHeadline="capturing emotions"
        />
        <Description data={photoDesc} />
        <div className={styles.minHeight}>
          <GallerySection galleries={photoGallery} nameKey={"photo"} />
        </div>
        <div className={styles.smallestHeight}></div>
        <Section number={2} headline="Multi-Media" subHeadline="new worlds" />
        <Description data={multiMediaDesc} />
        <div className={styles.minHeight}>
          <GallerySection
            galleries={multiMediaGallery}
            nameKey={"multiMedia"}
          />
        </div>
        <Section
          number={3}
          headline="Software-Developer"
          subHeadline="coding it"
        />
        <div>
          <TextSlider startOffset={"-50%"} direction={"left"} velocity={1.5}>
            <span className={styles.bigFont}>FRONTEND DEVELOPER</span>
          </TextSlider>
          <TextSlider startOffset={"-20%"} direction={"right"} velocity={2}>
            <span className={styles.bigFont}>REACT / TYPESCRIPT / NEXTJS</span>
          </TextSlider>
          <TextSlider startOffset={"-10%"} direction={"left"} velocity={1.2}>
            <span className={styles.bigFontSmall}>
              But also VUE / NODE / HEADLESS CMS
            </span>
          </TextSlider>
        </div>
        <div className={styles.smallestHeight}></div>
      </div>
    </Layout>
  );
};

export default Home;

const PHOTO_GALLERY_ID = "photoGallery";
const PHOTO_GALLERY_DESCRIPTION = "photoGalleryDescription";
const AUTHOR_ID = "author";
const PARALLAX_ID = "parallaxGallery";
const MULTI_MEDIA_GALLERY = "multiMediaGallery";
const MULTI_MEDIA_GALLERY_DESCRIPTION = "multiMediaGalleryDescription";

export const getStaticProps: GetStaticProps = async () => {
  const photoGallery = await fetchEntries({ content_type: PHOTO_GALLERY_ID });
  const author = await fetchEntries({ content_type: AUTHOR_ID });
  const parallaxGallery = await fetchEntries({ content_type: PARALLAX_ID });
  const multiMediaGallery = await fetchEntries({
    content_type: MULTI_MEDIA_GALLERY,
  });
  const multiMediaDesc = await fetchEntries({
    content_type: MULTI_MEDIA_GALLERY_DESCRIPTION,
  });
  const photoDesc = await fetchEntries({
    content_type: PHOTO_GALLERY_DESCRIPTION,
  });
  if (!photoGallery) {
    console.error("photogallery not available");
  }
  if (!author) {
    console.error("No Author found");
  }
  if (!parallaxGallery) {
    console.error("No parallax Gallery found");
  }
  if (!multiMediaGallery) {
    console.error("No MutliMediaGallery found");
  }
  if (!multiMediaDesc) {
    console.error("No multiMediaDesc found");
  }

  if (!photoDesc) {
    console.error("No photoDesc found");
  }
  return {
    props: {
      photoGallery: photoGallery,
      author: author?.[0],
      parallaxGallery: parallaxGallery?.[0],
      multiMediaGallery: multiMediaGallery,
      multiMediaDesc: multiMediaDesc?.[0],
      photoDesc: photoDesc?.[0],
    },
  };
};
