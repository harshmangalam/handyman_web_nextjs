import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

import Link from "next/link";

import { Menu as MenuIcon } from "@material-ui/icons";
import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import { useAuthState } from "../../context/auth";

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isAuthenticated } = useAuthState();
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref>
            <Typography
              style={{ cursor: "pointer" }}
              variant="h6"
              className={classes.title}
            >
              TrustServiceU
            </Typography>
          </Link>

          <SearchBar />
          {isAuthenticated && <UserProfile />}
        </Toolbar>
      </AppBar>

      <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
