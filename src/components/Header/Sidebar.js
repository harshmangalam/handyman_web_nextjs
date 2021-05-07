import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import {
  Settings as SettingsIcon,
  AccountBoxOutlined as ProfileIcon,
  DashboardOutlined,
  ExploreOutlined,
  DashboardTwoTone,
  Person,
  Add,
} from "@material-ui/icons";

import { useAuthState } from "../../context/auth";
import AvatarProfile from "../Profile/AvatartProfile";
import SidebarList from "./SidebarList";
import ContactLists from "./ContactLists";
import { BiLogIn } from "react-icons/bi";

export default function Sidebar({ open, setOpen }) {
  const { isAuthenticated, user } = useAuthState();
  const list = (
    <div>
      {isAuthenticated && (
        <List>
          <ListItem>
            <ListItemAvatar>
              <AvatarProfile user={user} />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        </List>
      )}
      <Divider />

      {isAuthenticated ? (
        <SidebarList lists={userLinks} heading="Accounts" />
      ) : (
        <SidebarList lists={unauthLinks} heading="Authentication" />
      )}
      <Divider />

      {isAuthenticated && user.role === "TASKER" ? (
        <SidebarList lists={taskerLinks} heading="Service Provider" />
      ) : null}

      <Divider />

      <SidebarList lists={exploreLinks} heading="Explore" />
      <Divider />
      <SidebarList lists={pages} heading="Pages" />
      <Divider />
      <ContactLists />
    </div>
  );

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      {list}
    </Drawer>
  );
}

const unauthLinks = [
  { name: "Login", href: "/auth/login", icon: <BiLogIn size="20px" /> },
  { name: "Signup", href: "/auth/register", icon: <Person /> },
];

const userLinks = [
  { name: "Profile", href: "/account/profile", icon: <ProfileIcon /> },
  { name: "Settings", href: "/account/settings", icon: <SettingsIcon /> },
  {
    name: "My Bookings",
    href: "/account/bookings",
    icon: <DashboardOutlined />,
  },
];

const taskerLinks = [
  {
    name: "Tasker Dashboard",
    href: "/tasker/dashboard",
    icon: <DashboardTwoTone />,
  },
];
const pages = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/pages/aboutUs" },
  { name: "Contact Us", href: "/pages/contactUs" },
];

const exploreLinks = [
  { name: "Explore Services", href: "/services", icon: <ExploreOutlined /> },
  { name: "Explore Categories", href: "/category", icon: <ExploreOutlined /> },
];
