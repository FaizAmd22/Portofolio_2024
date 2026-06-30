/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { usePageTransition } from "../components/PageTransition";
import ProjectDetail, {
  ProjectData,
} from "../components/Project/ProjectDetail";
import { PROJECTS } from "../components/Project/constant";

const AUTO_SCROLL_SPEED = 26;
const RESUME_IDLE_MS = 900;
const INITIAL_ROWS = 8;
const APPEND_ROWS_BATCH = 4;
const APPEND_THRESHOLD_PX = 1800;
const MOBILE_BREAKPOINT = 700;
const ROW_GAP = 9;
const ZONE_WIDTH = 44;
const PAIR_ROW_CHANCE = 0.32;
const WIDE_ROW_CHANCE = 0.16;
const MANUAL_KEYS = [
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  " ",
  "Home",
  "End",
];

function seededRandom(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const ORDERED_PROJECTS = [...PROJECTS].sort((a, b) => a.id - b.id);

interface Slot {
  key: string;
  project: ProjectData;
  top: number;
  left: number;
  width: number;
  height: number;
  // Marks slots from the very first batch rendered on mount, as opposed to
  // ones appended later while scrolling — only the first batch waits for
  // the page-intro sequence before rising in.
  initial?: boolean;
}

function makeZoneSlot(
  index: number,
  zoneLeft: number,
  zoneWidth: number,
  top: number,
  wide = false
): Slot {
  const project = ORDERED_PROJECTS[index % ORDERED_PROJECTS.length];
  const r1 = seededRandom(index * 97 + 11);
  const r2 = seededRandom(index * 131 + 53);
  const r3 = seededRandom(index * 173 + 29);
  const width = wide
    ? zoneWidth * (0.92 + r1 * 0.08)
    : zoneWidth * (0.7 + r1 * 0.3);
  const aspect = wide ? 0.38 + r2 * 0.32 : 0.6 + r2 * 0.85;
  const height = width * aspect;
  const left = zoneLeft + (zoneWidth - width) * r3;
  return { key: `${project.id}-${index}`, project, top, left, width, height };
}

function buildRow(
  rowIndex: number,
  isMobile: boolean,
  top: number,
  nextIndexRef: { current: number }
): { slots: Slot[]; rowHeight: number } {
  const margin = isMobile ? 4 : 2;

  if (isMobile) {
    const avail = 100 - margin * 2;
    const idx = nextIndexRef.current++;
    const slot = makeZoneSlot(idx, margin, avail, top);
    return { slots: [slot], rowHeight: slot.height };
  }

  const typeRoll = seededRandom(rowIndex * 911 + 3);

  if (typeRoll < PAIR_ROW_CHANCE) {
    const leftZoneLeft = margin;
    const rightZoneLeft = 100 - margin - ZONE_WIDTH;
    const idxA = nextIndexRef.current++;
    const idxB = nextIndexRef.current++;
    const slotA = makeZoneSlot(idxA, leftZoneLeft, ZONE_WIDTH, top);
    const staggered = Math.max(
      top + (seededRandom(idxB * 13 + 5) - 0.5) * 6,
      0
    );
    const slotB = makeZoneSlot(idxB, rightZoneLeft, ZONE_WIDTH, staggered);
    const rowHeight =
      Math.max(slotA.top + slotA.height, slotB.top + slotB.height) - top;
    return { slots: [slotA, slotB], rowHeight };
  }

  if (typeRoll < PAIR_ROW_CHANCE + WIDE_ROW_CHANCE) {
    const avail = 100 - margin * 2;
    const idx = nextIndexRef.current++;
    const slot = makeZoneSlot(idx, margin, avail, top, true);
    return { slots: [slot], rowHeight: slot.height };
  }

  const zoneRoll = seededRandom(rowIndex * 1303 + 17);
  const zoneLeft =
    zoneRoll < 0.34
      ? margin
      : zoneRoll < 0.67
      ? (100 - ZONE_WIDTH) / 2
      : 100 - margin - ZONE_WIDTH;
  const idx = nextIndexRef.current++;
  const slot = makeZoneSlot(idx, zoneLeft, ZONE_WIDTH, top);
  return { slots: [slot], rowHeight: slot.height };
}

interface TileProps {
  slot: Slot;
  onOpen: (project: ProjectData, el: HTMLElement) => void;
  // Initial-batch tiles wait for this to flip true (page-intro sequence)
  // before rising in; later-appended tiles ignore it and animate on mount.
  gate: boolean;
}

const Tile = ({ slot, onOpen, gate }: TileProps) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (slot.initial && !gate) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [gate, slot.initial]);

  return (
    <Box
      onClick={(e) => onOpen(slot.project, e.currentTarget)}
      sx={{
        position: "absolute",
        top: `${slot.top}vw`,
        left: `${slot.left}vw`,
        width: `${slot.width}vw`,
        height: `${slot.height}vw`,
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(56px)",
        transition:
          "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
        "&:hover": { boxShadow: "0 8px 40px rgba(0,0,0,0.18)" },
        "&:hover .all-projects-caption": { opacity: 1 },
      }}
    >
      {slot.project.thumbnail ? (
        <Box
          component="img"
          loading="lazy"
          src={slot.project.thumbnail}
          alt={slot.project.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <Box
          sx={{ width: "100%", height: "100%", background: slot.project.bg }}
        />
      )}

      <Box
        className="all-projects-caption"
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          p: "12px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 60%)",
          opacity: 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <Typography
          sx={{
            color: "var(--white-primary)",
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "18px",
            fontStyle: "italic",
          }}
        >
          {slot.project.name}
        </Typography>
      </Box>
    </Box>
  );
};

const AllProjects = () => {
  const { go, inTransition } = usePageTransition();
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const isMobile = vw < MOBILE_BREAKPOINT;

  const [slots, setSlots] = useState<Slot[]>([]);
  const [contentHeight, setContentHeight] = useState(100);
  const cursorTopRef = useRef(0);
  const nextRowIndexRef = useRef(0);
  const nextIndexRef = useRef(0);

  const [detailProject, setDetailProject] = useState<ProjectData | null>(null);
  const sourceRectRef = useRef<DOMRect | null>(null);
  const detailOpenRef = useRef(false);
  const lastManualRef = useRef(0);

  // On a hard refresh there's no curtain (inTransition starts false, so the
  // title rises in right away); arriving via the curtain transition holds
  // off until it has fully revealed this page, then the title rises in and
  // the first batch of tiles follows half a second later.
  const [introReady, setIntroReady] = useState(false);
  const [tilesReady, setTilesReady] = useState(false);

  useEffect(() => {
    if (inTransition) return;
    // Deferred a frame so the browser actually paints the "not entered"
    // state first — flipping this synchronously on mount (the hard-refresh
    // case, where inTransition starts false) would otherwise skip straight
    // to the final state with no visible rise-in.
    const raf = requestAnimationFrame(() => setIntroReady(true));
    return () => cancelAnimationFrame(raf);
  }, [inTransition]);

  useEffect(() => {
    if (!introReady) return;
    const t = setTimeout(() => setTilesReady(true), 500);
    return () => clearTimeout(t);
  }, [introReady]);

  useEffect(() => {
    detailOpenRef.current = !!detailProject;
  }, [detailProject]);

  const appendRows = (rowCount: number, isInitialBatch = false) => {
    const newSlots: Slot[] = [];
    let top = cursorTopRef.current;
    for (let n = 0; n < rowCount; n++) {
      const rowIndex = nextRowIndexRef.current++;
      const { slots: rowSlots, rowHeight } = buildRow(
        rowIndex,
        isMobile,
        top,
        nextIndexRef
      );
      newSlots.push(
        ...(isInitialBatch
          ? rowSlots.map((s) => ({ ...s, initial: true }))
          : rowSlots)
      );
      top += rowHeight + ROW_GAP;
    }
    cursorTopRef.current = top;
    setSlots((prev) => [...prev, ...newSlots]);
    setContentHeight(Math.max(top, 100));
  };

  useEffect(() => {
    cursorTopRef.current = 0;
    nextRowIndexRef.current = 0;
    nextIndexRef.current = 0;
    setSlots([]);
    appendRows(INITIAL_ROWS, true);
  }, [isMobile]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setVw(window.innerWidth), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const markManual = () => {
      lastManualRef.current = Date.now();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (MANUAL_KEYS.includes(e.key)) markManual();
    };
    window.addEventListener("wheel", markManual, { passive: true });
    window.addEventListener("touchmove", markManual, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    let raf = 0;
    let last = performance.now();
    let remainder = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const idleFor = Date.now() - lastManualRef.current;
      if (!detailOpenRef.current && idleFor > RESUME_IDLE_MS) {
        remainder += AUTO_SCROLL_SPEED * dt;
        const whole = Math.floor(remainder);
        if (whole > 0) {
          window.scrollBy({ top: whole, behavior: "instant" });
          remainder -= whole;
        }
      }

      const remaining =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      if (remaining < APPEND_THRESHOLD_PX) {
        appendRows(APPEND_ROWS_BATCH);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", markManual);
      window.removeEventListener("touchmove", markManual);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobile]);

  const openDetail = (project: ProjectData, el: HTMLElement) => {
    sourceRectRef.current = el.getBoundingClientRect();
    setDetailProject(project);
  };
  const closeDetail = () => setDetailProject(null);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "var(--white-primary)",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "22vw", md: "15vw" },
              fontWeight: 300,
              letterSpacing: "0.02em",
              color: "rgba(44,39,39,0.85)",
              fontFamily:
                '"Cormorant Garamond", "Playfair Display", Georgia, serif',
              lineHeight: 1,
              userSelect: "none",
              whiteSpace: "nowrap",
              opacity: introReady ? 1 : 0,
              transform: introReady ? "translateY(0)" : "translateY(60px)",
              transition:
                "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Projects
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: `${contentHeight}vw`,
            zIndex: 1,
          }}
        >
          {slots.map((slot) => (
            <Tile
              key={slot.key}
              slot={slot}
              onOpen={openDetail}
              gate={tilesReady}
            />
          ))}
        </Box>

        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "120px",
            background:
              "linear-gradient(to bottom, rgba(246,244,244,0.85), rgba(246,244,244,0))",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        <Box
          component={Link}
          to="/"
          state={{ scrollToProjects: true }}
          onClick={(e: React.MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();
            go("/", { state: { scrollToProjects: true } });
          }}
          sx={{
            position: "fixed",
            top: { xs: "24px", md: "32px" },
            left: { xs: "24px", md: "40px" },
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none",
            color: "var(--black-primary)",
          }}
        >
          <HiOutlineArrowNarrowLeft />
          <Typography
            sx={{
              fontSize: "15px",
              fontFamily: "Georgia, serif",
              textDecoration: "underline",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              opacity: 0.9,
              transition: "opacity 0.2s",
              "&:hover": { opacity: 1 },
            }}
          >
            Back to home
          </Typography>
        </Box>
      </Box>

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

export default AllProjects;
