import {
  makeStyles,
  Paper,
  Avatar,
  Typography,
  Box,
  colors,
} from "@material-ui/core";
import Link from "next/link";
export default function CategoryCard({ category }) {
  const classes = useStyles();

  return (
    <Link href={`/category/${category._id}`} passHref>
      <Paper className={classes.paper}>
        <Avatar src={category.image} className={classes.avatar} />
        <div>
          <Typography style={{marginTop:"16px"}} variant="h5">{category.name}</Typography>
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
