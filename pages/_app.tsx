import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import CursorManager from "../components/Cursor/CursorManager";
import LayoutManager from "../components/_Layout/LayoutManager";
import {
  LenisManager,
  useLenisManagerContext,
} from "../components/_Layout/LenisManager";
import PreLoader from "../components/PreLoader/PreLoader";

function MyApp({ Component, pageProps }: AppProps) {
  const lenisContext = useLenisManagerContext();
  console.log("from _app.tsx", lenisContext);

  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
      <CursorManager>
        <LayoutManager>
          <LenisManager>
            <Cursor />
            {lenisContext ? (
              <div id="main-container" className="scroll">
                <Component
                  {...pageProps}
                  // canonical={url}
                  // key={url}
                />
              </div>
            ) : (
              <PreLoader />
            )}
          </LenisManager>
        </LayoutManager>
      </CursorManager>
    </AnimatePresence>
  );
}

export default MyApp;
