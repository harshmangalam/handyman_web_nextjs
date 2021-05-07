import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({}));

export default function SearchBar() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <SearchIcon />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <Box>
            <TextField
              type="search"
              fullWidth
              placeholder="Search"
              variant="outlined"
            />
          </Box>

          <DialogContentText>
            {/* search results  */}
            <List>
              {[0, 1, 2].map((i) => (
                <Fragment key={i}>
                  <Typography
                    style={{ margin: "8px 0px" }}
                  >{`section ${i}`}</Typography>
                  {[0, 1, 2, 3, 4, 5, 6].map((value) => (
                    <ListItem key={value} button>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={`Line item ${value + 1}`} />
                    </ListItem>
                  ))}
                </Fragment>
              ))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)} color="primary">
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
