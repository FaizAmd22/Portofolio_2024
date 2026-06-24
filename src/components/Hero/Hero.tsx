import { useLayoutEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import icon from "../../assets/scroll.gif";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const wrapperRef = useRef(null);
  const zoomGroupRef = useRef(null);
  const hintRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(hintRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(hintRef.current, {
        opacity: 1,
        duration: 1.5,
        delay: 2,
        ease: "power1.in",
      });

      gsap.to(zoomGroupRef.current, {
        scale: 45,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ height: "400vh", position: "relative" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "var(--white-primary)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <Box
            ref={zoomGroupRef}
            sx={{
              width: "80px",
              height: "80px",
              position: "relative",
              transformOrigin: "center center",
            }}
          >
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "var(--black-primary)",
              }}
            />
            <Box
              ref={hintRef}
              sx={{
                position: "absolute",
                top: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "70px",
                  height: "70px",
                  backgroundImage: `url(${icon})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <Typography
                sx={{
                  width: "300px",
                  textAlign: "center",
                  fontSize: "22px",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                }}
              >
                Scroll Down / Use Arrow Keys
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
