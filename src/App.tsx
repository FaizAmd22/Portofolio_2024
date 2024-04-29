import "./App.css";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Project from "./components/Project/Project";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import BgContact from "./components/Contact/components/BgContact";
import Contact from "./components/Contact/Contact";
gsap.registerPlugin(ScrollTrigger);

function App() {
  const aboutSectionRef = useRef(null);
  const projectSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bg1 = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bg1.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(bg1.current, {
      scale: 45,
      duration: 2,
    });

    // gsap.to(bg2.current, {
    //   scrollTrigger: {
    //     trigger: bg2.current,
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: true
    //   },
    //   scale: 2,
    //   duration: 1
    // });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease",
      once: false,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

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
            <Hero />

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
                flexDirection: 'column',
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
    // <>
    //   <Loading />
    //   {/* <Hero /> */}
    // </>
  );
}

export default App;
