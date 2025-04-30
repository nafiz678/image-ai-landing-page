/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/hooks/useLocoScroll.ts
import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start: boolean) {
  useEffect(() => {
    if (!start) {return} // If not ready, don't initialize

    const scrollEl = document.querySelector("#main") as HTMLElement;
    if (!scrollEl) {return;}

    const locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      lerp: 0.075, // optional, smoother scrolling
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      if (locoScroll) {locoScroll.destroy();}
      ScrollTrigger.removeEventListener("refresh", () => locoScroll.update());
    };
  }, [start]);
}
