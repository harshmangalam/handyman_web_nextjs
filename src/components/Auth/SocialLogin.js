import { Fragment, useState } from "react";

import LoginWithFacebook from "react-facebook-login/dist/facebook-login-render-props";
import { Facebook as FacebookIcon } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import axios from "axios";
import { useUIDispatch } from "../../context/ui";
import { useRouter } from "next/router";
import { useAuthDispatch } from "../../context/auth";

function SocialLogin() {
  const uiDispatch = useUIDispatch();
  const authDispatch = useAuthDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [role, setRole] = useState("CUSTOMER");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  console.log(role);

  const responseFacebook = async (response) => {
    try {
      localStorage.removeItem("otpType");
      localStorage.removeItem("otpData");

      const data = {
        name: response.name,
        email: response.email,
        accessToken: response.accessToken,
        userId: response.userID,
        profilePic: response.picture.data.url,
        role,
      };

      const res = await axios.post("/auth/login_with_facebook", data);

      uiDispatch("SNACKBAR", {
        open: true,
        msg: res.data.message,
        type: res.data.type,
      });

      if (res.data.type === "success") {
        authDispatch("LOGIN", res.data.data.user);
        router.push("/");
      }
    } catch (error) {
      uiDispatch("SNACKBAR", {
        open: true,
        msg: error.res.data.message,
        type: "error",
      });
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        onClick={handleClickOpen}
      >
        Social Login
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Login from Facebook</DialogTitle>

        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Login as </FormLabel>
            <RadioGroup
              aria-label="role"
              name="role1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="CUSTOMER"
                control={<Radio />}
                label="Customer"
              />
              <FormControlLabel
                value="TASKER"
                control={<Radio />}
                label="Service Provider"
              />
            </RadioGroup>
          </FormControl>

          <LoginWithFacebook
            appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
              <Button
                startIcon={<FacebookIcon />}
                variant="contained"
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
              >
                Login With Facebook
              </Button>
            )}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default SocialLogin;
