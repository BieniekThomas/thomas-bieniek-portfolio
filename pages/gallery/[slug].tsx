import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { IPhotoGalleryFields } from "../../@types/generated/contentful";
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
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useLayoutManagerContext } from "../../components/_Layout/LayoutManager";
import Layout from "../../components/_Layout/Layout";

interface IGallery {
  gallery: {
    fields: IPhotoGalleryFields;
  };
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
  exit: {
    opacity: 0,
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
  const rightContainerRef = useRef<HTMLInputElement>(null);
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

  const arrayRef = useCallback((node: HTMLElement | null) => {
    if (!rightContainerRef.current) return;
    return node;
  }, []);

  useLayoutEffect(() => {
    if (null == rightContainerRef.current) return;
    const { height } = rightContainerRef.current.getBoundingClientRect();
    setPreviewDivHeight(height);
  }, [arrayRef]);

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
    ["0px", `-${previewDivHeight - layoutContext.height / 2}px`],
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
            exit="exit"
            style={{ translateY: offsetPreviewHeight }}
            ref={rightContainerRef}
          >
            {photos?.map((photo, index) => {
              if (!photo.fields.file?.url) return;
              return (
                <motion.div
                  variants={previewChildVariants}
                  key={`preview-${photo.fields.file?.url}`}
                >
                  <a
                    className={styles.photoPreviewWrapper}
                    href={`#photo-${index}`}
                    onClick={() => onAnchorClick(`#photo-${index}`)}
                    //@ts-expect-error refs are sometimes hard in typescript
                    ref={arrayRef}
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
            if (!photo.fields.file?.url) return;
            return (
              <motion.div
                key={`${photo.fields.file.url}`}
                id={`photo-${index}`}
              >
                <motion.div
                  className={styles.photoWrapper}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
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
    (gallery) => gallery.fields.slug == params.slug,
  );

  return {
    props: {
      gallery: gallery,
    },
  };
};
