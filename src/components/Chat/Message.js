import { Avatar, Box, Chip, colors, Paper, Typography } from "@material-ui/core";
import React from "react";

function Message({ user, body, createdAt, isCurrentUser }) {
  return (
    <Paper
      style={{
        padding: "8px",
        marginTop: "16px",
        marginBottom: "16px",
        backgroundColor: isCurrentUser ? colors.green[400] : colors.blue[500],
        borderTopRightRadius: "20px",
        color: isCurrentUser ? colors.green[50] : colors.blue[50],
        maxWidth:"230px",
        wordWrap:"break-word"
      }}
    >
      <Box display="flex" alignItems="center">
        <Avatar src={user.profilePic} />
        <Typography variant="h6" style={{ marginLeft: "8px" }}>
          {user.name}
        </Typography>
      </Box>
      <Typography style={{ marginTop: "6px" }}>{body}</Typography>
      <Chip variant="default" size="small" label={createdAt}  />
    </Paper>
  );
}

export default Message;
