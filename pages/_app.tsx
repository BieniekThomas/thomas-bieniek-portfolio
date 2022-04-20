import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Cursor from '../components/Cursor/Cursor'

function MyApp({ Component, pageProps }: AppProps) {
  return  (
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Cursor />
      <Component {...pageProps} 
        // canonical={url} 
        // key={url}
      />
    </AnimatePresence>
  )
}

export default MyApp
