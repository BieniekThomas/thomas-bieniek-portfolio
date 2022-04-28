import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import CursorManager from "../components/Cursor/CursorManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <CursorManager>
        <Cursor />
        <div id="main-container">
          <Component
            {...pageProps}
            // canonical={url}
            // key={url}
          />
        </div>
      </CursorManager>
    </AnimatePresence>
  );
}

export default MyApp;
