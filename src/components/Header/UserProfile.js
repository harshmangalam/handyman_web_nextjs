import { Avatar, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuthState, useAuthDispatch } from "../../context/auth";
import axios from "axios";
export default function UserProfile() {
  const { user } = useAuthState();

  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigatePage = (link) => {
    setAnchorEl(null);
    router.push(link);
  };

  const handleLogout = async () => {
    try {
      setAnchorEl(null);
      await axios.get("/auth/logout");
      authDispatch("LOGOUT");
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Tooltip title={user.name}>
        <Avatar
          onClick={handleOpen}
          style={{ cursor: "pointer" }}
          alt={user.name}
          src="https://material-ui.com/static/images/avatar/1.jpg"
        />
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigatePage("/account/profile")}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigatePage("/account/settings")}>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
