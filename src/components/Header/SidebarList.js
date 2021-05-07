import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import Link from "next/link";
export default function SidebarList({ lists, heading }) {
  return (
    <List subheader={heading && <ListSubheader>{heading}</ListSubheader>}>
      {lists.map((list) => (
        <Link href={list.href} key={list.name} passHref>
          <ListItem button>
            {list.icon && <ListItemIcon>{list.icon}</ListItemIcon>}
            <ListItemText primary={list.name} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
