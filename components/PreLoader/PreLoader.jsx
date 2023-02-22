import { useEffect } from "react";
import { initLenis } from "../_Layout/LenisManager";

export const PreLoader = () => {
  console.log("preLoader shown");
  const lenisContext = useLenisManagerContext();
  useEffect(() => {
    if (lenisContext) return;
    initLenis(lenisContext);
  }, [lenisContext])
  return <div>PRELOADER</div>
}

export default PreLoader;