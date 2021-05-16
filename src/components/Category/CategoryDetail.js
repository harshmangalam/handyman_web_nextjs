import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
export default function CategoryDetailLoading({ category }) {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={category.image}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Box>
          <Typography gutterBottom variant="h4" component="h2">
            {category.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {category.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    width: "100%",
    height: "400px",
  },
}));
