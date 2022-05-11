import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: Power2.easeInOut
});

export * from "gsap";
export * from "gsap/dist/ScrollTrigger";