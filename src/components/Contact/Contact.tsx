import { Box, Link, Stack } from "@mui/material";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <Box
      sx={{
        width: "100%",
        mt: -30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 5, md: 10 }}
        data-aos="zoom-in-up"
        data-aos-delay="400"
        sx={{
          marginTop: { xs: "70px", md: "50px" },
          // backgroundColor: "red",
          // width: "100%",
          // display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        <Link
          target="blank"
          href="https://api.whatsapp.com/send/?phone=82228152950&text&type=phone_number&app_absent=0"
          sx={{
            // backgroundColor: "white",
            color: "#181818",
            fontSize: { xs: "32px", md: "50px" },
            paddingY: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            textDecoration: "none",
            gap: 2,
            transition: "all ease-in 0.4s",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <IoLogoWhatsapp />
        </Link>

        <Link
          target="blank"
          href="https://www.instagram.com/fzhal_a2/"
          sx={{
            // backgroundColor: "white",
            color: "#181818",
            fontSize: { xs: "32px", md: "50px" },
            paddingY: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            textDecoration: "none",
            gap: 2,
            transition: "all ease-in 0.4s",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <AiFillInstagram />
        </Link>

        <Link
          target="blank"
          href="https://www.linkedin.com/in/faizhal-ahmad/"
          sx={{
            // backgroundColor: "white",
            color: "#181818",
            fontSize: { xs: "32px", md: "50px" },
            paddingY: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            textDecoration: "none",
            gap: 2,
            transition: "all ease-in 0.4s",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <FaLinkedin />
        </Link>

        <Link
          target="blank"
          href="https://github.com/FaizAmd22"
          sx={{
            // backgroundColor: "white",
            color: "#181818",
            fontSize: { xs: "32px", md: "50px" },
            paddingY: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            textDecoration: "none",
            gap: 2,
            transition: "all ease-in 0.4s",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <FaGithub />
        </Link>

        <Link
          target="blank"
          href="mailto:ahmadfaizhal8@gmail.com"
          sx={{
            // backgroundColor: "white",
            color: "#181818",
            fontSize: { xs: "32px", md: "50px" },
            paddingY: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
            textDecoration: "none",
            gap: 2,
            transition: "all ease-in 0.4s",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <MdEmail />
        </Link>
      </Stack>
    </Box>
  );
};

export default Contact;
