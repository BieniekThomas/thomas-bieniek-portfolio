import { FC, useRef } from "react";
import { IAuthorFields } from "../../@types/generated/contentful";
import styles from './Introduction.module.scss'
import { useScroll, useTransform, motion } from "framer-motion";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { BackgroundImage } from "../Image/BackgroundImage";
import { AnimatedText } from "../AnimatedText/AnimatedText";

interface IIntroduction {
    data: {
        fields: IAuthorFields
    }
}

export const Introduction: FC<IIntroduction> = ({ data }) => {
    console.log("🚀 ~ data:", data)
    const {biography, name, profilePhoto} = data.fields
    const container = useRef(null)
    const {height} = useWindowDimensions()
    const h = height ?? 0
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })

    const y = useTransform(scrollYProgress, [0,1], [-h/2, h/4])

    return (<>
    <div className={styles.outerWrapper} ref={container}>
        <div>
            <h1>{name && <AnimatedText text={name} />}</h1>
        </div>
        {profilePhoto && <div className={styles.backgroundImage}><motion.div style={{y}}><BackgroundImage data={profilePhoto} /></motion.div></div>}
        <h1>{biography && <AnimatedText text={biography} />}</h1>
        <h3>Take a look below!</h3>
    </div>

    </>
    )
}