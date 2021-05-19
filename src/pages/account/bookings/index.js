import {
  Box,
  Grid,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import BookingsHistory from "../../../components/Booking/BookingsHistory";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="Bookings History" {...a11yProps(0)} />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value={value} index={0}>
          <BookingsHistory />
        </TabPanel>
      </Grid>
    </Grid>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    await axios.get("/auth/me", { headers: { cookie } });

    return { props: {} };
  } catch (err) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
