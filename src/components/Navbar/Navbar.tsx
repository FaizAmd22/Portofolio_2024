/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { FaArrowUp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({
  aboutSectionRef,
  projectSectionRef,
  contactSectionRef,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    gsap.to(navbarRef.current, {
      duration: 0.3,
      height: !isOpen ? 0 : "89.5vh",
      ease: "power1.inOut",
    });

    if (isOpen) {
      gsap.to(hamburgerRef.current, {
        rotate: 45,
        y: 5,
        duration: 0.3,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(hamburgerRef.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
  }, [isOpen]);

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "150px",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <Box
        data-aos="zoom-in-down"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "10px",
          padding: "10px",
          color: "white",
          backgroundColor: "var(--black-primary)",
          width: "30px",
          height: "30px",
          marginLeft: { xs: "10px", md: "50px" },
          marginTop: { xs: "20px", md: "40px" },
          borderRadius: "50%",
          boxShadow: "2px 2px 5px black",
          marginBottom: "20px",
        }}
      >
        <IconButton ref={hamburgerRef} color="inherit" onClick={toggleNavbar}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Box
        ref={navbarRef}
        sx={{
          overflow: "hidden",
          transition: "height 0.3s",
          height: isOpen ? "500px" : 0,
          backgroundColor: "var(--black-primary)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 20px 0 0",
        }}
      >
        <List sx={{ color: "white", padding: 0, margin: 0 }}>
          <ListItem button>
            <Link href="#" sx={{ color: "white", textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <FaArrowUp />
              </Box>
            </Link>
          </ListItem>
          <ListItem button onClick={() => scrollToSection(aboutSectionRef)}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection(projectSectionRef)}>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button onClick={() => scrollToSection(contactSectionRef)}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;
