import { FC, ReactNode, useRef } from "react";
import styles from './TextSlider.module.scss'
import { useScroll, useTransform, motion } from "framer-motion";

interface ITextSlider {
    startOffset: string | number
    direction: 'left' | 'right'
    children: ReactNode | ReactNode[]
    velocity: number
}

export const TextSlider: FC<ITextSlider> = ({ startOffset, direction, children, velocity }) => {

    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })
    const dir = direction == 'left' ? 1 : -1;
    const scrollOffset = useTransform(scrollYProgress, [0, 1], [-250 * dir * velocity, 250 * dir * velocity])

    return (
        <div className={styles.outerWrapper} ref={containerRef}>
            <motion.div className={styles.sliderWrapper} style={{ x: scrollOffset, left: startOffset }}>
                {[...Array(3)].map((_, i) => {
                    return <div key={`textSlider-${i}-${startOffset}`} className={styles.childrenWrapper}>{children}</div>
                })}
            </motion.div>
        </div>
    )
}