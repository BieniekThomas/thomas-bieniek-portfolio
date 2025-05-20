import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import CursorManager from "../components/Cursor/CursorManager";
import LayoutManager from "../components/_Layout/LayoutManager";
import LenisManager from "../components/_Layout/LenisManager";
import { useRouter } from "next/router";
import { useNextCssRemovalPrevention } from "../hooks/useNextjsCssRemovalPrevention";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useNextCssRemovalPrevention();
  return (
    <CursorManager>
      <LayoutManager>
        <LenisManager>
          <Cursor />
          <div id="main-container" className="scroll">
            <AnimatePresence
              mode="sync"
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Component
                {...pageProps}
                // canonical={url}
                // key={url}
                key={router.asPath}
              />
            </AnimatePresence>
          </div>
        </LenisManager>
      </LayoutManager>
    </CursorManager>
  );
}

export default MyApp;
