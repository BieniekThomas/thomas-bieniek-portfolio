import type { GetStaticProps } from "next";
import { fetchEntries } from "../lib/api";
import Layout from "../components/_Layout/Layout";
import { PageHead } from "../components/PageHead/PageHead";
import { Section } from "../components/Section/Section";
import { GallerySection } from "../components/Gallery/GallerySection";

// typeImports
import { FC } from "react";
import { IPhotoGallery } from "../@types/generated/contentful";

// styleImports
import styles from "../styles/Home.module.scss";

interface IHome {
  photoGallery: IPhotoGallery[];
}

const Home: FC<IHome> = ({ photoGallery }) => {
  return (
    <Layout>
      <PageHead site="home" />
      <div className={styles.wrapper}>
        <Section
          number={1}
          headline="Photography"
          subHeadline="capturing emotions"
        />
        <GallerySection galleries={photoGallery} />
        <Section
          number={2}
          headline="Drummer/Producer/DJ"
          subHeadline="feeling it"
        />
        <Section
          number={3}
          headline="Software-Developer"
          subHeadline="coding it"
        />
      </div>
    </Layout>
  );
};

export default Home;

const PHOTO_GALLERY_ID = "photoGallery";
export const getStaticProps: GetStaticProps = async () => {
  const photoGallery = await fetchEntries({ content_type: PHOTO_GALLERY_ID });
  if (!photoGallery) {
    console.error("photogallery not available");
    return {
      props: {},
    };
  }
  return {
    props: {
      photoGallery: photoGallery,
    },
  };
};
