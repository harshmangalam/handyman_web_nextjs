import axios from "axios";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Paper,
  Grid,
  Typography,
  Box,
  Chip,
} from "@material-ui/core";
import { FaEdit } from "react-icons/fa";
import { AiOutlineBlock, AiOutlineDelete } from "react-icons/ai";
export default function Profile({ user, bookings }) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} sm={12} md={6}>
        <Paper style={{ padding: "20px" }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src={user.profilePic}
              style={{ width: "150px", height: "150px" }}
            />
            <Typography variant="h6">{user.name}</Typography>
            <Typography>{user.email}</Typography>
            <Chip
              style={{ marginTop: "8px" }}
              label={
                user.isAccountVerified
                  ? "Account Verified"
                  : " Account Not Verified"
              }
            />

            {user.isBlocked && (
              <Chip
                style={{ marginTop: "8px" }}
                label="Account Blocked By Admin"
              />
            )}

            {user.blockNotification && (
              <Chip
                style={{ marginTop: "8px" }}
                label="Notifications blocked"
              />
            )}
          </Box>

          {user.address?.length ? (
            <Paper
              style={{ padding: "16px", marginTop: "16px" }}
              variant="outlined"
            >
              {user.addresses.map((addr) => (
                <Typography>{addr}</Typography>
              ))}
            </Paper>
          ) : null}

          {user.location && (
            <Paper
              style={{ padding: "16px", marginTop: "16px" }}
              variant="outlined"
            >
              <Typography>{user.location?.city}</Typography>
              <Typography>{user.location?.pinCode}</Typography>
            </Paper>
          )}

          <Grid container alignItem="center" justify="center" spacing={2}>
            {bookings.map((booking) => (
              <Grid item xs={12} md={6}>
                <Paper
                  style={{
                    marginTop: "16px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  elevation={9}
                >
                  <Typography variant="h6">{booking.title}</Typography>
                  <Chip label={booking.count} color="primary" />
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={2}
            style={{ marginTop: "20px" }}
          >
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                startIcon={<FaEdit fontSize="20px" />}
              >
                Edit Profile
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<AiOutlineDelete fontSize="20px" />}
              >
                Delete Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    const res = await axios.get("/profile/my_profile", { headers: { cookie } });

    return {
      props: {
        user: res.data.data.user,
        bookings: res.data.data.bookings,
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
