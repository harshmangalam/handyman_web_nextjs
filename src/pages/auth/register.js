import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Box,
  Button,
  Typography,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import Axios from "axios";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MailIcon from "@material-ui/icons/Mail";
import PasswordIcon from "@material-ui/icons/Lock";
import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";
import NameIcon from "@material-ui/icons/AccountBox";

import { useState } from "react";
import AuthTemplate from "../../components/Auth/AuthTemplate";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useUIDispatch } from "../../context/ui";
import { useAuthDispatch } from "../../context/auth";
import { useRouter } from "next/router";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email must be required")
    .email("Email address must be valid email"),
  password: Yup.string().required("Password must be required"),
  phone: Yup.string().required("Phone must be required"),
  name: Yup.string().required("Name must be required"),
  role: Yup.string().required("Role must be required"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const uiDispatch = useUIDispatch();
  const router = useRouter();

  const { values, errors, setErrors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
      email: "",
      name: "",
      phone: "",
      role: "CUSTOMER",
    },

    validationSchema,
    async onSubmit(values) {
      try {
        const res = await Axios.post("/auth/register", values);

        const { userId } = res.data.data;
        localStorage.setItem("otpType", "verify_account");
        localStorage.setItem("otpData", userId);

        uiDispatch("SNACKBAR", {
          open: true,
          msg: res.data.message,
          type: "success",
        });

        router.push("/auth/verify_otp");
      } catch (error) {
        if (error.response) {
          uiDispatch("SNACKBAR", {
            open: true,
            msg: error.response.data.message,
            type: "error",
          });

          setErrors(error.response.data.data);
        }
      }
    },
  });
  return (
    <AuthTemplate
      pageName="SignUp"
      navLinks={[
        {
          href: "/auth/login",
          text: "Login",
        },
      ]}
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                placeholder="Full Name"
                type="name"
                value={values.name}
                error={Boolean(errors?.name)}
                name="name"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <NameIcon />
                  </InputAdornment>
                }
              />
              <Typography color="error">
                {errors?.name?.msg || errors?.name}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                placeholder="Phone Number"
                type="tel"
                value={values.phone}
                error={Boolean(errors?.phone)}
                name="phone"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                }
              />
              <Typography color="error">
                {errors?.phone?.msg || errors?.phone}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                placeholder="Email"
                type="email"
                value={values.email}
                error={Boolean(errors?.email)}
                name="email"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
              />
              <Typography color="error">
                {errors?.email?.msg || errors?.email}
              </Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                error={Boolean(errors?.password)}
                name="password"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                }
              />
              <Typography color="error">
                {errors?.password?.msg || errors?.password}
              </Typography>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Register as</InputLabel>
              <Select
                name="role"
                value={values.role}
                onChange={handleChange}
                label="Register as"
              >
                <MenuItem value="CUSTOMER">Customer</MenuItem>
                <MenuItem value="TASKER">Service Provider</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Checkbox checked={agree} onChange={() => setAgree(!agree)} />
              <Typography color="primary">
                I am agree with term and condition{" "}
              </Typography>
            </Box>

            <Typography color="error">{errors?.agree}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!agree}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthTemplate>
  );
}
