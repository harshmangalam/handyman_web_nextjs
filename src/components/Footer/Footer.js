import {
  Box,
  Paper,
  Container,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from "@material-ui/icons";

export default function Footer() {
  const theme = useTheme();
  return (
    <Paper style={{padding:"16px"}}>
      <Container>
        <Grid container alignItems="center" justify="space-between">
          <Grid item md={6} xs={12}>
            <Typography style={{ textAlign: "center" }}>
              &copy; Trustserviceu Test {new Date().getFullYear()}
            </Typography>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box display="flex" alignItems="center" justifyContent="center">
              {socialIcons.map((social) => (
                <IconButton aria-label={social.name}>{social.icon}</IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

const serviceLinks = Array.from(Array(6).keys()).map((i) => `Service ${i}`);

const companyLinks = Array.from(Array(4).keys()).map((i) => `Page ${i}`);

const categoryLinks = Array.from(Array(4).keys()).map((i) => `Category ${i}`);

const socialIcons = [
  {
    icon: <FacebookIcon fontSize="inherit" style={{ color: "white" }} />,
    name: "Facebook",
  },
  {
    icon: <InstagramIcon fontSize="inherit" style={{ color: "white" }} />,
    name: "Instagram",
  },
  {
    icon: <LinkedInIcon fontSize="inherit" style={{ color: "white" }} />,
    name: "LinkedIn",
  },
  {
    icon: <TwitterIcon fontSize="inherit" style={{ color: "white" }} />,
    name: "Twitter",
  },
];
