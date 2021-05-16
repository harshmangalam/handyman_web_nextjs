import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListSubheader,
  LinearProgress,
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

import useSWR from "swr";
import { useAuthState } from "../../context/auth";
import AvatarProfile from "../Profile/AvatartProfile";
import SidebarList from "./SidebarList";
import ContactLists from "./ContactLists";
import { BiLogIn } from "react-icons/bi";
import Link from "next/link";

export default function Sidebar({ open, setOpen }) {
  const { isAuthenticated, user } = useAuthState();
  const { data: pages, error: pageError } = useSWR("/page/page_slug");
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
      {pages ? (
        <List subheader={<ListSubheader>Pages</ListSubheader>}>
          {pages.data.pages.map((page) => (
            <Link href={`/page/${page.slug}`} key={page._id} passHref>
              <ListItem button>
                <ListItemText primary={page.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      ) : (
        <LinearProgress />
      )}
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


const exploreLinks = [
  { name: "Explore Services", href: "/service", icon: <ExploreOutlined /> },
  { name: "Explore Categories", href: "/category", icon: <ExploreOutlined /> },
];
