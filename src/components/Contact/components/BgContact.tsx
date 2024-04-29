import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import icon from "../../../assets/contact.gif";

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
          backgroundColor: "#FFC12C",
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
            <Typography variant="h2" component="h1" sx={{ color: "black" }}>
              Contact
            </Typography>
          </Box>

          <Box
            sx={{
              width: {xs: '100%', lg: "50%"},
              height: "50%",
              //   width: "20%",
              //   height: "150px",
              backgroundImage: `url(${icon})`,
              backgroundSize: "cover",
              //   backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              //   backgroundAttachment: "fixed",
              // position: "fixed",
              // bottom: 0,
              // right: 0,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default BgContact;
