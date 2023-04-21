import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IPhotoGallery } from "../../@types/generated/contentful";
import ContentfulImage from "../../components/Image/Image";
import { PageHeadIndividual } from "../../components/PageHead/PageHead";
import { fetchEntries } from "../../lib/api";
import styles from "../../styles/Gallery.module.scss";
import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { GalleryHeader } from "../../components/Gallery/GalleryModal";
import Text from "../../components/Text/Text";
import {
  AnimatedText,
  AnimatedTextBlock,
} from "../../components/AnimatedText/AnimatedText";
import { useLenisManagerContext } from "../../components/_Layout/LenisManager";
import { useCallback, useState } from "react";
import { useLayoutManagerContext } from "../../components/_Layout/LayoutManager";
import Layout from "../../components/_Layout/Layout";

interface IGallery {
  gallery: IPhotoGallery;
}

const previewVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const previewChildVariants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
  },
};

const Gallery = ({ gallery }: IGallery) => {
  const router = useRouter();
  const { title, description, photos, slug } = gallery.fields;
  const photoAmount = photos?.length;
  const { scrollYProgress } = useScroll();
  const [previewDivHeight, setPreviewDivHeight] = useState(0);
  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scrollPercent = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  const lenisContext = useLenisManagerContext();
  const layoutContext = useLayoutManagerContext();

  // const { width = 0, height = 0 } = useWindowDimensions();
  // const { cursorX, cursorY } = useMousePosition();
  // const springConfig = { damping: 25, stiffness: 300 };
  // const cursorXSpring = useSpring(cursorX, springConfig);
  // const cursorYSpring = useSpring(cursorY, springConfig);
  // const transformX = useTransform(cursorXSpring, [0, width], [-15, 15]);
  // const transformY = useTransform(cursorYSpring, [0, height], [-15, 15]);

  const previewRef = useCallback((node: HTMLElement | null) => {
    if (node === null) return;
    console.log(node.offsetHeight, node);
    setPreviewDivHeight(node.offsetHeight);
  }, []);

  function onAnchorClick(anchor: string) {
    if (!lenisContext.lenis) return;
    lenisContext.lenis.scrollTo(anchor);
  }

  function onClose() {
    router.push("/");
  }

  const offsetPreviewHeight = useTransform(
    scrollSpring,
    [0, 1],
    ["0px", `-${previewDivHeight - layoutContext.height / 2}px`]
  );

  return (
    <Layout>
      <PageHeadIndividual
        pageTitle={`Gallery — ${title}`}
        keyName={slug ?? "gallery"}
        pageDescription={`Gallery with ${photoAmount} pictures on the theme ${title}`}
      />
      <GalleryHeader
        onClose={onClose}
        title={title}
        photoAmount={photos?.length}
      />
      <div className={styles.photoContainer}>
        <div className={styles.leftContainer}>
          <motion.div
            variants={previewVariants}
            initial="hidden"
            animate="visible"
            ref={previewRef}
            style={{ translateY: offsetPreviewHeight }}
          >
            {photos?.map((photo, index) => {
              return (
                <motion.div
                  variants={previewChildVariants}
                  key={`preview-${photo.fields.title}`}
                >
                  <a
                    className={styles.photoPreviewWrapper}
                    href={`#photo-${index}`}
                    onClick={() => onAnchorClick(`#photo-${index}`)}
                  >
                    <ContentfulImage data={photo} maxDimensionInPx={150} />
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <div className={styles.rightContainer}>
          {photos?.map((photo, index) => {
            return (
              <motion.div key={photo.fields.title} id={`photo-${index}`}>
                <motion.div
                  className={styles.photoWrapper}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  // style={{
                  //   translateX: transformX,
                  //   translateY: transformY,
                  // }}
                >
                  <ContentfulImage data={photo} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
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
    </Layout>
  );
};

export default Gallery;

// NextJs Stuff
const PHOTO_GALLERY_ID = "photoGallery";
export async function getStaticPaths() {
  const photoGalleries = await fetchEntries({ content_type: PHOTO_GALLERY_ID });

  const paths = photoGalleries?.map((gallery) => {
    return `/gallery/${gallery.fields.slug}`;
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
