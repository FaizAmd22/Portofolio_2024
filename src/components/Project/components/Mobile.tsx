import React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Link,
} from "@mui/material";

const Mobile = (item: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        data-aos="fade-up"
        onClick={handleOpen}
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          //   backgroundColor: "#247bfd",
          width: "100%",
          //   margin: '10px',
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            background: "rgba(255, 255, 255, 0.19)",
            borderRadius: "16px",
            // boxShadow: "0px 0px 30px #FFC12C",
            backdropFilter: "blur(5.6px)",
            "-webkit-backdrop-filter": "blur(5.6px)",
            transition: "all ease-in-out 0.3s",
            paddingY: "20px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "semibold",
              textTransform: "capitalize",
              fontSize: "18px",
              pb: "13px",
            }}
          >
            {item.item.name}
          </Typography>
          <Box
            sx={{
              width: "80%",
              height: "100px",
              backgroundImage: `url(${item.item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              border: "3px solid white",
              // boxShadow: '1px 2px 5px white',
              marginBottom: "30px",
              margin: "auto",
            }}
          />
        </Box>
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "70%",
              height: "auto",
              //   backgroundColor: "#4C5058",
              //   backgroundImage: `url(${item.item.image})`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              // justifyContent: 'center',
              alignItems: "center",
              color: "white",
              borderRadius: "20px",
              //   gap: 8,
              // p: 4,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#222831",
                height: "50%",
                width: "80%",
                borderRadius: "0 0 20px 20px",
                border: "2px solid white",
                borderWidth: " 2px 0px 0px 0px",
                p: 5,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                order: 2,
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h3"
                component="h1"
                sx={{ fontSize: "24px" }}
              >
                {item.item.name}
              </Typography>

              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {item.item.desc}
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "end", gap: 3, mt: 4 }}
              >
                <Link
                  target="blank"
                  href={item.item.link}
                  sx={{
                    display: item.item.link ? "block" : "none",
                    textDecoration: "none",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                      px: 2,
                      pt: 1,
                      borderRadius: "20px",
                      color: "black",
                      transition: "all ease-in 0.3s",
                      "&:hover": {
                        color: "white",
                        boxShadow: "2px 2px 3px white",
                        backgroundColor: "#191D24",
                      },
                    }}
                  >
                    Website
                  </Button>
                </Link>
                <Link
                  target="blank"
                  href={item.item.source}
                  sx={{ display: "flex", textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      backgroundColor: "white",
                      fontSize: "14px",
                      fontWeight: "bold",
                      px: 2,
                      pt: 1,
                      borderRadius: "20px",
                      color: "black",
                      transition: "all ease-in 0.3s",
                      "&:hover": {
                        color: "white",
                        boxShadow: "2px 2px 3px white",
                        backgroundColor: "#191D24",
                      },
                    }}
                  >
                    Source Code
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                // position: "fixed",
                width: "100%",
                height: 220,
                backgroundImage: `url(${item.item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // zIndex: 9000
                borderRadius: "20px 20px 0 0",
                boxShadow: "2px 2px 10px black",
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Mobile;
