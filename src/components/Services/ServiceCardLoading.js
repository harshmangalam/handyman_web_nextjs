import { Fragment } from "react";
import { Skeleton } from "@material-ui/lab";
export default function ServiceCardLoading() {
  return (
    <Fragment>
      <Skeleton variant="rect" width="100%" height="400px" />
      <Skeleton width="60%" />
      <Skeleton />
    </Fragment>
  );
}
