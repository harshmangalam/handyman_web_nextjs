import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ArrowBack as BackIcon } from "@material-ui/icons";
import Link from "next/link";
export default function AuthTemplate({ children, pageName, navLinks }) {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ padding: "80px 0px" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper style={{ padding: "32px" }}>
          <Box mb={4} display="flex" alignItems="center">
            <Link href="/" passHref>
              <IconButton>
                <BackIcon />
              </IconButton>
            </Link>
            <Typography style={{ margin: "0px 8px" }} variant="h6">
              {pageName}
            </Typography>
          </Box>
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({}));
