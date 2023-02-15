import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IPhotoGallery } from "../../@types/generated/contentful";
import ContentfulImage from "../../components/Image/Image";
import { PageHeadIndividual } from "../../components/PageHead/PageHead";
import { fetchEntries } from "../../lib/api";
import styles from "../../styles/Gallery.module.scss";
import {
  useViewportScroll,
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import { GalleryHeader } from "../../components/Gallery/GalleryModal";
import Text from "../../components/Text/Text";
import {
  AnimatedText,
  AnimatedTextBlock,
} from "../../components/AnimatedText/AnimatedText";

interface IGallery {
  gallery: IPhotoGallery;
}

const Gallery = ({ gallery }: IGallery) => {
  const router = useRouter();
  const { title, description, photos } = gallery.fields;
  const photoAmount = photos?.length;
  const { scrollYProgress } = useViewportScroll();
  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scrollPercent = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  function onClose() {
    router.push("/");
  }

  return (
    <>
      <PageHeadIndividual
        pageTitle={`Gallery — ${title}`}
        keyName={gallery.fields.slug ?? "gallery"}
        pageDescription={`Gallery with ${photoAmount} pictures on the theme ${title}`}
      />
      <GalleryHeader onClose={onClose} title={title} />
      <div>
        {photos?.map((photo) => {
          return (
            <div key={photo.fields.title} className={styles.photoWrapper}>
              <ContentfulImage data={photo} />
            </div>
          );
        })}
      </div>
      <div className={styles.progressWrapper}>
        <motion.div
          className={styles.progress}
          style={{ height: scrollPercent }}
        />
      </div>
      <div className={styles.galleryFooter}>
        <div className={styles.galleryFooterWrapper}>
          <h1>
            <AnimatedText text={title} />
          </h1>
          {description && (
            <div className={styles.description}>
              <AnimatedTextBlock>
                {Text({ text: description })}
              </AnimatedTextBlock>
            </div>
          )}
        </div>
      </div>
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
