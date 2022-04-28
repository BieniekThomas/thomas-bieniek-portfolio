import type { GetStaticProps } from "next";
import { fetchEntries } from "../lib/api";
import Gallery from "../components/Gallery/Gallery";
import Layout from "../components/_Layout/Layout";

// typeImports
import { FC } from "react";
import { IPhotoGallery } from "../@types/generated/contentful";

// styleImports
import styles from "../styles/Home.module.scss";
import { PageHead } from "../components/PageHead/PageHead";

interface IHome {
  photoGallery: IPhotoGallery[];
}

const Home: FC<IHome> = ({ photoGallery }) => {
  return (
    <Layout>
      <PageHead site="home" />
      <div className={styles.wrapper}>
        {photoGallery.map((gallery) => {
          return <Gallery key={gallery.fields.slug} data={gallery} />;
        })}
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
