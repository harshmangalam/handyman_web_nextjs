import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  CardActionArea,
  Chip,
  Paper,
  Avatar,
  Button,
  colors,
} from "@material-ui/core";
import Link from "next/link";

import { useRouter } from "next/router";
export default function ServiceCard({ service }) {
  const router = useRouter();
  const classes = useStyles();
  return (
    <Link href={`/service/${service._id}`} passHref>
      <Paper className={classes.root}>
        <Avatar src={service.image} className={classes.avatar} />
        <div>
          <Typography variant="h5">{service.name}</Typography>
          <Typography variant="body1" style={{margin:"12px 0px"}}>{service.description}</Typography>
          <Typography variant="h6">{service.price}</Typography>
        </div>
      </Paper>
    </Link>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "120px",
    height: "120px",
    marginRight: 0,
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(4),
    },
  },

  root: {
    width: "100%",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(4, 0),
    cursor: "pointer",
    transition: "0.6s all",
    textAlign: "center",
    "&:first-child": {
      marginTop: "0px",
    },
    "&:hover": {
      backgroundColor: colors.pink["600"],
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      textAlign: "start",
    },
  },
}));
