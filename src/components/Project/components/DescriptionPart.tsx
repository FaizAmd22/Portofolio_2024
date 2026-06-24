import { Box, Typography } from "@mui/material";
import { FaApple, FaGithub, FaGooglePlay } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ProjectData } from "../ProjectDetail";

const LINK_CONFIG = {
  appstore: { label: "App Store", icon: FaApple },
  playstore: { label: "Play Store", icon: FaGooglePlay },
  website: { label: "Website", icon: HiOutlineExternalLink },
  code: { label: "Source Code", icon: FaGithub },
} as const;

const DescriptionPart = ({ project }: { project: ProjectData }) => {
  return (
    <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
      <Box sx={{ maxWidth: "65ch", mb: 7 }}>
        <Typography
          sx={{
            fontSize: { xs: "14px", md: "15px" },
            color: "var(--black-primary)",
            lineHeight: 1.95,
            fontFamily: "Georgia, serif",
            opacity: 0.75,
          }}
        >
          {project.description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 5, md: 10 },
          flexWrap: "wrap",
          mb: 7,
        }}
      >
        {project.role && (
          <Box>
            <Typography
              sx={{
                fontSize: "10px",
                letterSpacing: "0.35em",
                color: "var(--black-primary)",
                opacity: 0.4,
                textTransform: "uppercase",
                mb: 1.5,
                fontFamily: "Georgia,serif",
              }}
            >
              Role
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: "var(--black-primary)",
                fontFamily: "Georgia,serif",
              }}
            >
              {project.role}
            </Typography>
          </Box>
        )}

        <Box>
          <Typography
            sx={{
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "var(--black-primary)",
              opacity: 0.4,
              textTransform: "uppercase",
              mb: 1.5,
              fontFamily: "Georgia,serif",
            }}
          >
            Stack
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {project.tech.map((tech) => (
              <Box
                key={tech}
                sx={{
                  fontSize: "11px",
                  padding: "4px 12px",
                  border: "1px solid rgba(34,40,49,0.22)",
                  borderRadius: "20px",
                  color: "var(--black-primary)",
                  fontFamily: "Georgia,serif",
                  letterSpacing: "0.04em",
                }}
              >
                {tech}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {project.features && project.features.length > 0 && (
        <Box sx={{ mb: 7 }}>
          <Typography
            sx={{
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "var(--black-primary)",
              opacity: 0.4,
              textTransform: "uppercase",
              mb: 2,
              fontFamily: "Georgia,serif",
            }}
          >
            Features
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              columnGap: 4,
              rowGap: 1.5,
            }}
          >
            {project.features.map((feature, i) => (
              <Box
                key={i}
                sx={{ display: "flex", gap: 1.2, alignItems: "flex-start" }}
              >
                <Box
                  component="span"
                  sx={{
                    color: "var(--black-primary)",
                    opacity: 0.35,
                    fontFamily: "Georgia,serif",
                    lineHeight: 1.7,
                    flexShrink: 0,
                  }}
                >
                  —
                </Box>
                <Typography
                  sx={{
                    fontSize: "12.5px",
                    color: "var(--black-primary)",
                    opacity: 0.75,
                    fontFamily: "Georgia,serif",
                    lineHeight: 1.7,
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        {project.links &&
          project.links.map((item, index) => {
            const { label, icon: Icon } = LINK_CONFIG[item.type];
            return (
              <Box
                key={index}
                component="a"
                href={item.url}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 20px",
                    border: "1px solid rgba(34,40,49,0.35)",
                    borderRadius: "30px",
                    color: "var(--black-primary)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "Georgia,serif",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "var(--black-primary)",
                      color: "var(--white-primary)",
                    },
                  }}
                >
                  <Icon size={13} />
                  {label}
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default DescriptionPart;
