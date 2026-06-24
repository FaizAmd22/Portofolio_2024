import "./App.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Project from "./components/Project/Project";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import PageNav from "./components/PageNav/PageNav";
import BgContact from "./components/Contact/components/BgContact";
import Contact from "./components/Contact/Contact";
// import BgContact from "./components/Contact/components/BgContact";
// import Contact from "./components/Contact/Contact";

gsap.registerPlugin(ScrollTrigger);

const NAVBAR_THRESHOLD = 0.75;
const SNAP_POINTS_VH = [0, 300, 430, 555, 700, 800, 950, 1300] as const;
const SNAP_DURATION_MS = 750;

function App() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);
  const s5 = useRef<HTMLDivElement>(null);
  const s6 = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [vw, setVw] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setVw(window.innerWidth), 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const navSections = [
    { id: 1, label: "About", ref: aboutSectionRef, darkBg: true },
    { id: 2, label: "Project", ref: projectSectionRef, darkBg: false },
    { id: 3, label: "Contact", ref: contactSectionRef, darkBg: false },
  ];

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease", once: false });
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const thr = () => window.innerHeight * 4 * NAVBAR_THRESHOLD;
    const onScroll = () => setShowNavbar(window.scrollY >= thr());
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoading]);

  useLayoutEffect(() => {
    if (isLoading || !nameRef.current) return;
    const el = nameRef.current;
    const H = window.innerHeight;

    const clamp = (min: number, val: number, max: number) =>
      Math.max(min, Math.min(max, val));

    const nameMax = Math.round(clamp(15, vw * 0.042, 64));
    const nameAbout = Math.round(nameMax * 0.7);
    const lblMax = Math.round(clamp(7, vw * 0.0085, 16));
    const lblAbout = Math.round(lblMax * 0.7);

    gsap.set(el, {
      "--name-size": "0px",
      "--label-size": "0px",
      yPercent: -50,
      y: H * 0.5,
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { "--name-size": "0px", "--label-size": "0px" },
        {
          "--name-size": `${nameMax}px`,
          "--label-size": `${lblMax}px`,
          ease: "none",
          scrollTrigger: {
            trigger: s1.current,
            start: "top top",
            endTrigger: s2.current,
            end: "top top",
            scrub: 0.8,
          },
        }
      );
      gsap.fromTo(
        el,
        {
          "--name-size": `${nameMax}px`,
          "--label-size": `${lblMax}px`,
          yPercent: -50,
          y: H * 0.5,
        },
        {
          "--name-size": `${nameAbout}px`,
          "--label-size": `${lblAbout}px`,
          yPercent: 0,
          y: H * 0.08,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: s3.current,
            start: "top top",
            endTrigger: s4.current,
            end: "top top",
            scrub: 0.8,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [isLoading, vw]);

  useLayoutEffect(() => {
    if (isLoading || !aboutSectionRef.current || !nameRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "60% top",
            end: "70% top",
            scrub: 0.8,
          },
        }
      );
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: aboutSectionRef.current,
              start: "70% top",
              end: "bottom top",
              scrub: 0.8,
              onLeave: () => {
                gsap.set(bgRef.current, { opacity: 1 });
              },
              onEnterBack: () => {
                gsap.set(bgRef.current, { opacity: 1 });
              },
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const H = window.innerHeight;
    const snapPx = SNAP_POINTS_VH.map((vh) => (vh / 100) * H);
    let currentSnap = 0;
    let locked = false;

    const smoothScrollTo = (targetY: number) => {
      const startY = window.scrollY;
      const dist = targetY - startY;
      let t0: number | null = null;
      const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;
      const step = (ts: number) => {
        if (!t0) t0 = ts;
        const t = Math.min((ts - t0) / SNAP_DURATION_MS, 1);
        window.scrollTo(0, startY + dist * ease(t));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const trySnap = (dir: 1 | -1) => {
      if (locked) return;
      const next = currentSnap + dir;
      if (next < 0 || next >= snapPx.length) return;
      locked = true;
      currentSnap = next;
      smoothScrollTo(snapPx[next]);
      setTimeout(() => {
        locked = false;
      }, SNAP_DURATION_MS + 250);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowDown", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        trySnap(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        trySnap(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        if (!locked) {
          locked = true;
          currentSnap = 0;
          smoothScrollTo(0);
          setTimeout(() => {
            locked = false;
          }, SNAP_DURATION_MS + 250);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            ref={bgRef}
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: 0,
              backgroundColor: "var(--white-primary)",
              opacity: 0,
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              opacity: showNavbar && !isDetailOpen ? 1 : 0,
              transform: showNavbar ? "translateY(0)" : "translateY(-16px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              pointerEvents: showNavbar && !isDetailOpen ? "auto" : "none",
            }}
          >
            <Navbar
              aboutSectionRef={aboutSectionRef}
              projectSectionRef={projectSectionRef}
              contactSectionRef={contactSectionRef}
            />
          </Box>

          <PageNav
            sections={navSections}
            visibleFromVh={400}
            hidden={isDetailOpen}
          />

          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 50,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            <Box
              ref={nameRef}
              sx={{
                opacity: isDetailOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
                "--name-size": "0px",
                "--label-size": "0px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "var(--label-size)",
                  letterSpacing: vw >= 600 ? "0.55em" : "0.32em",
                  color: "var(--white-primary)",
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontWeight: 400,
                  textTransform: "uppercase",
                  mb: "8px",
                  opacity: 0.6,
                  lineHeight: 1,
                }}
              >
                +&nbsp;&nbsp;Frontend & Mobile Developer&nbsp;&nbsp;+
              </Typography>
              <Typography
                sx={{
                  fontSize: "var(--name-size)",
                  fontWeight: 300,
                  letterSpacing: vw >= 600 ? "0.28em" : "0.19em",
                  color: "var(--white-primary)",
                  fontFamily:
                    '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                  lineHeight: 1.0,
                }}
              >
                FAIZHAL AHMAD S.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ position: "relative", zIndex: 10 }}>
            <Box
              ref={s1}
              sx={{
                position: "absolute",
                top: "160vh",
                height: 0,
                pointerEvents: "none",
              }}
            />
            <Box
              ref={s2}
              sx={{
                position: "absolute",
                top: "300vh",
                height: 0,
                pointerEvents: "none",
              }}
            />
            <Box
              ref={s3}
              sx={{
                position: "absolute",
                top: "350vh",
                height: 0,
                pointerEvents: "none",
              }}
            />
            <Box
              ref={s4}
              sx={{
                position: "absolute",
                top: "430vh",
                height: 0,
                pointerEvents: "none",
              }}
            />
            <Box
              ref={s5}
              sx={{
                position: "absolute",
                top: "770vh",
                height: 0,
                pointerEvents: "none",
              }}
            />
            <Box
              ref={s6}
              sx={{
                position: "absolute",
                top: "870vh",
                height: 0,
                pointerEvents: "none",
              }}
            />

            <Hero />

            <Box
              id="About"
              ref={aboutSectionRef}
              sx={{ position: "relative", zIndex: 10 }}
            >
              <About />
            </Box>

            <Box
              id="Projects"
              ref={projectSectionRef}
              sx={{
                height: "auto",
                position: "relative",
                zIndex: 20,
                marginTop: "-150vh",
              }}
            >
              <Project onDetailToggle={setIsDetailOpen} />
            </Box>

            <BgContact />

            <Box
              id="Contact"
              ref={contactSectionRef}
              sx={{ position: "relative", zIndex: 10 }}
            >
              <Contact />
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default App;
