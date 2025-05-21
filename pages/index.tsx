import type { GetStaticProps } from "next";
import { fetchEntries } from "../lib/api";
import Layout from "../components/_Layout/Layout";
import { PageHead } from "../components/PageHead/PageHead";
import { Section } from "../components/Section/Section";
import { GallerySection } from "../components/Gallery/GallerySection";
import { Introduction } from "../components/Introduction/Introduction";

// typeImports
import { FC } from "react";
import { IAuthorFields, IParallaxGalleryFields, IPhotoGalleryFields } from "../@types/generated/contentful";

// styleImports
import styles from "../styles/Home.module.scss";
import ParallaxGallery from "../components/ParallaxGallery/ParallaxGallery";
import { TextSlider } from "../components/TextSlider/TextSlider";

interface IHome {
  photoGallery: {
    fields: IPhotoGalleryFields
  }[];
  author: {
    fields: IAuthorFields
  }
  parallaxGallery: {
    fields: IParallaxGalleryFields
  }
}

const Home: FC<IHome> = ({ photoGallery, author, parallaxGallery }) => {
  return (
    <Layout>
      <PageHead site="home" />
      <div className={styles.wrapper}>
        <Section
          number={0}
          headline="Hi"
          subHeadline=""
        />
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
        <div className={styles.minHeight}>
          <GallerySection galleries={photoGallery} />
        </div>
        <div className={styles.smallestHeight}></div>
        {/* <Section
          number={2}
          headline="Drummer/Producer/DJ"
          subHeadline="feeling it"
        /> */}
        <div>
          <TextSlider startOffset={'-50%'} direction={'left'} velocity={1.5}>
            <span className={styles.bigFont}>FRONTEND DEVELOPER</span>
          </TextSlider>
          <TextSlider startOffset={'-20%'} direction={'right'} velocity={2}>
            <span className={styles.bigFont}>REACT / TYPESCRIPT / NEXTJS</span>
          </TextSlider>
          <TextSlider startOffset={'-10%'} direction={'left'} velocity={1.2}>
            <span className={styles.bigFont}>FRONTEND DEVELOPER</span>
          </TextSlider>
        </div>
        <div className={styles.smallestHeight}></div>
        <Section
          number={3}
          headline="Software-Developer"
          subHeadline="coding it"
        />
        <div className={styles.minHeight}></div>
      </div>
    </Layout>
  );
};

export default Home;

const PHOTO_GALLERY_ID = "photoGallery";
const AUTHOR_ID = "author"
const PARALLAX_ID = "parallaxGallery"
export const getStaticProps: GetStaticProps = async () => {
  const photoGallery = await fetchEntries({ content_type: PHOTO_GALLERY_ID });
  const author = await fetchEntries({ content_type: AUTHOR_ID });
  const parallaxGallery = await fetchEntries({ content_type: PARALLAX_ID });
  if (!photoGallery) {
    console.error("photogallery not available");
  }
  if (!author) {
    console.error("No Author found");
  }
  if (!parallaxGallery) {
    console.error('No parallax Gallery Found')
  }
  return {
    props: {
      photoGallery: photoGallery,
      author: author?.[0],
      parallaxGallery: parallaxGallery?.[0]
    },
  };
};
