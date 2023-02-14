import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IPhotoGallery } from "../../@types/generated/contentful";
import ContentfulImage from "../../components/Image/Image";
import { PageHeadIndividual } from "../../components/PageHead/PageHead";
import { fetchEntries } from "../../lib/api";
import styles from "../../styles/Gallery.module.scss";

interface IGallery {
  gallery: IPhotoGallery;
}

const Gallery = ({ gallery }: IGallery) => {
  const router = useRouter();
  const slug = router.query;
  const photos = gallery.fields.photos;
  const photoAmount = photos?.length;

  return (
    <>
      <PageHeadIndividual
        pageTitle={`Gallery — ${gallery.fields.title}`}
        key={gallery.fields.slug ?? "gallery"}
        pageDescription={`Gallery with ${photoAmount} pictures on the theme ${gallery.fields.title}`}
      />
      <p>
        Gallery: {slug.slug} with {photoAmount} photos
      </p>
      {photos?.map((photo) => {
        return (
          <div key={photo.fields.title} className={styles.photoWrapper}>
            <ContentfulImage data={photo} />
          </div>
        );
      })}
    </>
  );
};

export default Gallery;

// NextJs Stuff
const PHOTO_GALLERY_ID = "photoGallery";
export async function getStaticPaths() {
  const photoGalleries = await fetchEntries({ content_type: PHOTO_GALLERY_ID });

  const paths = photoGalleries?.map((gallery) => {
    return `/Gallery/${gallery.fields.slug}`;
  });

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const photoGallery = await fetchEntries({ content_type: PHOTO_GALLERY_ID });
  if (!photoGallery || !params) {
    console.error("photogallery not available");
    return {
      props: {},
    };
  }

  const gallery = photoGallery.find(
    (gallery) => gallery.fields.slug == params.slug
  );

  return {
    props: {
      gallery: gallery,
    },
  };
};
