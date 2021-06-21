import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import * as Yup from "yup";

import { useFormik } from "formik";
import axios from "axios";
import { useUIDispatch } from "../../../context/ui";
import { useAuthState } from "../../../context/auth";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name must not be empty"),
  email: Yup.string().required("Email must not be empty"),
});

function edit({ userData }) {
  const initialValues = {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  };

  const router = useRouter();
  const uiDispatch = useUIDispatch();
  const { user } = useAuthState();
  const { values, errors, setErrors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      try {
        const res = await axios.put(`/profile/${user._id}`, values);
        uiDispatch("SNACKBAR", {
          type: "success",
          msg: res.data.message,
          open: true,
        });

        router.push("/account/profile");
      } catch (error) {
        uiDispatch("SNACKBAR", {
          type: "error",
          msg: error.response.data.message,
          open: true,
        });
      }
    },
  });
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "30px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              fullWidth
              value={values.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
            />
            <Typography color="error">{errors.name}</Typography>
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              fullWidth
              value={values.email}
              onChange={handleChange}
              style={{ marginTop: "16px" }}
              error={Boolean(errors.email)}
            />
            <Typography color="error">{errors.email}</Typography>
            <TextField
              variant="outlined"
              label="Phone"
              name="phone"
              fullWidth
              value={values.phone}
              onChange={handleChange}
              style={{ marginTop: "16px" }}
              error={Boolean(errors.phone)}
            />
            <Typography color="error">{errors.phone}</Typography>

            <Button
              type="submit"
              style={{ marginTop: "20px" }}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              Done
            </Button>
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
      props: {
        userData: res.data.data.user,
      },
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

export default edit;
