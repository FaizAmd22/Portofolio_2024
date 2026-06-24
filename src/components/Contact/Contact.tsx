import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { Box, Link } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import ImageCat from "../../assets/cat.png";

gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  {
    icon: <FaWhatsapp />,
    href: "https://wa.me/6282228152950",
    label: "WhatsApp",
  },
  {
    icon: <AiFillInstagram />,
    href: "https://www.instagram.com/fzhal_a2/",
    label: "Instagram",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/faizhal-ahmad/",
    label: "LinkedIn",
  },
  { icon: <FaGithub />, href: "https://github.com/FaizAmd22", label: "GitHub" },
  { icon: <MdEmail />, href: "mailto:faizhalahmad8@gmail.com", label: "Email" },
];

const SVG_W = 560;
const SVG_H = 360;

const LEFT_EYE = { x: 165, y: 258 };
const RIGHT_EYE = { x: 395, y: 258 };

const MAX_PUPIL_TRAVEL = 15;

const HL_OFFSET = { dx: 13, dy: -15 };

function calcPupil(
  eyeCenter: { x: number; y: number },
  mouseX: number,
  mouseY: number
) {
  const dx = mouseX - eyeCenter.x;
  const dy = mouseY - eyeCenter.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const factor = Math.min(1, MAX_PUPIL_TRAVEL / dist);
  return {
    x: eyeCenter.x + dx * factor,
    y: eyeCenter.y + dy * factor,
  };
}

const PeekingCat = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [leftPupil, setLeftPupil] = useState({ x: LEFT_EYE.x, y: LEFT_EYE.y });
  const [rightPupil, setRightPupil] = useState({
    x: RIGHT_EYE.x,
    y: RIGHT_EYE.y,
  });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const scaleX = SVG_W / rect.width;
      const scaleY = SVG_H / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      setLeftPupil(calcPupil(LEFT_EYE, mx, my));
      setRightPupil(calcPupil(RIGHT_EYE, mx, my));
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const lHL = { x: leftPupil.x + HL_OFFSET.dx, y: leftPupil.y + HL_OFFSET.dy };
  const rHL = {
    x: rightPupil.x + HL_OFFSET.dx,
    y: rightPupil.y + HL_OFFSET.dy,
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", display: "block" }}
    >
      {/* Mata kiri — putih */}
      <circle cx={LEFT_EYE.x} cy={LEFT_EYE.y} r="54" fill="#FFFFFF" />
      {/* Pupil kiri — bergerak */}
      <circle
        cx={leftPupil.x}
        cy={leftPupil.y}
        r="32"
        fill="var(--black-primary)"
        style={{ transition: "cx 0.06s ease-out, cy 0.06s ease-out" }}
      />
      {/* Highlight kiri */}
      <circle cx={lHL.x} cy={lHL.y} r="10" fill="#FFFFFF" />

      {/* Mata kanan — putih */}
      <circle cx={RIGHT_EYE.x} cy={RIGHT_EYE.y} r="54" fill="#FFFFFF" />
      {/* Pupil kanan — bergerak */}
      <circle
        cx={rightPupil.x}
        cy={rightPupil.y}
        r="32"
        fill="var(--black-primary)"
        style={{ transition: "cx 0.06s ease-out, cy 0.06s ease-out" }}
      />
      {/* Highlight kanan */}
      <circle cx={rHL.x} cy={rHL.y} r="10" fill="#FFFFFF" />
    </svg>
  );
};

const Contact = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        iconsRef.current,
        { y: 60 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        catRef.current,
        { y: 120 },
        {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        height: "100vh",
        position: "relative",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <Box
        ref={iconsRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: "28px", sm: "36px", md: "48px" },
          pt: { xs: "50vh", md: "38vh" },
          fontSize: { xs: "44px", sm: "50px", md: "56px" },
        }}
      >
        {CONTACTS.map(({ icon, href, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            sx={{
              color: "var(--black-primary)",
              display: "flex",
              opacity: 0.85,
              transition: "transform 0.2s ease, opacity 0.2s ease",
              "&:hover": { transform: "scale(1.15)", opacity: 1 },
            }}
          >
            {icon}
          </Link>
        ))}
      </Box>

      <Box
        ref={catRef}
        sx={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "80vw", sm: "60vw", md: "45vw", lg: "38vw" },
          maxWidth: "560px",
        }}
      >
        <Box
          sx={{
            width: "110%",
            bottom: 20,
            marginLeft: { xs: -3, md: -5 },
            position: "fixed",
          }}
        >
          <img
            src={ImageCat}
            alt="Faizhal Ahmad S."
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box
          sx={{ position: "absolute", zIndex: 999, bottom: 10, width: "100%" }}
        >
          <PeekingCat />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
