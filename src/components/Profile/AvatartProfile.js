import { Avatar, colors } from "@material-ui/core";
import { Fragment } from "react";

export default function AvatarProfile({ user }) {
  return (
    <Fragment>
      {user.profilePic ? (
        <Avatar alt={user.name} src={user.profilePic} />
      ) : (
        <Avatar style={{ backgroundColor: colors.blue["500"] }}>
          {user.name.split("")[0].toUpperCase()}
        </Avatar>
      )}
    </Fragment>
  );
}
