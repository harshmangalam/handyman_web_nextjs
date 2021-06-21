import React, { Fragment } from "react";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { useRouter } from "next/router";
import { Chat as ChatIcon } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { useAuthState } from "../context/auth";

const actions = [
  {
    name: "Chat",
    icon: <ChatIcon />,
    to: "/chat",
  },
];

export default function SpeedDials() {
  const [open, setOpen] = React.useState(false);

  const { isAuthenticated } = useAuthState();

  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (!isAuthenticated) {
    return <Fragment />;
  }
  return (
    <Box position="fixed" bottom="30px" right="0">
      <SpeedDial
        ariaLabel="chat"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              router.push(action.to);
              handleClose();
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
