import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import CursorManager from "../components/Cursor/CursorManager";
import LayoutManager from "../components/_Layout/LayoutManager";
import LenisManager from "../components/_Layout/LenisManager";
import { useRouter } from "next/router";
import { useNextCssRemovalPrevention } from "../hooks/useNextjsCssRemovalPrevention";
import { useEffect, useRef } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // detects browser back/forward navigation
  const isPopState = useRef(false);

  useEffect(() => {
    // disable browser automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // save current scroll position before leaving route
    const handleRouteChangeStart = () => {
      sessionStorage.setItem(`scroll-${router.asPath}`, String(window.scrollY));
      console.log(
        "🚀 ~ handleRouteChangeStart ~ window.scrollY:",
        window.scrollY,
        `scroll-${router.asPath}`,
      );
    };

    // restore or reset scroll after navigation
    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.beforePopState(() => true);
    };
  }, [router]);

  const onExit = () => {
    const savedScroll = sessionStorage.getItem(`scroll-${router.asPath}`);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    } else {
      window.scrollTo(0, 0);
    }
    isPopState.current = false;
  };

  useNextCssRemovalPrevention();

  return (
    <CursorManager>
      <LayoutManager>
        <LenisManager>
          <Cursor />
          <div id="main-container" className="scroll">
            <AnimatePresence mode="wait" onExitComplete={() => onExit()}>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </div>
        </LenisManager>
      </LayoutManager>
    </CursorManager>
  );
}

export default MyApp;
