/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import p1 from "../../assets/project01.png";
import p2 from "../../assets/project02.png";
import p3 from "../../assets/project03.png";
import p4 from "../../assets/project04.png";
import p5 from "../../assets/project05.png";
import p6 from "../../assets/project06.png";
import p7 from "../../assets/project07.png";
import TransitionsModal from "./components/Modal";
import Mobile from "./components/Mobile";

const Project = () => {
  const sectionRef = useRef<any>(null);
  const triggerRef = useRef<any>(null);

  console.log(window.scrollY);

  const data = [
    {
      name: "Dots.",
      image: p1,
      link: "https://dots-app-chill.vercel.app",
      source: "https://github.com/FaizAmd22/Dots_App",
      desc: "Dots is a Twitter-inspired web-based social media application, now known as X, that allows users to create and delete threads, post and delete replies, like and unlike content, follow and unfollow other users, search for users, and share link threads.",
    },
    {
      name: "Teka",
      image: p2,
      source: "https://github.com/teka-org",
      desc: "Teka (Tebak Kata) is a mobile-based trivia game that can be played multiplayer. This project was developed as a group by 2 Frontend and 2 Backend developers. Some of the features include: login with Google, top-up diamonds, purchase avatars, game matching with users who want to play, and ranking.",
    },
    {
      name: "Notify",
      image: p3,
      source: "https://github.com/FaizAmd22/Notify-NextJs-Tailwind-Supabase",
      link: "https://notify-chill.vercel.app",
      desc: "Notify is a website-based music player application inspired by Spotify. Some of its features include: login with Google, search for songs, add & remove songs from favorites list, player, and add your own songs.",
    },
    {
      name: "NoFlix",
      image: p4,
      source: "https://github.com/FaizAmd22/Movie-App-MERN",
      link: "https://noflix-chill.vercel.app",
      desc: "NoFlix is a movie website inspired by Netflix. However, the videos provided are a collection of trailers for the corresponding films. Some of the features include: login & register, adding favorite movies, post reply, Light & dark mode and search by movie, series or people.",
    },
    {
      name: "Simple Cart Next",
      image: p5,
      source: "https://github.com/FaizAmd22/Chart-Next-Express-MYSQL",
      desc: "It is a simple web-based cart application. This application can perform general cart functions such as adding products to the cart, displaying the total amount of products to be purchased, and displaying a list of transaction history.",
    },
    {
      name: "Simple Cart Vue",
      image: p6,
      source: "https://github.com/FaizAmd22/Chart-Next-Express-MYSQL",
      desc: "It is a very simple web-based cart application. This application can perform such as adding products to the cart and displaying the total amount of products to be purchased.",
    },
    {
      name: "MicroLogic",
      image: p7,
      source: "https://github.com/FaizAmd22/MicroLogic",
      link: "https://micro-logic-swart.vercel.app/",
      desc: "MicroLogic is a website that contains a collection of simple logic using JavaScript. Some of the functions included are countdown, currency conversion, list ofMobile Legends heroes, salary calculation, tic-tac-toe game, word scramble game, and matching card game.",
    },
  ];

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-400vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 1,
          pin: true,
        },
      }
    );

    // Animate project cards
    const cards = sectionRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.5,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  return (
    <>
      <Box
        ref={triggerRef}
        sx={{
          height: "100vh",
          color: "white",
          position: "relative",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          overflowX: "hidden",
          backgroundColor: "#222831",
          marginTop: "-10px",
          paddingBottom: "40vh",
        }}
      >
        <Box
          ref={sectionRef}
          sx={{
            height: "70vh",
            width: "500vw",
            display: "flex",
            flexDirection: "row",
            posititon: "relative",
            gap: "2.2%",
            // backgroundColor: "red",
          }}
        >
          <Typography
            data-aos="fade-up"
            // data-aos-delay="100"
            variant="h2"
            component="h1"
            sx={{
              width: "35%",
              textAlign: "center",
              // fontWeight: "bold",
              marginBottom: "20px",
              margin: "auto",
            }}
          >
            What I've Done
          </Typography>
          {data.map((item: any, index: number) => (
            <TransitionsModal item={item} key={index} />
          ))}
        </Box>
      </Box>

      {/* Mobile */}
      <Box
        sx={{
          // height: "auto",
          color: "white",
          position: "relative",
          display: { xs: "block", md: "none" },
          // flexDirection: "column",
          // justifyContent: "center",
          overflowX: "hidden",
          backgroundColor: "#222831",
          marginTop: "-10px",
          pt: "50vh",
          paddingBottom: "40vh",
        }}
      >
        <Typography
          data-aos="fade-up"
          // data-aos-delay="100"
          variant="h2"
          component="h1"
          sx={{
            width: "100%",
            textAlign: "center",
            // fontWeight: "bold",
            marginBottom: "20px",
            margin: "auto",
            pb: "50px",
            fontSize: { xs: "50px", lg: "65px" },
          }}
        >
          What I've Done
        </Typography>
        <Grid container sx={{}}>
          {data.map((item: any, index: number) => (
            <Grid
              key={index}
              xs={6}
              spacing={2}
              sx={{ width: "100%", margin: "auto" }}
            >
              <Mobile item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Project;
