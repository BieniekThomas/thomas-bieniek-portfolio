import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import CursorManager from "../components/Cursor/CursorManager";
import LayoutManager from "../components/_Layout/LayoutManager";
import dynamic from "next/dynamic";

const DynamicLenis = dynamic(
  () =>
    import("../components/_Layout/LenisManager").then(
      (mod) => mod.LenisManager
    ),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
      <CursorManager>
        <LayoutManager>
          <DynamicLenis>
            <Cursor />
            <div id="main-container" className="scroll">
              <Component
                {...pageProps}
                // canonical={url}
                // key={url}
              />
            </div>
          </DynamicLenis>
        </LayoutManager>
      </CursorManager>
    </AnimatePresence>
  );
}

export default MyApp;
