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
import Link from "next/link";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  PagesSharp,
} from "@material-ui/icons";
import { Fragment } from "react";

import useSWR from "swr";
export default function Footer() {
  const theme = useTheme();
  const { data: pages } = useSWR("/page/page_slug");
  const { data: categories } = useSWR("/category/fetch_name");
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
            {pages ? (
              pages.data.pages.map((page) => (
                <Grid item>
                  <Link href={`/page/${page.slug}`} passHref>
                    <Button variant="text" style={{ color: "white" }}>
                      {page.title}
                    </Button>
                  </Link>
                </Grid>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Grid>

          <Grid container spacing={3} justify="center">
            {categories ? (
              categories.data.categories.map((cat) => (
                <Grid item>
                  <Link href={`/category/${cat._id}`} passHref>
                    <Button variant="text" style={{ color: "white" }}>
                      {cat.name}
                    </Button>
                  </Link>
                </Grid>
              ))
            ) : (
              <p>Loading...</p>
            )}
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
