import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import CursorManager from "../components/Cursor/CursorManager";
import LayoutManager from "../components/_Layout/LayoutManager";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
      <CursorManager>
        <LayoutManager>
          <Cursor />
          <div id="main-container" className="scroll">
            <Component
              {...pageProps}
              // canonical={url}
              // key={url}
            />
          </div>
        </LayoutManager>
      </CursorManager>
    </AnimatePresence>
  );
}

export default MyApp;
