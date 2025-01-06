import { Box, Typography, Button, Grid, Stack, Link } from "@mui/material";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import foto from "../../assets/foto.jpg";

const About = () => {
  return (
    <Box
      //   ref={bg2}
      sx={{
        marginTop: "50vh",
        paddingBottom: "0vh",
        height: { xs: "auto", lg: "100vh" },
        backgroundColor: "#222831",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 0,
        overflowX: "hidden",
        // paddingTop: "150px",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          color: "white",
          width: "80%",
          margin: "auto",
          // backgroundColor: "red",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: "auto", lg: "100vh" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            order: { xs: 2, md: 1 },
          }}
        >
          <Typography
            data-aos="fade-up"
            data-aos-delay="100"
            variant="h2"
            component="h1"
            sx={{
              marginTop: { xs: "50px", md: "0px" },
              fontSize: { xs: "50px", lg: "65px" },
            }}
          >
            About Me
          </Typography>
          <Typography
            data-aos="fade-left"
            data-aos-delay="100"
            sx={{ marginTop: "30px", fontSize: "16px" }}
          >
            Hello! I am a dedicated Full Stack Developer based in Tangerang Selatan, Banten, Indonesia. With a passion for building responsive and efficient web applications, I specialize in both front-end and back-end development. My expertise includes HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Express, Laravel, as well as databases like PostgreSQL, MySQL, and MongoDB. I thrive on solving complex problems and continuously learning new technologies to create innovative solutions that make a real impact. My experience spans individual projects and collaborative team efforts, and I firmly believe that effective collaboration across disciplines is key to success. I’m always eager to connect with like-minded professionals and explore new opportunities, so feel free to reach out!
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            data-aos="fade-down"
            data-aos-delay="100"
            sx={{ marginTop: "50px" }}
          >
            <Link
              target="blank"
              href="https://www.instagram.com/fzhal_a2/"
              sx={{
                // backgroundColor: "white",
                color: "white",
                fontSize: "35px",
                paddingY: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                width: "100px",
                transition: "all ease-in-out 0.3s",
                "&:hover": {
                  backgroundColor: "#1d2227",
                  fontSize: "30px",
                  boxShadow: "1px 2px 2px white",
                },
              }}
            >
              <AiFillInstagram />
            </Link>

            <Link
              target="blank"
              href="https://www.linkedin.com/in/faizhal-ahmad/"
              sx={{
                // backgroundColor: "white",
                color: "white",
                fontSize: "35px",
                paddingY: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                width: "100px",
                transition: "all ease-in-out 0.3s",
                "&:hover": {
                  backgroundColor: "#1d2227",
                  fontSize: "28px",
                  boxShadow: "1px 2px 2px white",
                },
              }}
            >
              <FaLinkedin />
            </Link>

            <Link
              target="blank"
              href="https://github.com/FaizAmd22"
              sx={{
                // backgroundColor: "white",
                color: "white",
                fontSize: "35px",
                paddingY: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                width: "100px",
                transition: "all ease-in-out 0.3s",
                "&:hover": {
                  backgroundColor: "#1d2227",
                  fontSize: "28px",
                  boxShadow: "1px 2px 2px white",
                },
              }}
            >
              <FaGithub />
            </Link>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            order: { xs: 1, md: 2 },
          }}
        >
          <Box
            data-aos="fade-down"
            data-aos-delay="250"
            sx={{
              width: { xs: "90%", md: "75%", lg: "50%" },
              height: { xs: "300px", md: "400px" },
              backgroundImage: `url(${foto})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              // backgroundColor: "red",
              borderRadius: "20px",
              border: "2px solid white",
              marginBottom: "30px",
            }}
          />

          <Box
            data-aos="fade-down"
            data-aos-delay="250"
            sx={{ width: { xs: "90%", md: "40%" } }}
          >
            <Link
              href="https://drive.google.com/file/d/1JJ7w0GW1-aYMnRxhS1wPoqbHKshs0X0l/view?usp=sharing"
              target="blank"
              sx={{
                width: "full",
                // px: "90px",
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  pt: "7px",
                  backgroundColor: "white",
                  fontWeight: "bold",
                  fontSize: { xs: "15px", lg: "18px" },
                  borderRadius: "30px",
                  color: "#222831",
                  border: "2px solid #222831",
                  textDecoration: "none",
                  transition: "all ease-in-out 0.5s",
                  // margin: 'auto',
                  "&:hover": {
                    color: "white",
                    backgroundColor: "none",
                    // boxShadow: "1px 2px 2px white",
                    border: "2px solid white",
                  },
                }}
              >
                Read the CV
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
