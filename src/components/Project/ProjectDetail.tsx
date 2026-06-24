/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useLayoutEffect } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import ImageShowcase, { ProjectImage } from "./components/ImageShowcase";
import DescriptionPart from "./components/DescriptionPart";

export interface ProjectData {
  id: number;
  name: string;
  category: string;
  year: string;
  role: string;
  description: string;
  tech: string[];
  links?: linksDetailProps[] | [];
  images: ProjectImage[];
  features?: string[];
  thumbnail: string;
  bg: string;
}

interface linksDetailProps {
  type: "playstore" | "appstore" | "website" | "code";
  url: string;
}

interface Props {
  project: ProjectData;
  sourceRect: DOMRect;
  onClose: () => void;
}

const ProjectDetail = ({ project, sourceRect, onClose }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const animImgRef = useRef<HTMLDivElement>(null);
  const naturalImgRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const W = window.innerWidth;

    document.documentElement.style.overflow = "hidden";

    gsap.set(naturalImgRef.current, { opacity: 0 });
    gsap.set(backBtnRef.current, { opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 40 });

    gsap.set(animImgRef.current, {
      display: "block",
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
      borderRadius: "4px",
    });

    gsap.set(overlayRef.current, { visibility: "visible" });

    gsap.to(animImgRef.current, {
      top: 0,
      left: 0,
      width: W,
      height: "90vh",
      borderRadius: 0,
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(naturalImgRef.current, { opacity: 1 });
        gsap.set(animImgRef.current, { display: "none" });
      },
    });

    gsap.to(backBtnRef.current, { opacity: 1, delay: 0.4, duration: 0.35 });
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.55,
      duration: 0.45,
      ease: "power2.out",
    });

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    const W = window.innerWidth;

    overlayRef.current?.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });

    gsap.to([backBtnRef.current, contentRef.current], {
      opacity: 0,
      duration: 0.2,
    });

    gsap.set(animImgRef.current, {
      display: "block",
      top: 0,
      left: 0,
      width: W,
      height: "90vh",
      borderRadius: 0,
    });
    gsap.set(naturalImgRef.current, { opacity: 0 });

    gsap.to(animImgRef.current, {
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
      borderRadius: "4px",
      delay: 0.1,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => {
        document.documentElement.style.overflow = "";
        onClose();
      },
    });
  };

  return (
    <>
      <Box
        ref={overlayRef}
        onWheel={(e) => e.stopPropagation()}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 110,
          backgroundColor: "var(--white-primary)",
          overflowY: "auto",
          visibility: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <Box
            ref={naturalImgRef}
            sx={{ width: "100%", height: "90%", opacity: 0 }}
          >
            {project.thumbnail ? (
              <Box
                component="img"
                src={project.thumbnail}
                alt={project.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <Box
                sx={{ width: "100%", height: "100%", background: project.bg }}
              />
            )}
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "10vh",
              background: "var(--white-primary)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <Box
            ref={backBtnRef}
            sx={{
              position: "absolute",
              bottom: { xs: "2rem", md: "2rem" },
              left: { xs: "1.5rem", md: "120px" },
              zIndex: 2,
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <HiOutlineArrowNarrowLeft />
              <Typography
                sx={{
                  fontSize: "17px",
                  // color: "var(--white-primary)",
                  fontFamily: "Georgia, serif",
                  textDecoration: "underline",
                  fontStyle: "italic",
                  letterSpacing: "0.1em",
                  userSelect: "none",
                  opacity: 0.9,
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 1 },
                }}
              >
                Back to project
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          ref={contentRef}
          sx={{
            px: { xs: 3, sm: 5, md: 10, lg: 14 },
            pt: { xs: 6, md: 8 },
            pb: { xs: 8, md: 12 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 3,
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13vw", sm: "9vw", md: "7vw", lg: "6vw" },
                fontWeight: 300,
                letterSpacing: "0.02em",
                color: "var(--black-primary)",
                fontFamily:
                  '"Cormorant Garamond", "Playfair Display", Georgia, serif',
                lineHeight: 1,
              }}
            >
              {project.name}
            </Typography>

            <Box sx={{ textAlign: "right", pb: "6px" }}>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "var(--black-primary)",
                  opacity: 0.45,
                  fontFamily: "Georgia,serif",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  mb: "4px",
                }}
              >
                {project.year}
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "var(--black-primary)",
                  opacity: 0.65,
                  fontFamily: "Georgia,serif",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {project.category}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              height: "1px",
              backgroundColor: "rgba(34,40,49,0.12)",
              mb: 6,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", lg: "row" },
              gap: { xs: "50px", lg: 0 },
            }}
          >
            <DescriptionPart project={project} />

            <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
              {project.images.length > 0 && (
                <ImageShowcase images={project.images} alt={project.name} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        ref={animImgRef}
        sx={{
          position: "fixed",
          zIndex: 120,
          overflow: "hidden",
          display: "none",
        }}
      >
        {project.thumbnail ? (
          <Box
            component="img"
            src={project.thumbnail}
            alt={project.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box sx={{ width: "100%", height: "100%", background: project.bg }} />
        )}
      </Box>
    </>
  );
};

export default ProjectDetail;
