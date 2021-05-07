import { Grid } from "@material-ui/core";

import BookingCard from "./BookingCard";

import useSWR from "swr";
export default function BookingsHistory() {
  const { data: bookings } = useSWR("/booking/my_bookings");
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      {!bookings ? (
        <div>Loading...</div>
      ) : (
        bookings.data.bookings.map((booking) => (
          <Grid item xs={12} md={4} key={booking._id}>
            <BookingCard booking={booking} />
          </Grid>
        ))
      )}
    </Grid>
  );
}