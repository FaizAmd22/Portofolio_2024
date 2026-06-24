/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";

const Loading = () => {
  const typographyRef = useRef<any>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      gsap.to(typographyRef.current, {
        duration: 1,
        autoAlpha: 0,
        y: -50,
        ease: "power2.out",
        onComplete: () => {
          if (typographyRef.current) {
            typographyRef.current.remove();
          }
        },
      });
    }, 1400);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        // marginLeft: { xs: "0px", md: "-8px" },
      }}
    >
      <Box sx={{ display: "flex" }} ref={typographyRef}>
        <Typography data-aos="fade-up" sx={{ fontSize: "30px" }}>
          Faizhal
        </Typography>
        <Typography
          data-aos="fade-up"
          data-aos-delay="100"
          sx={{ fontSize: "30px", fontWeight: "bold" }}
        >
          Portofolio
        </Typography>
      </Box>
      <Box
        data-aos="zoom-in"
        data-aos-delay="1700"
        sx={{
          height: "80px",
          backgroundColor: "var(--black-primary)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformOrigin: "center center",
          width: "80px",
          borderRadius: "50%",
          position: "fixed",
          // border: '5px dotted var(--white-primary)',
          // boxShadow: "0px 0px 10px red",
          // zIndex: -1
        }}
      />
    </Box>
  );
};

export default Loading;
