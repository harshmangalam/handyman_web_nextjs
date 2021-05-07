import { List, ListItem, ListItemText, ListSubheader, Typography } from "@material-ui/core";
export default function FooterLinks({ links, name }) {
  return (
    <List
      subheader={
        <Typography style={{color:'white',margin:"10px 0px",textAlign:'center'}} variant="h6">
          {name}
        </Typography>
      }
      dense
    >
      {links.map((link) => (
        <ListItem button key={link} >
          <ListItemText primary={link} style={{textAlign:'center'}}  />
        </ListItem>
      ))}
    </List>
  );
}
