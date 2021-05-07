import { Button, Card, CardActions, CardContent } from "@material-ui/core";

export default function BookingCard({ booking }) {
  return (
    <Card>
      <CardContent>
        <pre>{JSON.stringify(booking, null, 4)}</pre>
      </CardContent>

      <CardActions>
        <Button>Cancel Booking</Button>
      </CardActions>
    </Card>
  );
}
