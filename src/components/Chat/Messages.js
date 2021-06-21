import { Box, colors, Paper, Typography } from "@material-ui/core";
import { useAuthState } from "../../context/auth";
import { useChatState } from "../../context/chat";
import Message from "./Message";

function Messages() {
  const { messages } = useChatState();
  const { user } = useAuthState();
  console.log(messages);
  return (
    <Box>
      {messages.map((message) =>
        user._id === message.sender._id ? (
          <Box display="flex" justifyContent="flex-end">
            <Message
              user={message.sender}
              body={message.body}
              createdAt={message.createdAt}
              isCurrentUser={true}
            />
          </Box>
        ) : (
          <Box display="flex" justifyContent="flex-start">
            <Message
              user={message.sender}
              body={message.body}
              createdAt={message.createdAt}
            />
          </Box>
        )
      )}
    </Box>
  );
}

export default Messages;
