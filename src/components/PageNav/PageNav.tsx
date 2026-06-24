import { useRef, useLayoutEffect, useEffect, useState, RefObject } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";

export interface NavSection {
  id: number;
  label: string;
  ref: RefObject<HTMLDivElement | null>;
  darkBg?: boolean;
}

interface PageNavProps {
  sections: NavSection[];
  visibleFromVh?: number;
  hidden?: boolean;
}

const DUR = 0.4;

const PageNav = ({
  sections,
  visibleFromVh = 430,
  hidden = false,
}: PageNavProps) => {
  const N = sections.length;
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  const lineRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const numRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const labelRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    for (let i = 0; i < N; i++) {
      const on = i === 0;
      if (lineRefs.current[i])
        gsap.set(lineRefs.current[i]!, {
          scaleX: on ? 1 : 0,
          opacity: on ? 1 : 0,
          transformOrigin: "left center",
        });
      if (labelRefs.current[i])
        gsap.set(labelRefs.current[i]!, { opacity: on ? 1 : 0 });
      if (numRefs.current[i])
        gsap.set(numRefs.current[i]!, { opacity: on ? 1 : 0.3 });
    }
  }, [N]);

  useEffect(() => {
    const detect = () => {
      const sy = window.scrollY;
      const H = window.innerHeight;

      setVisible(sy >= (visibleFromVh / 100) * H);

      let idx = 0;
      for (let i = N - 1; i >= 0; i--) {
        const el = sections[i].ref.current;
        if (el && el.offsetTop <= sy + H * 0.4) {
          idx = i;
          break;
        }
      }
      setActive((prev) => (prev === idx ? prev : idx));
    };

    window.addEventListener("scroll", detect, { passive: true });
    detect();
    return () => window.removeEventListener("scroll", detect);
  }, [sections, visibleFromVh, N]);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const ease = "power2.inOut";
    for (let i = 0; i < N; i++) {
      const on = i === active;
      [lineRefs.current[i], numRefs.current[i], labelRefs.current[i]].forEach(
        (el) => {
          if (el) gsap.killTweensOf(el);
        }
      );
      if (lineRefs.current[i])
        gsap.to(lineRefs.current[i]!, {
          scaleX: on ? 1 : 0,
          opacity: on ? 1 : 0,
          duration: DUR,
          ease,
        });
      if (labelRefs.current[i])
        gsap.to(labelRefs.current[i]!, {
          opacity: on ? 1 : 0,
          duration: DUR,
          ease,
        });
      if (numRefs.current[i])
        gsap.to(numRefs.current[i]!, {
          opacity: on ? 1 : 0.3,
          duration: DUR,
          ease,
        });
    }
  }, [active, N]);

  const isDark = sections[active]?.darkBg ?? false;
  const navColor = isDark ? "var(--white-primary)" : "var(--black-primary)";

  // const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
  //   if (!ref.current) return;
  //   window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  // };

  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: "2.5%", md: "3%" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        gap: "16px",
        transition: "opacity 0.6s ease",
        opacity: visible && !hidden ? 1 : 0,
        // pointerEvents: visible && !hidden ? "auto" : "none",
      }}
    >
      {sections.map((s, i) => (
        <Box
          key={s.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            // cursor: "pointer",
          }}
          // onClick={() => scrollTo(s.ref)}
        >
          <Box
            ref={(el) => {
              lineRefs.current[i] = el as HTMLDivElement | null;
            }}
            sx={{
              width: "26px",
              height: "1px",
              backgroundColor: navColor,
              flexShrink: 0,
              transition: "background-color 0.4s ease",
            }}
          />
          <Box
            ref={(el) => {
              numRefs.current[i] = el as HTMLDivElement | null;
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                color: navColor,
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                userSelect: "none",
                transition: "color 0.4s ease",
              }}
            >
              {s.id}
            </Typography>
          </Box>
          <Box
            ref={(el) => {
              labelRefs.current[i] = el as HTMLDivElement | null;
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                color: navColor,
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                userSelect: "none",
                whiteSpace: "nowrap",
                transition: "color 0.4s ease",
              }}
            >
              {s.label}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PageNav;
