import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import ClockField from "../../../components/ClockField";

import DateField from "../../../components/DateField";
import { useUIDispatch } from "../../../context/ui";
import { useRouter } from "next/router";
import CountryField from "../../../components/CountryField";
import CityField from "../../../components/CityField";

let initialValues = {
  address: "",
  taskLength: 0,
  instructions: "",
  date: "",
  time: "",
  city: "",
  postalCode: "",
  country: "",
  paymentMode: "",
};

const validationSchema = Yup.object().shape({
  address: Yup.string().required("Booking address must not be empty"),
  taskLength: Yup.number().required("Provide how long is your task"),
  city: Yup.string().required("City must not be empty"),
  postalCode: Yup.string().required("Postal Code code must not be empty"),
  paymentMode: Yup.string().required("Select  mode of payment"),
  country: Yup.string().required("Select  your country"),
});

export default function Booking() {
  const router = useRouter();
  const { serviceId } = router.query;

  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const uiDispatch = useUIDispatch();

  const {
    handleChange,
    handleSubmit,
    values,
    errors,

    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      values = {
        ...values,
        date: date.toISOString(),
        time: time.toISOString(),
        service: serviceId,
      };

      try {
        setSubmitting(true);
        const res = await axios.post("/booking", values);
        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: res.data.type,
        });
        if (values.paymentMode === "COD") {
          router.push("/account/bookings");
        } else {
          router.push(`/booking/${res.data.data.bookingId}/payment`);
        }
      } catch (error) {
        if (error.response.data) {
          uiDispatch("SNACKBAR", {
            open: true,
            msg: error.response.data.message,
            type: error.response.type,
          });
        }
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CountryField
                  name="country"
                  value={values.country}
                  handleChange={handleChange}
                  error={Boolean(errors?.country)}
                />
                <Typography color="error">{errors?.country}</Typography>
              </Grid>

              <Grid item xs={12}>
                <CityField
                  name="city"
                  value={values.city}
                  handleChange={handleChange}
                  error={Boolean(errors?.city)}
                />
                <Typography color="error">{errors?.city}</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                  label="Postal Code"
                  variant="outlined"
                  required
                  error={Boolean(errors?.postalCode)}
                />
                <Typography color="error">{errors?.postalCode}</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  label="Address"
                  variant="outlined"
                  error={Boolean(errors?.address)}
                  required
                />
                <Typography color="error">{errors?.address}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  fullWidth
                  name="taskLength"
                  value={values.taskLength}
                  onChange={handleChange}
                  label="How long is your task (in hour)"
                  variant="outlined"
                  inputProps={{ min: 1 }}
                  required
                  error={Boolean(errors?.taskLength)}
                />
                <Typography color="error">{errors?.taskLength}</Typography>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item xs={12} md={6}>
                  <DateField label="Task Date" setDate={setDate} date={date} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ClockField label="Task Time" setTime={setTime} time={time} />
                </Grid>
              </Grid>

              <Grid item>
                <FormControl
                  component="fieldset"
                  error={Boolean(errors.paymentMode)}
                >
                  <FormLabel component="legend">Payment Mode</FormLabel>
                  <RadioGroup
                    aria-label="payment_mode"
                    name="paymentMode"
                    value={values.paymentMode}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="COD"
                      control={<Radio />}
                      label="Cash After Work"
                    />
                    <FormControlLabel
                      value="ONLINE_PAYMENT"
                      control={<Radio />}
                      label="Pay Online"
                    />
                  </RadioGroup>
                </FormControl>
                <Typography color="error">{errors?.paymentMode}</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  name="instructions"
                  value={values.instructions}
                  onChange={handleChange}
                  label="Any Instructions ?"
                  variant="outlined"
                />
              </Grid>
              <Grid item container xs={12} justify="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                >
                  Proceed
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    const res = await axios.get("/auth/me", { headers: { cookie } });

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
