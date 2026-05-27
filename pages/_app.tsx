import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import CursorManager from "../components/Cursor/CursorManager";
import LayoutManager from "../components/_Layout/LayoutManager";
import LenisManager from "../components/_Layout/LenisManager";
import { useRouter } from "next/router";
import { useNextCssRemovalPrevention } from "../hooks/useNextjsCssRemovalPrevention";
import { useEffect, useRef, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [exitComplete, setExitComplete] = useState(false);

  // detects browser back/forward navigation
  const isPopState = useRef(false);

  useEffect(() => {
    // disable browser automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // detect browser back/forward
    router.beforePopState(() => {
      isPopState.current = true;
      return true;
    });

    // save current scroll position before leaving route
    const handleRouteChangeStart = () => {
      sessionStorage.setItem(`scroll-${router.asPath}`, String(window.scrollY));
      console.log(
        "🚀 ~ handleRouteChangeStart ~ window.scrollY:",
        window.scrollY,
      );
    };

    // restore or reset scroll after navigation
    router.events.on("routeChangeStart", handleRouteChangeStart);
    setExitComplete(false);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.beforePopState(() => true);
    };
  }, [router]);

  useEffect(() => {
    const handleRouteChangeComplete = (url: string) => {
      requestAnimationFrame(() => {
        const savedScroll = sessionStorage.getItem(`scroll-${url}`);
        console.log(
          "🚀 ~ handleRouteChangeComplete ~ savedScroll:",
          savedScroll,
        );

        if (isPopState.current && savedScroll) {
          // restore previous position on browser back/forward
          console.log("on popstate, restoring scroll to:", savedScroll);
          window.scrollTo(0, parseInt(savedScroll, 10));
        } else {
          // normal navigation -> top
          window.scrollTo(0, 0);
        }

        isPopState.current = false;
      });
    };
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router, exitComplete]);

  useNextCssRemovalPrevention();

  return (
    <CursorManager>
      <LayoutManager>
        <LenisManager>
          <Cursor />
          <div id="main-container" className="scroll">
            <AnimatePresence
              mode="wait"
              onExitComplete={() => setExitComplete(true)}
            >
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </div>
        </LenisManager>
      </LayoutManager>
    </CursorManager>
  );
}

export default MyApp;
