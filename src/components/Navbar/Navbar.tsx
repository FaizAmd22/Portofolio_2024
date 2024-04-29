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

// Activate ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Navbar = ({
  aboutSectionRef,
  projectSectionRef,
  contactSectionRef,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Function to toggle navbar with animation
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Animation using GSAP
    gsap.to(navbarRef.current, {
      duration: 0.3,
      height: !isOpen ? 0 : "89.5vh",
      ease: "power1.inOut",
    });

    // Animation for hamburger icon
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
          backgroundColor: "#222831",
          width: "30px",
          height: "30px",
          marginLeft: { xs: "10px", md: "50px" },
          marginTop: { xs: "20px", md: "40px" },
          borderRadius: "50%",
          boxShadow: "2px 2px 5px black",
          marginBottom: "20px",
        }}
      >
        {/* Hamburger icon */}
        <IconButton ref={hamburgerRef} color="inherit" onClick={toggleNavbar}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      {/* Navbar List */}
      <Box
        ref={navbarRef}
        sx={{
          overflow: "hidden",
          transition: "height 0.3s",
          height: isOpen ? "500px" : 0,
          backgroundColor: "#222831",
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
              <ListItemText primary="Home" />
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
