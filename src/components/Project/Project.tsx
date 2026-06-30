/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectDetail, { ProjectData } from "./ProjectDetail";
import { PROJECTS } from "./constant";
import { usePageTransition } from "../PageTransition";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_COUNT = 6;
const DISPLAY_PROJECTS = PROJECTS.slice(0, VISIBLE_COUNT);
const N = DISPLAY_PROJECTS.length;
const DUR = 0.5;

interface ProjectProps {
  onDetailToggle?: (open: boolean) => void;
}

const Project = ({ onDetailToggle }: ProjectProps) => {
  const { go } = usePageTransition();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgCoverRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const isFirstRender = useRef(true);

  const [detailProject, setDetailProject] = useState<ProjectData | null>(null);
  const sourceRectRef = useRef<DOMRect | null>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const titleRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const thumbRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const thumbLineRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));

  useLayoutEffect(() => {
    if (
      !wrapperRef.current ||
      !bgCoverRef.current ||
      !textRef.current ||
      !carouselRef.current
    )
      return;

    gsap.set([bgCoverRef.current, textRef.current, carouselRef.current], {
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
    });

    for (let i = 0; i < N; i++) {
      const on = i === 0;
      if (imageRefs.current[i])
        gsap.set(imageRefs.current[i]!, { opacity: on ? 1 : 0 });
      if (titleRefs.current[i])
        gsap.set(titleRefs.current[i]!, { opacity: on ? 1 : 0 });
      if (thumbRefs.current[i])
        gsap.set(thumbRefs.current[i]!, { opacity: on ? 1 : 0.35 });
      if (thumbLineRefs.current[i])
        gsap.set(thumbLineRefs.current[i]!, {
          scaleX: on ? 1 : 0,
          opacity: on ? 1 : 0,
          transformOrigin: "left center",
        });
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgCoverRef.current,
        { opacity: 0, visibility: "hidden" },
        {
          opacity: 1,
          visibility: "visible",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 35%",
            end: "top 10%",
            scrub: 0.8,
            onEnter: () =>
              gsap.set(bgCoverRef.current, { visibility: "visible" }),
            onLeaveBack: () =>
              gsap.set(bgCoverRef.current, {
                visibility: "hidden",
                opacity: 0,
              }),
          },
        }
      );
      gsap.fromTo(
        bgCoverRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "bottom 50%",
            end: "bottom 10%",
            scrub: 0.8,
            onLeave: () =>
              gsap.set(bgCoverRef.current, { visibility: "hidden" }),
            onEnterBack: () =>
              gsap.set(bgCoverRef.current, {
                visibility: "visible",
                opacity: 1,
              }),
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, visibility: "hidden" },
        {
          opacity: 1,
          visibility: "visible",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 25%",
            end: "top 5%",
            scrub: 0.8,
            onEnter: () => gsap.set(textRef.current, { pointerEvents: "auto" }),
            onLeaveBack: () =>
              gsap.set(textRef.current, {
                pointerEvents: "none",
                visibility: "hidden",
              }),
          },
        }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "30% top",
            end: "42% top",
            scrub: 0.8,
            onLeave: () =>
              gsap.set(textRef.current, {
                pointerEvents: "none",
                visibility: "hidden",
              }),
            onEnterBack: () =>
              gsap.set(textRef.current, {
                pointerEvents: "auto",
                visibility: "visible",
              }),
          },
        }
      );

      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, visibility: "hidden" },
        {
          opacity: 1,
          visibility: "visible",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "40% top",
            end: "52% top",
            scrub: 0.8,
            onEnter: () =>
              gsap.set(carouselRef.current, { pointerEvents: "auto" }),
            onLeaveBack: () =>
              gsap.set(carouselRef.current, {
                pointerEvents: "none",
                visibility: "hidden",
              }),
          },
        }
      );
      gsap.fromTo(
        carouselRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "bottom 60%",
            end: "bottom 20%",
            scrub: 0.8,
            onLeave: () =>
              gsap.set(carouselRef.current, {
                pointerEvents: "none",
                visibility: "hidden",
              }),
            onEnterBack: () =>
              gsap.set(carouselRef.current, {
                pointerEvents: "auto",
                visibility: "visible",
              }),
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const ease = "power2.inOut";
    for (let i = 0; i < N; i++) {
      const on = i === active;
      [
        imageRefs.current[i],
        titleRefs.current[i],
        thumbRefs.current[i],
        thumbLineRefs.current[i],
      ].forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
      if (imageRefs.current[i])
        gsap.to(imageRefs.current[i]!, {
          opacity: on ? 1 : 0,
          duration: DUR,
          ease,
        });
      if (titleRefs.current[i])
        gsap.to(titleRefs.current[i]!, {
          opacity: on ? 1 : 0,
          duration: DUR,
          ease,
        });
      if (thumbLineRefs.current[i])
        gsap.to(thumbLineRefs.current[i]!, {
          scaleX: on ? 1 : 0,
          opacity: on ? 1 : 0,
          duration: DUR,
          ease,
        });
      if (thumbRefs.current[i])
        gsap.to(thumbRefs.current[i]!, {
          opacity: on ? 1 : 0.35,
          duration: DUR,
          ease,
        });
    }
  }, [active]);

  const openDetail = () => {
    const imgEl = imageRefs.current[active];
    if (imgEl) sourceRectRef.current = imgEl.getBoundingClientRect();
    onDetailToggle?.(true);
    setDetailProject(DISPLAY_PROJECTS[active]);
  };

  const closeDetail = () => {
    onDetailToggle?.(false);
    setDetailProject(null);
  };

  const overlayBase = {
    position: "fixed" as const,
    inset: 0,
    opacity: 0,
    visibility: "hidden" as const,
    pointerEvents: "none" as const,
  };

  return (
    <>
      <Box
        ref={bgCoverRef}
        sx={{
          ...overlayBase,
          zIndex: 29,
          backgroundColor: "var(--white-primary)",
        }}
      />

      <Box
        ref={textRef}
        sx={{
          ...overlayBase,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "var(--black-primary)",
            fontSize: { xs: "36px", md: "52px", lg: "64px" },
            fontWeight: 300,
            letterSpacing: "0.05em",
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            userSelect: "none",
          }}
        >
          What I've Done
        </Typography>
      </Box>

      <Box
        ref={carouselRef}
        sx={{
          ...overlayBase,
          zIndex: 30,
          backgroundColor: "var(--white-primary)",
        }}
      >
        {DISPLAY_PROJECTS.map((p, i) => (
          <Box
            key={`img-${p.id}`}
            ref={(el) => {
              imageRefs.current[i] = el as HTMLDivElement | null;
            }}
            onClick={openDetail}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: {
                xs: "translate(-50%, -56%)",
                md: "translate(-40%, -50%)",
              },
              width: { xs: "86vw", sm: "58vw", md: "44vw", lg: "42vw" },
              aspectRatio: "6/5",
              borderRadius: "4px",
              overflow: "hidden",
              zIndex: 2,
              cursor: "pointer",
              pointerEvents: i === active ? "auto" : "none",
              transition: "box-shadow 0.3s ease",
              "&:hover": { boxShadow: "0 8px 40px rgba(0,0,0,0.15)" },
            }}
          >
            {p.thumbnail ? (
              <Box
                component="img"
                src={p.thumbnail}
                alt={p.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background: p.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.15)",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    fontFamily: "Georgia,serif",
                    textAlign: "center",
                    px: 2,
                  }}
                >
                  assets/projects/{p.name.toLowerCase()}.jpg
                </Typography>
              </Box>
            )}
          </Box>
        ))}

        {DISPLAY_PROJECTS.map((p, i) => (
          <Box
            key={`title-${p.id}`}
            ref={(el) => {
              titleRefs.current[i] = el as HTMLDivElement | null;
            }}
            sx={{
              position: "absolute",
              bottom: { xs: "29%", md: "15%" },
              left: { xs: "10%", md: "11%", lg: "12%" },
              zIndex: 3,
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              mixBlendMode: "difference",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "14vw", sm: "11vw", md: "8.5vw", lg: "9vw" },
                fontWeight: 400,
                letterSpacing: "0.02em",
                color: "#FFFFFF",
                fontFamily: '"Jost", sans-serif',
                lineHeight: 1,
              }}
            >
              {p.name}
            </Typography>
          </Box>
        ))}

        <Box
          sx={{
            position: "absolute",
            left: { xs: 0, md: "auto" },
            right: { xs: 0, md: "2.5%" },
            bottom: { xs: "4%", md: "auto" },
            top: { xs: "auto", md: "50%" },
            transform: { xs: "none", md: "translateY(-50%)" },
            zIndex: 10,
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: { xs: "8px", md: "10px" },
            // mobile: scroll horizontal, scrollbar disembunyikan
            overflowX: { xs: "auto", md: "visible" },
            px: { xs: "5%", md: 0 },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {DISPLAY_PROJECTS.map((p, i) => (
            <Box
              key={`thumb-${p.id}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                cursor: "pointer",
              }}
              onClick={() => setActive(i)}
            >
              <Box
                ref={(el) => {
                  thumbLineRefs.current[i] = el as HTMLDivElement | null;
                }}
                sx={{
                  width: "20px",
                  height: "1px",
                  backgroundColor: "var(--black-primary)",
                  mr: "8px",
                  flexShrink: 0,
                }}
              />
              <Box
                ref={(el) => {
                  thumbRefs.current[i] = el as HTMLDivElement | null;
                }}
                sx={{
                  width: { xs: "68px", md: "90px" },
                  height: { xs: "48px", md: "64px" },
                  borderRadius: "2px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {p.thumbnail ? (
                  <Box
                    component="img"
                    src={p.thumbnail}
                    alt={p.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <Box
                    sx={{ width: "100%", height: "100%", background: p.bg }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          component={Link}
          to="/projects"
          onClick={(e: React.MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();
            go("/projects");
          }}
          sx={{
            width: "100%",
            position: "absolute",
            top: { xs: 120, lg: "auto" },
            bottom: { xs: "auto", lg: 40 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: { xs: 0, md: "70px" },
            textDecoration: "none",
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "20px",
              fontFamily: "Josh, serif",
              textTransform: "capitalize",
              color: "var(--black-primary)",
              textAlign: "center",
              textDecoration: "underline",
              fontStyle: "italic",
              transition: "opacity 0.2s ease",
              "&:hover": { opacity: 0.65 },
            }}
          >
            Show More Project
          </Typography>
        </Box>
      </Box>

      <Box
        ref={wrapperRef}
        sx={{ height: "300vh", position: "relative", zIndex: 1 }}
      />

      {detailProject && sourceRectRef.current && (
        <ProjectDetail
          project={detailProject}
          sourceRect={sourceRectRef.current}
          onClose={closeDetail}
        />
      )}
    </>
  );
};

export default Project;
