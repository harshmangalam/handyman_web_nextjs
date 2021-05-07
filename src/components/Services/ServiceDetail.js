import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

import {useRouter} from "next/router"
const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: theme.spacing(30),
  },
}));
export default function ServiceDetail({ service }) {
  const router  = useRouter()
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={service.image}
          title={service.name}
        />
        <CardHeader
          avatar={<Avatar aria-label="recipe"></Avatar>}
          title={service.creator.name}
          subheader={service.createdAt}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {service.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {service.description}
          </Typography>
        </CardContent>
        <CardActions>
        <Button onClick={()=>router.push(`/service/${service._id}/booking`)} variant="contained" color="primary" size="large">
          Book Now
        </Button>
      </CardActions>
      </Card>
    </div>
  );
}
