import {
  Box,
  Grid,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useState } from "react";

import BookingsHistory from "../../../components/Booking/BookingsHistory";
import CancelBookings from "../../../components/Booking/CancelBookings";
import ConfirmBookings from "../../../components/Booking/ConfirmBookings";
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
      <Grid item xs={12} md={2}>
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          <Tab label="Bookings History" {...a11yProps(0)} />
          <Tab label="Confirm Bookings" {...a11yProps(1)} />
          <Tab label="Cancel Bookings" {...a11yProps(2)} />
        </Tabs>
      </Grid>
      <Grid item xs={12} md={10}>
        <TabPanel value={value} index={0}>
          <BookingsHistory />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <ConfirmBookings />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <CancelBookings />
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
