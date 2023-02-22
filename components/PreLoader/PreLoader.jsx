import { useEffect } from "react";
import { initLenis } from "../_Layout/LenisManager";

export const PreLoader = () => {
  console.log("preLoader init");
  const lenisContext = useLenisManagerContext();
  useEffect(() => {
    if (lenisContext) return;
    console.log("preLoader init lenis");
    initLenis(lenisContext);
  }, [lenisContext])
  return <div>PRELOADER</div>
}

export default PreLoader;