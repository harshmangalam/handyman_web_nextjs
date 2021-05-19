import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

import axios from "axios";

export default function SingleService({ service }) {
  const router = useRouter();

  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <img src={service.image} className={classes.image} />

          <div className={classes.content}>
            <Typography variant="h4">{service.name}</Typography>

            <Typography style={{ marginTop: "16px", textAlign: "justify" }}>
              {service.description}
            </Typography>

            <Button
              onClick={() => router.push(`/service/${service._id}/booking`)}
              style={{ marginTop: "24px" }}
              variant="contained"
              size="large"
              color="primary"
            >
              {service.currency}${service.price} Book Now
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((t) => ({
  paper: {
    padding: "16px",
  },

  image: {
    width: "100%",
    height: "300px",
  },

  content: {
    margin: "16px 0px",
    textAlign: "center",
  },
}));

export async function getServerSideProps(context) {
  try {
    const serviceId = context.query.serviceId;

    const res = await axios.get(`/service/${serviceId}`);

    return {
      props: {
        service: res.data.data.service,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
