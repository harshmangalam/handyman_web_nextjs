import {
  makeStyles,
  Paper,
  Avatar,
  Typography,
  Box,
  colors,
  Chip,
} from "@material-ui/core";
import Link from "next/link";
export default function ServiceCard({ service }) {
  const classes = useStyles();

  return (
    <Link href={`/service/${service._id}`} passHref>
      <Paper className={classes.paper}>
        <Avatar src={service.image} className={classes.avatar} />
        <div>
          <Typography variant="h5">{service.name}</Typography>
          <Chip
            variant="default"
            color="secondary"
            size="medium"
            style={{ marginTop: "16px" }}
            label={`$ ${service.price} ${service.currency}`}
          />
        </div>
      </Paper>
    </Link>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    transition: "0.6s all",

    "&:hover": {
      background: colors.blue[500],
      transform: "translateY(16px) scale(1.02)",
      color:"white"
    },
  },

  avatar: {
    width: "150px",
    height: "150px",
  },
}));
