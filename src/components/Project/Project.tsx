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
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

const Project = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    const items = Array.from(section.children) as HTMLElement[];
    if (items.length < 2) return;

    let index = 0;
    let isAnimating = false;

    // end = jumlah step * tinggi layar -> pinned cukup lama untuk semua item
    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: () => `+=${(items.length - 1) * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      onEnter: () => document.body.classList.add("in-project"),
      onEnterBack: () => document.body.classList.add("in-project"),
      onLeave: () => document.body.classList.remove("in-project"),
      onLeaveBack: () => document.body.classList.remove("in-project"),
    });

    const getCenterX = (item: HTMLElement) => {
      const viewportWidth = window.innerWidth;
      const itemRect = item.getBoundingClientRect();
      const itemWidth = itemRect.width;

      // offsetLeft relatif ke parent (sectionRef)
      return -item.offsetLeft + viewportWidth / 2 - itemWidth / 2;
    };

    const snapTo = (next: number) => {
      if (isAnimating) return;
      const clamped = Math.max(0, Math.min(next, items.length - 1));
      if (clamped === index) return;

      index = clamped;
      isAnimating = true;

      gsap.to(section, {
        x: getCenterX(items[index]),
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
        },
      });
    };

    // ... kode st, getCenterX, snapTo sama seperti kamu ...

    let locked = false;
    let unlockTimer: number | null = null;

    const lock = (ms = 420) => {
      locked = true;
      if (unlockTimer) window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, ms);
    };

    const exitDown = () => {
      // keluar ke bawah: lepas mode project dan dorong scroll melewati end
      document.body.classList.remove("in-project");
      // geser scroll sedikit supaya ScrollTrigger benar-benar leave
      window.scrollTo({ top: st.end + 2, behavior: "auto" });
      ScrollTrigger.update();
    };

    const exitUp = () => {
      document.body.classList.remove("in-project");
      window.scrollTo({ top: st.start - 2, behavior: "auto" });
      ScrollTrigger.update();
    };

    const obs = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      tolerance: 10,
      preventDefault: true,
      allowClicks: true,
      debounce: true, // ✅ supaya 1 gesture tidak spam
      ignore: "input, textarea, select, button, [contenteditable]",

      onDown: () => {
        if (!st.isActive) return;
        if (locked) return;

        if (index < items.length - 1) {
          snapTo(index + 1);
          lock();
          return;
        }

        // ✅ sudah terakhir -> keluar ke bawah (Contact)
        lock();
        exitDown();
      },

      onUp: () => {
        if (!st.isActive) return;
        if (locked) return;

        if (index > 0) {
          snapTo(index - 1);
          lock();
          return;
        }

        // ✅ sudah pertama -> keluar ke atas (About)
        lock();
        exitUp();
      },
    });

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer);
      obs.kill();
      st.kill();
      document.body.classList.remove("in-project");
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
          overflow: "hidden", // ✅ kunci horizontal
          backgroundColor: "#222831",
          marginTop: "-10px",
        }}
      >
        <Box
          ref={sectionRef}
          sx={{
            height: "70vh",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: "2.2%",
            width: "max-content",
            willChange: "transform",
          }}
        >
          {/* Title dianggap item pertama */}
          <Box
            sx={{
              flex: "0 0 auto",
              minWidth: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              data-aos="fade-up"
              variant="h2"
              component="h1"
              sx={{ textAlign: "center", margin: "auto" }}
            >
              What I've Done
            </Typography>
          </Box>

          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TransitionsModal item={item} />
            </Box>
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
