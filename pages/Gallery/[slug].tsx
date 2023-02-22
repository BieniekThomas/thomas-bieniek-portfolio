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
import { useLenisManagerContext } from "../../components/_Layout/LenisManager";
import { useEffect, useRef, useState } from "react";
import { useLayoutManagerContext } from "../../components/_Layout/LayoutManager";

interface IGallery {
  gallery: IPhotoGallery;
}

const Gallery = ({ gallery }: IGallery) => {
  const router = useRouter();
  const { title, description, photos, slug } = gallery.fields;
  const photoAmount = photos?.length;
  const { scrollYProgress } = useViewportScroll();
  const [previewDivHeight, setPreviewDivHeight] = useState(0);
  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scrollPercent = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  const lenisContext = useLenisManagerContext();
  const layoutContext = useLayoutManagerContext();

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenisContext.lenis)
      console.error("lenis not useable. LenisContext:", lenisContext);
    console.log("lenis found", lenisContext.lenis);
  }, [lenisContext]);

  function onAnchorClick(anchor: string) {
    lenisContext.lenis?.scrollTo(anchor);
  }

  function onClose() {
    router.push("/");
  }

  useEffect(() => {
    if (!previewRef.current) return;
    setPreviewDivHeight(previewRef?.current?.offsetHeight);
    console.log("previewDivHeight", previewDivHeight);
  }, [previewDivHeight]);

  const offsetPreviewHeight = useTransform(
    scrollSpring,
    [0, 1],
    ["0px", `-${previewDivHeight - layoutContext.height / 2}px`]
  );

  const LinksAndPreviews = () => {
    return (
      <motion.div ref={previewRef} style={{ translateY: offsetPreviewHeight }}>
        {photos?.map((photo, index) => {
          return (
            <div key={`preview-${photo.fields.title}`}>
              <a
                className={styles.photoPreviewWrapper}
                href={`#photo-${index}`}
                onClick={() => onAnchorClick(`#photo-${index}`)}
              >
                <ContentfulImage data={photo} maxDimensionInPx={80} />
              </a>
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <>
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
          <LinksAndPreviews />
        </div>
        <div className={styles.rightContainer}>
          {photos?.map((photo, index) => {
            return (
              <div
                key={photo.fields.title}
                id={`photo-${index}`}
                className={styles.photoWrapper}
              >
                <ContentfulImage data={photo} />
              </div>
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
