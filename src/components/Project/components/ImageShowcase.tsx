import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import {
  HiOutlineX,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineZoomIn,
} from "react-icons/hi";

export type DeviceType = "mobile" | "website";

export interface ProjectImage {
  src: string;
  device?: DeviceType;
}

interface ImageShowcaseProps {
  images: ProjectImage[];
  alt?: string;
}

const DUR = 0.45;

const ScreenStack = ({
  images,
  active,
  alt,
}: {
  images: string[];
  active: number;
  alt: string;
}) => {
  const refs = useRef<(HTMLDivElement | null)[]>(
    Array(images.length).fill(null)
  );
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    refs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === active ? 1 : 0 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refs.current.forEach((el, i) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: i === active ? 1 : 0,
        duration: DUR,
        ease: "power2.inOut",
      });
    });
  }, [active]);

  return (
    <>
      {images.map((src, i) => (
        <Box
          key={i}
          ref={(el) => {
            refs.current[i] = el as HTMLDivElement | null;
          }}
          component="img"
          src={src}
          alt={alt}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
          }}
        />
      ))}
    </>
  );
};

// ── Lightbox fullscreen — klik gambar untuk lihat full image + slider ────
const Lightbox = ({
  images,
  initialIndex,
  alt,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}) => {
  const N = images.length;
  const [index, setIndex] = useState(initialIndex);

  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" });
    imgRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === initialIndex ? 1 : 0 });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    imgRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, { opacity: i === index ? 1 : 0, duration: 0.35, ease: "power2.inOut" });
    });
  }, [index]);

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose,
    });
  };
  const goPrev = () => setIndex((i) => (i - 1 + N) % N);
  const goNext = () => setIndex((i) => (i + 1) % N);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrowSx = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--white-primary)",
    fontSize: "28px",
    cursor: "pointer",
    opacity: 0.65,
    transition: "opacity 0.2s",
    "&:hover": { opacity: 1 },
  };

  return (
    <Box
      ref={overlayRef}
      onClick={close}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "rgba(20,18,18,0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
        sx={{
          position: "absolute",
          top: { xs: "20px", md: "32px" },
          right: { xs: "20px", md: "40px" },
          color: "var(--white-primary)",
          fontSize: "26px",
          cursor: "pointer",
          opacity: 0.75,
          transition: "opacity 0.2s",
          "&:hover": { opacity: 1 },
        }}
      >
        <HiOutlineX />
      </Box>

      {N > 1 && (
        <Box
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          sx={{ ...arrowSx, left: { xs: "12px", md: "32px" } }}
        >
          <HiOutlineChevronLeft />
        </Box>
      )}
      {N > 1 && (
        <Box
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          sx={{ ...arrowSx, right: { xs: "12px", md: "32px" } }}
        >
          <HiOutlineChevronRight />
        </Box>
      )}

      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{ position: "relative", width: "90vw", height: "80vh" }}
      >
        {images.map((src, i) => (
          <Box
            key={i}
            ref={(el) => {
              imgRefs.current[i] = el as HTMLDivElement | null;
            }}
            component="img"
            src={src}
            alt={alt}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ))}
      </Box>

      {N > 1 && (
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "absolute",
            bottom: { xs: "16px", md: "28px" },
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(246,244,244,0.6)",
            fontSize: "11px",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.15em",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </Box>
      )}
    </Box>
  );
};

const ImageShowcase = ({ images, alt = "" }: ImageShowcaseProps) => {
  const N = images.length;
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (N === 0) return null;

  const shadeOf = (idx: number) => {
    const dist = Math.abs(idx - active);
    return Math.min(18 + dist * 14, 80);
  };
  const heightOf = (idx: number) => {
    const dist = Math.abs(idx - active);
    return Math.max(42 - dist * 6, 24);
  };

  const order = [...images].map((_, i) => i).reverse();

  const activeDevice: DeviceType = images[active]?.device ?? "website";
  const isMobile = activeDevice === "mobile";

  const subset = images
    .map((img, i) => ({ ...img, originalIndex: i }))
    .filter((img) => (img.device ?? "website") === activeDevice);
  const localActive = Math.max(
    subset.findIndex((img) => img.originalIndex === active),
    0
  );
  const subsetSrcs = subset.map((img) => img.src);

  return (
    <>
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {order.map((idx, pos) => {
          const lightness = shadeOf(idx);
          return (
            <Box
              key={idx}
              onMouseEnter={() => setActive(idx)}
              sx={{
                width: { xs: "34px", md: "44px" },
                height: `${heightOf(idx)}px`,
                ml: pos === 0 ? 0 : "-10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px 6px 0 0",
                backgroundColor: `hsl(0,0%,${lightness}%)`,
                color:
                  lightness > 55
                    ? "rgba(44,39,39,0.55)"
                    : "rgba(246,244,244,0.9)",
                cursor: "pointer",
                userSelect: "none",
                transition:
                  "height 0.25s ease, background-color 0.25s ease, color 0.25s ease",
              }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {isMobile ? (
        <Box sx={{ width: { xs: "190px", sm: "210px", md: "240px" } }}>
          <Box
            sx={{
              p: "10px",
              borderRadius: "34px",
              backgroundColor: "var(--black-primary)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.22)",
            }}
          >
            <Box
              onClick={() => setLightboxOpen(true)}
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "9/19.5",
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#000",
                cursor: "pointer",
                "&:hover .zoom-hint": { opacity: 1 },
              }}
            >
              <ScreenStack images={subsetSrcs} active={localActive} alt={alt} />

              <Box
                className="zoom-hint"
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.25)",
                  color: "var(--white-primary)",
                  fontSize: "26px",
                  opacity: 0,
                  transition: "opacity 0.25s ease",
                  zIndex: 4,
                  pointerEvents: "none",
                }}
              >
                <HiOutlineZoomIn />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "46px",
                  height: "6px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  zIndex: 3,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60px",
                  height: "3px",
                  borderRadius: "2px",
                  backgroundColor: "rgba(255,255,255,0.6)",
                  zIndex: 3,
                }}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: { xs: "100%", sm: "85%", md: "680px" },
            position: "relative",
          }}
        >
          <Box
            sx={{
              p: { xs: "8px", md: "12px" },
              borderRadius: "10px 10px 4px 4px",
              backgroundColor: "var(--black-primary)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.22)",
            }}
          >
            <Box
              onClick={() => setLightboxOpen(true)}
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/8",
                borderRadius: "3px",
                overflow: "hidden",
                backgroundColor: "#000",
                cursor: "pointer",
                "&:hover .zoom-hint": { opacity: 1 },
              }}
            >
              <ScreenStack images={subsetSrcs} active={localActive} alt={alt} />

              <Box
                className="zoom-hint"
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.25)",
                  color: "var(--white-primary)",
                  fontSize: "30px",
                  opacity: 0,
                  transition: "opacity 0.25s ease",
                  zIndex: 4,
                  pointerEvents: "none",
                }}
              >
                <HiOutlineZoomIn />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "94%",
              height: "6px",
              mx: "auto",
              backgroundColor: "#1a1717",
              borderRadius: "0 0 2px 2px",
            }}
          />

          <Box
            sx={{
              width: "108%",
              ml: "-4%",
              height: "12px",
              background: "linear-gradient(to bottom, #3a3535, #221f1f)",
              borderRadius: "0 0 8px 8px",
              clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
            }}
          />
        </Box>
      )}
    </Box>

    {lightboxOpen && (
      <Lightbox
        images={images.map((img) => img.src)}
        initialIndex={active}
        alt={alt}
        onClose={() => setLightboxOpen(false)}
      />
    )}
    </>
  );
};

export default ImageShowcase;
