import { FC, useRef } from "react";
import { IParallaxGalleryFields } from "../../@types/generated/contentful";
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './ParallaxGallery.module.scss'
import ContentfulImage from "../Image/Image";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { Asset, ChainModifiers } from "contentful";
import { BackgroundImage } from "../Image/BackgroundImage";

interface IParaGallery {
    data: {
        fields: IParallaxGalleryFields
    }
}

const chunk = (arr: Asset<ChainModifiers, string>[], size: number) => {
    //@ts-ignore
    return arr.reduce((carry, _, index, orig) => !(index % size) ? carry.concat([orig.slice(index, index+size)]) : carry, [])
};

const ParallaxGallery: FC<IParaGallery> = ({ data }) => {
    const { images } = data.fields;
    const containerRef = useRef(null)

    // const { width } = useWindowDimensions()

    const {height} = useWindowDimensions()
    const h = height ?? 0
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    const y = [
        useTransform(scrollYProgress, [0,1], [0, -h/4]),
        useTransform(scrollYProgress, [0,1], [-300, -h/2]),
        useTransform(scrollYProgress, [0,1], [-h/2, h/3]),
        useTransform(scrollYProgress, [0,1], [-500, -h])
    ]
    
    if (!images) return;
    return (
        <div className={styles.outerWrapper} ref={containerRef}>
            <div className={styles.innerWrapper}>
            {chunk(images, 4).map((item: any[], index) => (
                <motion.div style={{y: y[index]}} className={styles.columnWrapper} key={`column-${index}`}>
                    {item.map((image , index) => (
                    <motion.div key={`${image.fields.file.url}`} id={`column-photo-${index}`}>
                        <motion.div
                            className={styles.photoWrapper}
                        >
                            <BackgroundImage data={image} maxDimensionInPx={800} />
                        </motion.div>
                    </motion.div>
                ))} 
            </motion.div>
            ))}
            </div>
        </div>
    )
}

export default ParallaxGallery;