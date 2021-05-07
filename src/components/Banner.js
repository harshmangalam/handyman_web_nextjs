import { Alert } from "@material-ui/lab";

export default function Banner() {
  return (
    <Alert variant="filled" severity="info" style={{ paddingTop: "60px" }}>
      This is an info alert vThis is an info alert This is an info alert —{" "}
      <strong> check it out!check it out!check it out!</strong>
    </Alert>
  );
}
