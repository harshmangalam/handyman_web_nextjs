import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@material-ui/core";
import axios from "axios";

import { useRouter } from "next/router";
import { useAuthState } from "../../context/auth";
function index({ admins }) {
  const { user: currentUser } = useAuthState();
  const router = useRouter();

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "16px" }}>
          <List>
            {admins
              .filter((u) => u._id !== currentUser._id)
              .map((user) => (
                <ListItem
                  button
                  onClick={() => router.push(`/chat/${user._id}`)}
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const admins = await axios.get("/admin/all_admins");

    return {
      props: {
        admins: admins.data.data.admins,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
export default index;
