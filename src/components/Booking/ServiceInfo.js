import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  CardActionArea,
} from "@material-ui/core";
import Link from "next/link";
export default function ServiceInfo({ service }) {
  const classes = useStyles();
  if (!service) {
    return <div>Loading...</div>;
  }

  const serviceData = service.data.service;

  return (
    <Card elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={serviceData.name}
          height="240"
          image={serviceData.image}
          title={serviceData.name}
        />
        <CardContent className={classes.content}>
          <Link href={`/service/${serviceData._id}`} passHref>
            <Typography component="h5" variant="h5">
              {serviceData.name}
            </Typography>
          </Link>
          <Link href={`/category/${serviceData.category._id}`} passHref>
            <Typography variant="subtitle1" color="textSecondary">
              {serviceData.category.name}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({}));
