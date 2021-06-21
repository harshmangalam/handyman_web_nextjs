import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import Messages from "../../components/Chat/Messages";
import MessageInputBox from "../../components/Chat/MessageInputBox";
import { ChatProvider } from "../../context/chat";
function Chat({ user }) {
  const classes = useStyles();

  return (
    <ChatProvider>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={8}>
          <Paper className={classes.root} elevation={8}>
            <Box className={classes.header}>
              <Avatar src={user.profilePic} />
              <Typography style={{ marginLeft: "16px" }}>
                {user.name}
              </Typography>
            </Box>

            <Box className={classes.messageBody}>
              <Messages />
            </Box>
            <Box className={classes.textArea}>
              <MessageInputBox />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ChatProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "16px",
    height: "80vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  header: {
    display: "flex",
    alignItems: "center",
    maxHeight: "10%",
  },

  messageBody: {
    maxHeight: "70%",
    overflowY: "scroll",
    flexGrow:"1",
    padding:"16px"
  },

  textArea: {
    maxHeight: "20%",
  },
}));

export const getServerSideProps = async ({ req, res, query }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    await axios.get("/auth/me", { headers: { cookie } });

    const user = await axios.get(`/profile/${query.userId}`);

    return {
      props: {
        user: user.data.data.user,
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

export default Chat;
