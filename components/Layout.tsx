import { motion } from "framer-motion";
import { FC, ReactNode } from "react";
import { framer_default_variants } from "../lib/framer";

interface ILayout {
  children: ReactNode
}

const Layout: FC<ILayout> = ({children}) => {
  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={framer_default_variants}
      transition={{ type: 'linear' }}
    >
      {children}
    </motion.main>
  )
}

export default Layout