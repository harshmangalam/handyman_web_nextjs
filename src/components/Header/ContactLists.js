import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@material-ui/core";
import { Mail as MailIcon, Phone as PhoneIcon } from "@material-ui/icons";
export default function ContactLists() {
  return (
    <List subheader={<ListSubheader>Contacts</ListSubheader>}>
      <ListItem>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText>Info@trustserviceu.com </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PhoneIcon />
        </ListItemIcon>
        <ListItemText> 1-888-996-1006</ListItemText>
      </ListItem>
    </List>
  );
}
