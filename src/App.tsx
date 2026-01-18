import "./App.css";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Project from "./components/Project/Project";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import BgContact from "./components/Contact/components/BgContact";
import Contact from "./components/Contact/Contact";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

function App() {
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const projectSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const bg1 = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bg1.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(bg1.current, { scale: 45, duration: 0.45 });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease",
      once: false,
    });

    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return;

    const isNotNull = <T,>(v: T | null | undefined): v is T => v != null;

    const sections: HTMLElement[] = [
      heroSectionRef.current,
      aboutSectionRef.current,
      projectSectionRef.current,
      contactSectionRef.current,
    ].filter(isNotNull);

    if (!sections.length) return;

    let index = 0;
    let locked = false;
    let unlockTimer: number | null = null;
    let scrollTween: gsap.core.Tween | null = null;

    const setIndexFromScroll = () => {
      const y = window.scrollY;
      let closest = 0;
      let minDist = Infinity;

      sections.forEach((el, i) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const dist = Math.abs(top - y);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      index = closest;
    };

    setIndexFromScroll();

    const lock = (ms = 420) => {
      locked = true;
      if (unlockTimer) clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => (locked = false), ms);
    };

    /** 🔑 SATU-SATUNYA FUNGSI NAVIGASI */
    const goToIndex = (idx: number, force = false) => {
      if (!force) {
        if (locked) return;
        if (document.body.classList.contains("in-project")) return;
      }

      const clamped = Math.max(0, Math.min(idx, sections.length - 1));
      if (clamped === index) return;

      index = clamped;
      scrollTween?.kill();

      scrollTween = gsap.to(window, {
        duration: 0.25,
        ease: "none",
        scrollTo: { y: sections[index], autoKill: false },
      });

      if (!force) lock();
    };

    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      tolerance: 8,
      preventDefault: true,
      debounce: true,
      allowClicks: true,
      ignore: "input, textarea, select, button, [contenteditable]",

      onDown: () => goToIndex(index + 1),
      onUp: () => goToIndex(index - 1),
    });

    const onScroll = () => {
      if (!document.body.classList.contains("in-project")) {
        setIndexFromScroll();
      }
    };

    const onResize = () => setIndexFromScroll();

    const onNav = (e: Event) => {
      const ce = e as CustomEvent<{
        to: "hero" | "about" | "projects" | "contact";
      }>;
      const map = { hero: 0, about: 1, projects: 2, contact: 3 } as const;
      goToIndex(map[ce.detail.to], true); // force
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("snap:navigate", onNav as EventListener);

    return () => {
      if (unlockTimer) clearTimeout(unlockTimer);
      obs.kill();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("snap:navigate", onNav as EventListener);
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar
            aboutSectionRef={aboutSectionRef}
            projectSectionRef={projectSectionRef}
            contactSectionRef={contactSectionRef}
          />

          <Box>
            <Box ref={heroSectionRef}>
              <Hero />
            </Box>

            <Box id="About" ref={aboutSectionRef}>
              <About />
            </Box>

            <Box id="Projects" ref={projectSectionRef}>
              <Project />
            </Box>

            <Box
              sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Contact />
            </Box>

            <Box id="Contact" ref={contactSectionRef}>
              <BgContact />
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default App;
