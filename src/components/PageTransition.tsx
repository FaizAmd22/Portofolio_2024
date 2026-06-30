/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, type NavigateOptions } from "react-router-dom";
import { gsap } from "gsap";
import { Box } from "@mui/material";

const DUR = 1;

interface PageTransitionContextValue {
  go: (path: string, options?: NavigateOptions) => void;
  // True from the moment a transition starts until the curtain has fully
  // revealed the new page — destination pages can use this to hold off
  // their own intro animations until they're actually visible, instead of
  // playing (and finishing) those animations while still hidden behind it.
  inTransition: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export const usePageTransition = () => {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return ctx;
};

interface Props {
  children: ReactNode;
}

// A dark panel slides up to fully cover the screen, the route swaps
// underneath it, then it slides on up and off the top to reveal the new
// page — the same curtain-wipe pattern elite-designstudio.com uses between
// pages, instead of an instant cut or a plain cross-fade.
const PageTransitionProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [inTransition, setInTransition] = useState(false);

  const go = (path: string, options?: NavigateOptions) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setInTransition(true);

    gsap.set(overlayRef.current, { yPercent: 100, visibility: "visible" });
    gsap.to(overlayRef.current, {
      yPercent: 0,
      duration: DUR,
      ease: "power3.inOut",
      onComplete: () => {
        navigate(path, options);
        requestAnimationFrame(() => {
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: DUR,
            delay: 0.05,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(overlayRef.current, {
                visibility: "hidden",
                yPercent: 100,
              });
              isAnimatingRef.current = false;
              setInTransition(false);
            },
          });
        });
      },
    });
  };

  return (
    <PageTransitionContext.Provider value={{ go, inTransition }}>
      {children}
      <Box
        ref={overlayRef}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "var(--black-primary)",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      />
    </PageTransitionContext.Provider>
  );
};

export default PageTransitionProvider;
