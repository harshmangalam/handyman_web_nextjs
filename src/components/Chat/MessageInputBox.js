import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

import { useChatState } from "../../context/chat";

import { Send as SendIcon } from "@material-ui/icons";
import { useState } from "react";
import { useRouter } from "next/router";

function MessageInputBox() {
  const [text, setText] = useState();
  const { socketRef } = useChatState();

  const router = useRouter();

  const userId = router.query.userId;

  const handleSend = () => {
    socketRef.current.emit("message", {
      receiverId: userId,
      body: text,
    });
  };
  return (
    <div>
      <FormControl variant="filled" fullWidth>
        <InputLabel htmlFor="message-input">Write Message...</InputLabel>
        <OutlinedInput
          id="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          multiline
          rows="3"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleSend}
                aria-label="toggle password visibility"
                edge="end"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
          fullWidth
        />
      </FormControl>
    </div>
  );
}

export default MessageInputBox;
