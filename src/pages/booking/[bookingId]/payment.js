// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { FaStripeS } from "react-icons/fa";
import { useUIDispatch } from "../../../context/ui";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const bookingId = router.query.bookingId;

  const uiDispatch = useUIDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    try {
      setLoading(true);
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log("[error]", error);
      }

      if (paymentMethod) {
        const res = await axios.post(`/booking/${bookingId}/payment`, {
          paymentId: paymentMethod.id,
        });

        uiDispatch("SNACKBAR", {
          type: res.data.type,
          msg: res.data.message,
          open: true,
        });

        if (res.data.type === "success") {
          router.push("/account/bookings");
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "16px" }}>
          <Typography>Pay booking payment</Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <CardElement />
            <Button
              type="submit"
              startIcon={<FaStripeS />}
              variant="contained"
              color="primary"
              disabled={!stripe || loading}
              style={{ marginTop: "20px" }}
            >
              Pay
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
