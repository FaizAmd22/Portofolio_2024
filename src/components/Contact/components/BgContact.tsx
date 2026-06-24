import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BgContact = () => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          zIndex: -2,
          width: "100%",
          height: "100vh",
          backgroundColor: "var(--orange-primary)",
          // backgroundImage: `url(${bg})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundAttachment: "fixed",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: "var(--black-primary)",
                fontFamily: '"Cherry Bomb One", system-ui',
                opacity: 0.85,
                marginTop: { xs: "15vh", md: 0 },
              }}
            >
              Contact
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BgContact;
