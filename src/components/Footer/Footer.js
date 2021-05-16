import {
  Box,
  Paper,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
  colors,
  Button,
  Fab,
} from "@material-ui/core";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from "@material-ui/icons";
import { Fragment } from "react";

export default function Footer() {
  const theme = useTheme();
  return (
    <Fragment>
      <Box
        padding={3}
        bgcolor={theme.palette.primary.dark}
        color="white"
        width="100%"
      >
        <Container>
          <Grid container spacing={3} justify="center">
            {companyLinks.map((link) => (
              <Grid item>
                <Button variant="text" style={{ color: "white" }}>
                  {link}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} justify="center">
            {categoryLinks.map((link) => (
              <Grid item>
                <Button variant="text" style={{ color: "white" }}>
                  {link}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} justify="center">
            {serviceLinks.map((link) => (
              <Grid item>
                <Button variant="text" style={{ color: "white" }}>
                  {link}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box bgcolor={theme.palette.primary.main} paddingY={4} color="white">
        <Container>
          <Grid container justify="center" spacing={3} alignItems="center">
            <Grid item>
              <Typography>
                HandymanService &copy; {new Date().getFullYear()}
              </Typography>
            </Grid>

            <Grid item>
              {socialIcons.map((s) => (
                <Fab color="primary" size="small">
                  {s.icon}
                </Fab>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Fragment>
  );
}

const serviceLinks = Array.from(Array(6).keys()).map((i) => `Service ${i}`);

const companyLinks = Array.from(Array(4).keys()).map((i) => `Page ${i}`);

const categoryLinks = Array.from(Array(4).keys()).map((i) => `Category ${i}`);

const socialIcons = [
  {
    icon: <FacebookIcon style={{ color: "white" }} />,
    name: "Facebook",
  },
  {
    icon: <InstagramIcon style={{ color: "white" }} />,
    name: "Instagram",
  },
  {
    icon: <LinkedInIcon style={{ color: "white" }} />,
    name: "LinkedIn",
  },
  {
    icon: <TwitterIcon style={{ color: "white" }} />,
    name: "Twitter",
  },
];
