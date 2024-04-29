import * as React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Link,
} from "@mui/material";

export default function TransitionsModal(item: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ color: "white", "&:hover": { backgroundColor: "#222831" } }}
      >
        <Box
          data-aos="zoom-in-down"
          data-aos-delay="400"
          // className="project-card"
          sx={{
            width: "80vw",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              py: "25px",
              background: "rgba(255, 255, 255, 0.19)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(5.6px)",
              "-webkit-backdrop-filter": "blur(5.6px)",
              transition: "all ease-in-out 0.3s",
              filter: "grayscale(100%)",
              "&:hover": {
                filter: "grayscale(0%)",
                width: "100%",
                boxShadow: "0px 0px 150px #FFC12C",
                // border: 'none'
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "semibold",
                textTransform: "capitalize",
              }}
            >
              {item.item.name}
            </Typography>
            <Box
              sx={{
                width: "78%",
                height: "400px",
                backgroundImage: `url(${item.item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "15px",
                border: "3px solid white",
                // boxShadow: '1px 2px 5px white',
                marginBottom: "30px",
                margin: "auto",
              }}
            />
            <Box sx={{ width: "78%", margin: "auto" }}>
              {/* <Typography>{item.desc}</Typography> */}
              {/* <TransitionsModal /> */}
            </Box>
          </Box>
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
              height: "70vh",
              // backgroundColor: "#4C5058",
              backgroundImage: `url(${item.item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              // justifyContent: 'center',
              alignItems: "center",
              color: "white",
              borderRadius: "20px",
              boxShadow: 24,
              gap: 8,
              // p: 4,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#222831bc",
                height: "80%",
                width: "30%",
                borderRadius: "0 20px 20px 0",
                border: "2px solid white",
                borderWidth: "2px 2px 2px 0",
                p: 5,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h3"
                component="h1"
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
                      fontSize: "16px",
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
                      fontSize: "16px",
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
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
