import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { useBookingState } from "../../context/booking";

export default function CheckoutService() {
  return (
    <div style={{ display: "flex", alignItem: "center", justify: "center" }}>
      <Card style={{ width: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Check details carefully before checkout
          </Typography>
          <div style={{ margin: "20px 0px" }}>
            <Typography></Typography>
          </div>
        </CardContent>
        <CardActions>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                color="primary"
              >
                Proceed for Checkout
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="large"
                fullWidth
                color="secondary"
                variant="contained"
              >
                Cancel Booking
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
