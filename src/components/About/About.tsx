/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useRef } from "react";
import { Box, Typography, Stack, Link } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import foto from "../../assets/foto.png";
import {
  SiApachecordova,
  SiFlutter,
  SiLeaflet,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiTypescript,
} from "react-icons/si";
import { GrConnectivity } from "react-icons/gr";

gsap.registerPlugin(ScrollTrigger);

const CARD_TOP = "52%";
const CARD_LEFT = "5%";
const CARD_RIGHT = "5%";
const PHOTO_WIDTH = "32%";

const SOCIALS = [
  { icon: <AiFillInstagram />, href: "https://www.instagram.com/fzhal_a2/" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/faizhal-ahmad/" },
  { icon: <FaGithub />, href: "https://github.com/FaizAmd22" },
];
const STACK = [
  { name: "React.js", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Flutter", icon: SiFlutter },
  { name: "Cordova", icon: SiApachecordova },
  { name: "Leaflet.js", icon: SiLeaflet },
  { name: "WebSocket", icon: GrConnectivity },
  { name: "Redux", icon: SiRedux },
  { name: "Node.js", icon: SiNodedotjs },
];

const About = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const w = wrapperRef.current;
    if (!w) return;

    const vw = window.innerWidth;
    const xLeft = vw >= 1200 ? 200 : vw >= 900 ? 140 : vw >= 600 ? 80 : 0;
    const xRight = -(vw >= 1200 ? 200 : vw >= 900 ? 140 : vw >= 600 ? 80 : 0);

    gsap.set(photoRef.current, { opacity: 0, y: 40 });
    gsap.set(leftCardRef.current, { opacity: 0, y: 80, x: xLeft });
    gsap.set(rightCardRef.current, { opacity: 0, y: 80, x: xRight });

    const ctx = gsap.context(() => {
      // Foto muncul
      gsap.to(photoRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: w,
          start: "top top",
          end: "3% top",
          scrub: 1.2,
        },
      });

      // Left card
      const tlLeft = gsap.timeline({
        scrollTrigger: {
          trigger: w,
          start: "20% top",
          end: "40% top",
          scrub: 0.7,
        },
      });
      tlLeft
        .to(leftCardRef.current, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 15,
        })
        .to(leftCardRef.current, { opacity: 1, duration: 68 })
        .to(leftCardRef.current, {
          opacity: 0,
          y: -150,
          ease: "power3.in",
          duration: 17,
        });

      // Right card
      gsap.to(rightCardRef.current, {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: w,
          start: "40% top",
          end: "50% top",
          scrub: 0.7,
        },
      });

      gsap.fromTo(
        stickyRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: w,
            start: "70% top",
            end: "bottom top",
            scrub: 0.8,
            onLeave: () => {
              gsap.set(stickyRef.current, { display: "none" });
            },
            onEnterBack: () => {
              gsap.set(stickyRef.current, { display: "block", opacity: 0 });
            },
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const cardSx = {
    backgroundColor: "var(--white-primary)",
    borderRadius: "16px",
    padding: { xs: "20px 22px", sm: "26px 28px", md: "28px 32px" },
    width: { xs: "min(86vw, 320px)", sm: "275px", md: "295px" },
  };

  return (
    <Box ref={wrapperRef} sx={{ height: "500vh", position: "relative" }}>
      <Box
        ref={stickyRef}
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: "var(--black-primary)",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <Box
          ref={photoRef}
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: { xs: "75%", sm: "55%", md: PHOTO_WIDTH },
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <img
            src={foto}
            alt="Faizhal Ahmad S."
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: { xs: "40%", sm: CARD_TOP },
            left: { xs: "50%", sm: CARD_LEFT },
            transform: { xs: "translate(-50%, -50%)", sm: "translateY(-50%)" },
            zIndex: 2,
          }}
        >
          <Box ref={leftCardRef} sx={cardSx}>
            <Typography
              sx={{
                fontSize: "10px",
                letterSpacing: "0.45em",
                color: "var(--black-primary)",
                opacity: 0.45,
                textTransform: "uppercase",
                mb: "14px",
                fontFamily: "Georgia,serif",
              }}
            >
              About
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "15px", sm: "16px", md: "17px" },
                fontWeight: 500,
                lineHeight: 1.4,
                color: "var(--black-primary)",
                fontFamily: "Georgia,serif",
                mb: "14px",
              }}
            >
              I help teams turn ideas into apps that ship — and that people
              actually want to use.
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "12.5px", sm: "13px", md: "13px" },
                lineHeight: { xs: 1.75, md: 1.85 },
                color: "var(--black-primary)",
                opacity: 0.85,
                fontFamily: "Georgia,serif",
                mb: "24px",
              }}
            >
              I like taking on the tricky parts — real-time data,
              cross-platform, the details that make an interface feel right — so
              the rest of the team doesn&apos;t have to.
            </Typography>
            <Stack direction="row" spacing={1}>
              {SOCIALS.map(({ icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  sx={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "1px solid rgba(34,40,49,0.25)",
                    color: "var(--black-primary)",
                    fontSize: "17px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "var(--black-primary)",
                      color: "var(--white-primary)",
                      borderColor: "var(--black-primary)",
                    },
                  }}
                >
                  {icon}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: { xs: "35%", sm: CARD_TOP },
            left: { xs: "50%", sm: "auto" },
            right: { xs: "auto", sm: CARD_RIGHT },
            transform: { xs: "translate(-50%, -50%)", sm: "translateY(-50%)" },
            zIndex: 2,
          }}
        >
          <Box ref={rightCardRef} sx={cardSx}>
            <Typography
              sx={{
                fontSize: "10px",
                letterSpacing: "0.45em",
                color: "var(--black-primary)",
                opacity: 0.45,
                textTransform: "uppercase",
                mb: "16px",
                fontFamily: "Georgia,serif",
              }}
            >
              My Stack
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: "7px", mb: "22px" }}
            >
              {STACK.map(({ name, icon }) => {
                const Icons = icon;

                return (
                  <Box
                    key={name}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "11px",
                      padding: "5px 12px",
                      border: "1px solid rgba(34,40,49,0.22)",
                      borderRadius: "20px",
                      color: "var(--black-primary)",
                      letterSpacing: "0.04em",
                      fontFamily: "Georgia,serif",
                      transition: "all 0.2s ease",
                      "& svg": { fontSize: "12px", flexShrink: 0 },
                      "&:hover": {
                        backgroundColor: "var(--black-primary)",
                        color: "var(--white-primary)",
                        borderColor: "var(--black-primary)",
                      },
                    }}
                  >
                    <Icons size={14} />
                    <Typography sx={{ fontSize: "10px" }}>{name}</Typography>
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{ borderTop: "1px solid rgba(34,40,49,0.12)", mb: "16px" }}
            />
            <Link
              href="https://drive.google.com/file/d/16hjl7rsiNlJey6m9EXLAwQRbtiGKnbMh/view?usp=sharing"
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  padding: "10px 20px",
                  backgroundColor: "var(--black-primary)",
                  color: "var(--white-primary)",
                  borderRadius: "30px",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  cursor: "pointer",
                  fontFamily: "Georgia,serif",
                  transition: "background-color 0.25s ease",
                  "&:hover": { backgroundColor: "#3a4451" },
                }}
              >
                View my CV
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
