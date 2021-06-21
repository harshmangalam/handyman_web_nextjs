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
        <Avatar variant="rounded"  src={service.image} className={classes.avatar} />
        <div>
          <Typography variant="h5">{service.name}</Typography>
          <Chip
            variant="default"
            color="primary"
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
    transition: "0.7s all",

    "&:hover": {
      background: `linear-gradient(45deg, ${colors.pink[300]} 30%, ${colors.blue[400]} 70%)`,
      transform: "scale(0.9)",
      color: "white",
    },
  },

  avatar: {
    width: "100%",
    height: "200px",
  },
}));
